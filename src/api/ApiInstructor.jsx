import { BASEURLUSER, BASEURLCOURSES } from "./ApiConst"
import { get, post } from "./ApiService"

const endpoint = BASEURLUSER + "/instructors";

export const getInstructors = () => {
    return get(endpoint, false)
}

export const createInstructor = (body) => {
    return post(endpoint, false, body)
}

export const getCoursesByInstructor = (id) => {
    return get(BASEURLCOURSES + "/courses/instructor/" + id, false)
}