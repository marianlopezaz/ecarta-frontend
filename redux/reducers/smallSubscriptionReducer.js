import * as types from "../types";
//import {Context, HYDRATE} from 'next-redux-wrapper';

var initialState;
initialState = {
selected: false,
idSubscription: null
};

const smallSubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_SUBSCRIPTION:
      return {
        ...state,
        selected:true,
        idSubscription: action.payload
      };


    default:
      return state;
  }
};

export default smallSubscriptionReducer;
