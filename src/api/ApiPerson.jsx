import { BASEURLUSER } from "./ApiConst"
import { del, get, post, put } from "./ApiService"

const endpoint = BASEURLUSER + "/persons";

export const getPersonByEmail = (email) => {
    return get(endpoint + "?email=" + email, false, email)
}

export const createPerson = (body) => {
    return post(endpoint, false, body)
}

export const deletePerson = (id) => {
    return del(endpoint + "/" + id, false)
}

export const updatePerson = (body) => {
    return put(endpoint, false, body);
}

export const getUsers = () => {
    return get(endpoint + "/", false)
}