import React, { Component } from 'react';
import { Row, 
         Col, 
         Card, 
         CardImg, 
         CardBody, 
         CardTitle, 
         CardText, 
         Button 
        } from 'reactstrap';
import {
         FaTrashO,
         FaPencil
        } from 'react-icons/lib/fa'
import swal from 'sweetalert2';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import { articlesRef } from '../firebase/firebase';
import _ from 'lodash';

class Getposts extends Component {
    constructor() {
        super();
        this.state = {
            data: ""
        }
        this.getAllArticles = this.getAllArticles.bind(this);
       // this.removeArticle = this.removeArticle.bind(this);
    }
    componentDidMount() {
        this.getAllArticles();
    }
    removeArticle(dateTime){
        articlesRef.orderByChild('dateTime').equalTo(dateTime).once('value', snap => {
            snap.forEach(articleSnapshot => {
                swal({
                    title: 'Êtes-vous sûr?',
                    text: "Vous ne serez pas en mesure de rétablir cette opération!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, cette article!',
                    cancelButtonText: 'Non, annuler!',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: true,
                    reverseButtons: true
                  }).then((result) => {
                    if (result.value) {
                        //console.log('article snap key : ',articleSnapshot.key)
                       const articleKey = articleSnapshot.key;
                        articlesRef
                        .child(articleKey)
                        .remove()
                        .then(() =>{
                           this.getAllArticles();
                            swal('Succée!',
                                'Article supprimer avec succée',
                                'success');
                        })
                        .catch( error => {
                            var errorMessage = error.message;
                            swal('Erreur',
                                 errorMessage,
                                 'error');
                        });
                    } else if (
                      // Read more about handling dismissals
                      result.dismiss === swal.DismissReason.cancel
                    ) {
                      swal(
                        'Annuler',
                        "Ouf, c'était moins une ! ",
                        'info'
                      )
                    }
                  })
               
            })
        })
    }
    getAllArticles() {
        let articlesArray = [];
        articlesRef.on('value', data => {
            data.forEach(articleSnapshot => {
                const articles = articleSnapshot.val(); 
                //console.log('imgs url : ',Object.keys(articles.imgs)[0]);  
            /* _.map(articles.imgs, article => {
                    console.log('imgs url : ',article.downloadURL);
                }) */
                articlesArray.push(articles);
            })
            this.setState({
                data: articlesArray
            })
        })
    };
    
    render() {
        const allArticles = this.state.data;
        const styledImg = {
                            height: "300px",
                            objectFit: "cover"
                            };
        return (
            <Page title="Articles" breadcrumbs={[{ name: 'articles', active: true }]}>
                <Row>
                    {
                        
                        _.map(allArticles, (datas,key) => {
                       return(
                           (datas.imgs)?
                           <Col md={6} sm={6} xs={12} className="mb-3" key={key}>
                           <Card>
                               <CardImg top src={datas.imgs[Object.keys(datas.imgs)[0]].downloadURL} style={styledImg} />
                               <CardBody>
                                   <CardTitle>{datas.titre}</CardTitle>
                                   <CardText>
                                       {datas.description}
                                   </CardText>
                                   
                                   <Link
                                        className="btn btn-outline-info"
                                        to={`/${datas.dateTime}/edit`}
                                        >
                                        <FaPencil />
                                    </Link>
                                   {' '}
                                   <Button outline 
                                           color="danger" 
                                           onClick={() => this.removeArticle(datas.dateTime)}>
                                           <FaTrashO />
                                    </Button>
                               </CardBody>
                           </Card>
                       </Col>
                       :
                       <Col md={6} sm={6} xs={12} className="mb-3" key={key}>
                       <Card>
                           <CardBody>
                               <CardTitle>{datas.titre}</CardTitle>
                               <CardText>
                                   {datas.description}
                               </CardText>
                               <Link
                                className="btn btn-outline-info"
                                  to={`/${datas.dateTime}/edit`}
                                 >
                                 <FaPencil />
                               </Link>
                               {' '}
                               <Button outline 
                                       color="danger" 
                                       onClick={() => this.removeArticle(datas.dateTime)} >
                                       <FaTrashO />
                                </Button>
                           </CardBody>
                       </Card>
                   </Col>
                    
                       )
                    })}

                </Row>
            </Page>
        )
    }
}
export default Getposts;