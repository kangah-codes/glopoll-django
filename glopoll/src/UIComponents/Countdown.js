import React from 'react';
import moment from 'moment';

export default class Countdown extends React.Component{
	state = {
		hours: undefined,
		minutes: undefined,
		seconds: undefined,
		isZero: false,

	};

	componentDidMount(){
		this.interval = setInterval(() => {
			const { timeTillDate, timeFormat } = this.props;
            const then = moment(timeTillDate, timeFormat);
            const now = moment();
            const countdown = moment(then - now);
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');

            if (hours == 0 && minutes == 0 && seconds == 0){
            	this.props.killPoll(this.props.poll.id);
            }

            this.setState({ hours, minutes, seconds });
        }, 1000);
	}

	componentWillUnmount() {

        if (this.interval) {
            clearInterval(this.interval);
        }
    }

	render() {
		const { hours, minutes, seconds } = this.state;
		
		return (
            <div>
            	<p 
            		style={{float: 'right'}}>
            		Time left:  {hours}:{minutes}:{seconds}
                </p>
            </div>
        );
    }
}