import * as actions from '../actions/actions'


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
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1,
                },
                price: state.price+PRICES[action.ingredientName]
            };

        case actions.REMOVE_INGREDIENT:
            if(state.ingredients[action.ingredientName]>0){
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1,
                },
                price: state.price-PRICES[action.ingredientName]
            };
        }
        else{
            return state;
        }
        case actions.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                price:4,
            }
        default:
            return state;
    };
}

export default reducer;