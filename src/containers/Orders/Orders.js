import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
    }
    componentDidMount(){
        this.props.onFetchOrders();
    }

    render(){
        let orders = <Spinner />;
        if(!this.props.loading) {
            {/*you can also use +order.price to convert to number before passing props*/}
        orders = this.props.orders.map((order) => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => {
            dispatch(actions.fetchOrders())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
