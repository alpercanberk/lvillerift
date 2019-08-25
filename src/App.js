import React, {Component}  from 'react';
import Rating from './components/Rating.js'
import { Button, Jumbotron, Navbar, Nav, FormControl, NavDropdown, Form, Card, Container, ListGroup } from 'react-bootstrap';
import './App.css';
import axios from "axios"
import Logo from "./riftlogo1.png"

var uploadURL = window.CURRENT_HOST + "complete_meal";
var completedMealsURL = window.CURRENT_HOST + "completed_meals";
var rateURL = window.CURRENT_HOST + "receive_rating";

console.log(window.menu.replace(new RegExp('u&#39;', 'g'),'').replace(new RegExp('&#39;', 'g'),''));
var menu = JSON.parse(window.menu.replace(new RegExp('u&#39;', 'g'),'"').replace(new RegExp('&#39;', 'g'),'"'))
console.log("menu:")
console.log(menu)
var meal_types = ["breakfast", "lunch", "dinner"]
// var menu={
//   "breakfast":{
//     "date":"August 19",
//     "title":"Breakfast - August 19",
//     "items":["Belgium Waffles", "Homefried Potatoes", "Sausage Links", "Assorted Pastries"],
//     "type":"breakfast"
//   },
//   "lunch":{
//     "date":"August 19",
//     "title":"Lunch - August 19",
//     "items":["French Onion Soup", "Mako Shark Tacos", "Kale Sautee", "Ice Cream"],
//     "type":"breakfast"
//   },
//   "dinner":{
//     "date":"August 19",
//     "title":"Dinner - August 19",
//     "items":["Flank Steak", "Mashed Potatoes", "Seasonal Vegetables", "Ice Cream"],
//     "type":"breakfast"
//   }
// }

class App extends Component{

  constructor(props){
    super(props)
    this.state={
      ratings_input:[],
      submit_detector:0,
      ready_to_send:false,
      completed:[true,true,true]
    }
    this.submitRating = this.submitRating.bind(this)
    this.collectInputData = this.collectInputData.bind(this)
  }

  componentWillMount(){
    axios.get(completedMealsURL).then(
      (response)=>{
        var new_completed = this.state.completed
        if(!response.data.breakfast){
          new_completed[0]=false
        }
        if(!response.data.lunch){
          new_completed[1]=false
        }
        if(!response.data.dinner){
          new_completed[2]=false
        }
        this.setState({
          completed:new_completed
        })
      }
    )
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
    if(window.user_email && !this.state.completed[this.mealToIndex(type)]){
      button = <Button onClick={()=>{this.submitRating(type)}} style={{"backgroundColor":"#BA1A26", "color":"white", "borderColor":"#BA1A26", "height":40, "width":200, "margin":"5px auto"}}><h5>Submit Rating</h5></Button>
    }
    else if(window.user_email && this.state.completed[this.mealToIndex(type)]){
      button = <p className="already-rated">You have already rated this meal today.</p>
    }
    return button
  }

  mealToIndex(type){
    if(type == "breakfast"){
      return 0
    }
    if(type == "lunch"){
      return 1
    }
    if(type == "dinner"){
      return 2
    }
  }

  submitRating(type){

    this.setState({ratings_input:[]});
    this.setState({ready_to_send:false})

    if(!this.state.completed[this.mealToIndex(type)]){
      console.log("rating!")
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
    }
    else{
      console.log("Bruh you already rated this!")
    }

    axios
          .post(uploadURL, {
            user: window.user_email,
            complete_type:type
          })
          .then((response) => {
            console.log(response)
            alert(response.data);
            if(response.data = "Rating successful!"){
              console.log("rating successful! - confirmed")
              var new_completed = this.state.completed
              new_completed[this.mealToIndex(type)] = true
              this.setState({completed: new_completed})
            }
          });
  }


  collectInputData(input, meal_length){
    var inputs_processing = this.state.ratings_input
    inputs_processing.push(input)
    this.setState({ratings_input:inputs_processing})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.ratings_input != this.state.ratings_input){
      if(this.state.ratings_input.length > 0){
        console.log("ready! make request!!");
        axios.post(rateURL, {
          user_name: window.user_name,
          user_email: window.user_email,
          ratings: this.state.ratings_input
        })
      }
      else{
        console.log("nope, you can't rate this anymore")
      }
    }
  }

  readyToSend(){
    this.setState({ready_to_send:true})
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
          <Navbar.Brand href="#home"><img src={Logo} alt="website_logo" class="logo"/></Navbar.Brand>
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
        {meal_types.map((meal_type) => {
          console.log(menu)
          console.log(meal_type)
          return(
            <Card style={{"marginLeft":30, "marginRight":30, "marginTop":30}}>
            <Card.Header className="menu-title"><h4 style={{"margin":15}}>{menu[meal_type].title}</h4></Card.Header>
            <ListGroup variant="flush">
              {menu[meal_type].items.map((item) => {
                  return(
                  <ListGroup.Item style={{"paddingTop":20}}>
                  <div><h5 class="food_title">{item}</h5>
                  <Rating
                  title={menu[meal_type].title}
                  meal_length={menu[meal_type].items.length}
                  name={menu[meal_type].name}
                  type={menu[meal_type].type}
                  submitDetector={this.state.submit_detector}
                  collect_function={this.collectInputData}
                  name={item}
                  user={window.user_email}
                  is_complete={this.state.completed[this.mealToIndex(menu[meal_type].type)]}
                  />
                  </div>
                  </ListGroup.Item>)
              })}
            </ListGroup>
            {this.renderSubmitRating(menu[meal_type].type)}
            </Card>
          )
        })}
      </div>
    );
  }
}

export default App;
