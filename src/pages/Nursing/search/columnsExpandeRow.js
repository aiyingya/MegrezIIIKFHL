import React from 'react';
import style from './common.less'

export default ()=>{
    return [
        { title: '入院机构', dataIndex: 'hospName'},
        { title: '入院日期', dataIndex: 'inHospDate'},
        {
            title: '出院日期',
            dataIndex: 'outHospDate'
        },
        { title: '待填表单', dataIndex: 'notFillTable' }
    ]
}