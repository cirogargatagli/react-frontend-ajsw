import { BASEURLUSER } from "./ApiConst"
import { get, post } from "./ApiService"

const endpoint = BASEURLUSER + "/persons";

export const getPersonByEmail = (email) => {
    return get(endpoint + "?email=" + email, false, email)
}

export const createPerson = (body) => {
    return post(endpoint, false, body)
}