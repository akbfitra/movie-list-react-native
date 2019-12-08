const Series = require('../models/series')

class SeriesController {
  static create (req, res, next){
    const { title, description, url, popularity, tags } = req.body
    Series.create({ title, description, url, popularity, tags})
      .then( result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static findAll(req, res, next){
    Series.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static delete(req, res, next){
    const {id} = req.params
    Series.findByIdAndRemove(id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static update(req, res, next){
    const {id} = req.params
    const fields = ['title', 'description', 'url', 'popularity', 'tags']
    const update = {}
    for( let key in req.body ){
      fields.forEach(el => {
        if(key == el ){
          update[key] = req.body[key]
        }
      });
    }
    Series.findByIdAndUpdate(id, update)
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  
}

module.exports = SeriesController