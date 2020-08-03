import React from 'react';
import './App.css';
import NavBar from './UIComponents/Navbar.js';
import Poll from './UIComponents/Poll.js';
import { Container, Row, Col, CardGroup, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import User from './Logic/UserProfile';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import moment from 'moment';


// global variable
var newUser;

class App extends React.Component {
	constructor() {
		super();
		
		this.state = {
			polls: []
		}
	}

	componentDidMount(){
		let data = []
		axios.get(`http://127.0.0.1:5000/get_polls/`)
		.then(res => {
			JSON.parse(res.data).map((item) => {
				data.push(item.fields)
			})
			this.setState({ 
				polls: data 
			});
		})
	}

	voteYes = (e, id) => {
		let data = []
		axios.get(`http://127.0.0.1:5000/vote/${id}/yes/`)
		.then(res => {
			JSON.parse(res.data).map((item) => {
				data.push(item.fields)
			})
			this.setState({ 
				polls: data 
			});

			this.setState(this.state.polls.map((poll) => {
				if (poll.uid === id){
					this.findPercent(id);
				}
			}))
		})
		.catch(err => {
			if (err.response.status === 501){
				// pass
			}
		})
	}

	voteNo = (e, id) => {
		let data = []
		axios.get(`http://127.0.0.1:5000/vote/${id}/no/`)
		.then(res => {
			JSON.parse(res.data).map((item) => {
				data.push(item.fields)
			})
			this.setState({ 
				polls: data 
			});

			this.setState(this.state.polls.map((poll) => {
				if (poll.uid === id){
					this.findPercent(id);
				}
			}))
		})
		.catch(err => {
			if (err.response.status === 501){
				// pass
			}
		})
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
			console.log(id, poll.uid)
			if (poll.uid === id){
				poll.isExpired = true;
			}
		}))
	}

	addPoll = (e) => {
		e.preventDefault();

		axios.post('http://127.0.0.1:5000/add_poll/', {
			data: JSON.stringify({
				uid: uuid(),
				title: e.target.title.value,
				text: e.target.description.value,
				yesVotes: 0,
				noVotes: 0,
				voted: 0,
				yesPercent: 0,
				noPercent: 0,
				choiceOne: e.target.choiceOne.value,
				choiceTwo: e.target.choiceTwo.value,
				willExpireOn: moment(new Date(new Date().getTime() + 60 * 60 * 24 * 1000)).format('YYYY-MM-DD HH:mm'),
				isExpired: false,
			})
		})
		.then((response) => {
			window.location.href = '/'
		}, (error) => {
			console.log(error);
		});
	}

	render() {
		let polls = JSON.parse(localStorage.getItem('polls'));
		return (
			<div>
		    	<NavBar polls={this.state.polls} voteYes={this.voteYes} voteNo={this.voteNo} killPoll={this.killPoll} addPoll={this.addPoll} />
			</div>
		);
	}
}

export default App;
