import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const {TextArea} = Input;
const {Option} = Select;
import nursingUtils from '../Util';
import style from './common.less'
import {Global} from "winning-megreziii-utils";
import Sign from '@components/KFHL/Sign/Sign';
import _ from "lodash";
import Static from "@components/KFHL/Utils/Static";
import moment from "moment";
import KFHLService from "@/components/KFHL/Utils/Service";

class StageAssessment  extends Component {
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
        }
        handleChange && handleChange(key,"personName");
    }
    render() {

        let {isHidePrint,record,getFieldDecorator,self,canEdit,handleChange=()=>{},handleAutoSearch,monthList=[],isDocter,personUserList=[] } = this.props;

        return (
            <div className={isHidePrint ?  style.tabSelf : style.tabSelf +' '+style.showPrint}>
                <Descriptions title="无锡市康复医院2019年05月张三护理阶" column={2} bordered
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
                                            initialValue: record.sex ? record.sex : Static.myEnum.sex.man,...Static.rulesConfig.required
                                        })(
                                            <Select onChange={(event)=> {handleChange(event, "sex")}}>
                                                {Static.myDict.sex.map(res=><Option key={res.value} value={res.value}>{res.name}</Option>)}
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
                                            initialValue: record.identityCard,...Static.rulesConfig.required
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
                    <Descriptions.Item label="评估月份">
                        <div className={style.pgyf}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }} >
                                        {getFieldDecorator('yf', {
                                            initialValue: record.yf,...Static.rulesConfig.required
                                        })(
                                            <Select onChange={(event)=> {handleChange(event, "yf")}}>
                                                {monthList.map(item =>
                                                    <Option  key={item.ID} className="winning-sign-color" >{item.nurseMonthFrom} - {item.nurseMonthTo}</Option>
                                                )}
                                            </Select>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item></Descriptions.Item>
                </Descriptions>

                <div className={style.ybqk}>一般情况</div>
                <Descriptions column={{ xxl: 5, xl: 5, lg: 3, md: 3, sm: 2, xs: 2 }}  bordered className={style.descriptions} size="middle">
                    <Descriptions.Item label="T">
                        <div className={style.flexRow}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('personName', {
                                            initialValue: record.personName,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "personName")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                            <div>&nbsp;&nbsp;℃</div>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="P">
                        <div className={style.flexRow}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('personName', {
                                            initialValue: record.personName,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "personName")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                            <div>&nbsp;次/分</div>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="R">
                        <div className={style.flexRow}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('personName', {
                                            initialValue: record.personName,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "personName")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                            <span>&nbsp;次/分</span>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="BP">
                        <div className={style.flexRow}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('personName', {
                                            initialValue: record.personName,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "personName")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                            <span>&nbsp;mmHg</span>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="体重">
                        <div className={style.flexRow}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('personName', {
                                            initialValue: record.personName,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "personName")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.personName}</Fragment>
                            }
                            <span>&nbsp;KG</span>
                        </div>
                    </Descriptions.Item>
                </Descriptions>

                <Descriptions  column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} bordered className={style.descriptions} size="middle">
                    <Descriptions.Item label="饮食">
                        <div className={style.ys}>
                            <Input onChange={(event)=> {handleChange(event.target.value, "tlLeft")}}/>
                            <Input onChange={(event)=> {handleChange(event.target.value, "tlLeft")}}/>
                            <span>次/日</span>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="睡眠">
                        <Input onChange={(event)=> {handleChange(event.target.value, "tlLeft")}}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="大便">
                        <div className={style.db}>
                            <Input onChange={(event)=> {handleChange(event.target.value, "tlLeft")}}/>
                            <Input onChange={(event)=> {handleChange(event.target.value, "tlLeft")}}/>
                            <span>次/日</span>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="小便">
                        <div className={style.xb}>
                            <Input onChange={(event)=> {handleChange(event.target.value, "tlLeft")}}/>
                            <span>次/日</span>
                        </div>
                    </Descriptions.Item>
                </Descriptions>

                <div className={style.rowStyle}>
                    感知、认知、思维、活动能力情况变化：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('clinicalMani', {
                                    initialValue: record.clinicalMani,
                                })(
                                    <TextArea className={style.noneBorder} rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "clinicalMani")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.clinicalMani}</div>
                    }
                </div>
                <div className={style.rowStyle}>
                    各系统及主要脏器功能变化：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('clinicalMani', {
                                    initialValue: record.clinicalMani,
                                })(
                                    <TextArea className={style.noneBorder} rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "clinicalMani")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.clinicalMani}</div>
                    }
                </div>
                <div className={style.rowStyle}>
                    专科情况：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('clinicalMani', {
                                    initialValue: record.clinicalMani,
                                })(
                                    <TextArea className={style.noneBorder} rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "clinicalMani")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.clinicalMani}</div>
                    }
                </div>
                <div className={style.rowStyle}>
                    辅助检查：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('clinicalMani', {
                                    initialValue: record.clinicalMani,
                                })(
                                    <TextArea className={style.noneBorder} rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "clinicalMani")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.clinicalMani}</div>
                    }
                </div>

                <footer className={style.footer}><title className={style.tRight}>是否死亡</title>
                    <div>
                        <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator('isOutHosp', {
                                initialValue: record.isOutHosp || "0"
                            })(
                                <RadioGroup
                                    className={style.checkboxFlex}
                                    options={nursingUtils.myStatic.dieResult}
                                    onChange={(e)=>handleChange(e,"isOutHosp")}
                                />
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
                                    disabled ={!canEdit || !isDocter}
                                    className={style.checkboxFlex}
                                    options={nursingUtils.myStatic.outHospResult}
                                    onChange={(e)=>handleChange(e,"isOutHosp")}
                                />
                            )}
                        </Form.Item>
                    </div>
                </footer>

                <div className={style.rowStyle}>
                    评估人员意见：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('clinicalMani', {
                                    initialValue: record.clinicalMani,
                                })(
                                    <TextArea className={style.noneBorder}  rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "clinicalMani")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.clinicalMani}</div>
                    }
                </div>
                <Descriptions column={2} bordered className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="评估人员签字">
                        {
                            (isHidePrint && canEdit && isDocter) ?  <Input defaultValue={record.doctorSign} onChange={(event)=> {handleChange(event.target.value, "doctorSign")}}/>:
                                <Fragment>{record.doctorSign}</Fragment>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="日期">
                        <Fragment>{record.doctorSignDate}</Fragment>
                    </Descriptions.Item>
                </Descriptions>

                <Sign isHidePrint={isHidePrint} record={record} handleChange={handleChange}
                        canEdit={canEdit} />
            </div>
        );
    }
}

export default StageAssessment;