/**
 * @Author: richen 
 * @Date: 2017-12-13 11:41:20 
 * @Copyright (c) - <richenlin(at)gmail.com>
 * @Last Modified by: richen
 * @Last Modified time: 2018-03-02 12:41:08
 */
const lib = require('think_lib');
const jwt = require('jsonwebtoken');

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

    return function (ctx, next) {
        lib.define(ctx, 'jwtEncode', function (payload) {
            if (lib.isEmpty(payload) || !lib.isObject(payload)) {
                throw Error('must be plain Object.');
            }
            payload.sub = payload.sub || options.sub;
            payload.exp = lib.datetime() + lib.toInt(options.exp);
            return jwt.sign(payload, options.key, { algorithm: options.alg });
        });
        lib.define(ctx, 'jwtDecode', async function (token) {
            // const token = ctx.get('x-access-token') || ctx.param('accessToken');

            let uuid = '';
            try {
                if (lib.isEmpty(token)) {
                    throw Error('TOKEN签名丢失');
                }
                const decoded = jwt.decode(token, { complete: true }, options.key || '');
                if (lib.isEmpty(decoded) || lib.isEmpty(decoded.payload) || lib.isEmpty(decoded.payload.iss)) {
                    throw Error('TOKEN无效');
                }

                //verify
                jwt.verify(token, options.key, { algorithm: options.alg });

                uuid = decoded.payload.iss || '';
            } catch (err) {
                // return ctx.json
                if (err.message && err.message.indexOf('expired') > -1) {
                    throw Error('TOKEN已经过期');
                } else {
                    throw Error('TOKEN无效');
                }
            }
            if (lib.isEmpty(uuid)) {
                throw Error('TOKEN无效,UUID为空');
            }
            return uuid;
        });

        return next();
    };
};