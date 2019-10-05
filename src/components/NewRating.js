import React, { Component } from 'react';
import { Button, Jumbotron, Navbar, Nav, Row, Col, FormControl, NavDropdown, Form, Card, Container, Dropdown, Accordion, ListGroup} from 'react-bootstrap';
import axios from 'axios';

var inner_rating_style={
  "display":"inline"
}

var rateURL = window.CURRENT_HOST + "receive_rating";

var rated_meals = ""
//
if(window.rated_meals.length > 20){
  rated_meals = JSON.parse(window.rated_meals.replace(new RegExp('u&#39;', 'g'),'"').replace(new RegExp('&#39;', 'g'),'"'));
}

console.log(rated_meals)

var rating_types = ["Salt", "Spice", "Sweetness", "Cooking Time"]

var rating_object={
  "Salt":["Too little", "Just right", "Too much"],
  "Spice":["Too little", "Just right", "Too much"],
  "Sweetness":["Too little", "Just right", "Too much"],
  "Cooking Time":["Undercooked", "Just right", "Overcooked"]
}

function findIndex(item, list){
  for(var i=0;i<list.length;i++){
    if(list[i] == item){
      return i
    }
  }
}

function parseRatings(item, list){
  for(var i=0;i<list.length;i++){
    if(list[i] == item){
      return (i + 1)
    }
  }
  return 0
}

class NewRating extends Component{
  constructor(props){
    super(props)
    this.state={
      ratings:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
      additionalRating:"",
      active: false,
    }
    this.onRatingClick = this.onRatingClick.bind(this)
    this.onCommentChange = this.onCommentChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.updateActive = this.updateActive.bind(this)
    this.renderActive = this.renderActive.bind(this)
  }

  onRatingClick(rating_type, index){
    console.log(rating_type);
    console.log(index);
    console.log(this.state.ratings)
    var new_ratings = this.state.ratings
    for(var j=0;j<3;j++){
      if(j == index){
        if(new_ratings[findIndex(rating_type, rating_types)][j] == 1){
          new_ratings[findIndex(rating_type, rating_types)][j] = 0
        }
        else{
          new_ratings[findIndex(rating_type, rating_types)][j] = 1
        }
      }
      else{
        new_ratings[findIndex(rating_type, rating_types)][j] = 0
      }
    }
    console.log(new_ratings)
    this.setState({ratings:new_ratings});
  }

  onCommentChange(event){
    this.setState({additionalRating:event.target.value});
  }

  onSubmit(item){
    console.log(this.state)
    axios.post(rateURL, {
      name: item,
      email: window.user_email,
      saltiness: parseRatings(1, this.state.ratings[0]),
      spice: parseRatings(1,this.state.ratings[1]),
      sweetness:parseRatings(1,this.state.ratings[2]),
      cooking_time: parseRatings(1,this.state.ratings[3]),
      comment: this.state.additionalRating,
      time: ((new Date()).getTime()),
    }).then((response) => {
      alert(response.data);
      window.location.reload();
      this.forceUpdate();
    })

  }

  updateActive(){
    var new_active = this.state.active
    this.setState({active:!new_active})
  }

  renderActive(rated){
    if(!rated){
      if(this.state.active){
        return(<span style={{"float":"right"}}>▲</span>)
      }
      return(<span style={{"float":"right"}}>▼</span>)
    }
    else{
      return(<span style={{"float":"right", "color":"red"}}>Rated</span>)
    }
  }

  render(){
    return(
              <ListGroup.Item className="meal-list-group">
                <Accordion defaultActiveKey="1" class="accordion meal-accordion">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="none" eventKey="0" class="accordion-toggle" onClick={this.updateActive}>
                        <h5><span style={{"float":"left"}} class="meal-name">{this.props.item}</span>{this.renderActive(rated_meals.includes(this.props.item))}</h5>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                      {!(rated_meals.includes(this.props.item)) ? (
                        <div>
                        <div class="rating-boxes">

                          <Row>

                            {['Salt','Spice','Sweetness','Cooking Time'].map((rating_type)=>{
                              return(
                                <Col sm class="rating-col"><h5 style={{"textAlign":"center"}}>{rating_type}</h5>
                                  <Form>
                                    <div
                                      onClick={() => {this.onRatingClick(rating_type, 0)}}
                                      class={this.state.ratings[findIndex(rating_type, rating_types)][0] ? "filled-option":"unfilled-option"}>
                                      {rating_object[rating_type][0]}
                                    </div>
                                    <div
                                      onClick={() => {this.onRatingClick(rating_type, 1)}}
                                      class={this.state.ratings[findIndex(rating_type, rating_types)][1] ? "filled-option":"unfilled-option"}>
                                      {rating_object[rating_type][1]}
                                    </div>
                                    <div
                                      onClick={() => {this.onRatingClick(rating_type, 2)}}
                                      class={this.state.ratings[findIndex(rating_type, rating_types)][2] ? "filled-option":"unfilled-option"}>
                                      {rating_object[rating_type][2]}
                                    </div>

                                  </Form>
                                </Col>
                              )
                            })}
                          </Row>
                        </div>
                        <div style={{"marginTop":10}}>
                          <Form>
                            <Form.Label style={{"fontWeight":"bold"}}>Additional Comments</Form.Label>
                            <Form.Control as="textarea" rows="2" onChange={this.onCommentChange} />
                          </Form>
                        </div>

                        <div class="submit-button">
                          <Button onClick={()=>{this.onSubmit(this.props.item)}}>Submit</Button>
                        </div>
                      </div>
                      ):(
                        <div>Sorry, you have already rated this meal today</div>
                      )}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </ListGroup.Item>
            )}
          }

export default NewRating;
