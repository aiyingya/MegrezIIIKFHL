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
import moment from "moment";
import KFHLService from "@/components/KFHL/Utils/Service";
import _ from "lodash";

class DischargeAssessment  extends Component {
    constructor(props) {
        super(props);
        this.handleCompleteChange = this.handleCompleteChange.bind(this);
    }
    handleCompleteChange(key) {
        // key可能为选中的身份证号码，或者用户输入的个名称
        let {handleChange,personUserList=[]} = this.props;
        const finded = personUserList.find(item=>item.identityCard===key);
        if(finded){
            handleChange && handleChange(finded.personName,"personName");
            handleChange && handleChange(finded.identityCard,"identityCard");
            return
        }nrm
        handleChange && handleChange(key,"personName");
    }

    render() {
        let {self,isHidePrint,record,getFieldDecorator,canEdit,outHopsFileDataSource,pharmacyFileDataSource,personUserList=[],
            setOutHopsFile,setPharmacyFile,removeOutHopsFile,removePharmacyFile,isDocter,handleChange=()=>{}} = this.props;

        return (
            <div className={isHidePrint ?  style.tabSelf : style.tabSelf +' '+style.showPrint}>
                <Descriptions title="无锡市康复医院2019年05月张三护理出" column={2} bordered
                              className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="姓名">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('personName', {
                                            initialValue: record.personName,...Static.rulesConfig.required
                                        })(
                                            <AutoComplete
                                                className="global-search"
                                                style={{ width: '100%' }}
                                                dataSource={personUserList.map(KFHLService.renderOption)}
                                                onSearch={_.debounce((e)=>{handleAutoSearch(e)}, 1000)}
                                                onChange={this.handleCompleteChange}
                                                placeholder="请输入"
                                                optionLabelProp="text"
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
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('sex', {
                                            initialValue: record.sex ? record.sex : Static.myEnum.sex.man,...Static.rulesConfig
                                        })(
                                            <Select onChange={(event)=> {handleChange(event, "sex")}}>
                                                {Static.myDict.sex.map(res=><Option  key={res.value} value={res.value}>{res.name}</Option>)}
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
                                            <DatePicker  format={Static.dateFormat}
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
                            {getFieldDecorator('outHospType', {
                                initialValue: record.outHospType || nursingUtils.myStatic.myEnum.yysw.cyxj
                            })(
                                <RadioGroup
                                    className={style.checkboxFlex}
                                    options={nursingUtils.myStatic.yysw}
                                    onChange={(e)=>handleChange(e,"outHospType")}
                                />
                            )}
                        </Form.Item>
                    </div>
                </footer>
                <div className={style.tableStyle}>
                    <UploadFile disabled ={!canEdit || !isDocter}
                                successCallback ={(fileData={})=>{setOutHopsFile && setOutHopsFile(self,fileData)}}
                                dataSource={outHopsFileDataSource}
                                columns={columnsUpload({remove:(fileData={})=>{removeOutHopsFile && removeOutHopsFile(self,fileData)}})}
                                expandParams = {{fileType: record.outHospType == nursingUtils.myStatic.myEnum.yysw.swjl ?  Static.fileUseType.swjl: Static.fileUseType.cyxj}}
                    />
                </div>
                <div className={style.tableStyle}>
                    <title>用药记录</title>
                    <UploadFile disabled ={!canEdit || !isDocter}
                                successCallback ={(fileData={})=>{setPharmacyFile && setPharmacyFile(self,fileData)}}
                                dataSource={pharmacyFileDataSource}
                                columns={columnsUpload({remove:(fileData={})=>{removePharmacyFile && removePharmacyFile(self,fileData)}})}
                                expandParams = {{fileType:Static.fileUseType.yyjl}}
                    />
                </div>
            </div>
        );
    }
}
export default DischargeAssessment;