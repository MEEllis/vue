export const GET_USER_INFO_REQUEST = "login/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "login/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "login/GET_USER_INFO_FAIL";

export function postLogin(data,afterSuccess) {
    return {
        types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
        promise: client => client.post(`/api/login`,data),
        afterSuccess:(dispatch,getState,response)=>{
            if(afterSuccess){
                afterSuccess(dispatch,getState,response)
            }
        }
    }
}