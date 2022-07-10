import { BASEURLUSER } from "./ApiConst"
import { post } from "./ApiService"

const endpoint = BASEURLUSER + "/clients";

export const createClient = (body) => {
    return post(endpoint, false, body)
}