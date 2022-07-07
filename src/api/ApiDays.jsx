import { BASEURLCOURSES } from "./ApiConst"
import { get } from "./ApiService"

const endpoint = BASEURLCOURSES + "/days";

export const getDays = () => {
    return get(endpoint, false)
}