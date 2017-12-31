import React from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

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

    checkoutCancelledHandler = () => {
        //takes us back to previous page when cancelled
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        //this will replace the path with contact-data component to continue order
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <CheckoutSummary
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinue={this.checkoutContinued} ingredients={this.state.ingredients} />
        )
    }
}

export default Checkout;
