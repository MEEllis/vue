//////////////////////////////
// 序列化为 JSON 字符串
//////////////////////////////

export function serializeJSON(str) {
    if (typeof str == 'string') {
        // 如果传入的 str 是一个表单字符串：key=value&key1=value1
        let obj = {};

        str.replace(/([^&]*)=([^&]*)/g, function (match, key, value) {
            return obj[key] = value;
        });

        return JSON.stringify(obj);
    } else if (typeof str == 'object') {
        // 如果传入的 str 是一个对象：{ key: 'value', key1: 'value1'}
        return JSON.stringify(str);
    }
}


//////////////////////////////
// 使用示例
//////////////////////////////

// serializeJSON('key=value&key1=value1')  // '{ "key": "value", "key1": "value1"}'
// serializeJSON({ key: 'value', key1: 'value1'})  // '{ "key": "value", "key1": "value1"}'
