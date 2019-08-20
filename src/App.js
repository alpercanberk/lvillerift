import React, {Component}  from 'react';
import Rating from './components/Rating.js'
import { Button, Jumbotron, Navbar, Nav, FormControl, NavDropdown, Form, Card, Container, ListGroup } from 'react-bootstrap';
import './App.css';
import axios from "axios"

var uploadURL = window.CURRENT_HOST + "complete_meal";

var menu=[
  {
    "date":"August 19",
    "type":"breakfast",
    "title":"Breakfast - August 19",
    "items":["Belgium Waffles", "Homefried Potatoes", "Sausage Links", "Assorted Pastries"]
  },
  {
    "date":"August 19",
    "type":"lunch",
    "title":"Lunch - August 19",
    "items":["French Onion Soup", "Mako Shark Tacos", "Kale Sautee", "Ice Cream"]
  },
  {
    "date":"August 19",
    "type":"dinner",
    "title":"Dinner - August 19",
    "items":["Flank Steak", "Mashed Potatoes", "Seasonal Vegetables", "Ice Cream"]
  }
]

class App extends Component{

  constructor(props){
    super(props)
    this.state={
      ratings_input:[],
      submit_detector:0,
    }
    this.submitRating = this.submitRating.bind(this)
    this.collectInputData = this.collectInputData.bind(this)
  }

  renderSignInButton(){
    if(window.user_email){
      return(
        <Navbar.Text>
          <a href="/logout"><Button variant="outline" id="sign-in-button">Sign Out</Button></a>
        </Navbar.Text>
      )}
      else{
        return(
          <Navbar.Text>
            <a href="/auth/google"><Button variant="outline" id="sign-in-button">Sign In</Button></a>
          </Navbar.Text>
        )
      }
    }

  renderGreeting(){
    if(window.user_name){
      return(
        <h1 className="greeting">Welcome {window.user_name}, what do you think about Irwin today?</h1>
      )
    }
    else{
      return(
        <p className="sign-in-prompt">You must sign in with an Lville account in order to be able to rate the food.</p>
      )
    }
  }

  renderSubmitRating(type){
    var button = ""
    if(window.user_email){
      button = <Button onClick={()=>{this.submitRating(type)}} style={{"backgroundColor":"#BA1A26", "color":"white", "borderColor":"#BA1A26", "height":40, "width":200, "margin":"5px auto"}}><h5>Submit Rating</h5></Button>
    }
    return button
  }

  submitRating(type){
    console.log(type)
    var new_submit = this.state.submit_detector
    var type_constant = 0
    if(type=="breakfast"){
      type_constant = 1
    }
    else if(type=="lunch"){
      type_constant = 2
    }
    else if(type=="dinner"){
      type_constant = 3
    }
    new_submit = new_submit + type_constant
    this.setState({submit_detector:new_submit});
    this.setState({ratings_input:[]});

    axios
          .post(uploadURL, {
            user: window.user_email,
            complete_type:type
          })
          .then((response) => {
            console.log(response)
            alert(response.data);
          });
  }

  collectInputData(input){
    var inputs_processing = this.state.ratings_input
    inputs_processing.push(input)
    this.setState({ratings_input:inputs_processing})
  }


  render(){
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <Navbar bg="light" expand="lg" color="red">
          <Navbar.Brand href="#home"><h3>Lawrenceville RIFT</h3></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Mission</Nav.Link>
              <NavDropdown title="Past Ratings" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Work</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">In</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Progress</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Check later</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {this.renderSignInButton()}
          </Navbar.Collapse>
        </Navbar>
        {this.renderGreeting()}
        {menu.map((meal) => {
          return(
            <Card style={{"marginLeft":30, "marginRight":30, "marginTop":30}}>
            <Card.Header style={{"backgroundColor":"#BA1A26", "color":"white"}}><h3>{meal.title}</h3></Card.Header>
            <ListGroup variant="flush">
              {meal.items.map((item) => {
                  return(
                  <ListGroup.Item><div><h4 class="food_title">{item}</h4>
                  <Rating title={meal.title} name={meal.name} type={meal.type} submitDetector={this.state.submit_detector} collect_function={this.collectInputData} name={item} user={window.user_email}/></div>
                  </ListGroup.Item>)
              })}
            </ListGroup>
            {this.renderSubmitRating(meal.type)}
            </Card>
          )
        })}
      </div>
    );
  }
}

export default App;
