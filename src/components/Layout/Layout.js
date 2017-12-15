import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideMenu from '../Navigation/SideMenu/SideMenu';

class Layout extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showSideMenu: false
		}
	}
	sideMenuClosedHandler = () => {
		this.setState({showSideMenu: false})
	}
	
	toggleSideMenu = () => {
		this.setState( (prevState) => {
		   return	{showSideMenu: !prevState.showSideMenu}
		})
	}
	render(){
		
		return (
			<Aux>
				<Toolbar clicked={this.toggleSideMenu}/>
				<SideMenu 
					open={this.state.showSideMenu}
					closed={this.sideMenuClosedHandler}/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
} 

export default Layout;
