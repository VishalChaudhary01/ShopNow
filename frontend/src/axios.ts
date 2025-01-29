import axios from "axios";

axios.defaults.withCredentials = true;

const instance = axios.create({
     baseURL: import.meta.env.VITE_BACKEND_URL
})

export default instance;