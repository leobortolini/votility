import axios from "axios"

const baseURL = import.meta.env.VITE_VOTE_DNS

export const voteService = axios.create({
    baseURL,
})
