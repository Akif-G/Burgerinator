//action creators:

import * as actions from "./actions"
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actions.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredient = (name) => {
    return {
        type: actions.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actions.SET_INGREDIENTS,
        ingredients: ingredients,
    };
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-my-burger-387a1.firebaseio.com/ingredients.json")
            .then(response => {
                console.log(response);
                dispatch(setIngredients(response.data))
            })
            .catch(error => console.log(error));
    }
};
