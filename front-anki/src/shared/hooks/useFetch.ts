import axios from 'axios';
const client = axios.create({
  baseURL: 'http://localhost:3001/api/v1/',
});

export function useFetch() {
  return {
    get: client.get,
    post: client.post,
    delete: client.delete,
    put: client.put,
    request: client.request,
  };
}
