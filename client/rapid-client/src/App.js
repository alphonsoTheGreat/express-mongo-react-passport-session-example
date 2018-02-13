import './App.css';
import Home from './components/Home'
import Login from './components/Login'

import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      page: null,
      user: {
        thumb: {x:0,y:0},
        firstName: '',
        lastName: '',
        userEmail: '',
        userId: '' 
      }
    }
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleThumbnailDrop = this.handleThumbnailDrop.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  // handle logout button clicked on the Home component
  handleLogout = () => {
    fetch('/users/logout',{ 
      method: "GET", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache' },
      credentials: 'same-origin' 
    })
    .then(toParse => {
      this.setState({page:'login'})
    })
    .catch((error) => {
      console.error(error)
    });
  }

  // handle login button clicked on the Login component
  handleLogIn = (user) => {
    fetch('/users/login?email='+user.email+'&password='+user.password, {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    })
    .then(toParse => {
      if(toParse.status === 200)
        return toParse.json()
      else
        return false
    })
    .then((data) => {
      if(data.user){
        this.setState({page:'home',user:data.user})
      }
      else
        alert('Email or Password are incorrect')
    })
    .catch((error) => {
        console.error(error);
    });
  }

  // handle Thumbnail Drop  on the Thumbnail component
  handleThumbnailDrop = (e) => {
    // calculate the exact position
    const x = e.layerX - e.offsetX;
    const y = e.layerY - e.offsetY;

    // assign it to a new Object
    let position = Object.assign({},{x},{y})

    // post to the server to save on DB
    fetch('/users/thumb', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify(position)
    })
    .catch((error) => {
        console.error(error);
    });
  }

  componentDidMount = () => {
    fetch('/users/check',{ 
      method: "GET", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache' },
      credentials: 'same-origin' 
    })
    .then(toParse => {
      if(toParse.status === 200)
        return toParse.json()
      else
        return false
    })
    .then((res) => {
      if (!res)
        this.setState({page:'login'})     
      else
        this.setState({
          page:'home',
          user: res.user
        })
    })
    .catch((error) => {
      console.error(error)
    });
  }

  render = () => { 
        return (
        <div className="App">
          {this.state.page === 'home'? <Home user={this.state.user} handleThumbDrop={this.handleThumbnailDrop} handleLogout = {this.handleLogout}/> : < Login loginFoo={this.handleLogIn}/> }
        </div>
      );    
  }
}

export default App;
