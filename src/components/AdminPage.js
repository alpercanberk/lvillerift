import React, { Component } from 'react';
import { Button, Jumbotron, Navbar, Nav, Row, Col, FormControl, NavDropdown, Form, Card, Container, Dropdown, Accordion, ListGroup} from 'react-bootstrap';
import axios from 'axios';


var ratings = [
  {
  "comment": "",
  "cooking_time": 3,
  "email": "acanberk21@lawrenceville.org",
  "meal":"Potato Bucks",
  "id": 4,
  "saltiness": 1,
  "spice": 3,
  "sweetness": 2,
  "time": 1570042507724
  },
  {
  "comment": "",
  "cooking_time": 3,
  "email": "acanberk21@lawrenceville.org",
  "meal":"Potato Bucks",
  "id": 5,
  "saltiness": 1,
  "spice": 3,
  "sweetness": 2,
  "time": 1570042537546
  },
  {
  "comment": "Hi, this is a comment",
  "cooking_time": 2,
  "email": "acanberk21@lawrenceville.org",
  "meal":"Potato Bucks",
  "id": 6,
  "saltiness": 2,
  "spice": 3,
  "sweetness": 1,
  "time": 1570042668813
  },
]
var key=["Not rated", "Too litte", "Just enough", "Too much"]

function numberToRating(number){
  return key[number]
}

//
if(window.ratings.length > 100){
  ratings = JSON.parse(window.ratings.replace(new RegExp('u&#39;', 'g'),'"').replace(new RegExp('&#39;', 'g'),'"'));
}

class AdminPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      search:"",
      category:"Meal",
      ratings:ratings
    }
    this.search = this.search.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
  }

  renderRating(rating){
    return(
      <Card class="rating-display" style={{"margin":10, "padding":10}}>
        <div>
        <span  style={{"float":"left"}} class="rating-display-title">{rating.meal}</span>
        <span class="rating-email" style={{"float":"right"}}>{rating.email}</span>
      </div>
        <Row>
          <div></div>
        <Col sm><div>Sweetness</div><div>{numberToRating(rating.sweetness)}</div></Col>
        <Col sm><div>Spice</div><div>{numberToRating(rating.spice)}</div></Col>
        <Col sm><div>Saltiness</div><div>{numberToRating(rating.saltiness)}</div></Col>
        <Col sm><div>Cooking Time</div><div>{numberToRating(rating.cooking_time)}</div></Col>
        </Row>
      <div>{rating.comment}</div>
      <Button>Mark as read</Button>
      </Card>
    )
  }

  search(event){
    console.log(this.state);
    var search_category = this.state.category.toLowerCase()
    console.log(ratings.filter((rating) => rating["meal"].includes(event.target.value)));
    if(event.target.value){
      this.setState({ratings:ratings.filter((rating) => rating[search_category].toLowerCase().includes(event.target.value.toLowerCase()))})
    }
  }

  categoryChange(event){
    console.log(event.target.value)
    this.setState({category:event.target.value})
  }

  deleteRating(){

  }

  render(){
    return(
      <div>
        <Form style={{"margin":20}}>
          <Row>
            <Col><Form.Label>Search</Form.Label></Col>
            <Col><Form.Label>Search by</Form.Label></Col>
          </Row>
          <Row>
          <Col><Form.Control onChange={this.search} style={{"margin":10}}/></Col>
          <Col><Form.Control onChange={this.categoryChange} as="select" style={{"margin":10}}>
            <option>Meal</option>
            <option>Email</option>
          </Form.Control>
          </Col>
          </Row>
        </Form>

        <Card class="rating-display" style={{"margin":10}} >
          {this.state.ratings.map((rating)=>{
              return(this.renderRating(rating))
            }
          )}
        </Card>
      </div>
      )
    }
}

export default AdminPage;
