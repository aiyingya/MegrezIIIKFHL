// 入院申请
import React, {Component,Fragment} from 'react';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const {TextArea} = Input;
import style from './Sign.less'
import {Global} from "winning-megreziii-utils";
import Static from '@components/KFHL/Utils/Static';

class Sign extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {isHidePrint,record,handleChange,canEdit} = this.props;

        return (
            <div className={isHidePrint ?  '' : '' +' '+style.showPrint}>
                <div className={style.rowStyle}>
                    医疗机构意见：<br/>
                    { (isHidePrint && canEdit && _m.user.js_lx == Static.currentRole.medicalInstitution) ?
                        <TextArea className={style.noneBorder} rows={5}
                                  onChange={(event)=> {handleChange(event.target.value, "hospRemark")}}></TextArea>:
                        <div className={style.textArea}>{record.hospRemark}</div>
                    }
                </div>
                <Descriptions column={2} bordered className={style.descriptions} size="middle">
                    <Descriptions.Item label="医疗机构签字">
                        {
                            (isHidePrint && canEdit && _m.user.js_lx == Static.currentRole.medicalInstitution) ?  <Input defaultValue={record.hospSign} onChange={(event)=> {handleChange(event.target.value, "hospSign")}}/>:
                            <Fragment>{record.hospSign}</Fragment>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="日期">
                        <Fragment>{record.hospSignDate}</Fragment>
                    </Descriptions.Item>
                </Descriptions>
                <div className={style.rowStyle}>
                    社保中心人员意见：<br/>
                    { (isHidePrint && canEdit && _m.user.js_lx == Static.currentRole.socialInsurance) ?
                        <TextArea className={style.noneBorder} rows={5}
                                  onChange={(event)=> {handleChange(event.target.value, "sicRemark")}}></TextArea>:
                        <div className={style.textArea}>{record.sicRemark}</div>
                    }
                </div>
                <Descriptions column={2} bordered className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="社保中心签字">
                        {
                            (isHidePrint && canEdit && _m.user.js_lx == Static.currentRole.socialInsurance) ?  <Input defaultValue={record.sicSign} onChange={(event)=> {handleChange(event.target.value, "sicSign")}}/>:
                                <Fragment>{record.sicSign}</Fragment>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="日期">
                        <Fragment>{record.sicSignDate}</Fragment>
                        </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default Sign;