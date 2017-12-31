import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ingredients: {
                salad: 1,
                meat: 1,
                cheese: 1,
                bacon: 1
            }
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    checkoutCancelledHandler = () => {
        //takes us back to previous page when cancelled
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        //this will replace the path with contact-data component to continue order
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinuedHandler} ingredients={this.state.ingredients} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>


        )
    }
}

export default Checkout;
