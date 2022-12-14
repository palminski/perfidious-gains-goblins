import React, { useState } from'react';
import {Form, FormGroup, Input, Label, Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export function Community(props) {
  // set formState to clear form on submit
  // declare mutation here
  const [modal, setModal] = useState(false);

  // handleFormSubmit to create the post

  // handleChange to clear form on submit

  const toggle = () => setModal(!modal);
    return (
      <Container>
        <Row>
        <Col className='m-5'>
          <h2>Blogs Will Go Here</h2>
          {/* map blog posts here to display */}
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
            <Form className='m-5 p-5'>
              <FormGroup>
                <Label for="postTitle">
                  Post Title
                </Label>
                <Input
                  id="postTitle"
                  name="postTitle"
                  placeholder="Post Title"
                  type="input"
                />
              </FormGroup>
              <FormGroup>
                <Label for="postText">Post</Label>
                <Input id="postText" name="postText" type="textarea" />
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