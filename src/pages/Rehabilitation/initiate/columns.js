import React from 'react';
import {Global,Uc} from 'winning-megreziii-utils';
import {Badge} from 'antd';
import style from './common.less';
import curUtil from '@components/KFHL/Util';

export default (self)=>{
    const {state}=self.props;
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
                switch (objct.value){
                    case curUtil.myStatic.flowStatus.agree:
                        color ="green"
                        break;
                    case curUtil.myStatic.flowStatus.reject:
                        color ="red"
                        break;
                    case curUtil.myStatic.flowStatus.awaitAudit:
                        color ="blue"
                        break;
                    case curUtil.myStatic.flowStatus.awaitSubmit:
                        color ="gray"
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
            dataIndex:'flowType',render:(texts, record, index) =>{
                let _flowType = state.staticStatus.flowType || [];
                const objct = _flowType.find(res=>res.value == texts) || {};
                //KFHL_TB 内的字典
                let badge = null;
                switch (objct.value){
                    case curUtil.myStatic.flowType.inHosp:
                        badge ="processing"
                        break;
                    case curUtil.myStatic.flowType.outHosp:
                        badge ="success"
                        break;
                    default:
                        break;
                }
                return <span>{badge? <Badge status={badge} /> : ''}{objct.name}</span>
            }
        }
        ,
        {
            title: '历史流程',
            dataIndex:'operation',
            render: (texts, record, index) =>{
                return <div onClick={()=>{self.goLook(record)}} className={style.jumpSelect}>查看</div>
            }
        }

    ]
}