import {Form, FormGroup, Input, Label, Button, Container, Row, Col} from 'reactstrap';

export function Community(props) {
    return (
      <Container>
        <Row>
        <Col className='m-5'>
          <h2>Blogs Will Go Here</h2>
        </Col>
        </Row>
        <Row>
          <Col className="bg-light border" md={{ offset: 3, size: 6 }} sm="12">
            <Form className="m-5 p-5">
              <FormGroup>
                <Label className="m-0" for="postTitle">
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
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
}