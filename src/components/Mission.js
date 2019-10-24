import React, { Component } from 'react';
import '../App.css';
import { Button, Container } from 'react-bootstrap';

import MissionImage from '../images/mission.jpg'

export default class Mission extends Component {
  render(){
    return(
      <Container>
      <h1 class="mission-title">Our Mission</h1>
      <ul>
        <li class="mission-element">
          To increase useful student feedback on dining hall meals to improve mealtime attendance and equip students with the fuel necessary for classroom learning
        </li>
        <li class="mission-element">
          To foster a stronger sense of community from daily meals together
        </li>
        <li class="mission-element">
          To protect the environment by reducing food waste in dining halls
        </li>
      </ul>
      <img src={MissionImage} class="mission-image"></img>
      </Container>
    )
  }
}
