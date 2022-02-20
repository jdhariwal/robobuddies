import React, {Component} from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import {robots} from './robots';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry';
import './App.css';

const state = {
	robots: robots,
	searchfield: ''
}

class App extends Component{
	constructor(){
		super()
		this.state= {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots: users}));
	}


	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
	}
	

	render(){
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})	
	return(
		<div className='tc'>
		<h1 className='f1'>RoboBuddies</h1>
		<SearchBox searchChange={this.onSearchChange}/>
		<Scroll>
			<ErrorBoundry>
			<CardList robots={filteredRobots}/>
			</ErrorBoundry>
		</Scroll>
		</div>
		);
	}
}

export default App;