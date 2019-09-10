import React from 'react';
import style from './common.less'
import curUtil from '../Service/Util';

export default (self)=>{
    const {state}=self.props;
    return [
        { title: '表单名称', dataIndex: 'tableName'
        },
        { title: '审核状态', dataIndex: 'auditStatus', render:(text, record, index) =>{
                let _flowStatus = state.staticStatus.flowStatus || [];
                const objct = _flowStatus.find(res=>res.value == text) || {};
                return <div>{objct.name}</div>
            }
        },
        {
            title: '填报状态',
            dataIndex: 'tableStatus', render:(text, record, index) =>{
                if(curUtil.myStatic.tableStatus.completed == text){
                    return <span >已填</span>
                }
                return <span className={style.textColor}>未填</span>
            }
        },
        { title: '发起人', dataIndex: 'initPerson'},
        { title: '发起时间', dataIndex: 'initDate'},
        { title: '归档时间', dataIndex: 'pigeonholeDate', render:(text, record, index) =>{
                if(text){
                    return <div>{text}</div>
                }
                return <div> / </div>
            }},
        {
            title: '查看',
            dataIndex: 'operation', render:(text, record, index) =>{
                if(curUtil.myStatic.tableStatus.completed == record.tableStatus){
                    return <div onClick={()=>{self.goLook(record)}} className={style.jumpSelect}>查看</div>
                }
                return ''
            }
        },
    ]
}