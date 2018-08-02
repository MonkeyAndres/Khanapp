var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var express = require('express');
var multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
});

const createFilename = (file) => {
    
}

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'ProfilePhotos',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(undefined, createFilename(file));
    }
});

const uploader = multer({
    storage: storage
});

module.exports = { uploader };