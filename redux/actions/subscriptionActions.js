// Import Componentes
import * as types from "../types";


export const loadingNewSubscription = () => async (dispatch) => {
    return dispatch({ type: types.LOADING_NEW_SUBSCRIPTION , payload: 'new'});
  };
  

  export const noloadingNewSubscription = () => async (dispatch) => {
    return dispatch({ type: types.NO_LOADING_NEW_SUBSCRIPTION});
  };


  export const selectSubscription = (subscription_id) => async (dispatch) => {
    return dispatch({ type: types.SELECT_SUBSCRIPTION, payload: subscription_id});
  };
  
  