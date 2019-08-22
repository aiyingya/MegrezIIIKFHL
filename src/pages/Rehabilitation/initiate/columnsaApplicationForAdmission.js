import React from 'react';
import {Global,Uc} from 'winning-megreziii-utils';
import {Badge} from 'antd';
import style from './common.less';

export default (self)=>{
    // const {initiate,state}=self.props;
    return [
        {
            title: '序号',
            dataIndex: 'key',
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
            dataIndex:'key2',
            render:(texts, record, index) =>{
                return <div><span className={style.clickText}>下载</span><span className={style.clickText}>删除</span></div>
            }
        }

    ]
}