export const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS', 
        payload: user,
    }
}

export const loginFailure = (user) => {
    return {
        type: 'LOGIN_FAILURE', 
        payload: user,
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}