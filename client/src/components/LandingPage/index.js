import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../style.css";
import "../Login";
import "../Signup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import globo from "../images/globo.png";


function LandingPage() {
    return (
      <section>
        <Container fluid className="LandingPage">
            <Container>
                <h1 className='LandingPageHeading'>
                    This is Globo Gains
                </h1>
                <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
                    <Col style={12} className="LandingPageCard">
                        <Card>
                            <Card.Img src={globo}>
                                
                            </Card.Img>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
      </section>
    );
  }