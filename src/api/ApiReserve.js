import { BASEURLCOURSES } from "./ApiConst"
import { post } from "./ApiService"

const endpoint = BASEURLCOURSES + "/reserve";

export const createReserve = (body) => {
    return post(endpoint, false, body)
}