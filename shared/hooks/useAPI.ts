import axios from "axios";
const client = axios.create({
  baseURL: `http://localhost:3000/api`,
});

export function useAPI() {
  return {
    get: client.get,
    post: client.post,
    delete: client.delete,
    put: client.put,
    request: client.request,
  };
}
