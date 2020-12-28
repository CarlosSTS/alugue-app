const House = require('../models/House')

module.exports = {

  async store(request, response) {
    const requestImages  = request.files

    const image = requestImages.map(images => {
      return  images.filename
    })
   
    const { offer,young, name, description, value } = request.body

    const house = await House.create({
      offer,
      image,
      name,
      young,
      description,
      value
    });
    return response.json(house)
  },

  async show(request, response) {
    const { name } = request.query
    const house = await House.find({ name: name });

    return response.json(house)
  },

  async index(request, response) {
    const house = await House.find()

    return response.json(house)
  }
};