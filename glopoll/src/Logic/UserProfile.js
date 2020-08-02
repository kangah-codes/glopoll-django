// import {v4 as uuid} from 'uuid';

export default class User{
	constructor(id){
		this.id = id;
		this.votedPolls = ["NONE"];
		if (localStorage.getItem(this.id) === null){
			localStorage.setItem(this.id, this.votedPolls)
		}
	}

	addPoll = (poll) => {
		// check if poll does not already exist
		if (!this.votedPolls.includes(poll)){
			this.votedPolls.push(poll);
			localStorage.setItem(this.id, JSON.stringify(this.votedPolls));
		}
		
	}

	getPollList = () => {
		return this.votedPolls
	}

	getPoll = () => {
		return JSON.parse(localStorage.getItem(this.id));
	}
}

User.prototype.repr = () => {
	return this.id
}