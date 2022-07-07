import { BASEURLCOURSES } from "./ApiConst"
import { get, post } from "./ApiService"

const endpoint = BASEURLCOURSES + "/reserves";

export const createReserve = (body) => {
    return post(endpoint, false, body)
}

export const getReserves = (id) => {
    return get(endpoint + "/users/" + id, false)
}