/**
 * @Author: richen 
 * @Date: 2017-12-13 11:41:20 
 * @Copyright (c) - <richenlin(at)gmail.com>
 * @Last Modified by: richen
 * @Last Modified time: 2018-03-02 12:30:37
 */
const lib = require('think_lib');
const jwt = require('jwt-simple');

/**
* default options
*/
const defaultOptions = {
    alg: 'HS256', //算法
    sub: 'jwt', //主题
    exp: 86400, //过期时间, now() + 86400
    key: 'ThinkKoa', //Secret,签名密码,请务必根据实际情况修改
};

module.exports = function (options, app) {
    options = options ? lib.extend(defaultOptions, options, true) : defaultOptions;

    return function(ctx, next){
        lib.define(ctx, 'jwtEncode', function (payload) {
            payload.sub = payload.sub || options.sub;
            payload.exp = lib.datetime() + lib.toInt(options.exp);
            return jwt.encode(payload, options.key, options.alg);
        });
        lib.define(ctx, 'jwtDecode', function (token) {
            return jwt.decode(token, options.key, false, options.alg);
        });
        return next();
    };
};