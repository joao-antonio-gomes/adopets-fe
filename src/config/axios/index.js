import axios from "axios";

const backendClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});

const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

export { httpClient, backendClient };
