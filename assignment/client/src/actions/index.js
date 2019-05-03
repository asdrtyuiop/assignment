import axios from 'axios'
import { 
    AUTH_SIGN_UP, 
    AUTH_ERROR, 
    AUTH_SIGN_OUT, 
    AUTH_SIGN_IN,
    DASHBOARD_GET_DATA,
PRODUCTS_GET_DATA } from './types'

export const signUp = data => {
    return async (dispatch) => {
        try {
            console.log('ActionCreator SIGNUP CALLED');
            const res = await axios.post('http://localhost:5000/users/signup', data)
            //console.log('res',res)
            console.log('ActionCreator SIGNUP dispatched an action')
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        }catch(err){
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email used'
            })
            console.log('err', err);
        }
    }
}

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = '';
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })

    }
}

export const signIn = data => {
    return async (dispatch) => {
        try {
            console.log('ActionCreator SIGNUP CALLED');
            const res = await axios.post('http://localhost:5000/users/signin', data)
            //console.log('res',res)
            console.log('ActionCreator SIGNIN dispatched an action')
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        }catch(err){
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email and password error'
            })
            console.log('err', err);
        }
    }
}

export const getSecret = () => {
    return async dispatch => {
        try{
            console.log('[ActionCreator] trying get BE data')
            const res = await axios.get('http://localhost:5000/users/secret')
            console.log('res',res)

            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data.secret

            })
        } catch(err){
            console.error('err', err)
        }
    }
}

export const getproduct = () =>{
    return async dispatch => {
        try{
            console.log('[ActionCreator] try get data')
            const res = await axios.get('http://localhost:5000/users/products')
            console.log('111111111111111111111111111111111111111111111111')
            console.log('res',res.data[0])
            console.log('res',res.data[0].title)
            console.log('res',res.data[0].company)

            dispatch({
                type: PRODUCTS_GET_DATA,
                payload: res.data[0]
            })
        }catch(err){
            console.error('err',err)
        } 
    }
}