import React from 'react';
import style from './common.less'
import curUtil from '../Service/Util';

export default ()=>{
    return [
        { title: '序号', dataIndex: 'ID',  render:(text,record,index)=>`${index+1}` },
        { title: '患者', dataIndex: 'personName'},
        { title: '证件号码', dataIndex: 'identityCard'},
        { title: '性别', dataIndex: 'sex'},
        { title: '年龄', dataIndex: 'age' },
        { title: '已填表单', dataIndex: 'fillTable' ,width:"80px" },
        { title: '待填表单', dataIndex: 'notFillTable',  render:(text, record, index) => <span className={style.textColor}>{text}</span> }
    ]
}