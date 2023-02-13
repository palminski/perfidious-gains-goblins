import React, { useState } from'react';
import {Form, FormGroup, Input, Label, Button, Container, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { ADD_COMMENT } from '../../utils/mutations';
import { DELETE_POST } from '../../utils/mutations';
import { DELETE_COMMENT } from '../../utils/mutations'
import Auth from '../../utils/auth';
import { QUERY_POSTS } from '../../utils/queries'

export function Community(props) {
  const [formState, setFormState] = useState({postText: '', postTitle: ''})
  const [commentState, setCommentState] = useState({commentText: ''})
  const [modal, setModal] = useState(false);
  const [addPost] = useMutation(ADD_POST);
  const [addComment] = useMutation(ADD_COMMENT);
  const { loading, data, refetch } = useQuery(QUERY_POSTS);
  const postData = (data?.posts);
  const [deletePost] = useMutation(DELETE_POST);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  
 

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
      refetch();
      setModal(false);
    } catch (e) {
      console.log(e)
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };


  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setCommentState({...commentState, [name]: value });
  };


  const handleDeletePost = async (postId) => {
    console.log(postId)
    try {
       await deletePost({
        variables: { 
          postId: postId
        }})
        refetch();
    } catch (error) {
      console.log(error)
    }
  };


  const handleCommentSubmit = async (e,postId) => {
    e.preventDefault();
    console.log(e );
    console.log(postId);
    try {
      const mutationResponse = await addComment({
        variables: { 
                  postId: postId,
                  commentText: commentState.commentText
                }
      });
      const comment = mutationResponse.data.addComment.createdBy.commentText;
      Auth.getToken(comment);
      setCommentState({commentText: ''});
      refetch();
    } catch (error) {
      console.log(error);
    }
  };



  const handleCommentDelete = async (postId, commentId) => {
    try {
      await deleteComment({
       variables: { 
        postId: postId,
         commentId: commentId
       }})
       refetch();
   } catch (error) {
     console.log(error)
   }
  };

const checkId = (post) => {
  const profileId = Auth.getProfile()
  return profileId.data.username === post.createdBy
}


  
  const toggle = () => setModal(!modal);

    return (
      <Container className='community-container'>
        <Row>
          <Col md={{ offset: 3, size: 6 }} sm="12">
            <Button color='secondary' onClick={toggle}>
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
        
        <Col className='m-5'>
          {postData && postData.map((post, index) => {
            return <div key = {index} className='grow-in'>
              
              
              <div className='post'>
                <h1>{post.postTitle}<span className='username-post'>//{post.createdBy}</span>
                </h1>   
                <div className='post-body'>
                <h3>{post.postText}</h3>
                </div>
                {/* {checkId(post) ? <Button color='danger' size='sm' onClick={() => handleDeletePost(post._id)}>Delete Post</Button> : ''} */}
              </div>

              <ul className='comments'>
              {post.comments.map((comments, i) => (
                
                  <li key = {i}> {comments.createdBy} said: {comments.commentText}
                  <div className=''>
                  {/* {Auth.getProfile().data.username === comments.createdBy ? <Button color='danger' size='sm' onClick={() => handleCommentDelete(post._id, comments._id)}>Delete Comment</Button> : ''} */}
                  </div>
                  </li> 
              ))}
              </ul>
              
              
               <form onSubmit={(e) => handleCommentSubmit(e,post._id)} className='pb-5' id='submitCommentText'>
                    
                      <div className='comment-form' id='addCommentForm'>
                        <input  id="commentText"
                        name="commentText"
                        placeholder="Add a Comment"
                        type="input"
                        onChange={handleCommentChange}
                        value={commentState.commentText}
                        />
                        <br></br>
                        <button className='comment-button' >Submit</button>
                        </div>
                        
                    </form>
              
              
              
            </div>
          })}
        </Col>
        
        
      </Container>
    );
}