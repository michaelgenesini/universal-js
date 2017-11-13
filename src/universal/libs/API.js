require('isomorphic-fetch')
import beers from './MOCKS/beers'

const fetchData = async () => await Promise.resolve({
  data: beers
})

export default fetchData