import React, { Component } from 'react';
import { Button, Jumbotron, Navbar, Nav, Row, Col, FormControl, NavDropdown, Form, Card, Container, Dropdown, Accordion, ListGroup} from 'react-bootstrap';
import axios from 'axios';

class MenuDisplay extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
              <ListGroup.Item className="meal-list-group">
                <Accordion defaultActiveKey="1" class="accordion meal-accordion">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="none" eventKey="0" class="accordion-toggle" onClick={this.updateActive}>
                        <h5><span style={{"float":"left"}}>{this.props.item}</span></h5>
                      </Accordion.Toggle>
                    </Card.Header>
                  </Card>
                </Accordion>
              </ListGroup.Item>
            )}
          }

export default MenuDisplay;
