import React from 'react';
import {Global,Uc} from 'winning-megreziii-utils';
import {Badge} from 'antd';
import style from './common.less';

export default (self,{remove})=>{
    return [
        {
            title: '序号',
            dataIndex: 'fileId',
            render:(text,record,index)=>`${index+1}`,
        }, {
            title: '文件名',
            dataIndex: 'name',
        }, {
            title: '大小(KB)',
            dataIndex: 'size'
        },{
            title: '上传时间',
            dataIndex: 'uploadTime'
        }, {
            title: '上传人',
            dataIndex: 'uploadUser'
        } ,
        {
            title: '操作',
            dataIndex: 'operation',
            render:(texts, record, index) =>{
                if(record.isTest){return "";}
                return <div>
                    <span className={style.clickText} onClick={()=>{self.clickDownLoad(record.fileUrl)}}>下载</span>
                    <span className={style.clickText} onClick={()=>{remove(self,record)}}>删除</span></div>
            }
        }

    ]
}