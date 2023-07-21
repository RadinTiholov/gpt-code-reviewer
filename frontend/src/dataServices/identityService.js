import * as request from "./requester"

const login = (data) => {
    return request.post(`${process.env.REACT_APP_BASE_URL}/identity/login`, data)
}

const register = (data) => {
    return request.post(`${process.env.REACT_APP_BASE_URL}/identity/register`, data)
}

export {
    login,
    register
}