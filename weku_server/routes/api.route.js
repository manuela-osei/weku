
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var router = express.Router();

// Import the mongoose models
const User = require('../models/user.model');
const Tree = require('../models/tree.model');
const UserFeed =require('../models/userFeed.model');

/* Routes - API */
router.get('/', (req, res) => {
    res.send('Weku API running');
});


/****** User API ******/

//Login-USER - login data calling
router.post('/login', (req, res) => {

    //receiving details
    var email = req.body.email;//query might be an issue
    var password = req.body.password;

    // Query data in the database and see if there a valid user with that email and password.
    // if its found login successful
    // else login failed

    User.findOne({ "email": email, "password": password }, (err, user) => {
        if(err || !user){
            return res.status(401).json({
                message: "Login fail!"
            });
        }else{
            return res.status(200).json({
                message: "Login successful!",
                user: stripSensibleInformation(user)
            });
        }
    });
});


//signup data calling
router.post('/sign-up', (req, res) => {
    //Registering new user
    var username =req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    // Checking that they have provided both email and password
    if(email && password){
        //1) Check if the email already exits 
        User.findOne({ "email": email }, (err, user) => {
            if(err || user){ // if there was an error or if you found a user with the same email
                res.status(401).json({
                    message: "Could not created an user with the provided email and password"
                });
                return;
            }else if(!user){
                var new_user = new User();
                new_user.username = username;
                new_user.email = email;
                new_user.password = password;
                new_user.save().then(function(user) {
                    res.status(200).json({
                        message: "User created successfully!",
                        user: stripSensibleInformation(user)
                    });
                 });
                return;
            }
        });
    }else{
        res.status(401).json({
            message: "You need to provide email and password to sign-up"
        });
        return;
    }
});



// Get all the users without password and email
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            res.status(401).json({
                message: "Could not get the users"
            });
            return;
        }
        //calling  all users det to array
        let allMyUsers = [];
        for(let i = 0; i < users.length; i++){
            let user = users[i];
            allMyUsers.push(stripSensibleInformation(user));//striped sensible info from user info
        }

        //calling back all users
        res.status(200).json({
            users:allMyUsers
        });
    });
});

// Update user info
router.post('/user/:id', (req, res) => {
    let id = req.params.id;

    console.log("Trying to update the user ");

    User.findOne({"id": id}, (err, user) => {
        if(err || !user){
            res.status(401).json({
                message: "Could not get the users"
            });
            return;
        }

        // let user = users[0];
        let properties = req.body;
        for(let key in properties){
            user[key] = properties[key];
        }
        try {
            user.save().then (new_user => {
                res.status(200).json({
                    user:stripSensibleInformation(new_user)
                });
            });
        } catch (error) {
            res.status(401).json({
                message: "Could not get the users",
                error: error
            });
        }
    });
});

// deleting user from database
router.delete('/user/:id', (req, res) => {
    let id = req.params.id;

    User.findOneAndDelete({"id": id}, (err, users) => {
        if(err || users.length == 0){
            res.status(401).json({
                message: "Could not delete the user"
            });
            return;
        }

        res.status(200).json({
            message: "User deleted successfully!"
        });
    });
});

// Get the details about a user
router.get('/user/:id', function (req, res) {
    let id = req.params.id;

    User.find({"id": id}, (err, users) => {
        if(err || users.length == 0){
            res.status(401).json({
                message: "Could not get the user"
            });
            return;
        }

        let user = users[0];
        res.status(200).json({
            user:user
        });
    });
});

//retrieving all user info
function stripSensibleInformation(user){
    return user; 
}


/****** Tree API ******/
//create  tree
router.post('/create-tree', (req, res) => {
    //Creating a new tree
    var id = req.body.id;
    var name = req.body.name;
    var user_id = req.body.user_id;

    // Checking that they have provided the name
    if(id && name){
        //1) Check if the id already exits 
        Tree.findOne({ "id": id }, (err, tree) => {
            if(err || tree){ // if there was an error or if you found a tree with the same id
                res.status(401).json({
                    message: "Could not create the tree, use a different id"
                });
                return;
            }else if(!tree){
                var new_tree = new Tree();
                new_tree.name = name;
                new_tree.id = id;
                new_tree.save().then(function(tree) {
                    res.status(200).json({
                        message: "Tree created successfully!",
                        tree: tree
                    });
                 });
                return;
            }
        });
    }else{
        res.status(401).json({
            message: "You need to provide the id and name of the tree"
        });
        return;
    }
});

//getting tree info
router.get('/trees', (req, res) => {
    Tree.find({}, (err, trees) => {
        if(err){
            res.status(401).json({
                message: "Could not get the trees"
            });
            return;
        }

        //calling back all tree
        res.status(200).json({
            trees:trees
        });
    });
});

//getting tree id
router.get('/tree/:id', function (req, res) {
    let id = req.params.id;

    Tree.find({"id": id}, (err, trees) => {
        if(err || trees.length == 0){
            res.status(401).json({
                message: "Could not get the tree"
            });
            return;
        }

        let tree = trees[0];
        res.status(200).json({
            tree:tree
        });
    });
});


//update tree 
router.post('/tree/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;

    Tree.find({"id": id}, (err, trees) => {
        if(err || trees.length == 0){
            res.status(401).json({
                message: "Could not get the tree"
            });
            return;
        }
        //found
        let tree = trees[0];
        tree.name = name;
        tree.save();

        res.status(200).json({
            tree:tree
        });
    });
});

//delete tree
router.delete('/tree/:id', (req, res) => {
    let id = req.params.id;

    Tree.findOneAndDelete({"id": id}, (err, users) => {
        if(err || users.length == 0){
            res.status(401).json({
                message: "Could not delete the tree"
            });
            return;
        }

        res.status(200).json({
            message: "Tree deleted successfully!"
        });
    });
});

/****** FEED API ******/

//get feed
router.get('/feeds/:id', (req, res) => {

    let id = req.params.id;

    UserFeed.find({userId: id}, (err, feeds) => {
       
       
        //calling back all feeds
        res.status(200).json({
            feeds:feeds
        });
    });
});

//create feed
router.post('/feeds/:id', (req, res) => {
        let id = req.params.id;
        //set var
        var title = req.body.title;
        var description = req.body.description;
        var src = req.body.src;
        var vidSrc = req.body.vidSrc;
        var date = req.body.date;

        //create new
        var new_feed = new UserFeed();
        new_feed.userId = id
        new_feed.title = title;
        new_feed.description = description;
        new_feed.date = date;
        new_feed.src = src;
        new_feed.vidSrc = vidSrc

        new_feed.save().then(function(feed) {
            res.status(200).json({
                message: "Feed created successfully!",
                feed: feed
            });
        });
    return;      
});

//delete feed
router.delete('/feeds/:id', (req, res) => {
    let id = req.params.id;
    UserFeed.findOneAndDelete({"id": id}, (err, feeds) => {
        if(err || users.length == 0){
            res.status(401).json({
                message: "Could not delete the tree"
            });
            return;
        }
        res.status(200).json({
            message: "Tree deleted successfully!"
        });
    });
});



module.exports = router;