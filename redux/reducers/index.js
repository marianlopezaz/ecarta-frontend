import {combineReducers} from 'redux'
import userReducer from '../reducers/userReducer'
import subscriptionReducer from './subscriptionReducer';
import smallSubscriptionReducer from './smallSubscriptionReducer'

export default combineReducers({
    user: userReducer,
    subscriptions: subscriptionReducer,
    smallSubscriptions: smallSubscriptionReducer
});