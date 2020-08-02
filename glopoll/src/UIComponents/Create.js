import React from 'react';
import {
	Form,
	Button,
	Col,
	Row
} from 'react-bootstrap';

export default class Create extends React.Component{
	constructor() {
		super();

		this.state = {
			time: '12'
		}
	}

	setTimer = (e) => {
		this.setState({time: e.target.value})
	}


	render(){
		return (
			<Form onSubmit={(e) => {this.props.addPoll(e)}}>
				<h1>Create a Poll</h1>
				<Form.Group controlId="name">
					<Form.Label>Poll Title</Form.Label>
					<Form.Control type="text" name="title" placeholder="Poll Title" />
				</Form.Group>

				<Form.Group controlId="description">
					<Form.Label>Poll Description</Form.Label>
					<Form.Control as="textarea" name="description" rows="3" placeholder="A brief description of your poll" />
				</Form.Group>

				<Form.Group controlId="choices">
					<Form.Row>
						<Col>
							<Form.Label>Choice One</Form.Label>
							<Form.Control type="text" placeholder="Choice one" name="choiceOne" />
						</Col>
						<Col>
							<Form.Label>Choice Two</Form.Label>
							<Form.Control type="text" placeholder="Choice two" name="choiceTwo" />
						</Col>
					</Form.Row>
				</Form.Group>

				<Form.Group controlId="formBasicRange">
			    	<Form.Label>Poll will expire in: {this.state.time < 1 ? this.state.time*60 : this.state.time} {this.state.time < 1 ? 'minutes' : 'hours' }</Form.Label>
			    	<Form.Control type="range" min="0.1" max="24" step="0.1" onChange={(e) => {this.setTimer(e)}} name="expire" />
			  	</Form.Group>

				<Button variant="success" type="submit">
					Create
				</Button>
			</Form>
		)
	}
}