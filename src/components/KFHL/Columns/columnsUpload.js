import React from 'react';
import style from '../common.less';

export default ({remove=()=>{}})=>{

   const clickDownLoad=(url)=>{
        window.location.href=url;
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
            dataIndex: 'size'
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
                    <span className={style.clickText} onClick={()=>{clickDownLoad(record.fileUrl)}}>下载</span>
                    <span className={style.clickText} onClick={()=>{remove(record)}}>删除</span></div>
            }
        }

    ]
}