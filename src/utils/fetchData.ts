import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
