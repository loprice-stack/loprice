import {  LOPRICE_API_URL_S, LOPRICE_URL_S } from "client/constants";
import axios from "axios";



export function axiosLogin() {

  const instance = axios.create({
    baseURL: LOPRICE_API_URL_S,
    //timeout: 10000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": LOPRICE_URL_S,
    },
  });

  return instance;
}



export function axio() {
  //TODO implementation of multiple axios and non axios client istances for multiple users.
  // ie Normal users for demonstration, Credit and Subscription user and Platform(Task) Tasker users or workers
  const instance = axios.create({
    method: 'post', // default
    baseURL: LOPRICE_API_URL_S,
    //timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": LOPRICE_URL_S,
    },
  });

  return instance;
}

export function axio2(access_token: string) {
  //TODO implementation of multiple axios and non axios client istances for multiple users.
  // ie Normal users for demonstration, Credit and Subscription user and Platform(Task) Tasker users or workers
  const instance = axios.create({
    method: 'post', // default
    baseURL: LOPRICE_API_URL_S,
    //timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": LOPRICE_URL_S,
      "Authorization": "Bearer " + access_token
    },
  });

  return instance;
}

export function axio3(access_token: string) {
  //TODO implementation of multiple axios and non axios client istances for multiple users.
  // ie Normal users for demonstration, Credit and Subscription user and Platform(Task) Tasker users or workers
  const instance = axios.create({
    method: 'post', // default
    baseURL: LOPRICE_API_URL_S,
    //timeout: 10000,
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": LOPRICE_URL_S,
      "Authorization": "Bearer " + access_token
    },
  });

  return instance;
}

