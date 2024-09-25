import axios from "axios";
const client = axios.create({});

export function useFetch() {
  return {
    get: client.get,
    post: client.post,
    delete: client.delete,
    put: client.put,
    request: client.request,
  };
}
