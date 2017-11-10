require('isomorphic-fetch')

// const fetchData = async () => await (await fetch(`https://api.punkapi.com/v2/beers?per_page=1`)).json()

// export default fetchData


const fetchData = async () => await new Promise(resolve => resolve({
  data: [
    {
      id: 1,
      name: 'birra1'
    },
    {
      id: 2,
      name: 'birra2'
    }
  ]
}))

export default fetchData