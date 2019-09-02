import React from 'react';
import {Global,Uc} from 'winning-megreziii-utils';
import {Badge} from 'antd';
import style from './common.less';

export default (self)=>{
    const {initiate,state}=self.props;
    return [
        {
            title: '序号',
            dataIndex: 'inHospTableId',
            render:(text,record,index)=>`${index+1}`,
            width: '8%',
        }, {
            title: '标题',
            dataIndex: 'titile',
        }, {
            title: '患者',
            dataIndex: 'personName',
            render: (text, record) => (
                <div>{Global.nullText(text)}</div>
            )
        },{
            title: '节点',
            dataIndex: 'node',
            render: (texts, record) => {
                let _node = state.staticStatus.node || [];
                const objct = _node.find(res=>res.value == texts) || {};
                return <span>{objct.name}</span>
            }
        }, {
            title: '发起人',
            dataIndex: 'initPerson'
        } ,{
            title: '发起日期',
            dataIndex:'initDate'
        },
        {
            title: '审核日期',
            dataIndex:'auditDate'
        },
        {
            title: '状态',
            dataIndex:'flowStatus',
            render:(texts, record, index) =>{
                let _flowStatus = state.staticStatus.flowStatus || [];
                const objct = _flowStatus.find(res=>res.value == texts) || {};
                let color = '';
                switch (Number(objct.value)){
                    case 0:
                        color ="green"
                        break;
                    case 1:
                        color ="red"
                        break;
                    case 2:
                        color ="blue"
                        break;
                    default:
                        color ="error"
                        break;
                }

                return <span className={style[color]}>{objct.name}</span>
            }
        },
        {
            title: '类型',
            dataIndex:'flowType',
            render:(texts, record, index) =>{
                let _flowType = state.staticStatus.flowType || [];
                const objct = _flowType.find(res=>res.value == texts) || {};
                //KFHL_TB 内的字典
                let badge = null;
                switch (Number(objct.value)){
                    case 0:
                        badge ="processing"
                        break;
                    case 1:
                        badge ="success"
                        break;
                    default:
                        break;
                }
                return <span>{badge? <Badge status={badge} /> : ''}{objct.name}</span>
            }
        },
        {
            title: '历史流程',
            dataIndex:'operation',
            render: (texts, record, index) =>{
                return <div onClick={()=>{self.goEditApplicationForAdmission(record)}} className={style.jumpSelect}>查看</div>
            }
        },
        {
            title: '备注',
            dataIndex:'id',
            render: (texts, record, index) =>{
                if(record.flowStatus == 1){
                    return <div onClick={()=>{self.goEditRole(record)}} className={style.alertText}>退回原因</div>
                }
                return <div></div>

            }
        }

    ]
}