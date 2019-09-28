import React, { Component } from 'react';
import { Button, Jumbotron, Navbar, Nav, Row, Col, FormControl, NavDropdown, Form, Card, Container, Dropdown, Accordion, ListGroup} from 'react-bootstrap';
import axios from 'axios';

var inner_rating_style={
  "display":"inline"
}

var rateURL = window.CURRENT_HOST + "receive_rating";

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

class NewRating extends Component{
  constructor(props){
    super(props)
    this.state={
      ratings:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
      additionalRating:""
    }
    this.onRatingClick = this.onRatingClick.bind(this)
    this.onCommentChange = this.onCommentChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    // this.onAddRatingChange = this.onAddRatingChange.bind(this)
  }

  onRatingClick(rating_type, index){
    console.log(rating_type);
    console.log(index);
    console.log(this.state.ratings)
    var new_ratings = this.state.ratings
    for(var j=0;j<3;j++){
      if(j == index){
        new_ratings[findIndex(rating_type, rating_types)][j] = 1
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

  onSubmit(){
    console.log(this.state)
    axios.post(rateURL, {
      user_name: window.user_name,
      user_email: window.user_email,
      saltiness: findIndex(1, this.state.ratings[0]),
      spice: findIndex(1,this.state.ratings[1]),
      sweetness:findIndex(1,this.state.ratings[2]),
      cookingTime: findIndex(1,this.state.ratings[3]),
      comment: this.state.additionalRating,
      time: ((new Date()).getTime())
    })
  }

  render(){
    return(
      <div>
        <ListGroup variant="flush">
          {this.props.meal.items.map((item) => {
            return(
              <ListGroup.Item style={{"paddingTop":20}}>
                <Accordion defaultActiveKey="0" class="accordion">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="none" eventKey="0">
                        <h5>{item}</h5>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div class="rating-boxes">

                          <Row>

                            {['Salt','Spice','Sweetness','Cooking Time'].map((rating_type)=>{
                              return(
                                <Col><h6>{rating_type}</h6>
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
                            <Form.Label>Additional Comments</Form.Label>
                            <Form.Control as="textarea" rows="2" onChange={this.onCommentChange} />
                          </Form>
                        </div>

                        <div class="submit-button">
                          <Button onClick={this.onSubmit}>Submit</Button>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  {

                      /* <div key={`custom-inline-radio`} className="mb-3" style={{"marginLeft":10}}>
                      {<div>
                      <div style={{"display":"inline"}} className="stars">{this.renderRating()}</div>
                      <select className="select" value={this.state.comment} name="descriptions" style={{"display":"inline", "fontSize":20, "marginLeft":15, "border":"1px solid black"}}
                      onChange={(event) => {this.onSelectChange(event)}} className="rating-select">
                      <option value="No comment">No comment</option>
                      <option value="Perfect!">Perfect!</option>
                      <option value="Too salty">Too salty</option>
                      <option value="Too sweet">Too sweet</option>
                      <option value="Overcooked">Overcooked</option>
                      <option value="Undercooked">Undercooked</option>
                      <option value="Lacking flavor/spice">Lacking flavor/spice</option>
                      <option value="Bitter">Bitter</option>
                      </select>
                      <div><Button className="add-rating-button" onClick={this.onAddRatingClick}><p className="add-rating-button-text">+ Additional comments</p></Button></div>
                      {this.renderAddRatingTextbox()}
                      </div>}
                  </div> */}
                </Accordion>
              </ListGroup.Item>
            )})}
            </ListGroup>
      </div>
    )
  }
}

export default NewRating;
