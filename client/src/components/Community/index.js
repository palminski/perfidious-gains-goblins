import React, { useState } from'react';
import {Form, FormGroup, Input, Label, Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { QUERY_ME } from '../../utils/queries'

export function Community(props) {
  // set formState to clear form on submit
  // declare mutation here
  const [formState, setFormState] = useState({postText: '', postTitle: ''})
  const [modal, setModal] = useState(false);
  const [addPost] = useMutation(ADD_POST);
  const { loading, data } = useQuery(QUERY_ME);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addPost({
        variables: { 
          postTitle: formState.postTitle, 
          postText: formState.postText 
        },
      });
      const post = mutationResponse.data.addPost.postTitle.postText;
      Auth.getToken(post);
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  }



  // handleFormSubmit to create the post

  // handleChange to clear form on submit

  const toggle = () => setModal(!modal);
    return (
      <Container>
        <Row>
        <Col className='m-5'>
          <h2>Blogs Will Go Here</h2>
        </Col>
        </Row>
        <Row>
          <Col md={{ offset: 3, size: 6 }} sm="12">
            <Button color='dark' onClick={toggle}>
              Create Post
            </Button>
            <Modal isOpen={modal} toggle={toggle} sm-fullscreen>
            <ModalHeader className='modalHeader' toggle={toggle}>Create a post!</ModalHeader>
            <ModalBody className='modalBody'>
            <Form onSubmit={ handleFormSubmit } className='m-5 p-5'>
              <FormGroup>
                <Label for="postTitle">
                  Post Title
                </Label>
                <Input
                  id="postTitle"
                  name="postTitle"
                  placeholder="Post Title"
                  type="input"
                  onChange={ handleChange }
                />
              </FormGroup>
              <FormGroup>
                <Label for="postText">Post</Label>
                <Input id="postText" name="postText" type="textarea" onChange={ handleChange }/>
              </FormGroup>
              <Button color='primary'>Submit</Button>
            </Form>
            </ModalBody>
            </Modal> 
          </Col>
        </Row>
      </Container>
    );
}