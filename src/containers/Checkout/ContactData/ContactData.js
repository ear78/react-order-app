import React from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
        this.setState({
        	loading: true
        })
        const order = {
        	ingredients: this.props.ingredients,
        	price: this.props.price,
        	customer: {
        		// name: 'Elliot',
        		// address: {
        		// 	street: 'Test Street 1',
        		// 	zipCode: '54433',
        		// 	country: 'Germany'
        		// },
        		// email: 'test@test.com'
        	}
        	// deliveryMethod: 'Fastest'
        }
        axios.post('/orders.json', order)
        	.then(response => {
                console.log(this.props);
        		this.setState({ loading: false });
                this.props.history.push('/');
        	})
        	.catch(error => {
        		this.setState({ loading: false })
        	});
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
            <form>

                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value}/>
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

export default ContactData;
