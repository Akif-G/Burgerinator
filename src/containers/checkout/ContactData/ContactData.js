import React, { Component } from "react";
import buttonstyle from "../../../components/Burger/Ingredient.js/OrderSummary/OrderSummary.css"
import uuidv4 from 'uuid/v4';
import axios from '../../../axios-orders'
import styles from "./ContactData.css"
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";


const ID = uuidv4()

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ' Your name'
                },
                value: '',
                validation:{
                    required:true,
                },
                validity:false,
                touched:false,
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: ' Your E-mail'
                },
                value: '',
                validation:{
                    required:true,
                },
                validity:false,
                touched:false,
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ' Street'
                },
                value: '',
                validation:{
                    required:true,
                },
                validity:false,
                touched:false,
            },

            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation:{
                    required:true,
                },
                validity:false,
                touched:false,
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                       { value:'fastest', displayValue:'Fastest'},
                       { value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{
                    required:false,
                },
                validity:true,
                touched:false,
            },
        },
        loading:false,
        price:4,
        validity:false,
    }

    checkValidity=(value,rules)=>{
        let isValid=true;
        if (rules.required){
            isValid=value.trim()!=='' && isValid;
        }
        return isValid;
    };

    orderHandler = (event) => {
        //it is importante since forms are sending request and reloads page
        event.preventDefault();
        this.setState({ loading: true });
        const formData={};
        for(let element in this.state.orderForm){
            formData[element]=this.state.orderForm[element].value;
        }
        const order = {
            ingridients: this.props.ingredients,
            price: this.props.price,
            customerID: ID,
            order:formData,
        };
        axios.post('/orders.json', order)
            .then(res => {
                console.log(res)
                this.setState({ loading: false, })
                this.props.history.push('/')
            })
            .catch(err => { this.setState({ loading: false, }) });
        console.log(this.state.validity)

    }
    InputChanged = (event,inputIdentifier) => {
        //console.log(event.target.value);
        const updatedForm=  
            {...this.state.orderForm}
        const  updatedElement=
            {...updatedForm[inputIdentifier]}
        updatedElement.value=event.target.value;
        updatedElement.touched=true;
        updatedElement.validity=this.checkValidity(updatedElement.value,updatedElement.validation)
        updatedForm[inputIdentifier]=updatedElement;
        let formIsValid=true;
        for (let input in updatedForm){
            formIsValid=updatedForm[input].validity && formIsValid;
        }
        this.setState({orderForm:updatedForm,validity:formIsValid})
    }
    render() {
        const formElementsArray=[];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>(
                <Input
                key={formElement.id}
                elementType={formElement.config.elementType}           elementConfig={formElement.config.elementConfig }
                value={formElement.config.value}
                changed={(event)=>this.InputChanged(event,formElement.id)} 
                invalid={!formElement.config.validity}
                shouldValid={formElement.config.validation}
                touched={formElement.config.touched}
                />
                ))}

                <button className={
                    [buttonstyle.Button, buttonstyle.Success].join(' ')
                    
                    }
                    //onClick={this.orderHandler}
                    disabled={!this.state.validity}
                >Order</button>
            </form>
        );

        if (this.state.loading) form = <Spinner></Spinner>
        return (
            <div className={styles.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;