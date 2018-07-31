import { message } from 'antd'

////////////////////////////////
// 获取 JSON 数据，包括异常处理
////////////////////////////////

export function getData(url, options, callback) {

    let reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'application/json')
    // reqHeaders.append('token', ' ');

    var options = options || {};

    let config = {
        headers: reqHeaders,
        mode: 'cors', // cors, no-cors
        credentials: 'include', // omit, same-origin, include
        method: 'POST',
        body: JSON.stringify(options.string || options),
    };

    let defaults = {
        timeout: options.timeout ? options.timeout : 60000, // 60000
    }

    let reqConfig = Object.assign({}, config, defaults);

    // 异步请求超时机制 - 1
    function timeoutPromise(ms, promise) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject('请求超时（1分钟），请刷新浏览器重新请求')
            }, ms);
            promise.then((res) => {
                clearTimeout(timeoutId);
                resolve(res);
            }, (err) => {
                clearTimeout(timeoutId);
                reject(err);
            });
        })
    }
    // 异步请求超时机制
    // return Promise.race([
    //     fetch(url, reqConfig),
    //     new Promise(function (resolve, reject) {
    //         setTimeout(() => reject('请求超时（1分钟），请刷新浏览器重新请求'), reqConfig.timeout)
    //     })
    // ])
    return timeoutPromise(reqConfig.timeout, fetch(url, reqConfig)) // 1
        // return fetch(url, reqConfig)
        .then(
        (response) => {
            // [HTTP Status] 200: OK
            if (response.ok) {
                return response.json();
            }
            // [HTTP Status] 404: Not Found
            // [HTTP Status] 405: Method Not Allowed
            else {
                throw new Error(response.status + ' (' + response.statusText + ')')
            }
        },
        (err) => {
            message.error(err);
            return window.location.href = '/';
        }
        )
        .then((res) => {
            // 【异常处理】所有数据接口的返回，除了网络等环境异常外，后端代码中都需要捕获并返回约定的状态码
            // Status
            // PositionCode
            // ErrorCode

            // Data.Context
            // Message
            switch (res.Status) {
                case '500':
                case '501':
                    // 500：内部错误 => 显示消息提示
                    // 501: 库存不足 => 显示消息提示
                    //console.log( '500: ', JSON.stringify(res, null, 4) );
                    message.error(res.Message);
                    return res;
                    break;
                case '502':
                    // 502：访问超时 => 清除本地登录记录，并跳转到登录页
                    localStorage.setItem('km:loginFlow', '{}');
                    return window.location.href = '/login';
                    break;
                case '401':
                case '402':
                    // 401、402：无访问权限
                    return window.location.href = '/';
                    break;
                default:
                    // 200：正常 => 显示数据
                    //console.log( '200: ', JSON.stringify(res, null, 4) );
                    if(typeof callback == 'object'){
                        callback(res);
                    }
                    return res;
            }
        })
    // .catch( error => {
    //     console.error(error);
    // } );
}

////////////////////////////////
// 使用示例
////////////////////////////////
// https://github.github.io/fetch/

// getJSON(url, {
//     method: 'POST',
//     body: serializeJSON(condition),
//     timeout: 60000,
// });
