import axios from "axios";

const API_URL = "http://localhost:3000";

export const registerRequest = (user) => axios.post(`${API_URL}/register`, user);