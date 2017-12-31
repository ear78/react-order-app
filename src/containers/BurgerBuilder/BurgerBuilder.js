import React from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 4,
			purchaseable: false,
			purchasing: false,
			loading: false,
			error: false
		};
	}

	componentDidMount() {
		console.log(this.props);
		axios.get('/ingredients.json').then((response) => {
			this.setState({ingredients: response.data})
		}).catch(error => {
			this.setState({error: true})
		})
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
		.map(igKey => {
			return ingredients[igKey];
		})
		.reduce((sum, el) => {
			return sum + el;
		}, 0);

		this.setState({
			purchaseable: sum > 0
		})
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0){
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		// alert('Please Continue!');
		// this.setState({
		// 	loading: true
		// })
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Elliot',
		// 		address: {
		// 			street: 'Test Street 1',
		// 			zipCode: '54433',
		// 			country: 'Germany'
		// 		},
		// 		email: 'test@test.com'
		// 	},
		// 	deliveryMethod: 'Fastest'
		// }
		// axios.post('/orders.json', order)
		// 	.then(response => {
		// 		this.setState({ loading: false, purchasing: false })
		// 	})
		// 	.catch(error => {
		// 		this.setState({ loading: false, purchasing: false })
		// 	});
		const queryParams = [];
		for(let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		const queryString = queryParams.join('&');
		//onclick routing to checkout page when continue is clicked, configures a query string
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		})
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		// conditionally setting order summary
		let orderSummary = <OrderSummary ingredients={this.state.ingredients} cancel={this.purchaseCancelHandler}
		continue={this.purchaseContinueHandler}
		price={this.state.totalPrice}/>;

	let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

		if(this.state.ingredients){
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemove={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchaseable={this.state.purchaseable}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}
					/>
				</Aux>
			)
		}
		if(this.state.loading){
			orderSummary = <Spinner />
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

export default BurgerBuilder;
