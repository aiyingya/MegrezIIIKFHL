import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
import nursingUtils from '../Util';
import style from './common.less'
import {Global} from "winning-megreziii-utils";
import UploadFile from '@components/UploadFile/UploadFile';
import columnsUpload from "@/components/KFHL/Columns/columnsUpload";
import Static from "@components/KFHL/Utils/Static";
import moment from "moment/moment";
import KFHLService from "@/components/KFHL/Utils/Service";

class DischargeAssessment  extends Component {
    constructor(props) {
        super(props);
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        this.onCheckChange = this.onCheckChange.bind(this);
    }
    onCheckChange(checkedValues = [],field) {
        let value= checkedValues.length ? [_.last(checkedValues)] : [];
        this.props.self.handleChange(value, field)
    }
    render() {
        let {self,isHidePrint,record,getFieldDecorator,dict,canEdit,outHopsFileDataSource,pharmacyFileDataSource,
            setOutHopsFile,setPharmacyFile,removeOutHopsFile,removePharmacyFile,isDocter} = this.props;

        return (
            <div className={isHidePrint ?  style.tabSelf : style.tabSelf +' '+style.showPrint}>
                <Descriptions title="无锡市康复医院2019年05月张三护理出" column={2} bordered
                              className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="姓名">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('personName', {
                                            initialValue: record.personName,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "personName")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="性别">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('sex', {
                                            initialValue: record.sex ? record.sex : Static.myEnum.sex.man,...Static.rulesConfig
                                        })(
                                            <Select onChange={(event)=> {handleChange(event, "sex")}}>
                                                {Static.myDict.sex.map(res=><Option value={res.value}>{res.name}</Option>)}
                                            </Select>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{KFHLService.getSexName(record.sex)}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="年龄">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('age', {
                                            initialValue: record.age,...Static.rulesConfig.age
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "age")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.age}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="证件号码">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('identityCard', {
                                            initialValue: record.identityCard,...Static.rulesConfig.identityCard
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "identityCard")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.identityCard}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="床号">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('bedNumber', {
                                            initialValue: record.bedNumber,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "bedNumber")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.bedNumber}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="病区">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('lesion', {
                                            initialValue: record.lesion,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "lesion")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.lesion}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="住院号">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospNumber', {
                                            initialValue: record.inHospNumber,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "inHospNumber")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.inHospNumber}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="入院时间">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospDate', {
                                            initialValue: record.inHospDate && moment(record.inHospDate),rules: [{required: false, message: '请输入'}]
                                        })(
                                            <DatePicker  format={nursingUtils.myStatic.dateFormat}
                                                         onChange={(date, dateString)=>  {handleChange(dateString, "inHospDate")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.inHospDate}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>

                </Descriptions>
                <footer className={style.cysw}>
                    <div>
                        <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator('isOutHosp', {
                                initialValue: record.isOutHosp || "0"
                            })(
                                <RadioGroup
                                    className={style.checkboxFlex}
                                    options={nursingUtils.myStatic.yysw}
                                    onChange={(e)=>handleChange(e,"isOutHosp")}
                                />
                            )}
                        </Form.Item>
                    </div>
                </footer>
                <div className={style.tableStyle}>
                    <title>上级医院病历</title>
                    <UploadFile disabled ={!canEdit || !isDocter}
                                successCallback ={(fileData={})=>{setOutHopsFile && setOutHopsFile(self,fileData)}}
                                dataSource={outHopsFileDataSource}
                                columns={columnsUpload({remove:(fileData={})=>{removeOutHopsFile && removeOutHopsFile(self,fileData)}})}/>
                </div>
                <div className={style.tableStyle}>
                    <title>用药记录</title>
                    <UploadFile disabled ={!canEdit || !isDocter}
                                successCallback ={(fileData={})=>{setPharmacyFile && setPharmacyFile(self,fileData)}}
                                dataSource={pharmacyFileDataSource}
                                columns={columnsUpload({remove:(fileData={})=>{removePharmacyFile && removePharmacyFile(self,fileData)}})}/>
                </div>
            </div>
        );
    }
}
export default DischargeAssessment;