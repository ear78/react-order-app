import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

class ContactData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Street Address'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Zip Code'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: ''
                }
            },
            loading: false
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({
        // 	loading: true
        // });
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
        	ingredients: this.props.ings,
        	price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order)
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //clone object so we don't mutate
        const updatedOrderForm = {...this.state.orderForm};
        //clone object so we don't mutate
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>

                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button className={classes.Input} btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>
                    Enter your Contact Data
                </h4>
                {form}
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

const mapDispatchToProps = (dispatch) => {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurgerStart(orderData))
}

export default connect(mapStateToProps)(ContactData);
