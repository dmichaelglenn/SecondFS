//require dependencies
require('dotenv').load({ silent: true });

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var cors = require('cors');
// var mongodb = require("mongodb");
// var mongoClient = mongo.mongoClient;
// var ObjectID = mongodb.ObjectID;

// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb://localhost:27017/signalToNoise");


//schemas - want to properly separate these as soon as the server is working. Also, Schemas will need to be properly defined once I know what I'll need.
//require('./../model/team');

var RegionSchema = mongoose.Schema({
    name: String,
});

var BandSchema = mongoose.Schema({
    name: String,
});

var MusicianSchema = mongoose.Schema({
    name: String,
});

var Band = mongoose.model('Band', BandSchema);
var Musician = mongoose.model('Musician', MusicianSchema);
var Region = mongoose.model('Region', RegionSchema);

//reference to collections - do these need to change when separated out?
var MUSICIANS_COLLECTION = "musicians";
var BANDS_COLLECTION = "bands";
var REGIONS_COLLECTION = "regions";

var app = express();
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());
app.use(cors());

// pure functions for HTTP reqs
function listResources (Model) {
    return function (req, res, next) {
        Model.find(function (err, docs) {
            if (err) return next(err);
            res.json(docs);
        });
    };
}

function getResource (Model, paramId) {
    return function (req, res, next) {
        Model.findOne({_id:req.params[paramId]}, function (err, doc) {
            if (err) return next(err);
            res.json(doc);
        });
    };
}

function createResource (Model) {
    return function (req, res, next) {
        var resource = new Model(req.body);
        resource.save(function (err, resource) {
            if (err) return next(err);
            res.json(resource);
        });
    };
}

function deleteResource (Model, paramId) {
    return function (req, res, next) {
        Model.findByIdAndRemove(req.params[paramId], function (err, doc) {
            if (err) return next(err);
            res.json(doc);
        });
    };
}

function updateResource (Model, paramId) {
    return function (req, res, next) {
        Model.findById(req.params[paramId], function (err, model) {
            if (err) return next(err);
            Object.keys(req.body).forEach(function (k) {
                model[k] = req.body[k];
            });
            model.save(function (err, doc) {
                if (err) return next(err);
                res.json(doc);
            });
        });
    };
}




// routes - do these get separated out as well?

app.get("/bands", listResources(Band));
app.get("/musicians", listResources(Musician));
app.get("/regions", listResources(Region));

app.post("/bands", createResource(Band));
app.post("/musicians", createResource(Musician));
app.post("/regions", createResource(Region));

app.get("/bands/:band", getResource(Band, 'band'));
app.get("/musicians/:musician", getResource(Musician, 'musician'));
app.get("/regions/:region", getResource(Region, 'region'));

app.put("/bands/:id", updateResource(Band, 'band'));
app.put("/musicians/:id", updateResource(Musician, 'musician'));
app.put("/regions/:id", updateResource(Region, 'region'));

app.delete("/bands/:band", deleteResource(Band, 'band'));
app.delete("/musicians/:musician", deleteResource(Musician, 'musician'));
app.delete("/regions/:region", deleteResource(Region, 'region'));

app.use(function (req, res, next) {
    res.status(404).json({ error: 'Resource Not Found' });
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: err });
});

// server launch variables
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
