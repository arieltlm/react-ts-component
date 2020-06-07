import { TableProps } from 'antd/lib/table'

export interface IHeaderItem {
    key?: string;
    render?: any;
    [propertys: string]: any;
}

export interface IPagination {
    pageNo?: number;
    pageSize?: number;
    total?: number;
    [propertys: string]: any;
}

export interface ITableProps extends TableProps<any> {
    column: Array<IHeaderItem>;
    dataSource?: object[];
    dataSourceKey?: string;
    showPage?: boolean;
    pagination?: boolean | IPagination ;
    scrollX?: string | number;
    minScrollY?: number;
}
