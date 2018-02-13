import React, { Component } from 'react';
import './Home_style.css'
import { Button } from 'react-bootstrap'
import Thumbnail from './Thumbnail'
import axios from 'axios'

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: props.user.user,
      handleThumbDrop: props.handleThumbDrop,
      thumbnailPos: props.user.thumb,
      handleLogout: props.handleLogout
    }

    this.logoutBtnClick = this.logoutBtnClick.bind(this)
    this.changeThumbPos = this.changeThumbPos.bind(this)
  }

  logoutBtnClick = () => {
    this.state.handleLogout()
  }

  changeThumbPos = (e) => {
    this.state.handleThumbDrop(e)
  }

  render = () => {
    
    return (
      <div className="home_div">
          <Thumbnail user={this.state.user} thumbPos={this.state.thumbnailPos} handleDropParent={this.changeThumbPos}/>
          <Button  className='logout_btn' bsStyle="info" bsSize="large"  onClick={this.logoutBtnClick} >Logout</Button>
      </div>
    );
  }
}

export default Home;
