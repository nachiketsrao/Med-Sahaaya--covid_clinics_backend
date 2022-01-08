var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var clinic = require('./clinics.model');
var {response, handleError, MongooseErrorHandle} = require('./response.util');
const clinicsModel = require('./clinics.model');

var router = express.Router();
var app = express();
var port = 3000;

//var router = express.Router;

// CORS middleware
app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

//body parser
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb'}));

mongoose.connect('mongodb+srv://nacho1:salsanacho1@realmcluster.jwh3u.mongodb.net/mytest?retryWrites=true&w=majority', function (err) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log('DB Connection Established');
});


// get documents by district:
app.use('/',
router.post('/', (req, res) => {

    //console.log(req.body);

    let {district} = req.query; // req.query gets paramters from the URL

    // we search by district and return all documents with the given district name.
    console.log(district);

    clinic.find({district: district}).exec((err, list) => {
        if (err) {
            return MongooseErrorHandle(err, res)
        }
        console.log(list);
        return response(200, list, res)
    }) 
}))

// i have used postman to test this code.
// In postman, I have made a POST request with the body { "district" : "Bangalore urban"}. Follow this format for the post request body from the app.

/*
app.get('/', (req, res) => {

    let {district} = req.body;

    clinic.find({
        district: district}, function(err, docs){
            if (err){
                console.log(err);
            }
            else{
                console.log("First function call : ", docs);
            }

            return response(200, docs, res);
        })
    });
*/

// https://www.geeksforgeeks.org/mongoose-find-function/

/*
User.find({ name: 'Punit'}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("First function call : ", docs);
    }
});

In this code, we are finding all the documents where the name is Punit.
*/

app.get('/ping', function (req, resp) {
    resp.status(200).send('pong').end()
});


// The app.listen() method binds itself with the specified host and port to bind and listen for any connections.
app.listen(port, function () {
    console.log('listening to your port', port);
});

module.exports = router;