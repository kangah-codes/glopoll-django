import React from 'react';
import './App.css';
import NavBar from './UIComponents/Navbar.js';
import Poll from './UIComponents/Poll.js';
import { Container, Row, Col, CardGroup, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import User from './Logic/UserProfile';
import {v4 as uuid} from 'uuid';
import axios from 'axios';


// global variable
var newUser;

class App extends React.Component {
	constructor() {
		super();

		newUser = new User('1');
		let storedpolls = localStorage.getItem('polls');
		try {
			storedpolls = JSON.parse(storedpolls);
		}catch(e){
			console.error(e);
		}
		
		this.state = {
			polls: !storedpolls ? [] : storedpolls
		}

		localStorage.setItem('polls', JSON.stringify(this.state.polls))
	}

	voteYes = (e, id) => {
		if (!newUser.getPoll().includes(id)){
			var btnArray = document.getElementsByClassName(`${id}poll`);
			for (let i=0; i<btnArray.length; i++){
				btnArray[i].disabled = true;
			}
			this.setState(this.state.polls.map((poll) => {
				if (poll.id === id){
					poll.yesVotes += 1
					poll.voted += 1
					newUser.addPoll(poll.id);
					this.findPercent(id);
				}
			}))
			newUser.addPoll(id);
			localStorage.setItem('polls', JSON.stringify(this.state.polls))
		}
		
	}

	voteNo = (e, id) => {
		if (!newUser.getPoll().includes(id)){
			var btnArray = document.getElementsByClassName(`${id}poll`);
			for (let i=0; i<btnArray.length; i++){
				btnArray[i].disabled = true;
			}
			this.setState(this.state.polls.map((poll) => {
				if (poll.id === id){
					poll.noVotes += 1
					poll.voted += 1
					newUser.addPoll(poll.id);
					this.findPercent(id);
				}
			}))
			newUser.addPoll(id);
			localStorage.setItem('polls', JSON.stringify(this.state.polls))
		}
	}
	

	findPercent = (id) => {
		this.setState(this.state.polls.map((poll) => {
			if (poll.id === id){
				poll.yesPercent = (poll.yesVotes/poll.voted)*100;
				poll.noPercent = (poll.noVotes/poll.voted)*100;
			}
		}))
	}

	killPoll = (id) => {
		this.setState(this.state.polls.map((poll) => {
			if (poll.id === id){
				poll.isExpired = true;
				localStorage.setItem('polls', JSON.stringify(this.state.polls))
			}
		}))
	}

	successPoll = () => {	  
		return (
			<Alert variant="success" onClose={() => setShow(false)} dismissible>
				<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
				<p>
					Change this and that and try again. Duis mollis, est non commodo
					luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
					Cras mattis consectetur purus sit amet fermentum.
				</p>
			</Alert>
		);
	}


	addPoll = (e) => {
		e.preventDefault();
		let timer = e.target.expire.value.toString().replace('.', ' ').split(' ')
		let now = new Date();
		let hour = now.getHours();
		let minutes = now.getMinutes();
		timer[0] = parseInt(timer[0], 10)
		timer[1] = parseInt(timer[1], 10)
		if (timer[0] == 0){
			var time = `${hour} ${(timer[1]+(minutes))}`
		}else{
			var time = `${(timer[0]+hour)%12} ${(timer[1]+minutes)}`
		}
		let id = uuid();
		  
		this.setState({
			polls: [
				...JSON.parse(localStorage.getItem('polls')), 
				{
					id: id,
					title: e.target.title.value,
					text: e.target.description.value,
					yesVotes: 0,
					noVotes: 0,
					voted: 0,
					yesPercent: 0,
					noPercent: 0,
					choiceOne: e.target.choiceOne.value,
					choiceTwo: e.target.choiceTwo.value,
					willExpireOn: time,
					isExpired: false,
				}
			]
		});

		localStorage.setItem('polls', JSON.stringify([...this.state.polls, {
			id: id,
			title: e.target.title.value,
			text: e.target.description.value,
			yesVotes: 0,
			noVotes: 0,
			voted: 0,
			yesPercent: 0,
			noPercent: 0,
			choiceOne: e.target.choiceOne.value,
			choiceTwo: e.target.choiceTwo.value,
			willExpireOn: time,
			isExpired: false,
		}]))

		this.successPoll()

		// window.location.href = '/'
	}

	render() {
		let polls = JSON.parse(localStorage.getItem('polls'));
		return (
			<div>
		    	<NavBar polls={polls} voteYes={this.voteYes} voteNo={this.voteNo} killPoll={this.killPoll} addPoll={this.addPoll} />
			</div>
		);
	}
}

export default App;
