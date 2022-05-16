import { post } from "./ApiService"

const endpoint = "/user"

export const registerUser = (body) => {
    return post(endpoint, false, body);
}