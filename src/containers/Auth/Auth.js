import React, { Component, Fragment } from 'react';
import Input from '../../components/UI/Input/Input';
import buttonstyle from "../../components/Burger/Ingredient.js/OrderSummary/OrderSummary.css";
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';
import {checkValidity} from '../../store/utility'
import Logo from '../../components/Logo/Logo';
import styles from './Auth.css'
class Auth extends Component {
    //do not use redux: info dont get out to app for security...
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: ' Mail Address '
                },
                value: '',
                validation: {
                    required: true,
                },
                validity: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: ' Password '
                },
                value: '',
                validation: {
                    required: true,
                    minLenght: 6,
                },
                validity: false,
                touched: false,
            },
        },
        validity: false,
        isSignin: true,
    }


    InputChanged = (event, inputIdentifier) => {
        const updatedForm =
            { ...this.state.controls }
        const updatedElement =
            { ...updatedForm[inputIdentifier] }
        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.validity = checkValidity(updatedElement.value, updatedElement.validation)
        updatedForm[inputIdentifier] = updatedElement;
        let formIsValid = true;
        for (let input in updatedForm) {
            formIsValid = updatedForm[input].validity && formIsValid;
        }
        this.setState({ controls: updatedForm, validity: formIsValid })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignin)
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return { isSignin: !prevState.isSignin }
        })
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        };
        let Form = formElementsArray.map(formElement =>
            <div className={styles.Former}>
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.InputChanged(event, formElement.id)}
                invalid={!formElement.config.validity}
                shouldValid={formElement.config.validation}
                touched={formElement.config.touched}
            />
            </div>
        );
        let disability = buttonstyle.Success
        if (!this.state.validity) {
            disability = buttonstyle.Danger
        };
        if(this.props.loading)Form=<Spinner/>;

        let errorMessage=null;
        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            )
        }
        let AuthRedirect=null;
        if(this.props.isAuth){
            if(this.props.isOrdered)
            AuthRedirect= <Redirect to ="/checkout"/>
            else
            AuthRedirect= <Redirect to ="/"/>
        };
        return (
            <div className={styles.Auth}>
            <Logo onClick={()=>{}} top={"0"}/>                     
            <form onSubmit={this.submitHandler} className={styles.Form}>
           
                    {Form}
                       <button className={
                        [buttonstyle.Button, disability].join(' ')
                    }
                        disabled={!this.state.validity}
                    > {this.state.isSignin ? 'SIGN IN' : 'SIGN UP'}</button>
                    {errorMessage}
                </form>
                    <button style={{
                        color: "whitesmoke",
                        borderRadius:"2%",
                        backgroundColor: "#555",
                        border: "none",
                        padding: 0,
                        height: "40px",
                        width: "100px",
                    }}
                    onClick={this.switchAuthMode}
                    >I need to <br></br> {this.state.isSignin ? 'SIGN UP' : 'SIGN IN'}</button>
        {AuthRedirect}
            </div>
        );
    }
}

const mapStateToProps =state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token!==null,
        isOrdered: state.burgerBuilder.isOrdered,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,isSignin) => dispatch(actions.auth(email, password,isSignin))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);