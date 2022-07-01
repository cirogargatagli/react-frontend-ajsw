import { BASEURLCOURSES } from "./ApiConst"
import { get } from "./ApiService"

const endpoint = BASEURLCOURSES + "/activities";

export const getActivities = () => {
    return get(endpoint, false)
}