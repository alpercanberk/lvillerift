import React, {Component}  from 'react';
import Rating from './components/Rating.js'
import { Button, Jumbotron, Navbar, Nav, FormControl, NavDropdown, Form, Card, Container, ListGroup } from 'react-bootstrap';


var food_title={
  "display":"inline"
}

var menu=[
  {
    "date":"August 19",
    "title":"Breakfast - August 19",
    "items":["Belgium Waffles", "Homefried Potatoes", "Sausage Links", "Assorted Pastries"]
  },
  {
    "date":"August 19",
    "title":"Lunch - August 19",
    "items":["French Onion Soup", "Mako Shark Tacos", "Kale Sautee", "Ice Cream"]
  },
  {
    "date":"August 19",
    "title":"Dinner - August 19",
    "items":["Flank Steak", "Mashed Potatoes", "Seasonal Vegetables", "Ice Cream"]
  }
]

class App extends Component{

  constructor(props){
    super(props)
    this.state={
      ratings_input:[]
    }
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
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Navbar.Text>
              <a><Button variant="outline" style={{"color":"#BA1A26", "borderColor":"#BA1A26"}}>Sign In</Button></a>
           </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        {menu.map((meal) => {
          return(
            <Card style={{"marginLeft":30, "marginRight":30, "marginTop":30}}>
            <Card.Header style={{"backgroundColor":"#BA1A26", "color":"white"}}><h3>{meal.title}</h3></Card.Header>
            <ListGroup variant="flush">
              {meal.items.map((item) => {
                  return(<ListGroup.Item><div><h4 class="food_title">{item}</h4><Rating name={item}/></div></ListGroup.Item>)
              })}
            </ListGroup>
            <Button style={{"backgroundColor":"#BA1A26", "color":"white", "borderColor":"#BA1A26", "height":40, "width":200, "margin":"5px auto"}}><h5>Submit Rating</h5></Button>
            </Card>
          )
        })}
      </div>
    );
  }
}

export default App;
