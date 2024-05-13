import axios from "axios";
const instance = axios.create({
  baseURL: "https://medicare-nextjs-dashboard-zyx.vercel.app/api/",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
