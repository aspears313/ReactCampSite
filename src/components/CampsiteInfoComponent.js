import React, {useState } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';



function CommentForm() {

    const minLength = len => val => val && (val.length >= len);
    const maxLength = len => val => !val || (val.length <= len);

    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);

    const handleSubmit = (event) => {
        console.log(`Rating: ${event.rating} Author: ${event.author} Comment: ${event.text}`);
        alert(`Rating: ${event.rating} Author: ${event.author} Comment: ${event.text}`);  
    }

    return (
        <React.Fragment>
            <Button outline onClick={toggleModal} >
                <i className="fa fa-pencil fa-lg" />Submit Comment
            </Button>
            
            <Modal isOpen={modal} toggle={toggleModal} className="commentModal">
                    <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Label>Rating</Label>
                                <Control.select className="form-control" model=".rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label>Your Name</Label>
                                <Control.text
                                    className="form-control"
                                    model=".author"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                                />
                            </div>
                            <div className="form-group">
                                <Label>Comment</Label>
                                <Control.textarea className="form-control" model=".text">
        
                                </Control.textarea>
                            </div>
                            <Button type="submit" color="primary">
                                Submit
                                </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </React.Fragment>
    );
  }

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments) {
            return (
                <React.Fragment>
                    <div className="col-md-5 m-1">
                        <h4>Comments</h4>
                        {comments.map(comment => {
                                return (
                                    <div key={comment.id}>
                                        <p>
                                            {comment.text}<br />
                                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                        </p>
                                    </div>
                                ); 
                            }) 
                        }
                        <CommentForm />
                    </div>
                </React.Fragment>
            );
        }
    return <div />
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                    
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;