import axios from "axios"

const baseURL = "http://localhost:8080/api/v1/poll"

export const pollService = axios.create({
    baseURL,
})
