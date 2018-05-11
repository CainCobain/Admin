import React, { Component } from 'react'; 
import Page from 'components/Page';
import {
    Card,
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
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class Updatepost extends Component {

      // Added as a component property
      defaultState = { titre: "", description: "", imgs: "" };
      countUploaded = 0;
      constructor(props){
          super(props);
           
          //The initialization of the properties is not necessary
          this.state = this.defaultState;
          this.updateArticleHandler = this.updateArticleHandler.bind(this);
          this.changeHandler = this.changeHandler.bind(this);
          this.changeFileHandler = this.changeFileHandler.bind(this);  

        const dateTime =  _.split(this.props.location.pathname, '/', 2); 
        articlesRef.orderByChild('dateTime').equalTo(dateTime[1]).once('value', snap => {
            snap.forEach(articleSnapshot => {
                const articleUpdate = articleSnapshot.val();
                console.log('key article ',articleSnapshot.key)
                this.state ={
                    titre : articleUpdate.titre,
                    description : articleUpdate.description,
                    key : articleSnapshot.key
                }
            })
        })
      }

      updateArticleHandler(){
        const article = {
                            titre : this.state.titre ,
                            description : this.state.description
                        };
       //const filesUplod = this.state.imgs;
       let articleKey = this.state.key;
      /*  articlesRef.push(article).then(data => {
            articleKey = data.key
            _.map(filesUplod,(file,key) => {
                // storageRef.ref("Maltem/"+today).put(file);
                this.uploadImageAsPromise(file,articleKey);  
            });
            swal('Succée','Article ajouter avec succée','success').then(()=>{
            
            }
            );
        });
        console.log('key state ',this.state.key) */
       db
         .ref('articles/'+articleKey)
         .update(article)
         .then(()=>{swal('Succée','Article modifier avec succée','success') })
         .catch( error => { 
             var errorMessage = error.message;
             swal('Erreur',
                 errorMessage,
                 'error');});
       
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

    render(){
        return (
            <Page title="Modifier Article" breadcrumbs={[{ name: 'Modifier', active: true }]} >
                <Row>

                <Col xl={12} lg={12} md={12}>
                <Card>
                    {/* <CardHeader>Article form</CardHeader> */}
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
                     {/*    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input 
                            type="file" 
                            name="imgs" 
                            multiple
                            onChange={this.changeFileHandler}
                            />
                        </FormGroup> */}
                    </Form>
                     <Button  color="secondary" onClick={this.updateArticleHandler}>Modifier</Button>
                    </CardBody>
                </Card>
                </Col>
              </Row>
            </Page>
        )
    }
}

export default withRouter(Updatepost);