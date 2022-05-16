import Axios from "axios";

export const BASEURL = "localhost:8080/api"

export async function post(endpoint, auth, body) {
    const headers = await getHeaders(auth);
    return Axios.post(BASEURL + endpoint, { headers })
}

export async function get(endpoint, auth) {
    let headers = await getHeaders(auth);
    return Axios.get(BASEURL + endpoint, { headers });
}

export async function patch(endpoint, auth) {
    let headers = await getHeaders(auth);
    return Axios.patch(BASEURL + endpoint, { headers });
}

export async function del(endpoint, auth) {
    let headers = await getHeaders(auth);
    return Axios.del(BASEURL + endpoint, { headers });
}

export async function getHeaders(auth) {
    let headers = {
        "content-type": "application/json",
        accept: "application/json"
    };
    if (auth) {
        try {
            const token = localStorage.getItem("token");
            headers = Object.assign({ Authorization: "Bearer " + token }, headers);
        } catch (e) {
            console.log(e)
        }
    }
    return headers;
}