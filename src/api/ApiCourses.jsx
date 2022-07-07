import { BASEURLCOURSES } from "./ApiConst"
import { del, get, post, put } from "./ApiService"

const endpoint = BASEURLCOURSES + "/courses";

export const getCourses = (idActivity = 0, idLocality = 0) => {
    return get(endpoint + "/?idLocality=" + idLocality + "&idActivity=" + idActivity, false)
}

export const getFullCourses = () => {
    return get(endpoint + "/full", false)
}

export const getCourse = (id) => {
    return get(endpoint + "?id=" + id, false)
}

export const createCourse = (body) => {
    return post(endpoint, false, body);
}

export const deleteCourse = (id) => {
    return del(endpoint + "/" + id, false);
}

export const updateCourse = (body) => {
    return put(endpoint, false, body);
}