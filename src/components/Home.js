import React, { Component } from 'react';
import '../App.css';
import { Button, Container, Carousel, Row, Col} from 'react-bootstrap';

import Food1 from "../food_images/001.png"
import Food2 from "../food_images/002.png"
import Food3 from "../food_images/003.png"


export default class Home extends Component {
  render(){
    return(
      <Container>
      <div class="home-title">Lawrenceville Food Surveys</div>
      <Carousel>
        <Carousel.Item>
          <img
            src={Food1}
            className="carousel-image"
            className="d-block w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Food2}
            className="carousel-image"
            className="d-block w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Food3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <h3 style={{"text-align":"center", "margin":30}}>Click on the forms tab in order to start giving feedback.</h3>
      <Row style={{"text-align":"center", "margin":30}}>
      <Col><h1 style={{"color":"#AD2525"}}>Announcements</h1>
      <p>Food surveys are launched!</p>
      </Col>
      <Col><h1 style={{"color":"#AD2525"}}>Quick Polls</h1>
      <p>Coming soon...</p>
      </Col>
      </Row>
      </Container>
    )
  }
}
