import axios from "axios";

export default axios.create({
  baseURL: "https://e51d-2401-4900-1c08-43cf-6175-704a-7b7-f0bf.ngrok-free.app/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});