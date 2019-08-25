import React, { Component } from 'react';
import '../App.css';
import Rating from './Rating.js'

import { Button, Jumbotron, Navbar, Nav, FormControl, NavDropdown, Form, Card, Container, ListGroup } from 'react-bootstrap';


var meal_types = ['breakfast', 'lunch', 'dinner']

export default class FullRating extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
      {meal_types.map((meal_type) => {
        return(
          <Card style={{"marginLeft":30, "marginRight":30, "marginTop":30}}>
          <Card.Header className="menu-title"><h4 style={{"margin":15}}>{this.props.menu[meal_type].title}</h4></Card.Header>
          <ListGroup variant="flush">
            {this.props.menu[meal_type].items.map((item) => {
                return(
                <ListGroup.Item style={{"paddingTop":20}}>
                <div><h5 class="food_title">{item}</h5>
                <Rating
                title={this.props.menu[meal_type].title}
                meal_length={this.props.menu[meal_type].items.length}
                name={this.props.menu[meal_type].name}
                type={this.props.menu[meal_type].type}
                submitDetector={this.state.submit_detector}
                collect_function={this.collectInputData}
                name={item}
                user={window.user_email}
                is_complete={this.state.completed[this.mealToIndex(this.props.menu[meal_type].type)]}
                />
                </div>
                </ListGroup.Item>)
            })}
          </ListGroup>
          {this.props.renderSubmitRating(this.props.menu[meal_type].type)}
          </Card>
        )
      })}
      </div>
    )
  }
}
