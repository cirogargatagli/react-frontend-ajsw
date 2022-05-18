import { get } from "./ApiService"

const endpoint = "/addresses"

export const getLocalities = () => {
    return get(endpoint, false);
}