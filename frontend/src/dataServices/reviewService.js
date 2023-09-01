import * as request from "./requester"

const reviewCode = (data) => {
    return request.post(`${process.env.REACT_APP_BASE_URL}/Reviewer/Review`, data)
}

export {
    reviewCode
}