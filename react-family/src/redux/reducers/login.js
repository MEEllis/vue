//reducer是根据state和action生成新state的纯函数。

import {GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL} from 'actions/login';

const initState = {
    status: -1,
    currentAuthority: '',
  
};

export default function reducer(state = initState, action) {
    console.log('reducer-login'+action.type)

    switch (action.type) {
        case GET_USER_INFO_REQUEST:
        console.log(action)
            return {
                ...state,
            };
        case GET_USER_INFO_SUCCESS:
        console.log(action)
            return {
                ...state,
            };
        case GET_USER_INFO_FAIL:
        console.log(action)
            return {
                ...state,
            };
        default:
            return state;
    }
}