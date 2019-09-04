// 入院申请
import React, {Component,Fragment} from 'react';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const RadioGroup = Radio.Group;
const {TextArea} = Input;
import _ from 'lodash';
import curUtil from '../Util'
import style from '../common.less'
import * as PropTypes from 'prop-types';
import Assess from '@components/KFHL/Assess/Assess';

class OutHospAssess  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {self} = this.props;
        let {record={},personUserList,canEdit} = self.props.state.pageTempObjCY;
        const { getFieldDecorator } = self.props.form;
        const { isHidePrint } = self.state;

        return (
            <div className={isHidePrint ?  style.tabSelf : style.tabSelf +' '+style.showPrint}>
                <Descriptions title="无锡市康复医院2019年05月张三康复入院评估表" column={2} bordered
                              className={style.descriptions}>
                    <Descriptions.Item label="姓名">
                        <Fragment>
                            {
                                (isHidePrint && canEdit) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('personName', {
                                            initialValue: record.personName,...curUtil.myStatic.rulesConfig
                                        })(
                                            <AutoComplete
                                                className="global-search"
                                                style={{ width: '100%' }}
                                                dataSource={personUserList.map(curUtil.renderOption)}
                                                // onSelect={self.onAutoSelect}
                                                onSearch={_.debounce((e)=>{self.handleAutoSearch(e)}, 1000)}
                                                onChange={(e)=>{self.handleChange(e,"personName")}}
                                                placeholder="请输入"
                                                optionLabelProp="value"
                                            >
                                            </AutoComplete>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="性别">
                        <Fragment>
                            {
                                (isHidePrint && canEdit) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('sex', {
                                            initialValue: (record.sex && record.sex=="女") ? "1":"0",...curUtil.myStatic.rulesConfig
                                        })(
                                            <Select onChange={(event)=> {self.handleChange(event, "sex")}}>
                                                <Select.Option value="0">男</Select.Option>
                                                <Select.Option value="1">女</Select.Option>
                                            </Select>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="年龄">
                        <Fragment>
                            {
                                (isHidePrint && canEdit) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('age', {
                                            initialValue: record.age,...curUtil.myStatic.rulesConfig
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {self.handleChange(event.target.value, "age")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.age}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="证件号码">
                        <Fragment>
                            {
                                (isHidePrint && canEdit) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('identityCard', {
                                            initialValue: record.identityCard,...curUtil.myStatic.rulesConfig
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {self.handleChange(event.target.value, "identityCard")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.identityCard}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="床号">
                        <Fragment>
                            {
                                (isHidePrint && canEdit) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('bedNumber', {
                                            initialValue: record.bedNumber,...curUtil.myStatic.rulesConfig
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {self.handleChange(event.target.value, "bedNumber")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.bedNumber}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="病区">
                        <Fragment>
                            {
                                (isHidePrint && canEdit) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('lesion', {
                                            initialValue: record.lesion,...curUtil.myStatic.rulesConfig
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {self.handleChange(event.target.value, "lesion")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.lesion}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="住院号">
                        <Fragment>
                            {
                                (isHidePrint && canEdit) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospNumber', {
                                            initialValue: record.inHospNumber,...curUtil.myStatic.rulesConfig
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {self.handleChange(event.target.value, "inHospNumber")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.inHospNumber}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="入院时间">
                        <Fragment>
                            {
                                (isHidePrint && canEdit) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospDate', {
                                            initialValue: record.inHospDate,rules: [{required: false, message: '请输入'}]
                                        })(
                                            <DatePicker  format={curUtil.myStatic.dateFormat}
                                                         onChange={(date, dateString)=>  {self.handleChange(dateString, "inHospDate")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.inHospDate}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="入院诊断" span={2}>
                        <Fragment>
                            {
                                (isHidePrint && canEdit) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospDiagnose', {
                                            initialValue: record.inHospDiagnose,...curUtil.myStatic.rulesConfig
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {self.handleChange(event.target.value, "inHospDiagnose")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.inHospDiagnose}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                </Descriptions>
                <Assess self={self} pageTempObj ={self.props.state.pageTempObjCY}/>
                <footer className={style.footer}><title className={style.tRight}>备注</title>
                    <div>
                        <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator('remake', {
                                initialValue: record.remake
                            })(
                                <Input onChange={(event)=> {self.handleChange(event.target.value, "remake")}}/>
                            )}
                        </Form.Item>
                    </div>
                </footer>
                <footer className={style.footer}><title className={style.tRight}>据此考虑</title>
                    <div>
                        <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator('isOutHosp', {
                                initialValue: record.isOutHosp || "0"
                            })(
                                <RadioGroup
                                    className={style.checkboxFlex}
                                    options={curUtil.myStatic.outHospResult}
                                    onChange={(e)=>self.handleChange(e,"isOutHosp")}
                                />
                            )}
                        </Form.Item>
                    </div>
                </footer>
            </div>
        );
    }
}

PropTypes.propTypes = {
    self: PropTypes.string.isRequired
};
export default OutHospAssess;