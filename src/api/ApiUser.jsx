import { BASEURLUSER } from "./ApiConst";
import { post } from "./ApiService"

const endpoint = "/users"

export const registerUser = (body) => {
    return post(BASEURLUSER + endpoint, false, body);
}