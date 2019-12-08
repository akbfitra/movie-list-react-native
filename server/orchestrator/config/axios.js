const axios = require('axios')

const axiosMovie = axios.create({
  baseURL: `http://localhost:3001`,
})

const axiosSerie = axios.create({
  baseURL: `http://localhost:3002`,
})

module.exports = {
  axiosMovie,
  axiosSerie
}
