import React, { Component } from 'react';
import Draggable from 'react-draggable'
import { Panel, Image, Label } from 'react-bootstrap'
import './thumbnail.css'
import userImg from './download.jpg'


class Thumbnail extends Component {

    constructor(props){
        super(props)
        this.state = {
            thumb : props.user.thumb || props.thumbPos,
            user: props.user,
            handleDropParent: props.handleDropParent,
            handleLogout: props.handleLogout
        }
    }
    // handle mouseup event on draggable component
    handleStop = (e,d) => {
        this.state.handleDropParent(e)
    }
    
     
    render = () => {
        // fetch x & y pos of the thumbnail (if undefined then 0 as default)
        let x = this.state.thumb.x || 0;
        let y = this.state.thumb.y || 0;
        return (
            <Draggable
            axis="both"
            defaultPosition={{x , y}}
            onStop={this.handleStop}>
            <div className='draggable' >
                <Panel bsStyle="primary" className='home_panel' >
                    <Panel.Heading className='home_panel_heading'>{this.state.user.firstName} {this.state.user.lastName}</Panel.Heading>
                    <Panel.Body>
                        <Image src={userImg} circle /> 
                        <h3><Label bsStyle="info">{this.state.user.userEmail}</Label></h3>
                    </Panel.Body>
                </Panel>
                
            </div>
            </Draggable>
        );
    }
}

export default Thumbnail;
