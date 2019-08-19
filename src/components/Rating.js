import React, { Component } from 'react';
import { Button, Jumbotron, Navbar, Nav, FormControl, NavDropdown, Form, Card, Container } from 'react-bootstrap';


var inner_rating_style={
  "display":"inline"
}

class Rating extends Component{
  constructor(props){
    super(props)
    this.state={
      ratings:[false,false,false,false,false],
      comment:"No comment"
    }
    this.onRatingChange = this.onRatingChange.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)

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
    console.log(i)
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
          console.log(i)
          ratings.push(
            <div
              className="rating-star"
              style={this.starStyle(i)}
              custom
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


  render(){
    return(
      <div class="inner_rating_style">
          <Form>
              <div key={`custom-inline-radio`} className="mb-3" style={{"marginLeft":10}}>
                {<div>
                  <div style={{"display":"inline"}}>{this.renderRating()}</div>
                  <select value={this.state.comment} name="descriptions" style={{"display":"inline", "fontSize":20, "marginLeft":20}}
                  onChange={(event) => {this.onSelectChange(event)}}>
                    <option value="No comment">No comment</option>
                    <option value="Perfect!">Perfect!</option>
                    <option value="Too salty">Too salty</option>
                    <option value="Too sweet">Too sweet</option>
                    <option value="Overcooked">Overcooked</option>
                    <option value="Undercooked">Undercooked</option>
                    <option value="Lacking flavor/spice">Lacking flavor/spice</option>
                  </select>
                </div>}
              </div>
          </Form>
      </div>
    )
  }
}

export default Rating;
