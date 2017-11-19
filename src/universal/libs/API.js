require('isomorphic-fetch')
import beers from './MOCKS/beers'

// const fetchData = async () => await Promise.resolve({
//   data: beers
// })
const API = {
  beers: `https://api.punkapi.com/v2/beers`
}

const fetchData = async (url) => await( await fetch(url)).json()

export { API, fetchData }