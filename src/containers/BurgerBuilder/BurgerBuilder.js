import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			purchaseable: false,
			purchasing: false
		};
	}

	componentDidMount() {
		this.props.onInitIngredients();
		console.log(this.props);

	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
		.map(igKey => {
			return ingredients[igKey];
		})
		.reduce((sum, el) => {
			return sum + el;
		}, 0);

		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		//onclick routing to checkout page when continue is clicked, configures a query string
		this.props.history.push('/checkout');
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		// conditionally setting order summary
		let orderSummary = null;
	    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

if(this.props.ings){
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemove={this.props.onIngredientRemoved}
					disabled={disabledInfo}
					purchaseable={this.updatePurchaseState(this.props.ings)}
					price={this.props.price}
					ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = <OrderSummary ingredients={this.props.ings} cancel={this.purchaseCancelHandler}
			continue={this.purchaseContinueHandler}
			price={this.props.price}/>;
		}

		return (
			<Aux>
				{/*modal passes props down to backdrop and setState with purchasing to toggle*/}
				<Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	}
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () => {
			dispatch(burgerBuilderActions.initIngredients())
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
