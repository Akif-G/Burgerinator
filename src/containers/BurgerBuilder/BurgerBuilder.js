import React, { Component, Fragment } from "react";
import Burger from '../../components/Burger/Burger'
import Builder from "../../components/Burger/Builder/Builder";
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";


const PRICES = {
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5,
}



class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            price: 4,
            purchaseable: false,
            purchasing: false,
            loading: false,
        }
    }

    componentDidMount() {
        axios.get("https://react-my-burger-387a1.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ ingredients: response.data })
            })
    }

    addIngridient = (type) => {
        const oldCount = this.state.ingredients[type];
        const count = oldCount + 1;
        const updated = { ...this.state.ingredients }
        updated[type] = count;
        const addPrice = PRICES[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice + addPrice;
        this.setState({ price: newPrice, ingredients: updated })
        this.updatePurchaseable(updated)
    }

    removeIngridient = (type) => {
        console.log(type)
        const oldCount = this.state.ingredients[type];
        const updated = { ...this.state.ingredients }
        if (oldCount > 0) {
            const count = oldCount - 1;
            updated[type] = count;
            const addPrice = PRICES[type];
            const oldPrice = this.state.price;
            const newPrice = oldPrice - addPrice;
            this.setState({ price: newPrice, ingredients: updated })
        }
        else window.alert("can not remove")
        this.updatePurchaseable(updated);
    }

    updatePurchaseable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchaseable: sum > 0 })
    }


    Purchase = () => {
        this.setState({ purchasing: true })
    }


    PurchaseTakeBack = () => {
        this.setState({ purchasing: false })

    }

    purchaseContinue = () => {
        /*
        //alert('You Purchased');
        this.setState({ loading: true });
        const order = {
            ingridients: this.state.ingredients, price: this.state.price,
            customerID: uuidv4()
            ,
        };
        axios.post('/orders.json', order)
            .then(res => { this.setState({ loading: false, purchasing: false }) })
            .catch(err => { this.setState({ loading: false, purchasing: false }) });
        */
       this.setState({ loading: true });
       const queryParams=[];
       for (let i in this.state.ingredients){
           queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
       }

       queryParams.push('price='+this.state.price)
       const queryString=queryParams.join('&')
        this.props.history.push({
            pathname:"/checkout",
            search:'?'+queryString
        });
    }

    render() {
        let burger = <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Modal ingredientSummary={this.state.ingredients}
                        show={this.state.purchasing}
                        takeBack={this.PurchaseTakeBack}
                        purchaseContinue={this.purchaseContinue}
                        price={this.state.price}
                        loading={this.state.loading}
                    />
                    <Burger ingredients={this.state.ingredients} />
                    <Builder
                        add={this.addIngridient}
                        remove={this.removeIngridient}
                        price={this.state.price}
                        purchaseable={this.state.purchaseable}
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

export default BurgerBuilder;