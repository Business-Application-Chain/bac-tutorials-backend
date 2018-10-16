# buna 在线编辑后端


## 接口

#### 方法 : GET
#### URL :　http://127.0.0.1:3000/buna
#### query: 
|参数| 必须 | 类型 | 说明
|--|--|--|--
|code| 是 | string| 需要解释的字符串

#### 返回示例
```json
{
    "code": 1,
    "stdout": [
        "1"
    ]
}
```
code为1代表正确, code为0代表后端出错. stdout为数组, 数组中每一个小项需要打印的一行.



## 安装

```shell
make
```

## 测试

```shell
make test
```

## 查看

```
pm2 list
```

