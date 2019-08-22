const rowSelection =(self)=>{
    return {
        selectedRowKeys:self.state.selectedRows.map(res=>{return res.ROW_ID}) || [],
        columnWidth:50,
        onChange: (selectedRowKeys, selectedRows) => {
            self.setState({selectedRows})
        }
    }
};

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

export default {
    // 初始化编辑中机构列表的选中数据
    rowSelection,
    formItemLayout
}