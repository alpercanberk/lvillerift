import React, { Component } from 'react';
import '../App.css';
import { Button, Container } from 'react-bootstrap';

export default class Mission extends Component {
  render(){
    return(
      <Container>
      <h1 class="mission-title">Our Mission</h1>
      <p>
        To increase useful student feedback on dining hall meals to improve mealtime attendance and equip students with the fuel necessary for classroom learning.
      </p>
      <p>
        To foster a stronger sense of community from daily meals together
      </p>
      <p>
        To reduce food waste
      </p>
      <p>
      </p>
      </Container>
    )
  }
}
