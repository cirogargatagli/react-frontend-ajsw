import { BASEURLUSER } from "./ApiConst"
import { get } from "./ApiService"

const endpoint = BASEURLUSER + "/instructors";

export const getInstructors = () => {
    return get(endpoint, false)
}
