import { BASEURLCOURSES } from "./ApiConst"
import { del, get, post } from "./ApiService"

const endpoint = BASEURLCOURSES + "/activities";

export const getActivities = () => {
    return get(endpoint, false)
}

export const createActivity = (body) => {
    return post(endpoint, true, body)
}

export const deleteActivity = (id) => {
    return del(endpoint + "/" + id, true)
}