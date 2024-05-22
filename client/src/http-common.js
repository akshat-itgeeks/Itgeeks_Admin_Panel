import axios from "axios";

export default axios.create({
  baseURL: "https://ff42-2401-4900-1ca3-d799-b4dd-1931-5021-adc5.ngrok-free.app/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});