import React from 'react';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import Poll from './Poll';

export default class Home extends React.Component(){
	render(){
		return (
			<React.Fragment>
				<Row>
					<Poll polls={this.props.polls} voteYes={this.props.voteYes} voteNo={this.props.voteNo} killPoll={this.props.killPoll} />
				</Row>
			</React.Fragment>
		);
	}
}