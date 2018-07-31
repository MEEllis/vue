//////////////////////////////
// 转换（拼接）为表单字符串
//////////////////////////////

export function toParams(obj) {
    if (typeof obj == 'string') {
        // 如果传入的 obj 是一个字符串（经过 JSON.stringify() 处理）：'{ "key": "value", "key1": "value1"}'
        obj = JSON.parse(obj);
    }

    // 如果传入的 obj 是一个对象：{key: "value", key1: "value1"}
    var key, value, _str, str, strResult;

    for (key in obj) {
        value = obj[key];

        // 拼接一个单元
        _str = '&' + key + '=' + value;

        // 拼接所有
        str += _str;

        // 返回一个去掉 "undefined&" 的子字符串
        strResult = str.substring(10)
    }

    return strResult;
}


//////////////////////////////
// 使用示例
//////////////////////////////

// toParams('{ "key": "value", "key1": "value1"}')  // key=value&key1=value1
// toParams({key: value, key1: value1})  // key=value&key1=value1
