const { axiosMovie, axiosSerie } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

class EntertainmentController{
  static async findAll(req, res, next){
    let redisEntertainment = await redis.get('entertainment')
    if( redisEntertainment ){
      res.status(200).json(JSON.parse(redisEntertainment))
    } else {
      try{
        const movie = await axiosMovie({
          method: 'GET',
          url: '/movie'
        })
        const serie = await axiosSerie({
          method: 'GET',
          url: '/series'
        })
        let data = {
          movies: movie.data,
          series: serie.data
        }
        redis.set("entertainment", JSON.stringify(data), "EX", 500)
        res.status(200).json(data)
      }
      catch{
        next()
      }
    }

  }
}

module.exports = EntertainmentController