import axios from "axios";
axios.defaults.headers.common = {
    "Content-Type": "application/json"
  }


const endpoints = {
development: 'https://moebsen-backend.herokuapp.com/',
//development: 'http://localhost:8080/',
};

export const api = axios.create({
baseURL: endpoints['development'],
timeout: 20000,
 headers: {"Content-type":"application/json" }
});
