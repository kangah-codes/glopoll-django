import React from 'react';
import {
	CardGroup,
	Col,
	Row
} from 'react-bootstrap';
import PollItem from './PollItem';

export default class Poll extends React.Component{
	render() {
		try{
			return this.props.polls.map((poll) => (
				<PollItem key={poll.id} poll={poll} voteYes={this.props.voteYes} voteNo={this.props.voteNo} killPoll={this.props.killPoll} />
			))
		}catch (error){
			return (
				<div className="container">
					<Row>
						<Col>
							<h1>No Polls</h1>
						</Col>
					</Row>
				</div>
			)
		}
		
	}
}