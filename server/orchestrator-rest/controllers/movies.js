const { axiosMovie } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

class MoviesController {
  static async findAll(req, res, next){
    let redisMovies = await redis.get('movies')
    if(redisMovies){
      res.status(200).json(JSON.parse(redisMovies))
    } else {
      try{
        const {data} = await axiosMovie({
          method: 'GET',
          url: '/movie'
        })
        redis.set("movies", JSON.stringify(data), "EX", 500)
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
      const {data} = await axiosMovie({
        method:'POST',
        url:'/movie',
        data: {
          title, description, url, popularity, tags
        }
      })
      redis.del("movies")
      redis.del("entertainment")
      redis.set(`movies${data._id}`, JSON.stringify(data), 'EX', 500)
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
      const {data} = await axiosMovie({
        method: 'PUT',
        url: `/movie/${id}`,
        data: { title, description, url, popularity, tags }
      })
      redis.del("movies")
      redis.del("entertainment")
      redis.set(`movies${data._id}`, JSON.stringify(data), 'EX', 500)
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
      const {data} = await axiosMovie({
        method: 'DELETE',
        url: `/movie/${id}`
      })
      redis.del("movies")
      redis.del("entertainment")
      redis.del(`movies${data._id}`)
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

module.exports = MoviesController