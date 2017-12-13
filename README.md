# 介绍
-----

[![npm version](https://badge.fury.io/js/think_jwt.svg)](https://badge.fury.io/js/think_jwt)
[![Dependency Status](https://david-dm.org/thinkkoa/think_jwt.svg)](https://david-dm.org/thinkkoa/think_jwt)

JWT token for ThinkKoa.

# 安装
-----

```
npm i think_jwt
```

# 使用
-----
注意: think\_jwt 中间件依赖 think\_chache 中间件,在使用此中间件之前,请安装配置cache中间件

1、项目中增加中间件 middleware/jwt.js
```js
module.exports = require('think_jwt');
```

2、项目中间件配置 config/middleware.js:
```js
list: [..., 'jwt'], //加载的中间件列表
config: { //中间件配置
    ...,
    jwt: {
        alg: "HS256", //算法
        sub: 'jwt', //主题
        exp: 86400, //过期时间, now() + 86400
        key: 'ThinkKoa', //Secret,签名密码,请务必根据实际情况修改
    }
}
```

3、使用

```js
// in controller
let token = this.ctx.jwtEncode({userid: 'aaaaaaaaaa'});
return this.ok('', token);
....
// check
if (this.ctx.jwtDecode(token)){
    // isLogin
}

// in middleware 
let token = ctx.jwtEncode({userid: 'aaaaaaaaaa'});
ctx.body = token;
...
// check
if (ctx.jwtDecode(token)){
    // isLogin
}

```