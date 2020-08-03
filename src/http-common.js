import axios from "axios";

export default axios.create({
  baseURL: "https://moebsen-backend.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});