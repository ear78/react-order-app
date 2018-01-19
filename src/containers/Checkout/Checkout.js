import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

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
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinue={this.checkoutContinuedHandler} ingredients={this.props.ings} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>

            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.totalPrice,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps)(Checkout);
