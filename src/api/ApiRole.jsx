import { BASEURLUSER } from "./ApiConst"
import { get } from "./ApiService"

const endpoint = BASEURLUSER + "/roles";

export const getRoles = () => {
    return get(endpoint, false)
}