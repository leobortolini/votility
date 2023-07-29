import axios from "axios"

const baseURL = import.meta.env.VITE_POLL_DNS

export const pollService = axios.create({
    baseURL,
})
