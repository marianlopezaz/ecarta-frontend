import * as types from "../types";
//import {Context, HYDRATE} from 'next-redux-wrapper';

var initialState;
initialState = {
loadingAction: false,
indexSubscription: null
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_SUBSCRIPTION:
      return {
        ...state,
        loadingAction:true,
        indexSubscription: action.payload
      };
    
      case types.NO_LOADING_SUBSCRIPTION:
        return {
          ...state,
          loadingAction:false,
          indexSubscription: null
        };

    case types.LOADING_NEW_SUBSCRIPTION:
      return {
        ...state,
        loadingAction:true,
        indexSubscription: action.payload
      };

      case types.NO_LOADING_NEW_SUBSCRIPTION:
        return {
          ...state,
          loadingAction:false,
          indexSubscription: action.payload
        };
  
    default:
      return state;
  }
};

export default subscriptionReducer;
