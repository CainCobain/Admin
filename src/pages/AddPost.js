import React from 'react';
import Page from 'components/Page';
import _ from 'lodash';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input
  } from 'reactstrap';
import swal from 'sweetalert2';
import { articlesRef, storageRef, db } from '../firebase/firebase';

class AddPost extends React.Component{
    // Added as a component property
    defaultState = { titre: "", description: "", imgs: "" };
    countUploaded = 0;
    constructor(props){
        super(props);
         
        //The initialization of the properties is not necessary
        this.state = this.defaultState;
        this.newArticleHandler = this.newArticleHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeFileHandler = this.changeFileHandler.bind(this);  
    }


    newArticleHandler(){
        const now  = new Date();
        const article = {
                            titre : this.state.titre ,
                            description : this.state.description,
                            dateTime : now.toString()
                        };
       const filesUplod = this.state.imgs;
       let articleKey = null;
       articlesRef.push(article).then(data => {
            articleKey = data.key
            _.map(filesUplod,(file,key) => {
                // storageRef.ref("Maltem/"+today).put(file);
                this.uploadImageAsPromise(file,articleKey);  
            });
            swal('Succée','Article ajouter avec succée','success').then(()=>{
                 this.resetStateWithUpdates();
            }
            );
        });

       
       /* const keys = Object.keys(article);
       let test = {};
       keys.forEach(function(e){
         test={e : " "};
       })
       const State = this.state; */
      
    }

    changeHandler(e){
        this.setState({
           [e.target.name] : e.target.value
        })
    }

    changeFileHandler(e){
        const filesUplod = e.target.files;
        this.setState({
            imgs : filesUplod
        })
    }

    //Handle waiting to upload each file using promise
     uploadImageAsPromise (imageFile,articleKey) {
        return new Promise(function (resolve, reject) {
            const today = new Date();
           
            //Upload file
            var task = storageRef.ref("Maltem/"+imageFile.name+" "+today).put(imageFile);
    
            //Update progress bar
            task.on('state_changed',
                function progress(snapshot){
                    var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    console.log("Uploding ",percentage,"%");
                },
                function error(err){
    
                },
                function complete(){
              
                    var downloadURL = task.snapshot.downloadURL;
                         db.ref('articles/'+articleKey+'/imgs').push({
                              downloadURL
                         })
                        
                }
            );
        });
    }

    resetStateWithUpdates() {
        // Rest operators ensure a new object with merged properties and values.
        // Requires the "transform-object-rest-spread" Babel plugin
        this.setState({ ...this.defaultState });
        
      }
      
    render(){

        return(
            <Page title="Ajouter Article" breadcrumbs={[{ name: 'Ajouter', active: true }]}>
              <Row>

                <Col xl={12} lg={12} md={12}>
                <Card>
                    <CardHeader>Article form</CardHeader>
                    <CardBody>
                    <Form>
                        <FormGroup>
                        <Label for="exampleEmail">Titre</Label>
                        <Input
                            type="text"
                            name="titre"
                            value={this.state.titre}
                            onChange={this.changeHandler}
                            placeholder="Titre Article"
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleEmail">Description</Label>
                        <Input
                            type="textarea"
                            name="description"
                            value={this.state.description}                            
                            onChange={this.changeHandler}
                            placeholder="Description Article"
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input 
                            type="file" 
                            name="imgs" 
                            multiple
                            onChange={this.changeFileHandler}
                            />
                        {/* <FormText color="muted">
                            This is some placeholder block-level help text for the above
                            input. It's a bit lighter and easily wraps to a new line.
                        </FormText> */}
                        </FormGroup>
                       {/*  <FormGroup check>
                        <Label check>
                            <Input type="checkbox" /> Check me out
                        </Label>
                        </FormGroup> */}
                    </Form>
                     <Button  color="secondary" onClick={this.newArticleHandler}>Ajouter</Button>
                    </CardBody>
                   
                </Card>
                
                </Col>
    
              </Row>
            </Page>
        )
    }
}

export default AddPost;