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
            const { timeTillDate, timeFormat } = this.props
            const then = moment(timeTillDate, timeFormat)
            const now = moment()
            let duration = moment.duration(moment(then).diff(moment(now)))
            const hours = duration._data.hours
            const minutes = duration._data.minutes
            const seconds = duration._data.seconds

            if (Math.sign(parseInt(seconds, 10)) == -1){
                this.props.killPoll(this.props.poll.uid)
            }

            this.setState({ hours, minutes, seconds })
        }, 1000)
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