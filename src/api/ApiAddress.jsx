import { BASEURLADDRESS } from "./ApiConst";
import { get, post } from "./ApiService"

const endpointAddress = BASEURLADDRESS + "/addresses";
const endpointLocalities = BASEURLADDRESS + "/localities";

export const getLocalities = () => {
    return get(endpointLocalities, false);
}

export const postAddress = (body) => {
    return post(endpointAddress, false, body)
}