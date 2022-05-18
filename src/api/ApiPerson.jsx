import { get } from "./ApiService"

const endpoint = "/persons"

export const getPersonByEmail = (email) => {
    return get(endpoint + "?email=" + email, false, email)
}