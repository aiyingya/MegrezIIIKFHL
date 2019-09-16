import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import { Input, Descriptions, Select,Form,DatePicker} from 'antd';
const {TextArea} = Input;
import curUtil from '../../Util'
import style from '../../../../../components/KFHL/common.less'
import Assess from '../Assess/Assess';
import Static from "@components/KFHL/Utils/Static";
import moment from "moment/moment";
import KFHLService from "@/components/KFHL/Utils/Service";

class InHospAssess  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {self,isDocter,canEdit,getFieldDecorator,isHidePrint} = this.props;
        let {record={}} = self.props.state.pageTempObj;
        return (
            <div className={isHidePrint ?  style.tabSelf : style.tabSelf +' '+style.showPrint}>
                <Descriptions title="无锡市康复医院2019年05月张三康复入院评估表" column={2} bordered
                              className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="姓名">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('personName', {
                                            initialValue: record.personName,...curUtil.myStatic.inputRules
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {self.handleChange(event.target.value, "personName")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="性别">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('sex', {
                                            initialValue: record.sex ? record.sex : Static.myEnum.sex.man,...Static.rulesConfig.required
                                        })(

                                            <Select onChange={(event)=> {self.handleChange(event, "sex")}}>
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
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('identityCard', {
                                            initialValue: record.identityCard,...Static.rulesConfig.identityCard
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
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('bedNumber', {
                                            initialValue: record.bedNumber,...Static.rulesConfig.required
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
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('lesion', {
                                            initialValue: record.lesion,...Static.rulesConfig.required
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
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospNumber', {
                                            initialValue: record.inHospNumber,...Static.rulesConfig.required
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
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospDate', {
                                            initialValue: record.inHospDate && moment(record.inHospDate),rules: [{required: false, message: '请输入'}]
                                        })(
                                            <DatePicker  format={Static.dateFormat}
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
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospDiagnose', {
                                            initialValue: record.inHospDiagnose,...Static.rulesConfig.required
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
                <Assess self={self} pageTempObj ={self.props.state.pageTempObj} isDocter={isDocter}
                        canEdit={canEdit} record={record} isHidePrint={isHidePrint} handleChange={self.handleChange}/>
            </div>
        );
    }
}

PropTypes.propTypes = {
    self: PropTypes.string.isRequired
};
export default InHospAssess;