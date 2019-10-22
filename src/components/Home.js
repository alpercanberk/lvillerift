import React, { Component } from 'react';
import '../App.css';
import { Button, Container, Carousel, Row, Col} from 'react-bootstrap';

import Food1 from "../food_images/001.png"
import Food2 from "../food_images/002.png"
import Food3 from "../food_images/003.png"

import People1 from "../food_images/people1.png"
import People2 from "../food_images/people2.png"
import People3 from "../food_images/people3.png"


import Poll from 'react-polls';

const pollQuestion = 'Favorite utensil?'
const pollAnswers = [
  { option: 'Fork', votes: 8 },
  { option: 'Knife', votes: 2 },
  { option: 'Spoon', votes: 1 }
]

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      pollAnswers: [...pollAnswers]
    }
  }

  handleVote(voteAnswer){
    const { pollAnswers } = this.state
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })
    this.setState({
      pollAnswers: newPollAnswers
    })
  }

  render(){
    return(
      <Container>
      <div class="home-title">Lawrenceville Food Surveys</div>
      <Row>
      <Col>
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
              src={People1}
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
              src={People2}
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
          <Carousel.Item>
            <img
              src={People3}
              className="carousel-image"
              className="d-block w-100"
            />
          </Carousel.Item>
        </Carousel>
        <h3 style={{"text-align":"center", "margin":50,}}>Click on the forms tab in order to start giving feedback.</h3>
      </Col>
      <Col>
        <div style={{"margin":30}}>
          <div class="home-box"><h1 class="home-sub" style={{"color":"#AD2525"}}>Announcements</h1>
          <ul>
            <li>Food surveys are launched!</li>
            <li>Smoothie bar coming soon.</li>
          </ul>
          </div>
          <div class="home-box" id="poll"><h1 class="home-sub" style={{"color":"black"}} >Quick Poll</h1>
            <Poll question={pollQuestion} answers={pollAnswers} onVote={this.handleVote} />
          </div>
          <div class="home-box"><h1 class="home-sub" style={{"color":"#AD2525"}}>Make A Suggestion</h1>
          <textarea>
          </textarea>
          <Button class="home-suggest-button">Submit</Button>
          </div>
        </div>
      </Col>
      </Row>
      </Container>
    )
  }
}
