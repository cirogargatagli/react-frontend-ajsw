import Axios from "axios";

export const BASEURL = "http://localhost:8080/api"

export async function post(endpoint, auth, body) {
    const headers = await getHeaders(auth);
    return Axios.post(endpoint, body, { headers })
}

export async function get(endpoint, auth) {
    let headers = await getHeaders(auth);
    return Axios.get(endpoint, { headers });
}

export async function patch(endpoint, auth) {
    let headers = await getHeaders(auth);
    return Axios.patch(endpoint, { headers });
}

export async function put(endpoint, auth, body) {
    let headers = await getHeaders(auth);
    return Axios.put(endpoint, body, { headers });
}

export async function del(endpoint, auth) {
    let headers = await getHeaders(auth);
    return Axios.delete(endpoint, { headers });
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