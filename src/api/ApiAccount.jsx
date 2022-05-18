import { post } from "./ApiService"

const endpoint = "/accounts"

export const signIn = (body) => {
    return post(endpoint + "/login", false, body)
}