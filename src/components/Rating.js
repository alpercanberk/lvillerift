import React, { Component } from 'react';
import { Button, Jumbotron, Navbar, Nav, FormControl, NavDropdown, Form, Card, Container, Dropdown, Accordion} from 'react-bootstrap';

var inner_rating_style={
  "display":"inline"
}

class Rating extends Component{
  constructor(props){
    super(props)
    this.state={
      ratings:[0,0,0,0,0],
      comment:"No comment",
      isRating:false,
      additionalRating:""
    }
    this.onRatingChange = this.onRatingChange.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onAddRatingClick = this.onAddRatingClick.bind(this)
    this.onAddRatingChange = this.onAddRatingChange.bind(this)
  }

  starStyle(i){
    var color = "black"
    if(this.state.ratings[i]==0){
      color="black"
    }
    else{
      color="#f2c213"
    }
    return{
      "display":"inline",
      "fontSize":30,
      "margin":5,
      "cursor":"pointer",
      "color":color
    }
  }

  onRatingChange(i){
    var ratings=this.state.ratings
    if(!ratings[i]){
      for(let j=0; j<i+1; j++){
        ratings[j] = true
      }
    }
    else{
      for(let j=i+1; j<ratings.length; j++){
        ratings[j] = false
      }
    }
    this.setState({ratings})
  }

  renderRating = () => {
    let ratings=[]
    for(let i=0; i<5; i++){
          ratings.push(
            <div
              className="rating-star"
              style={this.starStyle(i)}
              label={(i+1).toString()}
              key={i}
              type={'radio'}
              id={`custom-inline-radio-`+(i+1).toString()}
              onClick={()=>{this.onRatingChange(i)}}
            >
            	★
            </div>
        )
    }
    return ratings
  }

  onSelectChange(event){
    this.setState({comment:event.target.value})
  }


  onAddRatingClick(){
    var state = this.state.isRating
    state = !this.state.isRating
    this.setState({isRating:state})
  }

  onAddRatingChange(event){
    this.setState({additionalRating:event.target.value})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    var type_constant = 99
    var type = this.props.type
    if(type=="breakfast"){
      type_constant = 1
    }
    else if(type=="lunch"){
      type_constant = 2
    }
    else if(type=="dinner"){
      type_constant = 3
    }
    // Check if the suplied props is changed
    if(prevProps.submitDetector !== this.props.submitDetector) {
      if(prevProps.submitDetector + type_constant == this.props.submitDetector){

        var input_data = {
          meal_name:this.props.name,
          meal_title:this.props.title,
          star_rating:((this.state.ratings).reduce((a,b) => a + b, 0)).toString(),
          comment:this.state.comment,
          additionalRating:this.state.additionalRating
        }
        this.props.collect_function(input_data, this.props.meal_length)
      }  // run the function with the suplied new property
    }
  }

  renderAddRatingTextbox(){
    if(this.state.isRating){
      return(
        <div className="additional-rating">
          <Form.Label>Additional Comments</Form.Label>
          <Form.Control
          as="textarea"
          rows="3"
          value={this.state.additionalRating}
          onChange={(event)=>{this.onAddRatingChange(event)}}>
          </Form.Control>
        </div>
      )
    }
    return(
      <div></div>
    )
  }

  render(){
    if(this.props.user && !this.props.is_complete){
      return(
        <div class="inner_rating_style">
            <Form>
                <div key={`custom-inline-radio`} className="mb-3" style={{"marginLeft":10}}>
                  {<div>
                    <div style={{"display":"inline"}}>{this.renderRating()}</div>
                    <select value={this.state.comment} name="descriptions" style={{"display":"inline", "fontSize":20, "marginLeft":20}}
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
                    <Button className="add-rating-button" onClick={this.onAddRatingClick}><p className="add-rating-button-text">+</p></Button>
                    {this.renderAddRatingTextbox()}
                  </div>}
                </div>
            </Form>
        </div>
      )
    }
    else{
      return <div></div>
    }
  }
}

export default Rating;
