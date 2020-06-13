import React, { Component, Fragment } from "react";
import Burger from '../../components/Burger/Burger'
import Builder from "../../components/Burger/Builder/Builder";
import Modal from '../../components/UI/Modal/Modal'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux'


class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
        }
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    //stays here to show the method
    updatePurchaseable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }


    Purchase = () => {
        this.props.onOrder();
        if (this.props.isAuth) {
            this.setState({ purchasing: true });
        }
        else
            this.props.history.push("/auth");
    }


    PurchaseTakeBack = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinue = () => {
        this.props.onPurchaseInit();
        this.setState({ loading: true });
        this.props.history.push("/checkout");
    }

    render() {
        let burger = <Spinner />
        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Modal ingredientSummary={this.props.ings}
                        show={this.state.purchasing}
                        takeBack={this.PurchaseTakeBack}
                        purchaseContinue={this.purchaseContinue}
                        price={this.props.price}
                        loading={this.state.loading}
                    />
                    <Burger ingredients={this.props.ings} />
                    <Builder
                        add={this.props.onIngredientAdded}
                        remove={this.props.onIngredientRemoved}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseable(this.props.ings)}
                        isAuth={this.props.isAuth}
                        purchased={this.Purchase}
                    ></Builder>
                </Fragment>
            );
        }
        return (
            <Fragment>
                {burger}
            </Fragment>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        isAuth: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onOrder: () => { dispatch(actions.orderInit()) }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);