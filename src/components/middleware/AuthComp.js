import React, { Component } from 'react';
import { fbAuth } from '../../firebase/firebase';
import { withRouter } from 'react-router-dom';

class AuthComp extends Component {
    componentDidMount(){

        fbAuth.onAuthStateChanged(userAuth => {
            if(!userAuth)
                 this.props.history.push('/signin');
            })
        }
    componentDidUpdate(){
        fbAuth.onAuthStateChanged(userAuth => {
            if(!userAuth)
                 this.props.history.push('/signin');
            })
        }

    render(){
        const user = fbAuth.currentUser;
        const { children } = this.props;
        return  ( user )? <div>{children}</div>: null 
    }
}

export default withRouter(AuthComp);