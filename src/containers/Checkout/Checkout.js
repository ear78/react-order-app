import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {


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
                    checkoutContinue={this.checkoutContinuedHandler} ingredients={this.props.ings} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>


        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);
