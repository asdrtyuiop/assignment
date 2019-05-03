import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authDeducer from './auth';
import dashboardReducer from './dashboard';
import productsReducer from './products';

export default combineReducers({
    form: formReducer,
    auth: authDeducer,
    dash: dashboardReducer,
    item: productsReducer
});