import React from 'react';
import {
	CardGroup,
	Col,
	Row
} from 'react-bootstrap';
import PollItem from './PollItem';

export default class Poll extends React.Component{
	componentDidMount(){
		let polls = this.props.polls
		console.log(polls)
	}

	render() {
		try{
			if (this.props.polls.length == 0){
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
			return this.props.polls.map((poll) => (
				<PollItem key={poll.id} poll={poll} voteYes={this.props.voteYes} voteNo={this.props.voteNo} killPoll={this.props.killPoll} />
			))
		}catch (error){
			return (
				<div className="container">
					<Row>
						<Col>
							<h1>An error occured</h1>
						</Col>
					</Row>
				</div>
			)
		}
		
	}
}