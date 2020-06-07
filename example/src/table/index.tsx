import React, { ReactElement } from 'react'
import { EasyTableAntd } from '../../../src'

const columns = [{
    dataIndex: 'id', 
    title: '目标表Id',
    fixed: true
}, {
    dataIndex: 'labelEn', 
    title: '目标表英文名',
}, {
    dataIndex: 'labelCn', 
    title: '目标表英文名',
}, {
    key: 'elementType', 
    title: '类型',
}, {
    dataIndex: 'mergeVersion', 
    title: '版本',
    width: 150,
}, {
    dataIndex: 'loaderState', 
    title: '导入状态',
    width: 180,
    render: (text: number): string => {
        switch (text){
        case 1: 
            return '成功'
        case 2: 
            return '失败'
        case 3: 
            return '进行中'
        default:
            return '等待'
        }
    }
}, {
    dataIndex: 'loadTime', 
    title: '导入时间',
    width: 200,
}, {
    dataIndex: ['dataChild', 'element'], 
    title: '导入时间',
    width: 200,
}]

interface ITableState {
    pageNo: number;
    pageSize: number;
    total: number;
    dataSource: object[];
    selectedRowKeys: string[] | number[];
}

const datas = (function (): object[]{
    const res = []
    for (let i = 1; i < 51; i++) {
        res.push({
            id: i,
            // key: `数据列${i}`,
            labelEn: 'cccccccaere',
            labelCn: '测试表',
            elementType: ['event', 'entity', 'relation'][i % 3],
            mergeVersion: 1,
            loaderState: [0, 1, 2, 3, 4][i % 5],
            loadTime: '2015-09-26 08:50:08',
            loadDetail: 'loadDetail',
            dataChild: {
                element: `${i}-string[]形式的dataIndex`
            }
        })
    }
    return res
}()) 
const totalCount = 50

class Table extends React.Component<{}, ITableState>{
    constructor(props) {
        super(props)
        this.state = {
            pageNo: 1,
            pageSize: 20,
            total: 0,
            dataSource: [],
            selectedRowKeys: []
        }
    }

    componentDidMount(): void{
        setTimeout(() => {
            this.setState({ 
                total: totalCount,
                dataSource: datas
            })
        }, 1000)
    }

    handleChangePage = (paginations): void => {
        const { current, pageSize: curPageSize } = paginations
        this.setState({
            pageNo: current, 
            pageSize: curPageSize
        })
    }

    onSelectChange = (selectedRowKeys): void => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    };

    render(): ReactElement{
        const { pageNo, pageSize, total, dataSource, selectedRowKeys } = this.state
        return (
            <div style={{ height: '100%', border: '1px solid red' }}>
                <EasyTableAntd
                    dataSource={dataSource}
                    // title={() => '表信息'}
                    dataSourceKey="id"
                    column={columns}
                    pagination={{ 
                        pageNo, pageSize, total,
                    }}
                    // pagination={false}
                    onChange={this.handleChangePage}
                    scrollX="110%"
                    rowSelection={{
                        selectedRowKeys,
                        onChange: this.onSelectChange,
                    // fixed: true
                    }}
                />
            </div>
            
        )
    }
}


export default Table
