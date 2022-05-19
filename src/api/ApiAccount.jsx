import { BASEURLUSER } from "./ApiConst"
import { post } from "./ApiService"

const endpoint = BASEURLUSER + "/accounts";

export const signIn = (body) => {
    return post(endpoint + "/login", false, body)
}

export const postAccount = (body) => {
    return post(endpoint, false, body);
}