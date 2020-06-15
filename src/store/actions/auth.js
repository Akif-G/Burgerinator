import * as actions from "./actions"
import Axios from "axios";
import {config} from "../../../config"

export const authStart = () => {
    return {
        type: actions.AUTH_START,
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    }
}

export const authFail = (err) => {
    return {
        type: actions.AUTH_FAIL,
        error: err,
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirtionDate');
    localStorage.removeItem('userId');
    return {
        type: actions.AUTH_LOGOUT,
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password, isSignin) => {
    return dispatch => {
        dispatch(authStart())
        const AuthData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let defaultURL = config.SIGNUP_KEY
        if (isSignin) {
            defaultURL = config.SIGNIN_KEY
        }
        Axios.post(defaultURL, AuthData)
            .then(res => {
                const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', expDate);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeOut(res.data.expiresIn * 1000));
            }
            )
            .catch(err => {
                try{
                dispatch(authFail(err.response.data.error))
                }
                catch(err){dispatch(authFail({message:"no network"}))}
            }
            )
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expDate = new Date(localStorage.getItem('expirationDate'));
            console.log(expDate,new Date())
            if (expDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut(expDate.getTime() - new Date().getTime()))
            }
            else {
                dispatch(logout());
            }
        }
    }
};