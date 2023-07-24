import axios from "axios"

const baseURL = "http://localhost:8081/api/v1/vote"

export const voteService = axios.create({
    baseURL,
})
