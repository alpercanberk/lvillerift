import React, { Component } from 'react';
import { Button, Jumbotron, Navbar, Nav, Row, Col, FormControl, NavDropdown, Form, Card, Container, Dropdown, Accordion, ListGroup} from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

var deleteURL = window.CURRENT_HOST + "delete_rating";


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
var color_key=["#000","orange","green","red"]

function numberToRating(number){
  return key[number]
}

//
if(window.ratings.length > 100){
  console.log(window.ratings.replace(new RegExp('u&#39;', 'g'),'"').replace(new RegExp('&#39;', 'g'),'"'))
  ratings = JSON.parse(window.ratings.replace(new RegExp('u&#39;', 'g'),'"').replace(new RegExp('&#39;', 'g'),'"').replace(new RegExp('&#34;', 'g'),'"').replace(new RegExp('rating', 'g'),'"'));
}


for(var i=0;i<ratings.length;i++){
  var d = new Date(ratings[i]["time"])
  ratings[i]["time"] = d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear()
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
    this.onRead = this.onRead.bind(this);

  }

  renderRating(rating){
    return(
      <Card style={{"margin":10, "padding":10}}>
        <div>
        <h5  style={{"float":"left"}} class="rating-display-title">{rating.meal}</h5>
      <span class="rating-email" style={{"float":"right"}}>{rating.email} - {rating.time}</span>
      </div>
        <Row>
          <div></div>
        <Col sm><div class="rating-display" style={{"border":"3px solid " + color_key[rating.sweetness]}}><div style={{"fontWeight":"bold"}}>Sweetness</div><div>{numberToRating(rating.sweetness)}</div></div></Col>
        <Col sm><div class="rating-display" style={{"border":"3px solid " + color_key[rating.spice]}}><div style={{"fontWeight":"bold"}}>Spice</div><div>{numberToRating(rating.spice)}</div></div></Col>
        <Col sm><div class="rating-display" style={{"border":"3px solid " + color_key[rating.saltiness]}}><div style={{"fontWeight":"bold"}}>Saltiness</div><div>{numberToRating(rating.saltiness)}</div></div></Col>
        <Col sm><div class="rating-display" style={{"border":"3px solid " + color_key[rating.cooking_time]}}><div style={{"fontWeight":"bold"}}>Cooking Time</div><div>{numberToRating(rating.cooking_time)}</div></div></Col>
        </Row>
      <h6>Custom Comment:</h6>
      <div class="rating-comment">{rating.comment}</div>
    <Button onClick={()=>{this.onRead(rating.id)}}>Delete</Button>
      </Card>
    )
  }

  onRead(id){
      console.log(id);
      console.log("hi")
      axios.post(deleteURL, {
        id: id,
      }).then((response) => {
        alert(response.data);
        window.location.reload();
        this.forceUpdate();
      })
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
          <option>Time</option>
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
