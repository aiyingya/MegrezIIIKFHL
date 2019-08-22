import React from 'react';

export default (self)=>{
    return [
        {title: '序号', dataIndex: 'ROW_ID', width: 60},
        {title: '类别代码', dataIndex: 'typeCode'},
        {title: '类别名称', dataIndex: 'typeName'},
        {title: '代码值',dataIndex: 'code'},
        {title: '代码名称',dataIndex: 'name'},
        {
            title: '操作',
            width: 60,
            render:(text,record)=> <a href='javascript:void(0);' onClick={()=>self.goEdit(record)}>更新</a>
        }
    ]
}