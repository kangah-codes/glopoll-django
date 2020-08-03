import React from 'react';
import {
	Card,
	Button,
	Row,
	Col,
	ProgressBar
} from 'react-bootstrap';
import logo from '../logo.svg';
import Countdown from './Countdown';

export default class PollItem extends React.Component{
	constructor(){
		super();
	}

	render(){
		const { uid, title, text, yesVotes, noVotes, yesPercent, noPercent, choiceOne, choiceTwo, isExpired } = this.props.poll;
		if (!isExpired){
			return (
				<Col md="4" style={{padding: '2%'}}>
					<Card>
						{/*
							<div className="text-center">
								<Card.Img variant="top" src={logo} />
							</div>
						*/}
						<Card.Body>
							<Card.Title>{ title }</Card.Title>
							<Card.Text>
								{ text }
							</Card.Text>
							<Row>
								<Col>
									<Button 
										className={uid+'poll'}
										variant="success" 
										style={{width: '100%'}} 
										onClick={(e) => {this.props.voteYes(e.target, uid)}}>
										{choiceOne}
									</Button>
								</Col>
								<Col>
									<Button 
										className={uid+'poll'}
										variant="danger" 
										style={{width: '100%'}} 
										onClick={(e) => {this.props.voteNo(e.target, uid)}}>
										{choiceTwo}
									</Button>
								</Col>
							</Row>
							<Row>
								<Col>
									<p style={{marginTop: '10px'}}>{yesVotes+noVotes} { (yesVotes+noVotes) === 1 ? 'person has' : 'people have' }  voted</p>
									<p style={{marginTop: '5px'}}>
									<Row>
										<Col>
											{choiceOne}
										</Col>
										<Col>
											<ProgressBar variant="success" now={yesPercent} />
										</Col>
									</Row>
									<Row>
										<Col>
											{choiceTwo}
										</Col>
										<Col>
											<ProgressBar variant="danger" now={noPercent} />
										</Col>
									</Row>
										
									</p>
								</Col>
							</Row>
							<Row>
								<Col>
									<Countdown timeTillDate={this.props.poll.willExpireOn} timeFormat="YYYY-MM-DD HH:mm" poll={this.props.poll} killPoll={this.props.killPoll}/>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			)
		}else{
			return (
				<Col md="4" style={{padding: '2%'}}>
					<Card>
						<Card.Body>
							<Card.Title>{ title }</Card.Title>
							<Card.Text>
								{ text }
							</Card.Text>
							<Row>
								<Col>
									<p style={{marginTop: '10px'}}>{yesVotes+noVotes} { (yesVotes+noVotes) === 1 ? 'person' : 'people' }  voted</p>
									<p style={{marginTop: '5px'}}>
									<Row>
										<Col>
											{choiceOne}
										</Col>
										<Col>
											<ProgressBar variant="success" now={yesPercent} />
										</Col>
									</Row>
									<Row>
										<Col>
											{choiceTwo}
										</Col>
										<Col>
											<ProgressBar variant="danger" now={noPercent} />
										</Col>
									</Row>
										
									</p>
								</Col>
							</Row>
							<Row>
								<Col>
									<p style={{float:'right'}}>
										Poll has ended
									</p>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			)
		}
	}
}