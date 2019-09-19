import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
import nursingUtils from '../Util';
import style from './common.less'
import {Global} from "winning-megreziii-utils";
import Sign from '@components/KFHL/Sign/Sign';
import Static from "@components/KFHL/Utils/Static";
import moment from "moment";
import KFHLService from "@components/KFHL/Utils/Service";
import _ from "lodash";

class AdmissionAssessment  extends Component {
    constructor(props) {
        super(props);
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        this.onCheckChange = this.onCheckChange.bind(this);
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
    onCheckChange(checkedValues = [],field) {
        let value= checkedValues.length ? [_.last(checkedValues)] : [];
        this.props.handleChange(value, field)
    }
    render() {

        let {isHidePrint,record,getFieldDecorator,dict,self,canEdit,isDocter,personUserList=[],
            handleChange=()=>{},
            handleAutoSearch=()=>{},
        } = this.props;

        return (
            <div className={isHidePrint ?  style.tabSelf : style.tabSelf +' '+style.showPrint}>
                <Descriptions title="无锡市康复医院2019年05月张三护理入" column={2} bordered
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
                                (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
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
                    <Descriptions.Item label="出生年月">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('birthDate', {
                                            initialValue: record.birthDate && moment(record.birthDate),
                                            rules: [{required: false, message: '请输入'}]
                                        })(
                                            <DatePicker  format={Static.dateFormat}
                                                         onChange={(date, dateString)=>  {handleChange(dateString, "birthDate")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.birthDate}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="婚姻状况">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('isMarried', {
                                            initialValue:record.isMarried,...Static.rulesConfig.required
                                        })(
                                            <Select onChange={(event)=> {handleChange(event, "isMarried")}}>
                                                {Static.myDict.hyzk.map(res=><Option key={res.value} value={res.value}>{res.name}</Option>)}
                                            </Select>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{Global.returnNameByValue(Static.myDict.hyzk,record.isMarried)}</Fragment>
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
                    <Descriptions.Item label="联系电话">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('tel', {
                                            initialValue: record.tel,...Static.rulesConfig.telephone
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "tel")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.tel}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="监护人（家属）姓名">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('guardian', {
                                            initialValue: record.guardian,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "guardian")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.guardian}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="与参保人关系">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('relation', {
                                            initialValue:record.relation,...Static.rulesConfig.required
                                        })(
                                            <Select onChange={(event)=> {handleChange(event, "relation")}}>
                                                {Static.myDict.gx.map(res=><Option key={res.value} value={res.value}>{res.name}</Option>)}
                                            </Select>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{Global.returnNameByValue(Static.myDict.gx,record.relation)}</Fragment>
                            }
                        </Fragment>

                    </Descriptions.Item>
                    <Descriptions.Item label="住址">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('address', {
                                            initialValue: record.address,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "address")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.address}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item></Descriptions.Item>
                </Descriptions>
                <div className={style.rowStyle}>
                    过去史、家族史、手术史、药物过敏史（阳性记录）：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('yxjl', {
                                    initialValue: record.yxjl,
                                })(
                                    <TextArea className={style.noneBorder} rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "yxjl")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.yxjl}</div>
                    }
                </div>
                <Descriptions column={{ xxl: 5, xl: 5, lg: 3, md: 3, sm: 2, xs: 2 }}  bordered className={style.descriptions} size="middle">
                    <Descriptions.Item label="T">
                        <div className={style.flexRow}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('t', {
                                            initialValue: record.t,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "t")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.t}</Fragment>
                            }
                            <div>&nbsp;&nbsp;℃</div>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="P">
                        <div className={style.flexRow}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('p', {
                                            initialValue: record.p,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "p")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.p}</Fragment>
                            }
                            <div>&nbsp;次/分</div>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="R">
                        <div className={style.flexRow}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('r', {
                                            initialValue: record.r,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "r")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.r}</Fragment>
                            }
                            <span>&nbsp;次/分</span>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="BP">
                        <div className={`${style.flexRow} ${style.bp}`}>
                            {
                                (isHidePrint && canEdit && isDocter) ?
                                    <div className={style.bp}>
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('bpfz', {
                                                initialValue: record.bpfz,...Static.rulesConfig.required
                                            })(
                                                <Input
                                                    onChange={(event)=> {handleChange(event.target.value, "bpfz")}}/>
                                            )}
                                        </Form.Item>
                                        <span>&nbsp;/&nbsp;</span>
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('bpfm', {
                                                initialValue: record.bpfm,...Static.rulesConfig.required
                                            })(
                                                <Input
                                                    onChange={(event)=> {handleChange(event.target.value, "bpfm")}}/>
                                            )}
                                        </Form.Item>
                                    </div>
                                    :
                                    <Fragment>{record.bpfz}/{record.bpfm}</Fragment>
                            }
                            <span>&nbsp;mmHg</span>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="体重">
                        <div className={style.flexRow}>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('weight', {
                                            initialValue: record.weight
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "weight")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.weight}</Fragment>
                            }
                            <span>&nbsp;KG</span>
                        </div>
                    </Descriptions.Item>
                </Descriptions>

                <Descriptions  column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} bordered className={style.descriptions} size="middle">
                    <Descriptions.Item label="意识">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.ys}
                            value={record.ys}
                            onChange={(e)=>this.onCheckChange(e,"ys")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="表情">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.bq}
                            value={record.bq}
                            onChange={(e)=>this.onCheckChange(e,"bq")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="记忆力">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.jyl}
                            value={record.jyl}
                            onChange={(e)=>this.onCheckChange(e,"jyl")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="理解能力">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.ljnl}
                            value={record.ljnl}
                            onChange={(e)=>this.onCheckChange(e,"ljnl")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="视力">
                        <div className={style.upDown}>
                            <CheckboxGroup
                                className={style.upDownLeft}
                                options={nursingUtils.myStatic.radios.sl}
                                value={record.sl}
                                onChange={(e)=>this.onCheckChange(e,"sl")}
                            />
                            <div className={style.upDownRight}>
                                <div><label>左:</label><Input onChange={(event)=> {handleChange(event.target.value, "slLeft")}}/></div>
                                <div><label>右:</label><Input onChange={(event)=> {handleChange(event.target.value, "slRight")}}/></div>
                            </div>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="听力">
                        <div className={style.upDown}>
                            <CheckboxGroup
                                className={style.upDownLeft}
                                options={nursingUtils.myStatic.radios.tl}
                                value={record.tl}
                                onChange={(e)=>this.onCheckChange(e,"tl")}
                            />
                            <div className={style.upDownRight}>
                                <div><label>左:</label><Input onChange={(event)=> {handleChange(event.target.value, "tlLeft")}}/></div>
                                <div><label>右:</label><Input onChange={(event)=> {handleChange(event.target.value, "tlRight")}}/></div>
                            </div>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="表达能力">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.bdnl}
                            value={record.bdnl}
                            onChange={(e)=>this.onCheckChange(e,"bdnl")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="情绪">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.qx}
                            value={record.qx}
                            onChange={(e)=>this.onCheckChange(e,"qx")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="行为症状">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.xwzz}
                            value={record.xwzz}
                            onChange={(e)=>this.onCheckChange(e,"xwzz")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="睡眠">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.sm}
                            value={record.sm}
                            onChange={(e)=>this.onCheckChange(e,"sm")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="大便">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.db}
                            value={record.db}
                            onChange={(e)=>this.onCheckChange(e,"db")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="小便">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.xb}
                            value={record.xb}
                            onChange={(e)=>this.onCheckChange(e,"xb")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="食欲">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.sy}
                            value={record.sy}
                            onChange={(e)=>this.onCheckChange(e,"sy")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="穿衣">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.cy}
                            value={record.cy}
                            onChange={(e)=>this.onCheckChange(e,"cy")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="洗漱">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.xs}
                            value={record.xs}
                            onChange={(e)=>this.onCheckChange(e,"xs")}
                        />
                    </Descriptions.Item>

                    <Descriptions.Item></Descriptions.Item>
                </Descriptions>
                <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} bordered className={style.descriptions} size="middle">
                    <Descriptions.Item label="咀嚼困难">
                        <div className={style.leftRight}>
                            <CheckboxGroup
                                options={nursingUtils.myStatic.radios.jjkn}
                                value={record.jjkn}
                                onChange={(e)=>this.onCheckChange(e,"jjkn")}
                            />
                            <div>
                                <span>吞咽困难</span>
                                <CheckboxGroup
                                    options={nursingUtils.myStatic.radios.tykn}
                                    value={record.tykn}
                                    onChange={(e)=>this.onCheckChange(e,"tykn")}
                                />
                            </div>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="自主能力">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.zznl}
                            value={record.zznl}
                            onChange={(e)=>this.onCheckChange(e,"zznl")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="活动能力">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.hdnl}
                            value={record.hdnl}
                            onChange={(e)=>this.onCheckChange(e,"hdnl")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="肌力">
                        <div className={style.leftUpDown}>
                            <div className={style.leftUpDownLeft}>
                                {nursingUtils.myStatic.radios.jl.map(res=><span className={style.jl}>{res.label}</span>)}
                            </div>
                            <div className={style.leftUpDownRight}>
                                <div className={style.texts}>上</div>
                                <div className={style.upDownRight}>
                                    <div><label>左:</label><Input onChange={(event)=> {handleChange(event.target.value, "jlsz")}}/></div>
                                    <div><label>右:</label><Input onChange={(event)=> {handleChange(event.target.value, "jlsy")}}/></div>
                                </div>
                            </div>
                            <div className={style.leftUpDownRight}>
                                <div className={style.texts}>下</div>
                                <div className={style.upDownRight}>
                                    <div><label>左:</label><Input onChange={(event)=> {handleChange(event.target.value, "jlxz")}}/></div>
                                    <div><label>右:</label><Input onChange={(event)=> {handleChange(event.target.value, "jlxy")}}/></div>
                                </div>
                            </div>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="全身营养状况">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.qsyyzk}
                            value={record.qsyyzk}
                            onChange={(e)=>this.onCheckChange(e,"qsyyzk")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="皮肤黏膜">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.pfnm}
                            value={record.pfnm}
                            onChange={(e)=>this.onCheckChange(e,"pfnm")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="口腔">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.kq}
                            value={record.kq}
                            onChange={(e)=>this.onCheckChange(e,"kq")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="伸舌">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.ss}
                            value={record.ss}
                            onChange={(e)=>this.onCheckChange(e,"ss")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="鼻唇沟">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.bcg}
                            value={record.bcg}
                            onChange={(e)=>this.onCheckChange(e,"bcg")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="牙龈">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.yy}
                            value={record.yy}
                            onChange={(e)=>this.onCheckChange(e,"yy")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="牙">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.y}
                            value={record.y}
                            onChange={(e)=>this.onCheckChange(e,"y")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="导管类型">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.dglx}
                            value={record.dglx}
                            onChange={(e)=>this.onCheckChange(e,"dglx")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="导管情况">
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.dgqk}
                            value={record.dgqk}
                            onChange={(e)=>this.onCheckChange(e,"dgqk")}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item></Descriptions.Item>
                </Descriptions>
                <footer className={style.footer}><title className={style.tRight}>褥疮</title>
                        <div  className={style.rc}>
                        <CheckboxGroup
                            options={nursingUtils.myStatic.radios.rc}
                            value={record.rc}
                            onChange={(e)=>this.onCheckChange(e,"rc")}
                        />
                        <div>
                            <span>部位：</span>
                            <Input onChange={(event)=> {handleChange(event.target.value, "bw")}}/>
                        </div>
                        <div>
                            <span>大小：</span>
                            <Input onChange={(event)=> {handleChange(event.target.value, "dx")}}/>
                            <div>cm</div>
                        </div>
                        <div>
                            <span>深度：</span>
                            <Input onChange={(event)=> {handleChange(event.target.value, "sd")}}/>
                            <div>cm</div>
                        </div>
                        </div>
                </footer>
                <footer className={style.footer}><title className={style.tRight}>来院前居住地址</title>
                    <CheckboxGroup
                        options={nursingUtils.myStatic.radios.lyqjzdz}
                        value={record.lyqjzdz}
                        onChange={(e)=>this.onCheckChange(e,"lyqjzdz")}
                    />
                </footer>
                <footer className={style.footer}><title className={style.tRight}>本次入院目的</title>
                    <CheckboxGroup
                        options={nursingUtils.myStatic.radios.bcrymd}
                        value={record.bcrymd}
                        onChange={(e)=>this.onCheckChange(e,"bcrymd")}
                    />
                </footer>

                <div className={style.rowStyle}>
                    各系统及主要脏器功能状况（体格检查发现）：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('sysChange', {
                                    initialValue: record.sysChange,
                                })(
                                    <TextArea className={style.noneBorder} rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "sysChange")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.sysChange}</div>
                    }
                </div>
                <div className={style.rowStyle}>
                    专科情况（针对本人入院的主要原因）：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('zkCase', {
                                    initialValue: record.zkCase,
                                })(
                                    <TextArea className={style.noneBorder} rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "zkCase")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.zkCase}</div>
                    }
                </div>
                <div className={style.rowStyle}>
                    辅助检查：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('assistCheck', {
                                    initialValue: record.assistCheck,
                                })(
                                    <TextArea className={style.noneBorder} rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "assistCheck")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.assistCheck}</div>
                    }
                </div>
                <div className={style.rowStyle}>
                    疾病诊断：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('jbzd', {
                                    initialValue: record.jbzd,
                                })(
                                    <TextArea className={style.noneBorder}  rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "jbzd")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.jbzd}</div>
                    }
                </div>
                <div className={style.rowStyle}>
                    处置意见：
                    <CheckboxGroup
                        options={nursingUtils.myStatic.radios.clyj}
                        value={record.clyj}
                        onChange={(e)=>this.onCheckChange(e,"clyj")}
                    />
                    <br/><br/>
                    收治本护理院后的治疗护理方案：<br/>
                    {
                        (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('hlfa', {
                                    initialValue: record.hlfa,
                                })(
                                    <TextArea className={style.noneBorder}  rows={5}
                                              onChange={(event)=> {handleChange(event.target.value, "hlfa")}}></TextArea>
                                )}
                            </Form.Item>:
                            <div className={style.textArea}>{record.hlfa}</div>
                    }
                </div>
                <Descriptions column={2} bordered className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="评估小组长签字">
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

PropTypes.propTypes = {
    self: PropTypes.string.isRequired
};
export default AdmissionAssessment;