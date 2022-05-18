import { post } from "./ApiService"

const endpoint = "/users"

export const registerUser = (body) => {
    return post(endpoint, false, body);
}