

let Mock = require('mockjs');

var Random = Mock.Random;

module.exports = function () {
    var data = {};
    data.user = {
        'name': Random.cname(),
        'intro': Random.word(20)
    };
    data.login = {
        'status': 1,
        'currentAuthority': 'admin'
    };
    return data;
};