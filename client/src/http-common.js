import axios from "axios";

export default axios.create({
  baseURL: "https://7cd1-2401-4900-1c09-cb0d-403e-68d0-45e2-d9e.ngrok-free.app/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});