## 目录

1. [概述](#summary)

1. [鉴权](#auth)

1. [用户中心](#consumer)
    
    1. [获取字典的所有类型](#user_dic_types)
    1. [获取字典值](#user_dic_get)
    1. [根据字典类型获取字典值](#user_dic_gettype)
    1. [获取用户信息](#user_info)
    1. [获取用户信息详情](#user_info_id)
    1. [获取离线查询任务](#order_info)
    1. [新增离线查询任务](#order_info_add)
    1. [获取离线查询任务详情](#order_info_id)
    1. [编辑离线查询任务](#order_info_edit)
    1. [获取离线查询用户信息](#order_info_users)
    1. [删除离线查询任务](#order_info_del)
    1. [获取标签列表](#get_tags)
    1. [自定义标签保存](#set_tag)
    1. [根据标签id获取用户列表（单个标签）](#get_usersimple_bytag)
    1. [根据标签id获取用户列表（多个标签）](#get_usercomplex_bytag)
    1. [保存门店临时标签](#tagorder_add)
    1. [删除门店临时标签](#tagorder_del)
    1. [获取门店临时标签概览](#get_tagorder_summary)
    1. [获取门店临时标签用户](#get_tagorder_userlist)

1. [标签列表](#taglist)
    
    1. [获取标签列表](#taglist_get)
    1. [获取标签数量](#taglist_getcount)
    1. [标签编辑](#taglist_edit)
    1. [同步标签至门店](#taglist_sync)
    1. [标签删除](#taglist_del)
    1. [上传标签文件](#taglist_upload)
    1. [导入标签](#taglist_import)
    1. [导出标签](#taglist_export)
    1. [下载标签模板](#taglist_exporttpl)

1. [潜客优选](#tdc)
    
    1. [获取正负样本](#tdc_get_sample)
    1. [获取模型应用可用的标签](#tdc_get)
    1. [获取可用的模型](#tdc_modeling_getlist)
    1. [获取模型应用可筛选的标签](#tdc_get_select)
    1. [获取模型应用可筛选的模型](#tdc_modeling_getlist_select)
    1. [获取模型列表](#tdc_modeling_get)
    1. [新建模型](#tdc_modeling_add)
    1. [获取模型详情](#tdc_modeling)
    1. [编辑模型](#tdc_modeling_edit)
    1. [删除模型](#tdc_modeling_del)
    1. [获取模型应用列表](#tdc_scoring_get)
    1. [新建模型应用](#tdc_scoring_add)
    1. [获取模型应用详情](#tdc_scoring)
    1. [预测人群分布](#tdc_score_get)
    1. [打标签](#tdc_score_set_tag)
    1. [给已有标签打标签](#tdc_score_set_tag_byid)


---


<a name="summary"></a>
## 1. 概述

- 文档说明：
> 为首旅集团开发的API说明文档。

- 协议说明
> 通信采用http协议，传输方式一般采用POST和GET两种方式，传输数据类型会由业务类型决定，一般采用form表单和json的形式。

- 响应格式说明
> 响应数据采用json形式，数据结构采用以下格式。

```json
{
  "code": 0, //状态码
  "data": {}, // 响应数据
  "msg": "" // 响应的备注信息
}
```

- 状态码说明
> 一般大于0，是错误响应。等于0，是正确响应。错误原因，会在msg字段说明。


---


<a name="auth"></a>
## 2. 鉴权

- 统一请求参数：

参数字段|类型|是否必传|描述
-------|---|---|-----
api_type|int|N|访问类型，1-后台访问，2-API访问，默认取1

分为两类：

**1. 当 api_type = 1 时**

表示DMP后台访问接口，默认取值，可选。

此时通过第三方鉴权，由默认路径进入。需要自带如下参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------ |---
token | string |  Y | 浏览器Cookie自带，鉴权令牌，需要 base64_encode
type | int |  Y | 根路径(/)必传，后台类型，1-管理后台 2-门店后台
cdp_type | int |  Y | 所有接口必传，后台类型，1-管理后台 2-门店后台


- 请求方式: GET

- 参数示例：
```bash
/?type=1&token=L1RIV2lBSDlWS2haeUtXVHZ2OENuYT09
```

- 响应参数:

响应成功，会自动跳转到首旅DMP系统。

响应失败：
```json
{
  "code": 401, 
  "data": {}, 
  "msg": "未授权"
}
```

**2. 当 api_type = 2 时**

表示第三方访问接口。需要分两步：

1). 获取或刷新 api_token ，相应的接口：

- 请求路径: http://{域名}/api/auth/token

- 请求方式: GET

- 请求参数: 

参数字段|类型|是否必传|描述
---|---|---|---
api_type|int|Y|访问类型，取值为2
api_appid|int|Y|第三方用户唯一凭证，同Marketing API 的 appid
api_secret|string|Y|第三方用户唯一凭证密钥，同Marketing API 的 appsecret

- 请求示例: 

```bash
api_type: 3
api_appid: <api_appid>
api_type: <api_secret>
```

- 应答字段: 

参数字段|类型|描述
---|---|---
api_token|string|验证令牌
expires_in|int|api_token 过期时间，单位（秒），默认24小时

- 应答示例:

```json
{
  "code": 0, 
  "data": {
    "api_token": "<api_token>",
    "expires_in": 86400
  }, 
  "msg": "“
}
```

2). 在所有业务接口的请求中，必须带有如下请求参数: 

参数字段|类型|是否必传|描述
---|---|---|---
api_type|int|Y|访问类型，取值为2
api_token|string|Y|验证令牌，通过步骤1生成

另外，支持 IP 白名单校验，可选。


---


<a name="consumer"></a>
## 3. 用户中心

<a name="user_dic_types"></a>
#### 获取字典的所有类型

- 请求路径: /api/user/dic/types

- 请求方式: GET

- 请求参数: 无

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
list | array | 字典类型列表

*list 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
field | int |  字典类型对应的字段
field_name | string |  字典类型对应的字段名称

- 响应示例: 

```json
{
  "data": {
    "list": [{
      "field": "analysis_date",
      "field_name": "日期"
    }, {
      "field": "event_type",
      "field_name": "事件类型"
    }, {
      "field": "province",
      "field_name": "省份"
    }, {
      "field": "businesstype",
      "field_name": "业态标签"
    }, {
      "field": "user_gender",
      "field_name": "性别"
    }]
  },
  "msg": "",
  "code": 0
}
```


<a name="user_dic_get"></a>
#### 获取字典值

- 请求路径: /api/user/dic/get

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
fields | array |  N | 字典类型，默认返回全部

- 参数示例：

```
fields:[ "event_type", "businesstype" ]
```

- 响应参数:

*默认返回10条记录*

参数字段 | 类型 |  描述
---------| ---- | ----
list | array | 字典值列表

*list 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
key | int |  字典类型对应的字段
value | array |  字典值

*value 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
id | int |  字典ID
name | string |  字典名称

- 响应示例：

```json
{
    "data": {
        "list": {
            "event_type": [{
                "id": 1,
                "name": "卡券领取"
            }, {
                "id": 2,
                "name": "卡券分享"
            }, {
                "id": 3,
                "name": "品牌页收藏"
            }, {
                "id": 4,
                "name": "品牌页浏览"
            }],
            "businesstype": [{
                "id": 0,
                "name": "其他"
            }, {
                "id": 1,
                "name": "吃"
            }, {
                "id": 2,
                "name": "住"
            }, {
                "id": 3,
                "name": "行"
            }],
        }
    },
    "msg": "",
    "code": 0
}
```


<a name="user_dic_gettype"></a>
#### 根据字典类型获取字典值

- 请求路径: /api/user/dic/getbytype

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
field | int |  Y | 字典类型
name | string |  N | 字典值
id | int |  N | 字典值id

- 参数示例：

```
field:event_type
name:卡券
id:123
```

- 响应参数:

*默认返回10条记录*

参数字段 | 类型 |  描述
---------| ---- | ----
list | array | 字典值列表

*list 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
id | int |  字典ID
name | string |  字典名称

- 响应示例：

```json
{
  "data": {
    "list": [{
      "id": 1,
      "name": "卡券领取"
    }, {
      "id": 2,
      "name": "卡券分享"
    }, {
      "id": 12,
      "name": "使用核销卡券"
    }]
  },
  "msg": "",
  "code": 0
}
```


<a name="user_info"></a>
#### 获取用户信息

不包括订单信息，实时进行筛选查询。

- 请求路径: /api/user/info/get

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
analysis_date | array | N | 日期，第一个元素表示开始日期，第二个元素表示结束日期
event_type | array | N | 事件类型
province | array | N | 省份
businesstype | array | N | 事件业态
user_gender | array | N | 性别
user_source | array | N | 用户来源
user_birthday | array | N | 用户生日，第一个元素表示开始日期，第二个元素表示结束日期
product_id | array | N | 产品id
product_name | array | N | 产品名称，数组元素为对应的产品id
ent_id | array | N | 品牌id
ent_name | array | N | 品牌名称，数组元素为对应的品牌id
store_id | array | N | 门店id
store_name | array | N | 门店名称，数组元素为对应的品牌id
page | int |  N    | 分页码数
page_size | int |  N  | 每页条数，最多100

- 参数示例：

```
analysis_date: ["1991-07-04","2010-07-04"]
event_type: [1]
province: [1]
businesstype: [1]
user_gender: 1
user_source: [1]
user_birthday: ["1991-07-04","2010-07-04"]
product_id: [1]
product_name: [1]
ent_id: [1]
ent_name: [1]
store_id: [1]
store_name: [1]
page:1
page_size:10
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
list | array | 数据列表
total | int | 数据总条数
search_total | int | 搜索结果条数
rate | int | 搜索占比

*list 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
id | int | 主键
userid | int | 用户id
mobile | int | 电话号码
mac | string | mac地址
tags | array | 标签列表

- 响应示例：

```json
{
  "data": {
    "list": [{
      "id": 1,
      "userid": 1,
      "mobile": <mobile>,
      "mac": <mac>,
      "tags": []
    }, {
      "id": 2,
      "userid": 2,
      "mobile": <mobile>,
      "mac": <mac>,
      "tags": []
    }],
    "total": 2,
    "search_total": 2,
    "rate": 100
  },
  "msg": "",
  "code": 0
}
```


<a name="user_info_id"></a>
#### 获取用户信息详情

- 请求路径: /api/user/info/{id}

- 请求方式: GET

- 请求参数：无

- 参数示例：无

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id | int | 主键
userid | int | 用户id
mobile | int | 电话号码
mac | string | mac地址
analysis_date | string | 日期
event_type | int | 事件类型
province | int | 省份
businesstype | int | 事件业态
user_gender | int | 性别
user_source | int | 用户来源
user_birthday | string | 用户生日
product_id | int | 产品id
product_name | string | 产品名称
ent_id | int | 品牌id
ent_name | string | 品牌名称
store_id | int | 门店id
store_name | string | 门店名称
order_amount | int | 订单总金额
order_points | int | 订单积分
sale_price | int | 产品价格
sale_points | int | 产品积分价格
order_count | int | 下单数量
upload_points | int | 线下消费上报积分数量
upload_amount | int | 线下消费上报金额
tags | array | 标签列表

- 响应示例：

```json
{
  "data": {
    "id": 1,
    "userid": 1,
    "mobile": <mobile>,
    "mac": <mac>,
    "analysis_date": "",
    "event_type": "",
    "province": "",
    "businesstype": "",
    "user_gender": "",
    "user_source": "",
    "user_birthday": "",
    "product_id": "",
    "ent_id": "",
    "store_id": "",
    "order_amount": "",
    "order_points": "",
    "sale_price": "",
    "sale_points": "",
    "order_count": "",
    "upload_points": "",
    "upload_amount": "",
    "tags": []
  },
  "msg": "",
  "code": 0
}
```


<a name="order_info"></a>
#### 获取离线查询任务

- 请求路径: /api/user/order/get

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
status | int |  N    | 状态，2-处理完成
page | int |  N    | 分页码数
page_size | int |  N  | 每页条数，最多100

- 参数示例：

```
status:2
page:1
page_size:10
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
total | int | 数据总条数
list | array | 字典值列表

*list 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
id | int | 离线查询任务 id
name | string | 任务名称
describe | string | 任务描述
time | string | 创建时间
status | string | 状态

- 响应示例：

```json
{
  "data": {
    "total": 1,
    "list": [{
      "id": 1,
      "name": "任务",
      "describe": "任务2019-07-05",
      "status": "处理中",
      "time": "2019-07-05"
    }]
  },
  "msg": "",
  "code": 0
}
```


<a name="order_info_add"></a>
#### 新增离线查询任务

- 请求路径: /api/user/order/add

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
name | string |  Y | 离线任务名称，门店选填
describe | string |  Y | 离线任务描述，门店选填
analysis_date | array | N | 日期，第一个元素表示开始日期，第二个元素表示结束日期
event_type | array | N | 事件类型
province | array | N | 省份
businesstype | array | N | 事件业态
user_gender | array | N | 性别
user_source | array | N | 用户来源
user_birthday | array | N | 用户生日，第一个元素表示开始日期，第二个元素表示结束日期
product_id | array | N | 产品id
product_name | array | N | 产品名称，数组元素为对应的产品id
ent_id | array | N | 品牌id
ent_name | array | N | 品牌名称，数组元素为对应的品牌id
store_id | array | N | 门店id
store_name | array | N | 门店名称，数组元素为对应的品牌id
order_info | array | Y | 订单信息，门店选填

*order_info 结构*

数组元素依次表示：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
link | int |  N | 且/或，“且”对应的值是 1，“或”对应 2；第一个数组，不需要指明 且/或 ，其余数组均要指明。
type | string |  Y | 订单信息类型
start | int |  Y | 范围起始值
end | int |  Y | 范围结束值
order | int |  Y | 前/后，“前”对应的值是 1，“后”对应 2。
percent | int |  Y | 百分比

*订单信息类型*

类型 |  描述
--- | ----
order_amount|订单总金额
order_averange_amount|订单平均金额
order_done|订单完成数
order_points|订单积分
sale_price|产品价格
sale_points|产品积分价格
order_count|下单数量
upload_points|线下消费上报积分数量
upload_amount|线下消费上报金额

- 参数示例：

```
name: 任务
describe: 任务2019-07-05
analysis_date: ["1991-07-04","2010-07-04"]
event_type: [1]
province: [1]
businesstype: [1]
user_gender: 1
user_source: [1]
user_birthday: ["1991-07-04","2010-07-04"]
product_id: [1]
product_name: [1]
ent_id: [1]
ent_name: [1]
store_id: [1]
store_name: [1]
order_info: [{
  "type": "order_points",
  "start": 2000,
  "end": 5000,
  "order": 1,
  "percent": 20
}, {
  "link": 1,
  "type": "order_points",
  "start": 2000,
  "end": 5000,
  "order": 1,
  "percent": 20
}]
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 离线查询任务 id

- 响应示例：

```json
{
  "data": {
      "id": 1
  },
  "msg": "",
  "code": 0
}
```


<a name="order_info_id"></a>
#### 获取离线查询任务详情

- 请求路径: /api/user/order/{id}

- 请求方式: GET

- 请求参数：无

- 参数示例：无

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
name | string |  离线任务名称
describe | string |  离线任务描述
info | object | 筛选条件

*info 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
analysis_date | array | 日期，第一个元素表示开始日期，第二个元素表示结束日期
event_type | array | 事件类型， id:name 数组，下同
province | array | 省份
businesstype | array | 事件业态
user_gender | array | 性别
user_source | array | 用户来源
user_birthday | array | 用户生日，第一个元素表示开始日期，第二个元素表示结束日期
product_id | array | 产品id
product_name | array | 产品名称，数组元素为对应的产品id
ent_id | array | 品牌id
ent_name | array | 品牌名称，数组元素为对应的品牌id
store_id | array | 门店id
store_name | array | 门店名称，数组元素为对应的品牌id
order_info | array | 订单信息

*order_info 结构同接口 保存离线查询任务*

- 响应示例：

```json
{
  "data": {
    "name": "订单任务",
    "describe": "订单任务2019-07-05",
    "info": {
      "analysis_date": ["2019-01-04", "2019-02-14"],
      "event_type": [{
        "id": 6,
        "name": "下单"
      }, {
        "id": 12,
        "name": "使用核销卡券"
      }],
      "order_info": [{
        "type": "order_amount",
        "start": "10",
        "end": "200",
        "order": 1,
        "percent": "20"
      }, {
        "link": 1,
        "type": "sale_price",
        "start": "90",
        "end": "100",
        "order": 2,
        "percent": 30
      }, {
        "link": 2,
        "type": "order_count",
        "start": "1",
        "end": "10",
        "order": 1,
        "percent": 50
      }, {
        "link": 1,
        "type": "order_averange_amount",
        "start": "100",
        "end": "10000",
        "order": 1,
        "percent": 80
      }]
    }
  },
  "msg": "",
  "code": 0
}
```


<a name="order_info_edit"></a>
#### 编辑离线查询任务

- 请求路径: /api/user/order/edit

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------ | ---
id | int |  Y | 离线查询任务id
name | string |  N | 离线任务名称
describe | string |  N | 离线任务描述
analysis_date | array | N | 日期，第一个元素表示开始日期，第二个元素表示结束日期
event_type | array | N | 事件类型
province | array | N | 省份
businesstype | array | N | 事件业态
user_gender | array | N | 性别
user_source | array | N | 用户来源
user_birthday | array | N | 用户生日，第一个元素表示开始日期，第二个元素表示结束日期
product_id | array | N | 产品id
product_name | array | N | 产品名称，数组元素为对应的产品id
ent_id | array | N | 品牌id
ent_name | array | N | 品牌名称，数组元素为对应的品牌id
store_id | array | N | 门店id
store_name | array | N | 门店名称，数组元素为对应的品牌id
order_info | array | Y | 订单信息

*order_info 结构同接口 保存离线查询任务*

- 参数示例：

```
id:22
analysis_date: ["1991-07-04","2010-07-04"]
event_type: [1]
province: [1]
businesstype: [1]
user_gender: 1
user_source: [1]
user_birthday: ["1991-07-04","2010-07-04"]
product_id: [1]
product_name: [1]
ent_id: [1]
ent_name: [1]
store_id: [1]
store_name: [1]
order_info: [{
  "type": "order_points",
  "start": 2000,
  "end": 5000,
  "order": 1,
  "percent": 20
}, {
  "link": 1,
  "type": "order_points",
  "start": 2000,
  "end": 5000,
  "order": 1,
  "percent": 20
}]
```

- 响应参数: 无

- 响应示例：

```json
{
  "code": 0, 
  "data": {
      "id": 22
  },
  "msg": "" 
}
```


<a name="order_info_users"></a>
#### 获取离线查询用户信息

- 请求路径: /api/user/order/get_users

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
orderid | int | Y | 离线查询任务id
page | int |  N    | 分页码数
page_size | int |  N  | 每页条数，最多100

- 参数示例：

```
orderid:1
page:1
page_size:10
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
list | array | 数据列表
total | int | 数据总条数
search_total | int | 搜索结果条数
rate | int | 搜索占比

*list 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
id | int | 主键
userid | int | 用户id
mobile | int | 电话号码
mac | string | mac地址
tags | array | 标签列表

- 响应示例：

```json
{
  "data": {
    "list": [{
      "id": 1,
      "userid": 1,
      "mobile": <mobile>,
      "mac": <mac>,
      "tags": []
    }, {
      "id": 2,
      "userid": 2,
      "mobile": <mobile>,
      "mac": <mac>,
      "tags": []
    }],
    "total": 2,
    "search_total": 2,
    "rate": 100
  },
  "msg": "",
  "code": 0
}
```

<a name="order_info_del"></a>
#### 删除离线查询任务

- 请求路径: /api/user/order/del

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------ | ----
ids | array |  Y | 标签id

- 参数示例：

```
ids:[ 1, 2 ]
```

- 响应参数: 无

- 响应示例：

```json
{
  "code": 0, 
  "data": {}, 
  "msg": "" 
}
```


<a name="get_tags"></a>
#### 获取标签列表

- 请求路径: /api/user/tag/get

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- |---
type | int |  N  | 类型，1-自定义标签，2-潜客标签，其他值为全部标签
name | string |  N  |  标签名称搜索

- 参数示例：

```
type:1
name:标签名称
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id | int | 标签id 
name | string | 标签名称
 
- 响应示例：

```json
{
    "data": [
        {
            "id": 21,
            "name": "333"
        },
        {
            "id": 22,
            "name": "333"
        }
    ],
    "msg": "",
    "code": 0
}
```


<a name="set_tag"></a>
#### 自定义标签保存

- 请求路径: /api/user/tag/add

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- |---
info | object |  Y   | 筛选条件
name | string |  Y | 名称
describe | string |  N | 描述
type | int |  Y | 类型，1:用户ID，2:手机号码，3:MAC地址
mode_user | int |  N | 创建入口，1:自定义筛选，2:离线查询，3:标签查询-单标签，4:标签查询-多标签

*info 结构*

+ 当 mode_user = 1 ，时：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
analysis_date | array | N | 日期，第一个元素表示开始日期，第二个元素表示结束日期
event_type | array | N | 事件类型
province | array | N | 省份
businesstype | array | N | 事件业态
user_gender | array | N | 性别
user_source | array | N | 用户来源
user_birthday | array | N | 用户生日，第一个元素表示开始日期，第二个元素表示结束日期
product_id | array | N | 产品id
product_name | array | N | 产品名称，数组元素为对应的产品id
ent_id | array | N | 品牌id
ent_name | array | N | 品牌名称，数组元素为对应的品牌id
store_id | array | N | 门店id
store_name | array | N | 门店名称，数组元素为对应的品牌id

+ 当 mode_user = 2 ，时：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
orderid | int | Y | 离线查询任务id

+ 当 mode_user = 3 ，时：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
type | int |  Y   | 筛选类型，0-所有用户，1-有用户ID，2-无用户ID，3-手机号码，4-MAC地址，默认取1
tagid | int |  Y     | 标签id

+ 当 mode_user = 4 ，时：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
complex | int |  N    | 标签操作，1-交集，2-并集，默认取1
complex_type | int |  N    | 标签操作类型，1:用户ID，2:手机号码，3:MAC地址，交集时有效，默认取1
type | int |  N   | 筛选类型，0-所有用户，1-有用户ID，2-无用户ID，3-手机号码，4-MAC地址，默认取1
tagids | array |  Y     | 标签id

- 参数示例：

```
name:美食达人
describe:美食达人的描述
type:1

mode_user:1
info:{
  analysis_date: ["1991-07-04","2010-07-04"]
  event_type: [1]
  province: [1]
  businesstype: [1]
  user_gender: 1
  user_source: [1]
  user_birthday: ["1991-07-04","2010-07-04"]
  product_id: [1]
  product_name: [1]
  ent_id: [1]
  ent_name: [1]
  store_id: [1]
  store_name: [1]
}

mode_user:2
info:{
  orderid: 2
}

mode_user:3
info:{
  type:1
  tagid:1
}

mode_user:4
info:{
  complex:1
  complex_type:1
  type:1
  tagids:[1,2,3]
}
```

- 响应参数: 

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 标签 id

- 响应示例：

```json
{
  "code": 0, 
  "data": {
      "id": 1
  }, 
  "msg": "" 
}
```


<a name="get_usersimple_bytag"></a>
#### 根据标签id获取用户列表（单个标签）

- 请求路径: /api/user/tag/get_users_simple

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
type | int |  Y   | 筛选类型，0-所有用户，1-有用户ID，2-无用户ID，3-手机号码，4-MAC地址，默认取1
tagid | int |  Y     | 标签id
page | int |  Y    | 分页码数
page_size | int |  Y  | 每页条数，最多100

- 参数示例：

```
type:1
tagid:1
page:1
page_size:10
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
list | array | 用户数据
total | int | 数据总条数
search_total | int | 所有筛选条数
search_rate | int | 所有筛选条数占比
tab_total | int | tab筛选条数
tab_rate | int | tab筛选条数占比

*list 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
userid | int | 用户id 
mobile | int | 手机号码
mac | string | mac地址
tags | array | 标签列表

- 响应示例：

```json
{
  "data": {
    "list": [{
      "userid": 1,
      "mobile": 112434242,
      "mac": "33331aaa",
      "tags": ["标签", "高消费"]
    }],
    "total": 7,
    "search_total": 2,
    "search_rate": 29,
    "tab_total": 1,
    "tab_rate": 14
  },
  "msg": "",
  "code": 0
}
```


<a name="get_usercomplex_bytag"></a>
#### 根据标签id获取用户列表（多个标签）

- 请求路径: /api/user/tag/get_users_complex

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
complex | int |  N    | 标签操作，1-交集，2-并集，默认取1
complex_type | int |  N    | 标签操作类型，1:用户ID，2:手机号码，3:MAC地址，交集时有效，默认取1
type | int |  N   | 筛选类型，0-所有用户，1-有用户ID，2-无用户ID，3-手机号码，4-MAC地址，默认取1
tagids | array |  Y     | 标签id
page | int |  Y    | 分页码数
page_size | int |  Y  | 每页条数，最多100

- 参数示例：

```
complex:1
complex_type:1
type:1
tagids:[1,2,3]
page:1
page_size:10
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
list | array | 用户数据
total | int | 数据总条数
search_total | int | 所有筛选条数
search_rate | int | 所有筛选条数占比
tab_total | int | tab筛选条数
tab_rate | int | tab筛选条数占比

*list 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
userid | int | 用户id 
mobile | int | 手机号码
mac | string | mac地址
tags | array | 标签列表

- 响应示例：

```json
{
  "data": {
    "list": [{
      "userid": 1,
      "mobile": 112434242,
      "mac": "33331aaa",
      "tags": ["标签", "高消费"]
    }],
    "total": 7,
    "search_total": 2,
    "search_rate": 29,
    "tab_total": 1,
    "tab_rate": 14
  },
  "msg": "",
  "code": 0
}
```


<a name="tagorder_add"></a>
#### 保存门店临时标签

- 请求路径: /api/user/tagorder/add

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
complex | int |  N    | 标签操作，1-交集，2-并集，默认取1
complex_type | int |  N    | 标签操作类型，1:用户ID，2:手机号码，3:MAC地址，交集时有效，默认取1
tagids | array |  Y     | 标签id
orderids | array |  Y     | 任务id

- 参数示例：

```
complex:1
complex_type:1
tagids:[1,2,3]
orderids:[1,2,3]
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 临时标签 id

- 响应示例：

```json
{
  "data": {
      "id": 1
  },
  "msg": "",
  "code": 0
}
```


<a name="tagorder_del"></a>
#### 删除门店临时标签

- 请求路径: /api/user/tagorder/del

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------ | ----
ids | array |  Y | 临时标签 id 

- 参数示例：

```
ids:[ 1, 2 ]
```

- 响应参数: 无

- 响应示例：

```json
{
  "code": 0, 
  "data": {}, 
  "msg": "" 
}
```


<a name="get_tagorder_summary"></a>
#### 获取门店临时标签概览

- 请求路径: /api/user/tagorder/get_summary

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
id | int |  Y    | 临时标签 id

- 参数示例：

```
id:1
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id | int |  临时标签 id
name | int |  临时标签名称
total | int | 数据总条数
rate | int | 所有筛选条数占比
user_total | int | 有会员ID的筛选条数
user_rate | int | 有会员ID的筛选条数占比
nouser_total | int | 无会员ID的筛选条数
nouser_rate | int | 无会员ID的筛选条数占比

- 响应示例：

```json
{
  "data": {
    "id": "1",
    "name": "15634421351",
    "total": 5000,
    "rate": 70,
    "user_total": 3000,
    "user_rate": 70,
    "nouser_total": 2000,
    "nouser_rate": 30
  },
  "msg": "",
  "code": 0
}
```


<a name="get_tagorder_userlist"></a>
#### 获取门店临时标签用户

- 请求路径: /api/user/tagorder/get_userlist

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- | ---
id | int |  Y    | 临时标签 id
page | int |  Y    | 分页码数
page_size | int |  Y  | 每页条数，最多100

- 参数示例：

```
id:1
page:1
page_size:10
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
list | array | 用户数据
total | int | 数据总条数

*list 结构*

参数字段 | 类型 |  描述
---------| ---- | ----
userid | int | 用户id 
mobile | int | 手机号码
mac | string | mac地址

- 响应示例：

```json
{
  "data": {
    "list": [{
      "userid": 1,
      "mobile": 112434242,
      "mac": "33331aaa"
    }],
    "total": 7
  },
  "msg": "",
  "code": 0
}
```


---


<a name="taglist"></a>
## 4. 标签

<a name="taglist_get"></a>
#### 获取标签列表

- 请求路径: /api/tags/get

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- |---
script_status | int |  N  | 脚本处理状态，0处理中，1可用，-1错误，其他值为全部状态
name |  string | N    | 搜索标签名称
type | int |  N  | 标签类型，1-userID，2-手机号，3-MAC地址 ，其他值为全部标签
page | int |  N | 第几页，默认取1
page_size | int |  N | 每页记录条数，默认取10

- 参数示例：

```
script_status:0
page:1
page_size:10
name:'吃货'
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
total |  int | 总页数
list | array | 模型数据

list 详细参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id | int |  标签id 
name | string | 标签名称
describe | string | 标签描述
mode | string | 标签创建方式 
type | string | 标签类型 
number | int | 标签包含人数 
time | date | 标签创建时间 
script_status | string | 脚本处理状态 

*type 取1、2、3时，仅返回id，name，describe*

- 响应示例：

```json
{
  "data": {
    "total": 2,
    "list": [{
          "id": 1,
          "name": "标签1",
          "describe": "11",
          "mode": "标签列表-标签导入",
          "type": "手机号码",
          "number": 0,
          "time": "2019-07-03 18:27:19",
          "script_status": "处理中"
      }, {
          "id": 2,
          "name": "标签2",
          "describe": "22",
          "mode": "用户中心-自定义标签",
          "type": "用户ID",
          "number": 0,
          "time": "2019-07-04 12:17:08",
          "script_status": "处理中"
      }]
  },
  "msg": "",
  "code": 0
}
```


<a name="taglist_getcount"></a>
#### 获取标签数量

- 请求路径: /api/tags/get_count

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------- |---
id | int |  Y | 标签id

- 参数示例：

```
id:1
```

- 响应参数:

人群数量

- 响应示例：

```json
{
  "data": 10873,
  "msg": "",
  "code": 0
}
```


<a name="taglist_edit"></a>
#### 标签编辑

- 请求路径: /api/tags/edit

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------ | ---
id | int |  Y | 标签id
name | id |  Y | 标签名称
describe | id |  Y | 标签描述

- 参数示例：

```
id:22
name:1
describe:2
```

- 响应参数: 无

- 响应示例：

```json
{
  "code": 0, 
  "data": {}, 
  "msg": "" 
}
```

<a name="taglist_sync"></a>
#### 同步标签至门店

- 请求路径: /api/tags/sync

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------ | ---
    ids | array |  Y | 标签id 

- 参数示例：

```
ids:[1,2]
```

- 响应参数: 无

- 响应示例：

```json
{
  "code": 0, 
  "data": {}, 
  "msg": "" 
}
```

<a name="taglist_del"></a>
#### 标签删除

- 请求路径: /api/tags/del

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------ | ----
ids | array |  Y | 标签id 

- 参数示例：

```
ids:[ 1, 2 ]
```

- 响应参数: 无

- 响应示例：

```json
{
  "code": 0, 
  "data": {}, 
  "msg": "" 
}
```


<a name="taglist_upload"></a>
#### 上传标签文件

- 请求路径: /api/tags/upload

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 | 描述
---------| ---- |------ | ---
source | file |  Y | 标签的excel

- 参数示例：

```
source

userid
```

- 响应参数: 无

- 响应示例：

```json
{
    "data": {
        "filename": "20190108055756.xlsx"
    },
    "msg": "",
    "code": 0
}
```


<a name="taglist_import"></a>
#### 导入标签

- 请求路径: /api/tags/import

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
method | int |  N | 1-文件上传，2-字符串，默认取1
name | string |  Y | 标签名称
describe | string |  Y | 人群描述
type | int | N | 1:userID，2:手机号，3:MAC地址 默认1
filename | string | Y | 上传文件名，method=1时必传
tag_type | int | N | 1-合并已有标签，2-手动新建标签，默认1
tag_id | int | Y | 标签 id， tag_type=1 时必传

- 参数示例：

```
method:1
filename:20190708035001.xslx
tag_type:1
tag_id:1

method:1
name:新建标签名称1
describe:新建标签描述1
filename:20190704023010.xslx
tag_type:2
type:2
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
uploadCount | int | 所上传标签中包含的人数
count | int | 可创建标签人数
 
- 响应示例：

```json
{
  "code": 0, 
  "data": {,
      'uploadCount' => 300,
      'count' => 200
  }, 
  "msg": "" 
}
```


<a name="taglist_export"></a>
#### 导出标签

- 请求路径: /api/tags/export

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
id | int |  Y | 标签id

- 参数示例：

```
id:29
type:1
```

- 响应示例：

```
excel
```

<a name="taglist_exporttpl"></a>
#### 下载标签模板

- 请求路径: /api/tags/export_tpl

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
type | int | N | 1:userID，2:手机号，3:MAC地址 默认1

- 参数示例：

```
type:2
```

- 响应示例：

```
excel
```


---


<a name="tdc"></a>
## 潜客优选

<a name="tdc_get_sample"></a>
#### 获取正负样本

- 请求路径: /api/tdc/tags/get_sample

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
plus_name | string |  N | 正样本名称
minus_name | string |  N | 负样本名称

- 参数示例：
```
plus_name:我是正样本
minus_name:我是正样本
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
plus_tags |  array | 正样本，人数大于1万人
minus_tags | array | 负样本，人数大于3万人

*支持对样本名称的模糊筛选，默认返回10条记录*

- 响应示例：

```json
{
  "data": {
    "plus_tags": [{
      "id": 1,
      "name": "11"
    }, {
      "id": 7,
      "name": "1234"
    }, {
      "id": 8,
      "name": "12344"
    }],
    "minus_tags": [{
      "id": 8,
      "name": "12344"
    }]
  },
  "msg": "",
  "code": 0
}
```

<a name="tdc_get"></a>
#### 获取模型应用可用的标签

- 请求路径: /api/tdc/tags/get

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
modelingid |  int |  Y | 模型 id
name | string |  N | 标签名称

- 参数示例：

```
modelingid: 1
name: 标签名称
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 标签 id
name | string | 标签名称
description | string | 标签描述

*支持对标签名称的模糊筛选，默认返回10条记录*

- 响应示例：

```json
{
  "data": [{
    "id": 9,
    "name": "品牌忠实客户",
    "describe": "品牌忠实客户aaa"
  }, {
    "id": 11,
    "name": "高端商务人士",
    "describe": "高端商务人士bbb"
  }],
  "msg": "",
  "code": 0
}
```

<a name="tdc_modeling_getlist"></a>
#### 获取可用的模型

- 请求路径: /api/tdc/modeling/get_list

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
name | string |  N | 模型名称

- 参数示例：

```
name: 模型名称
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 模型 id
name | string | 模型名称
description | string | 模型描述

*支持对模型名称的模糊筛选，默认返回10条记录*
 
- 响应示例：

```json
{
  "data": [{
    "id": 2,
    "name": "模型2",
    "description": "我是模型2"
  }, {
    "id": 4,
    "name": "模型4",
    "description": "我是模型4"
  }],
  "msg": "",
  "code": 0
}
```


<a name="tdc_get_select"></a>
#### 获取模型应用可筛选的标签

- 请求路径: /api/tdc/tags/get_select

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
name | string |  N | 标签名称

- 参数示例：

```
name: 标签名称
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 标签 id
name | string | 标签名称

*支持对标签名称的模糊筛选，默认返回10条记录*
 
- 响应示例：

```json
{
  "data": [{
    "id": 2,
    "name": "标签2",
    "description": "我是标签2"
  }, {
    "id": 4,
    "name": "标签4",
    "description": "我是标签4"
  }],
  "msg": "",
  "code": 0
}
```


<a name="tdc_modeling_getlist_select"></a>
#### 获取模型应用可筛选的模型

- 请求路径: /api/tdc/modeling/get_select_list

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
name | string |  N | 模型名称

- 参数示例：

```
name: 模型名称
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 模型 id
name | string | 模型名称
description | string | 模型描述

*支持对模型名称的模糊筛选，默认返回10条记录*
 
- 响应示例：

```json
{
  "data": [{
    "id": 2,
    "name": "模型2",
    "description": "我是模型2"
  }, {
    "id": 4,
    "name": "模型4",
    "description": "我是模型4"
  }],
  "msg": "",
  "code": 0
}
```


<a name="tdc_modeling_get"></a>
#### 获取模型列表

- 请求路径: /api/tdc/modeling/get

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
page | int |  N | 第几页，默认取1
page_size | int |  N | 每页记录条数，默认取10
name | string |  N | 模型名称

- 参数示例：

```
page: 2
page_size: 100
name: 旅游
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
total |  int | 总页数
list | array | 模型数据

list 详细参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 模型 id
name | string | 模型名称
description | string | 模型描述
status | string | 模型状态
tag_num | int | 已打包标签数量
created_time | string | 创建时间

- 响应示例：

```json
{
  "data": {
    "total": 2,
    "list": [{
      "id": 2,
      "name": "模型2",
      "description": "我是模型2",
      "status": "训练中",
      "created_time": "2019-04-18 12:35:57",
      "tag_num": 10
    }, {
      "id": 1,
      "name": "模型1",
      "description": "我是模型1",
      "status": "正常",
      "created_time": "2019-04-18 11:21:07",
      "tag_num": 0
    }]
  },
  "msg": "",
  "code": 0
}
```


<a name="tdc_modeling_add"></a>
#### 新建模型

- 请求路径: /api/tdc/modeling/add

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
name | string |  Y | 模型名称
description | string |  Y | 模型描述
plus_tagid | int |  Y | 正样本 标签id
minus_tagid | int |  Y | 负样本 标签id

- 参数示例：

```
name: 模型1
description: 我是模型1
plus_tagid: 123
minus_tagid: 345
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 模型 id

- 响应示例：

```json
{
  "data": 1,
  "msg": "",
  "code": 0
}
```


<a name="tdc_modeling"></a>
#### 获取模型详情

- 请求路径: /api/tdc/modeling/{id}

- 请求方式: GET

- 请求参数：无

- 参数示例：无

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 模型 id
name | string | 模型名称
description | string | 模型描述

- 响应示例：

```json
{
    "data":{
        "id":1,
        "name":"人群1",
        "description":"我是人群1"
    },
    "msg":"",
    "code":0
}
```


<a name="tdc_modeling_edit"></a>
#### 编辑模型

- 请求路径: /api/tdc/modeling/edit

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
id |  int |  Y | 模型 id
name | string |  Y | 模型名称
description | string |  Y | 模型描述

- 参数示例：

```
id: 1,
name: 模型1
description: 我是模型1
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 模型 id

- 响应示例：

```json
{
  "data": 1,
  "msg": "",
  "code": 0
}
```

<a name="tdc_modeling_del"></a>
#### 删除模型

- 请求路径: /api/tdc/modeling/del

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
id |  int |  Y | 模型 id

- 参数示例：

```
id: 1,
```

- 响应参数: 无

- 响应示例：

```json
{
  "data": [],
  "msg": "",
  "code": 0
}
```

<a name="tdc_scoring_get"></a>
#### 获取模型应用列表

- 请求路径: /api/tdc/scoring/get

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
page | int |  N | 第几页，默认取1
page_size | int |  N | 每页记录条数，默认取10
modelingid | int |  N | 模型 id
tagid | int |  N | 标签 id

- 参数示例：

```
page: 2
page_size: 100
modelingid: 1
tagid: 2
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
total |  int | 总页数
list | array | 模型数据

list 详细参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 模型应用 id
modeling_name | string | 模型名称
tag_name | string | 标签名称
status | string | 模型应用状态
created_time | string | 创建时间

- 响应示例：

```json
{
  "data": {
    "total": 2,
    "list": [{
      "id": 2,
      "status": "计算中",
      "created_time": "2019-04-20 00:00:00",
      "modeling_name": "模型应用2",
      "tag_name": "11吃"
    }, {
      "id": 1,
      "status": "计算中",
      "created_time": "2019-04-19 00:00:00",
      "modeling_name": "模型应用1",
      "tag_name": "11吃"
    }]
  },
  "msg": "",
  "code": 0
}
```


<a name="tdc_scoring_add"></a>
#### 新建模型应用

- 请求路径: /api/tdc/scoring/add

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
modelingid | int |  Y | 模型 id
tagid | int |  Y | 标签 id

- 参数示例：

```
modelingid: 1
tagid: 2
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
id |  int | 模型应用 id

- 响应示例：

```json
{
  "data": 1,
  "msg": "",
  "code": 0
}
```


<a name="tdc_scoring"></a>
#### 获取模型应用详情

- 请求路径: /api/tdc/scoring/{id}

- 请求方式: GET

- 请求参数：无

- 参数示例：无

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
modeling_name |  string | 模型名称
modeling_desc | string | 模型描述
tag_name | string | 标签名称
tag_desc | string | 标签描述

- 响应示例：

```json
{
  "data": {
    "modeling_name": "模型1",
    "modeling_desc": "我是模型1",
    "tag_name": "人群1",
    "tag_desc": "我是人群1"
  },
  "msg": "",
  "code": 0
}
```


<a name="tdc_score_get"></a>
#### 预测人群分布

- 请求路径: /api/tdc/score/get

- 请求方式: GET

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
id | int |  Y | 模型模型应用 id
min | int |  N | 最小分值，默认取值 0
max | int |  N | 最大分值，默认取值 100

- 参数示例：

```
id: 1
min: 21
max: 100
```

- 响应参数:

参数字段 | 类型 |  描述
---------| ---- | ----
total |  int | 共计人数
data | array | 人群分数

data 参数：

参数字段 | 类型 |  描述
---------| ---- | ----
score_10 |  int | 0~10 分的共计人数
score_20 |  int | 11~20 分的共计人数
score_30 |  int | 21~30 分的共计人数
score_40 |  int | 31~40 分的共计人数
score_50 |  int | 41~50 分的共计人数
score_60 |  int | 51~60 分的共计人数
score_70 |  int | 61~70 分的共计人数
score_80 |  int | 71~80 分的共计人数
score_90 |  int | 81~90 分的共计人数
score_100 |  int | 91~100 分的共计人数

*data 参数会根据 min 和 max 动态返回结果*

- 响应示例：

```json
{
  "data": {
    "total": 30000,
    "data": {
      "score_10": 1612,
      "score_20": 112,
      "score_30": 405,
      "score_40": 2703,
      "score_50": 6109,
      "score_60": 3734,
      "score_70": 3090,
      "score_80": 4658,
      "score_90": 7363,
      "score_100": 214
    }
  },
  "msg": "",
  "code": 0
}
```


<a name="tdc_score_set_tag"></a>
#### 保存为新标签

- 请求路径: /api/tdc/score/set_tag

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
id | int |  Y | 模型模型应用 id
name | string |  Y | 标签名称
describe | string |  Y | 标签描述
min | int |  N | 最小分值，默认取值 0
max | int |  N | 最大分值，默认取值 100

- 参数示例：

```
id: 1
name: 标签1
describe:标签描述
min: 21
max: 100
```

- 响应参数: 无

- 响应示例：

```json
{
  "code": 0, 
  "data": {}, 
  "msg": "" 
}
```


<a name="tdc_score_set_tag_byid"></a>
#### 给已有标签打标签

- 请求路径: /api/tdc/score/set_tag_byid

- 请求方式: POST

- 请求参数：

参数字段 | 类型 |  是否必传 |  描述
---------| ---- |---- |------
id | int |  Y | 模型模型应用 id
tagid | int |  Y | 标签 id
min | int |  N | 最小分值，默认取值 0
max | int |  N | 最大分值，默认取值 100

- 参数示例：

```
id: 1
tagid: 9
min: 21
max: 100
```

- 响应参数: 无

- 响应示例：

```json
{
  "code": 0, 
  "data": {}, 
  "msg": "" 
}
```


---

```

