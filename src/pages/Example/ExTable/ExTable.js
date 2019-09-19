import React, {Component} from 'react';
import {Table, Button} from 'antd';
import ColumnsDatas from './Columns';
import Data from './Data';
import treeColumns from './TreeColumns';
import treeData from './TreeData';
import {Resizable} from 'react-resizable';
import {Scrollbar} from 'winning-megreziii-utils';

const ResizeableTitle = (props) => {
    const {onResize, width, ...restProps} = props;
    if (!width) {
        return <th {...restProps} />;
    }
    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};

class ExTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pagination: {
                current: 1,
                pageSize:10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `总共${total}条 显示${range[0]}-${range[1]}条`,
                total: 1500,
                size: 'small'
            },
            columns :ColumnsDatas.map((col, index) => ({
                ...col,
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index),
                }),
            }))
        };
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        }
        this.rowSelectionTree = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        }
        this.components = {
            header: {
                cell: ResizeableTitle,
            },
        };
        this.handleResize = index => (e, { size }) => {
            this.setState(({ columns }) => {
                const nextColumns = [...columns];
                nextColumns[index] = {
                    ...nextColumns[index],
                    width: size.width,
                };
                return { columns: nextColumns };
            });
        };
    }


    componentDidMount() {
        new Scrollbar(this.refs.inside).show();
    }

    title() {
        return (
            <Button type="operation" size="small">新增</Button>
        )
    }
    onResize(){
        debugger;
    }

    render() {
        return (
            <div style={{"width": "100%", "height": "100%", "padding": "30px"}} ref="inside">
                <div className={'Table40'}>
                    <Table
                        title={this.title}
                        loading={this.state.loading}
                        columns={this.state.columns}
                        dataSource={Data}
                        pagination={this.state.pagination}
                        rowSelection={this.rowSelection}
                        components={this.components}
                    />
                </div>
                <br/>
                <hr/>
                <br/>
                <div className={'Table30'}>
                    <Table
                        title={this.title}
                        loading={this.state.loading}
                        columns={this.state.columns}
                        dataSource={Data}
                        pagination={this.state.pagination}
                        rowSelection={this.rowSelection}
                    />
                </div>
                <br/>
                <hr/>
                <br/>
                <div className={'Table40'}>
                    <Table
                        title={this.title}
                        loading={this.state.loading}
                        columns={treeColumns}
                        dataSource={treeData}
                        pagination={this.state.pagination}
                        rowSelection={this.rowSelectionTree}/>
                </div>
            </div>
        );
    }
}

export default ExTable;