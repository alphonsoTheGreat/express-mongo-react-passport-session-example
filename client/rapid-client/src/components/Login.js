
import React, { Component } from 'react';

import { Button, FormControl  } from 'react-bootstrap'
import './Login_style.css'

class Login extends Component {

  constructor(props){
    super(props)
    this.handleLogIn = this.handleLogIn.bind(this)
    this.state = {
      handleLogIn: props.loginFoo,
      email: '',
      pass: ''
    }
  }

  handleLogIn(){
    let user = {
      email: this.state.email,
      password:this.state.pass 
    }
    this.state.handleLogIn(user)
  }

  handleEmailChange = (e) => {this.state.email = e.target.value}
  handlePasswordChange = (e) => {this.state.pass = e.target.value}



  render() {
    return (
      <div className="login_container"> 
        <div className="login_div" >
        <h2 className='login_h2'>Please Login</h2>
          <FormControl className='login_input' type="text" placeholder="Email" onChange={this.handleEmailChange} />
          <FormControl className='login_input' type="password" placeholder="Password" onChange={this.handlePasswordChange} />
          <Button className='login_btn' bsStyle="primary" bsSize="large" onClick={()=>this.handleLogIn()} block>Login</Button>
        </div>
       
      </div>
    );
  }
}

export default Login;
