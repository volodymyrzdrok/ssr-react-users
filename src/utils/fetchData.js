import axios from "axios";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
