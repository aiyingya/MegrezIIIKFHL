// 入院申请
import React, {Component,Fragment} from 'react';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const {TextArea} = Input;
import style from '../common.less'
import * as PropTypes from 'prop-types';
import {Global} from "winning-megreziii-utils";
import curUtil from '@components/KFHL/Util';

class Sign extends Component {
    constructor(props) {
        super(props);
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
    }

    render() {
        let {self,pageTempObj} = this.props;
        let {record={},canEdit} = pageTempObj;
        const { isHidePrint } = self.state;
        return (
            <div className={isHidePrint ?  '' : '' +' '+style.showPrint}>
                <div className={style.rowStyle}>
                    医疗机构意见：<br/>
                    { (isHidePrint && canEdit && this.user.js_lx == curUtil.myStatic.currentRole.medicalInstitution) ?
                        <TextArea className={style.noneBorder} rows={5}
                                  onChange={(event)=> {self.handleChange(event.target.value, "hospRemark")}}></TextArea>:
                        <div className={style.textArea}>{record.hospRemark}</div>
                    }
                </div>
                <Descriptions column={2} bordered className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="医疗机构签字">
                        {
                            (isHidePrint && canEdit && this.user.js_lx == curUtil.myStatic.currentRole.medicalInstitution) ?  <Input defaultValue={record.hospSign} onChange={(event)=> {self.handleChange(event.target.value, "hospSign")}}/>:
                            <Fragment>{record.hospSign}</Fragment>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="日期">
                        {
                            (canEdit && this.user.js_lx == curUtil.myStatic.currentRole.medicalInstitution) ?  <Fragment>{self.currentDay}</Fragment>:
                                <Fragment>{record.hospSignDate}</Fragment>
                        }
                    </Descriptions.Item>
                </Descriptions>
                <div className={style.rowStyle}>
                    社保中心人员意见：<br/>
                    { (isHidePrint && canEdit && this.user.js_lx == curUtil.myStatic.currentRole.socialInsurance) ?
                        <TextArea className={style.noneBorder} rows={5}
                                  onChange={(event)=> {self.handleChange(event.target.value, "sicRemark")}}></TextArea>:
                        <div className={style.textArea}>{record.sicRemark}</div>
                    }
                </div>
                <Descriptions column={2} bordered className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="社保中心签字">
                        {
                            (isHidePrint && canEdit && this.user.js_lx == curUtil.myStatic.currentRole.socialInsurance) ?  <Input defaultValue={record.sicSign} onChange={(event)=> {self.handleChange(event.target.value, "sicSign")}}/>:
                                <Fragment>{record.sicSign}</Fragment>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="日期">
                        {
                            (canEdit && this.user.js_lx == curUtil.myStatic.currentRole.socialInsurance) ?  <Fragment>{self.currentDay}</Fragment>:
                                <Fragment>{record.sicSignDate}</Fragment>
                        }
                        </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

PropTypes.propTypes = {
    self: PropTypes.string.isRequired
};
export default Sign;