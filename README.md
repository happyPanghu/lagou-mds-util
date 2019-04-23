# lagou-mds-util
**typeScript规范:**[官方推荐写法](https://www.tslang.cn/docs/handbook/declaration-files/do-s-and-don-ts.html)

简招团队通用工具类

## Install

```a
npm install --save-dev lagou-mds-util
```




## Usage


```js
import {array} from 'lagou-mds-util'

array.getArray([1,2,3,5,4])
array.contain([1,2,3,4], 1)
 
```


## API


### array.getArray()

##### options.Array

Type: `Array`<br>

将数组序列化为key-value形式数组  

### array.contain(array, item)

##### options.array

Type: `Array`<br>


指定数组
##### options.item

Type: `String or Number`<br>

指定关键词





#History Record        

| 版本 | 日志 | 时间|
| ------ | ------ | ------ |
| v1.0.0 | mds util工具类第一版,暂未编译 | 2019-04-15 |