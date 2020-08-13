import axios from "axios";
axios.defaults.headers.common = {
    "Content-Type": "application/json"
  }


const endpoints = {
development: 'https://backchelas.herokuapp.com/',
//development: 'http://localhost:8080/',
};

export const api = axios.create({
baseURL: endpoints['development'],
timeout: 200000,
 headers: {"Content-type":"application/json" }
});
