const express = require('express');
const multer = require('multer')
const uploadConfig = require('./config/upload');

const HouseController =  require ('./controllers/HouseController')

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/house',upload.array('image', 3), HouseController.store)
routes.get('/search', HouseController.show)
routes.get('/house', HouseController.index)

module.exports = routes;
