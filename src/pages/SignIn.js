import React, { Component } from 'react';
import { Row, 
         Col, 
         Card, 
         CardImg, 
         CardBody, 
         Input, 
         Form, 
         Button
        } from 'reactstrap';
import swal from 'sweetalert2';
//import bg7Image from 'assets/img/bg/background_1920-7.png';
import { withRouter } from 'react-router-dom';
import { fbAuth } from '../firebase/firebase';
import bgSignin from 'assets/img/bg/bg_signin.jpg';
import poly from 'assets/img/bg/polygon.jpg'
import Logo from 'components/Logo';
import $ from 'jquery';

class SignIn extends Component {

    constructor(){
        super();
        this.state = {}
        this.login = this.login.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        const bgImg = {
                        "background": "url('"+bgSignin+"')",
                        "background-size": "cover"
                       };
        $(document).ready(()=>{
            $('.cr-sidebar__content ').hide();
            $('.cr-sidebar ').hide();
            $('.cr-header ').hide();
            $('.cr-app').css(bgImg);
        })
    }

    login(){
        const e = this.state.email;
        const p = this.state.pwd;
        fbAuth.signInWithEmailAndPassword(e, p)
        .then(()=>{
            this.props.history.push('/');
        })
        .catch(function(error) {
            // Handle Errors here.
           // var errorCode = error.code;
            var errorMessage = error.message;
            swal("Error", errorMessage ,"error");
          });
    }

        
    componentDidMount(){
        fbAuth.onAuthStateChanged(userAuth => {
            if(userAuth){
                this.props.history.push('/');
            }
        })
    }
    
    changeHandler(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {

        const cardStyling = {
            top: "30%",
            right: "30%", 
            background: "url('"+poly+"')",
            backgroundSize:"cover"
        }
        return (
                <Row>
                    <Col  md={{ size: 4, offset: 4 }} sm={{ size: 4, offset: 4 }} xs={{ size: 4, offset: 4 }} className="mb-3"  >
                        <Card style={cardStyling} >
                     {/*    style={{backgroundImage : `url(${bg7Image})`}} */}
                            <Logo
                            />
                            <CardImg top src="" />
                            <CardBody>
                                <Form>
                                    <Input
                                        type="email"
                                        name="email"
                                        className="mb-2"
                                        placeholder="Email..."
                                        bsSize="lg"
                                        onChange={this.changeHandler}
                                    />
                                    <Input
                                        type="password"
                                        name="pwd"
                                        className="mb-2"
                                        placeholder="Mot de passe..."
                                        bsSize="lg"
                                        onChange={this.changeHandler}
                                    />
                                    <Button outline color="danger" onClick={this.login}>
                                    Login
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
        )
    }
}

export default withRouter(SignIn);