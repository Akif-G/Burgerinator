import * as actions from '../actions/actions'
import { updateObject } from '../utility'


const PRICES = {
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5,
}


const initialState = {
    ingredients: null,
    price: 4,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]+1,}
            const updatedIngredients=updateObject(state.ingredients,updatedIngredient);
            const updatedState={
                ingredients:updatedIngredients,
                price: state.price+PRICES[action.ingredientName]
            }
            return updateObject(state,updatedState);

        case actions.REMOVE_INGREDIENT:
            if(state.ingredients[action.ingredientName]>0){
            const updated={[action.ingredientName]:state.ingredients[action.ingredientName]-1,}
            const updateds=updateObject(state.ingredients,updated);
            const updatedSTATE={
                ingredients:updateds,
                price: state.price-PRICES[action.ingredientName]
            }
            return updateObject(state,updatedSTATE);
        }
        else{
            return state;
        }
        case actions.SET_INGREDIENTS:
            const newIng={ingredients:action.ingredients,price:4};
            return updateObject(state,newIng);
        default:
            return state;
    };
}

export default reducer;