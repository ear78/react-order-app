import React from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then((res)=> {
            console.log(res.data);
            const fetchOrders = [];
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchOrders})
        })
        .catch(err => {
            this.setState({loading: false})
        })
    }

    render(){
        return (
            <div>
                {/*you can also use +order.price to convert to number before passing props*/}
                {this.state.orders.map((order) => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        />
                ))}
            </div>
        );
    }
}

export default Orders;
