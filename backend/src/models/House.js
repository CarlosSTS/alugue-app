const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  image:[String],
  name: String,
  young: Boolean,
  description: String,
  value: Number,
  offer: String,
},{
  toJSON:{
    virtuals: true,
  },
});

HouseSchema.virtual('image1').get(function(){
  return `http://192.168.0.107:3333/files/${this.image[0]}`
})
HouseSchema.virtual('image2').get(function(){
  return `http://192.168.0.107:3333/files/${this.image[1]}`
})
HouseSchema.virtual('image3').get(function(){
  return `http://192.168.0.107:3333/files/${this.image[2]}`
})
module.exports = mongoose.model('House', HouseSchema);