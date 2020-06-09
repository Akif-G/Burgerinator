import React, { Component, Fragment } from "react";
import Burger from '../../components/Burger/Burger'
import Builder from "../../components/Burger/Builder/Builder";
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from '../../store/actions'
import {connect} from 'react-redux'


class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false,
        }
    }

    componentDidMount() {
        // axios.get("https://react-my-burger-387a1.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
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
       return sum > 0 
    }


    Purchase = () => {
        this.setState({ purchasing: true })
    }


    PurchaseTakeBack = () => {
        this.setState({ purchasing: false })

    }

    purchaseContinue = () => {

        this.setState({ loading: true });

        this.props.history.push("/checkout");
    }

    render() {
        let burger = <Spinner/>
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
    return{
        ings: state.ingredients,
        price:state.price,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actions.ADD_INGREDIENT, ingredientName: ingName }),

        onIngredientRemoved: (ingName) => dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName: ingName })
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);