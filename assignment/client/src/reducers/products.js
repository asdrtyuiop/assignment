import { PRODUCTS_GET_DATA } from '../actions/types'

const DEFAULT_STATE = {
    products: [],

}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case PRODUCTS_GET_DATA:
            return { ...state, products: action.payload }
        default:
        return state
    }
}