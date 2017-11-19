import React, { Component } from 'react'
import { API, fetchData } from '../../../libs/API'

export default class Home extends Component {

  static async fetchData() {
    console.log('fetchData called: ', API.beers)
    return await fetchData(API.beers)
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
      let self = this
      this.constructor.fetchData().then(data => {
        self.hasStore = true
        self.setState({
          beers: data
        })
      })
      .catch(console.log)
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