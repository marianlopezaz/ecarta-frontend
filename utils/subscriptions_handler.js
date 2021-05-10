import React, { useState } from "react";

import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";


// Import Redux
import { useDispatch } from "react-redux";
import api from "./config";
import { getCurrentSubscription } from "./subscription_crud";
import { forcedLogout } from "../redux/actions/userActions";
import { useRouter } from "next/router";




const url = `${api.api_url}/subscription/my`;

export async function SubscriptionHandler(){

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();
  
  let { data } = useSWR(url, (url) =>
    getCurrentSubscription(url, user.user.auth_token).then((result) => {
      if (result.success == true) {
        return result.result;
      } else {
        if (result.unauthorized) {
          dispatch(forcedLogout()).then((status) => {
            if (status) {
              router.push("/login");
            }
          });
        }
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    }) 
    
  );

  mutate(url);
  return data

}