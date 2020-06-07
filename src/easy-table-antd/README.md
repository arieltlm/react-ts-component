# EasyTableAntd

本组件将ant-design中table再次包装使得项目中table的写法简化。

* 组件中添加了纵向上的滚动；
* 组件中添加了默认分页参数，可配置调整参数，可配置是否显示分页；
* 表格数据`dataSource`中，每一条自动添加了`key`,可传入dataSourceKey配置为对应数据中的唯一的`key`；
* 表格表头添加`tooltip`的`render`，其他需要`render`的方式自行添加
* 表格其他参数参照[antd中table](https://ant.design/components/table-cn/) 可以正常传递即可

## Installation

使用npm：

```shell
$ npm i easy-table-antd
```

## Usage
Import:

```jsx
import EasyTableAntd from 'easy-table-antd';
```

Render in your component:

```jsx
render() {
    // ...
    return (
        <EasyTableAntd
            dataSource={dataSource}
            dataSourceKey="id"
            column={column}
            pagination={{
                pageNo, 
                pageSize, 
                total,
            }}
            scrollX="110%"
        />
    )
}
```

## API
**参数：**

需要注意的几个参数：
<table border>
    <tr>
        <th width="15%">参数名</th>
        <th width="15%">含义</th>
        <th width="5%">类型</th>
        <th width="5%">是否必须</th>
        <th width="10%">默认值</th>
        <th width="50%">备注</th>
    </tr>
    <tr>
        <td>column</td>
        <td>表头列</td>
        <td>Array</td>
        <td>是</td>
        <td></td>
        <td>如果只是简单显示，tooltip可以不用传入,组件中已经自动增加；其他需要render的方式自行添加；<br/> 
        <span style="font-weight:900">注意</span>：如果已经设置了唯一的 dataIndex，可以忽略其中的key;也可以只传递key,dataIndex会自动取key值</td>
    </tr>
    <tr>
        <td>dataSource</td>
        <td>表格数据</td>
        <td>Array</td>
        <td>否</td>
        <td>[]</td>
        <td></td>
    </tr>
    <tr>
        <td>dataSourceKey</td>
        <td>表格数据key字段</td>
        <td>string</td>
        <td>否</td>
        <td>''</td>
        <td>这个字段最好能取数据中唯一的一个字段作为key,尽量传值；不传则取每一条数据的index</td>
    </tr>
    <tr>
        <td>scrollX</td>
        <td>横向滚动宽度值</td>
        <td>Number/String</td>
        <td>否</td>
        <td>0</td>
        <td>默认没有横向滚动，可以传入具体值，也可以传入百分比 </td>
    </tr>
    <tr>
        <td>minScrollY</td>
        <td>最小滚动高度</td>
        <td>Number</td>
        <td>否</td>
        <td>100</td>
        <td>最小滚动高度即最小tbody高度</td>
    </tr>
    <tr>
        <td>pagination</td>
        <td>分页参数</td>
        <td>Object | false</td>
        <td>默认没有分页</td>
        <td>
        {<br>
         	pageNo:1,<br>
           	pageSize:20,<br>
            total: 0,<br>
            pageSizeOptions:['20','50','100'],<br>
            showTotal: showTotalAction, // 第 1/5 页， 共 100 条<br> 
            showSizeChanger: true,<br>
            showQuickJumper: true,<br>
            size:'small',<br>
        }
        </td>
        <td>分页参数，除了pageNo和antd分页中的current对应以外，一般只需要传递pageNo,pageSize,total三个参数，如有需要其他参数都可以按antd上分页分别进行其他配置；传递false则没有分页</td>
    </tr>
    <tr>
        <td>className</td>
        <td>类名</td>
        <td>string</td>
        <td>否</td>
        <td>''</td>
        <td></td>
    </tr>
</table>

其他参数参照[antd中table](https://ant.design/components/table-cn/) 正常传递即可

## Keywords

antd, table

## Demo

[easy-table-antd](http://fe.mlamp.cn:3362/#/app/easy-table-antd)
