const { axiosSerie } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

class SeriesController {
  static async findAll(req, res, next){
    let redisSerie = await redis.get('series')
    if(redisSerie){
      res.status(200).json(JSON.parse(redisSerie))
    } else {
      try{
        const {data} = await axiosSerie({
          method: 'GET',
          url: '/series'
        })
        redis.set("series", JSON.stringify(data), "EX", 500)
        res.status(200).json(data)
      }
      catch(response){
        next({
          status: response.status,
          message: response.statusText
        })
      }
    }
  }

  static async create(req, res, next){
    const { title, description, url, popularity, tags } = req.body
    try{
      const {data} = await axiosSerie({
        method:'POST',
        url:'/series',
        data: {
          title, description, url, popularity, tags
        }
      })
      redis.del("series")
      redis.del("entertainment")
      redis.set(`series${data._id}`, JSON.stringify(data), 'EX', 500)
      res.status(200).json(data)
    }
    catch({response}){
      next({
        status: response.status,
        message: response.statusText
      })
    }
  }

  static async update(req, res, next){
    const { title, description, url, popularity, tags } = req.body
    const { id } = req.params
    try{
      const {data} = await axiosSerie({
        method: 'PUT',
        url: `/series/${id}`,
        data: { title, description, url, popularity, tags }
      })
      redis.del("series")
      redis.del("entertainment")
      redis.set(`series${data._id}`, JSON.stringify(data), 'EX', 500)
      res.status(200).json(data)
    }
    catch({response}){
      next({
        status: response.status,
        message: response.statusText
      })
    }
  }

  static async delete(req, res, next){
    const {id} = req.params
    try{
      const {data} = await axiosSerie({
        method: 'DELETE',
        url: `/series/${id}`
      })
      redis.del("series")
      redis.del("entertainment")
      redis.del(`series${data._id}`)
      res.status(200).json(data)
    }
    catch({response}){
      next({
        status: response.status,
        message: response.statusText
      })
    }
  }
}

module.exports = SeriesController