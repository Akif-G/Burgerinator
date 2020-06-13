import React, { Component } from "react";
import buttonstyle from "../../../components/Burger/Ingredient.js/OrderSummary/OrderSummary.css"
import styles from "./ContactData.css"
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index'


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
        const formData={};
        for(let element in this.state.orderForm){
            formData[element]=this.state.orderForm[element].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            order:formData,
            userId:this.props.userId
        };
        //CALL TO REDUX dispatched event
        this.props.onOrderBurger(order,this.props.token);
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
        let disablitiy=buttonstyle.Success
        if(!this.state.validity){
            disablitiy=  buttonstyle.Danger
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
                    [buttonstyle.Button, disablitiy].join(' ')
                    
                    }
                    disabled={!this.state.validity}
                >Order</button>
            </form>
        );

        if (this.props.loading) form = <Spinner></Spinner>
        return (
            <div className={styles.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId,
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger:(orderData,TOKEN)=>dispatch(actions.purchaseBurger(orderData,TOKEN))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)( ContactData);