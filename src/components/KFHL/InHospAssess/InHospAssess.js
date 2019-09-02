import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import { Input, Descriptions, Select,Form,DatePicker} from 'antd';
const {TextArea} = Input;
import curUtil from '../Util'
import style from '../common.less'

class InHospAssess  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {self} = this.props;
        let {record={}} = self.props.state.pageTempObj;
        const { getFieldDecorator } = self.props.form;
        const { isHidePrint } = self.state;
        return (
            <div className={ style.tabSelf}>
                <Descriptions title="无锡市康复医院2019年05月张三康复入院评估表" column={2} bordered
                              className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="姓名">
                        <Fragment>
                            {
                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
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
                                isHidePrint ?   <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('sex', {
                                            initialValue: (record.sex && record.sex=="女") ? "1":"0"
                                        })(

                                            <Select onChange={(event)=> {self.handleChange(event, "sex")}}>
                                                <Option value="0">男</Option>
                                                <Option value="1">女</Option>
                                            </Select>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.sex}</Fragment>
                            }
                        </Fragment>

                    </Descriptions.Item>
                    <Descriptions.Item label="年龄">
                        <Fragment>
                            {
                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
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
                                isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
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
                                isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
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
                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
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
                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
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
                                isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
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
                                isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
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
                <div className={`${style.propList} ${style.marginTopDiv}`}>
                    <header>
                        <div>评估项目</div>
                        <div>功能障碍及其程度</div>
                    </header>
                    <div>
                        <div className={style.heightText}>1.脑高级功能复制</div>
                        <div><Input onChange={(event)=> {self.handleChange(event.target.value, "brainFun")}}/></div>
                    </div>
                    <div>
                        <div>意识水平</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "mentLevel")}}/></div>
                    </div>
                    <div>
                        <div>认知功能</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "cognitive")}}/></div>
                    </div>
                    <div>
                        <div>言语功能</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "speak")}}/></div>
                    </div>
                    <div>
                        <div>情感情绪</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "mood")}}/></div>
                    </div>
                    <div>
                        <div className={style.heightText}>2.吞咽功能</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "swallowingFun")}}/></div>
                    </div>
                    <div>
                        <div className={style.heightText}>3.运动功能</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "motionFun")}}/></div>
                    </div>
                    <div>
                        <div>肌力</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "myodynamia")}}/></div>
                    </div>
                    <div>
                        <div>肌张力</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "muscularTone")}}/></div>
                    </div>
                    <div>
                        <div>平衡功能</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "balance")}}/></div>
                    </div>
                    <div>
                        <div>感觉功能</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "sensibility")}}/></div>
                    </div>
                    <div>
                        <div>浅感觉</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "superficialSen")}}/></div>
                    </div>
                    <div>
                        <div>深感觉</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "deepSen")}}/></div>
                    </div>
                    <div>
                        <div>复合感觉</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "compositeSen")}}/></div>
                    </div>
                    <div>
                        <div>日常生活能力</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "dayLive")}}/></div>
                    </div>
                    <div>
                        <div>合并症/并发症</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "syndrome")}}/></div>
                    </div>
                    <div>
                        <div>心功能不全</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "cardiacFun")}}/></div>
                    </div>
                    <div>
                        <div>肺部感染</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "pulInfection")}}/></div>
                    </div>
                    <div>
                        <div>气管切开</div>
                        <div><Input  onChange={(event)=> {self.handleChange(event.target.value, "tracheotomy")}}/></div>
                    </div>
                </div>
                <div className={style.rowStyle}>
                    康复科评估意见：<br/>
                    <TextArea className={style.noneBorder} rows={5}></TextArea>
                </div>
                <Descriptions column={2} bordered className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="护理人员签字"></Descriptions.Item>
                    <Descriptions.Item label="日期"></Descriptions.Item>
                </Descriptions>
                <div className={style.rowStyle}>
                    医疗机构意见：<br/>
                    <TextArea className={style.noneBorder} rows={5} readOnly></TextArea>
                </div>
                <Descriptions column={2} bordered className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="医疗机构签字"></Descriptions.Item>
                    <Descriptions.Item label="日期"></Descriptions.Item>
                </Descriptions>
                <div className={style.rowStyle}>
                    社保中心人员意见：<br/>
                    <TextArea className={style.noneBorder} rows={5} readOnly></TextArea>
                </div>
                <Descriptions column={2} bordered className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="社保中心签字"></Descriptions.Item>
                    <Descriptions.Item label="日期"></Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

PropTypes.propTypes = {
    self: PropTypes.string.isRequired
};
export default InHospAssess;