import React, { Component } from 'react'
import fetchData from '../../../libs/API'

const callAPI = () => fetchData()

export default class Home extends Component {

  static async fetchData() {
    console.log('fetchData called')
    return await callAPI()
  }

  constructor(props) {
    super(props)
    this.state = {
      beers: props.store ? props.store.data : []
    }
  }

  componentDidMount() {
    if(!this.props.store) {
      console.log('CALLAPI')
      callAPI().then(data => {
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
      { this.state.beers.length && this.state.beers.map(beer => <li key={beer.id} >{ beer.name }</li>) }
      </ul>
    </div>
  }
}