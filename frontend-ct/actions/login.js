export const SET_LOGIN_ID = 'SET_ID';
export const setLoginId = (id) => {
    return{
        type:SET_LOGIN_ID,
        payload: id,
    }
}
