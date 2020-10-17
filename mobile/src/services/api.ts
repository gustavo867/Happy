import axios from "axios";

const api = axios.create({
  baseURL: "https://happy-gustavo-deploy.herokuapp.com/",
});

export default api;
