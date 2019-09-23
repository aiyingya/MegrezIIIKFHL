import React from 'react';
import style from '../common.less';
import {Uc} from "winning-megreziii-utils";

export default ({remove=()=>{}})=>{

   const clickDownLoad= (record={})=>{
        Uc.post("file_upload",{filePath:record.fileUrl,fileName:record.fileName});
    }
    return [
        {
            title: '序号',
            dataIndex: 'fileId',
            render:(text,record,index)=>`${index+1}`,
        }, {
            title: '文件名',
            dataIndex: 'fileName',
        }, {
            title: '大小(KB)',
            dataIndex: 'fileSize'
        },{
            title: '上传时间',
            dataIndex: 'uploadDate'
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
                    <span className={style.clickText} onClick={()=>{clickDownLoad(record)}}>下载</span>
                    <span className={style.clickText} onClick={()=>{remove(record)}}>删除</span></div>
            }
        }

    ]
}