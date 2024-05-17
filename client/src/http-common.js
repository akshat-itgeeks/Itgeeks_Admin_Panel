import axios from "axios";

export default axios.create({
  baseURL: "https://4d9b-2401-4900-1c09-cb0d-c1d4-2db0-370d-662b.ngrok-free.app/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});