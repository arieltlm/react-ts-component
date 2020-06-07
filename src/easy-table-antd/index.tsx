import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Table, Tooltip } from 'antd'
import { IHeaderItem, ITableProps, IPagination } from './interface'
import { 
    MIN_TBODY_HEIGHT,
    DEFAULT_PAGINATION,
} from './constant'

const { useState, useEffect, useRef } = React

const getStyle = (element: any, att: string): string => {
    // 特性侦测
    if (window.getComputedStyle){
        // 优先使用W3C规范
        return window.getComputedStyle(element)[att]
    }
    // 针对IE9以下兼容
    return element.currentStyle[att]
}

const EasyTableAntd: React.FC<ITableProps> = ({
    column,
    dataSource,
    dataSourceKey,
    pagination,
    scrollX,
    minScrollY,
    className,
    ...other
}) => {
    const [scrollY, setScrollY] = useState(MIN_TBODY_HEIGHT)
    const tableWapperRef = useRef(null)

    useEffect(() => {
        let didCancel = false
        const handleWindowResize = (): void => {
            const tableWapperDOM = tableWapperRef?.current 

            const tableWapperDOMHeight = tableWapperDOM?.offsetHeight
            // table表头高度
            const tableHeader = tableWapperDOM?.querySelector('.ant-table-thead') as HTMLElement 
            const tableHeaderHeight = tableHeader?.offsetHeight
            // 分页高度
            const paginationDOM = tableWapperDOM?.querySelector('.ant-pagination') as HTMLElement 
            const pageHeight = paginationDOM?.offsetHeight
            // 计算分页margin
            const pageMarginTop = parseInt(paginationDOM && getStyle(paginationDOM, 'marginTop'), 10)
            const pageMarginBot = parseInt(paginationDOM && getStyle(paginationDOM, 'marginBottom'), 10)
            // 表格title
            const tableTitle = tableWapperDOM?.querySelector('.ant-table-title') as HTMLElement
            const tableTitleHeight = tableTitle?.offsetHeight || 0
            
            const tableScrollY = pagination 
                ? (tableWapperDOMHeight - tableHeaderHeight - pageHeight - pageMarginTop - pageMarginBot - tableTitleHeight) 
                : (tableWapperDOMHeight - tableHeaderHeight - tableTitleHeight)
            // 设置一个最小的滚动高度
            const tbodyScrollY = Math.max(minScrollY, tableScrollY)

            if (!didCancel){
                setScrollY(tbodyScrollY)
            }
        }
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)

        return (): void => {
            didCancel = true
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [pagination])

    // 滚动条
    const scroll = scrollX ? { x: scrollX, y: scrollY } : { y: scrollY }

    // 分页start
    let paginations: boolean | IPagination = false

    if (pagination) {
        const { 
            pageNo = DEFAULT_PAGINATION.PAGE_NO,
            pageSize = DEFAULT_PAGINATION.PAGE_SIZE,
            total = DEFAULT_PAGINATION.TOTAL,
            pageSizeOptions = DEFAULT_PAGINATION.PAGESIZE_OPTIONS,
            ...paginationOtherParams
        } = pagination as IPagination

        // 分页总数显示
        const showTotalAction = (totalCount: number, range: Array<number>): React.ReactElement => {
            const pageCount = Math.ceil(total / pageSize) // 总页数
            const pageNum = Math.ceil(range[1] / pageSize) 
            return (
                <div>
                    第 <span className="custom-ant-pagination-total-info">{pageNum}/{pageCount}</span> 页，
                    共 <span className="custom-ant-pagination-total-info">{totalCount}</span> 条
                </div>
            )
        }
        // 分页参数
        const paginationOptions = {
            pageSize,
            total,
            current: pageNo,
            pageSizeOptions,
            showTotal: showTotalAction,
            showSizeChanger: true,
            showQuickJumper: true,
            size: 'small',
            ...paginationOtherParams
        }
        paginations = paginationOptions
    }


    // 表头
    const columns = column.map((headerItem: IHeaderItem) => {
        const { render, key, dataIndex } = headerItem
        const columnItem = { ...headerItem }
        // 如果只传了key的话，
        columnItem.dataIndex = dataIndex || key
        // 如果只传了dataIndex的话，
        columnItem.key = key || dataIndex

        // 如果没有传render
        columnItem.render = render || ((text: any): React.ReactElement => (<Tooltip title={text} placement="topLeft">{text}</Tooltip>))

        return columnItem
    })
      
    // 表格数据
    const datas = dataSource.map((datasItem, index) => {
        const key = datasItem[dataSourceKey] || `data-row${index}`
        
        return ({
            ...datasItem,
            key
        })
    })
 
    return (
        <div
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            ref={tableWapperRef}
            className={className}
        >
            <Table 
                columns={columns}
                dataSource={datas}
                scroll={scroll}
                pagination={paginations}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...other}
            />
        </div>
        
    )
}


EasyTableAntd.propTypes = {
    column: PropTypes.array.isRequired,
    dataSource: PropTypes.array,
    /**
     * 数据项作为key的字段（使用真正唯一的key可以优化diff性能）
     */
    dataSourceKey: PropTypes.string,
    /**
     * 是否展示分页,默认展示,可以传递false则不展示分页
     */
    pagination: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            pageNo: PropTypes.number,
            pageSize: PropTypes.number,
            total: PropTypes.number,
        }), 
    ]),
    /**
     * 横向滚动宽度，无横向滚动时可以不传递
     */
    scrollX: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    /**
     * 最小滚动高度
     */
    minScrollY: PropTypes.number,
    /**
     * 类名
     */
    className: PropTypes.string,
}

EasyTableAntd.defaultProps = {
    dataSource: [],
    dataSourceKey: '',
    scrollX: 0,
    pagination: false,
    minScrollY: MIN_TBODY_HEIGHT,
    className: ''
}

export default EasyTableAntd
