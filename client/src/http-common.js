import axios from "axios";

export default axios.create({
  baseURL: "https://a5ad-2401-4900-1c08-43cf-2046-7f85-14ac-82b3.ngrok-free.app/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});