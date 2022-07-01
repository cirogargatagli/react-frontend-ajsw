import { BASEURLCOURSES } from "./ApiConst"
import { get } from "./ApiService"

const endpoint = BASEURLCOURSES + "/courses";

export const getCourses = (idActivity, idLocality) => {
    return get(endpoint + "/?idLocality=" + idLocality + "&idActivity=" + idActivity, false)
}

export const getCourse = (id) => {
    return get(endpoint + "?id=" + id, false)
}