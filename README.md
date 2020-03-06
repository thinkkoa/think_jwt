# 介绍
-----

[![npm version](https://badge.fury.io/js/think_jwt.svg)](https://badge.fury.io/js/think_jwt)

JWT token middleware for ThinkKoa.

# 安装
-----

```
npm i think_jwt
```

# 使用
-----

## Thinkkoa

1、项目中增加中间件 

```
think middleware jwt
```

2、修改 middleware/jwt.js:
```
module.exports = require('think_jwt');
```

3、项目中间件配置 config/middleware.js:
```
list: [...,'jwt'], //加载的中间件列表
config: { //中间件配置
    ...,
    jwt: {
        alg: 'HS256', //算法
        sub: 'jwt', //主题
        exp: 86400, //过期时间, now() + 86400
        key: 'ThinkKoa', //Secret,签名密码,请务必根据实际情况修改
    }
}
```

## Koatty

1、项目中增加中间件

```shell
koatty middleware jwt;
```

2、修改 middleware/Jwt.ts:

```
import { Middleware, Helper } from "koatty";
import { App } from '../App';
const jwt = require("think_jwt");

@Middleware()
export class Jwt {
    run(options: any, app: App) {
        return jwt(options, app);
    }
}
```

3、项目中间件配置 config/middleware.ts:
```
list: [...,'Jwt'], //加载的中间件列表
config: { //中间件配置
    ...,
    Jwt: {
        alg: 'HS256', //算法
        sub: 'jwt', //主题
        exp: 86400, //过期时间, now() + 86400
        key: 'ThinkKoa' //Secret,签名密码,请务必根据实际情况修改
    }
}

```

# 签名及验证

```js
// encode
const token = this.ctx.jwtEncode({userid: 'aaaaaaaaaa'});
return this.ok('', token);
....


// verify
const token = this.ctx.get('x-access-token') || this.ctx.param('accessToken');
const uuid = await this.ctx.jwtDecode(token).catch((err: any) => {
    return this.fail(err.message, "", 401);
});
// isLogin

```