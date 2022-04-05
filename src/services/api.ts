import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://enigmatic-island-70262.herokuapp.com'
})
