import React, { Component } from 'react';
import '../App.css';
import { Button, Container } from 'react-bootstrap';

export default class Mission extends Component {
  render(){
    return(
      <Container>
      <h1 class="mission-title">Mission</h1>
      <p>
      At Lawrenceville School, unsatisfactory dining hall food is not only a problem of student life quality, but also an environmental problem. It is known that Irwin Dining Hall knows how to cook good food, demonstrated by a few of their menus, but the meals doesn’t always meet the student expectations. One big source of this problem is that the dining hall staff are not aware that certain foods are being thrown away and why. RIFT aims to resolve that problem, thereby providing a better life for students and saving the environment at the same time.
      </p>
      <p>
      RIFT is sleek, fast and convenient. Each meal rating takes less than a minute and the dining hall staff can see your feedback instantly. It is important that you try to give as much feedback as possible and that you make your rating a constructive criticism rather than talk about how the food is terrible.
      </p>
      <p>
      If you encounter any problems with the software or if you have suggestions about the website, feel free to contact Alper Canberk at acanberk21@lawrenceville.org
      </p>
      </Container>
    )
  }
}
