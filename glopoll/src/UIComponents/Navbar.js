import React from 'react';
import { 
	Navbar, Container,
	Nav, Form,
	Button, FormControl,
	Col, Row,
} from 'react-bootstrap';
import Create from './Create';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Poll from './Poll';

export default class NavBar extends React.Component{
	constructor(){
		super();
		this.state = {
			active: 'Home'
		}
	}

	pollActive = () => {
		console.log('Poll active');
	}

	createActive = () => {
		console.log('Create active');
	}

	// render function
	render(){
		return (
			<Router>
				<Navbar sticky="top"
					expand="lg"
					variant="dark"
					collapseOnSelect
					bg="dark">
					<Navbar.Brand >GloPoll</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="/" active={window.location.pathname === '/'}>Home</Nav.Link>
							<Nav.Link href="/create" active={window.location.pathname === '/create'}>Create</Nav.Link>
						</Nav>
						<Form inline>
							<Row className="show-grid">
								<Col className="col-8">
									<FormControl type="text" placeholder="Search for a Poll" className="mr-sm-2" />
								</Col>
								<Col className="col-4">
									<Button variant="outline-primary">Search</Button>
								</Col>
							</Row>
						</Form>
					</Navbar.Collapse>
				</Navbar>
				<br />
				<Switch>
					<Route exact path="/">
						<Container fluid="md">
		    				<Row>
			    				<Poll polls={this.props.polls} voteYes={this.props.voteYes} voteNo={this.props.voteNo} killPoll={this.props.killPoll} />
		    				</Row>
		    			</Container>
					</Route>
					<Route path="/create">
						<Container fluid="md">
							<Create addPoll={this.props.addPoll}/>
						</Container>
					</Route>
				</Switch>
			</Router>
		);
	}
}