import React from 'react';
import {Global,Uc} from 'winning-megreziii-utils';
import {Badge} from 'antd';
import style from './common.less';
import Static from "@components/KFHL/Utils/Static";
import moment from "moment";
import nursingUtils from '../Service/Util';

export default (self)=>{
    const {state}=self.props;
    return [
        {
            title: '序号',
            dataIndex: 'ID',
            render:(text,record,index)=>`${index+1}`,
            width: '8%',
        }, {
            title: '标题',
            dataIndex: 'title',
        }, {
            title: '患者',
            dataIndex: 'personName',
            render: (text, record) => (
                <div>{Global.nullText(text)}</div>
            )
        },{
            title: '节点',
            dataIndex: 'node',
            render: (text, record) => {
                let name = _m.dictName(text,"KFHL_LC");
                return <span>{name}</span>
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
            dataIndex:'auditDate',
            render:(text, record, index) =>text && moment(text).format(Static.dateFormat)
        },
        {
            title: '状态',
            dataIndex:'flowStatus',
            render:(text, record, index) =>{
                let name = _m.dictName(text,"KFHL_ST");
                let color = '';
                switch (text){
                    case Static.flowStatus.agree:
                        color ="green"
                        break;
                    case Static.flowStatus.reject:
                        color ="red"
                        break;
                    case Static.flowStatus.awaitAudit:
                        color ="blue"
                        break;
                    case Static.flowStatus.awaitSubmit:
                        color ="gray"
                        break;
                    default:
                        color ="error"
                        break;
                }
                return <span className={style[color]}>{name}</span>
            }
        },
        {
            title: '类型',
            dataIndex:'flowType',
            render:(text, record, index) =>{
                let _flowType = nursingUtils.myStatic.myDict.flowType || [];
                const objct = _flowType.find(res=>res.value == text) || {};
                let badge = "error";
                switch (text){
                    case nursingUtils.myStatic.myEnum.flowType.AdmissionAssessment:
                        badge ="processing";
                        break;
                    case nursingUtils.myStatic.myEnum.flowType.DischargeAssessment:
                        badge ="success";
                        break;
                    case nursingUtils.myStatic.myEnum.flowType.StageAssessment:
                        badge ="success";
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