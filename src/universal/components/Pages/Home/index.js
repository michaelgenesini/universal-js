import React, { Component } from 'react'
import fetchData from '../../../libs/API'

export default class Home extends Component {

  static async fetchData() {
    console.log('fetchData called')
    return await fetchData()
  }

  constructor(props) {
    super(props)
    this.hasStore = !!props.store
    this.state = {
      beers: props.store ? props.store.data : []
    }
  }

  componentDidMount() {
    if(!this.hasStore) {
      console.log('CALL API FROM CLIENT')
      this.constructor.fetchData().then(data => {
        this.hasStore = true
        this.setState({
          beers: data.data
        })
      })
    }
  }

  render() {
    return <div>
      <h1>Home</h1>
      <ul>
      {
        this.state.beers.length && this.state.beers.map(beer => <li key={beer.id} >
          <strong>{ beer.name }</strong>
          <p>{beer.description}</p>
        </li>)
      }
      </ul>
    </div>
  }
}