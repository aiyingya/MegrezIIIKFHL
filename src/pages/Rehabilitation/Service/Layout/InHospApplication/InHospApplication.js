import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import { Input, Checkbox, Descriptions, Select,Form,AutoComplete} from 'antd';
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
import curUtil from '../../Util'
import UploadFile from '@components/UploadFile/UploadFile';
import style from '../../../../../components/KFHL/common.less'
import columnsUpload from '../../../../../components/KFHL/Columns/columnsUpload'
import Sign from '@components/KFHL/Sign/Sign';
import Static from "@components/KFHL/Utils/Static";
import KFHLService from "@/components/KFHL/Utils/Service";
import _ from "lodash";

class InHospApplication  extends Component {
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
        let {self,isDocter,canEdit,getFieldDecorator,isHidePrint,uploadApplyFileDataSource,removeApplayFile,setApplyFile,onCheckAllChange,onCheckChange,personUserList=[],
            handleChange=()=>{},
            handleAutoSearch=()=>{},
        } = this.props;
        let {record={},checkedOutsideList,indeterminate,checkedGroupList,checkAll} = self.props.state.pageTempObj;
        /*const { removeApplayFile,setApplyFile } = self.props.applicationForAdmission;
        const uploadApplyFileDataSource = (uploadApplyFiles && uploadApplyFiles.length>0 ? uploadApplyFiles : Static.defaultUploadInfo);*/
        return (
            <div className={isHidePrint ?  style.tabSelf : style.tabSelf +' '+style.showPrint}>
                    <Descriptions title={record.title} column={2} bordered
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
                        <Descriptions.Item label="诊断科室">
                            <Fragment>
                                {
                                    (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('diagnoseDept', {
                                                initialValue: record.diagnoseDept,...Static.rulesConfig.required
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {handleChange(event.target.value, "diagnoseDept")}}/>
                                            )}
                                        </Form.Item>:
                                        <Fragment>{record.diagnoseDept}</Fragment>
                                }
                            </Fragment>
                        </Descriptions.Item>
                        <Descriptions.Item label="疾病名称">
                            <Fragment>
                                {
                                    (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('illnessName', {
                                                initialValue: record.illnessName,...Static.rulesConfig.required
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {handleChange(event.target.value, "illnessName")}}/>
                                            )}
                                        </Form.Item>:
                                        <Fragment>{record.personName}</Fragment>
                                }
                            </Fragment>
                        </Descriptions.Item>
                        <Descriptions.Item label="个人编号">
                            <Fragment>
                                {
                                    (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('personId', {
                                                initialValue: record.personId,...Static.rulesConfig.required
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {handleChange(event.target.value, "personId")}}/>
                                            )}
                                        </Form.Item>:
                                        <Fragment>{record.personId}</Fragment>
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
                        <Descriptions.Item></Descriptions.Item>
                    </Descriptions>
                    <div className={style.rowStyle}>
                        诊断主要依据：<br/>
                        <CheckboxGroup
                            className={style.checkboxFlex}
                            options={curUtil.myStatic.outsideOptions}
                            value={checkedOutsideList}
                            onChange={(e)=>onCheckChange&&onCheckChange(e,"diagnoseGists")}
                        />
                        <Checkbox
                            indeterminate={indeterminate}
                            onChange={(e)=>onCheckAllChange&&onCheckAllChange(e,"diagnoseGists")}
                            checked={checkAll}
                            value="5"
                        >
                            {curUtil.myStatic.plainParentOptions.label}
                        </Checkbox>
                        <br/>
                        <CheckboxGroup
                            className={style.checkboxChild}
                            options={curUtil.myStatic.plainOptions}
                            value={checkedGroupList}
                            onChange={(e)=>self.onCheckboxGroupChange(e,"diagnoseGists")}
                        />
                    </div>
                    <div className={style.rowStyle}>
                        临床表现：<br/>
                        {
                            (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('clinicalMani', {
                                        initialValue: record.clinicalMani,
                                    })(
                                        <TextArea className={style.noneBorder} placeholder="患者表现正常" rows={5}
                                                  onChange={(event)=> {handleChange(event.target.value, "clinicalMani")}}></TextArea>
                                    )}
                                </Form.Item>:
                                <div className={style.textArea}>{record.clinicalMani}</div>
                        }

                    </div>
                    <div className={style.rowStyle}>
                        体格检查（专科检查）：<br/>
                        {
                            (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('checkup', {
                                        initialValue: record.checkup,
                                    })(
                                        <TextArea className={style.noneBorder} placeholder="患者表现正常" rows={5}
                                                  onChange={(event)=> {handleChange(event.target.value, "checkup")}}></TextArea>
                                    )}
                                </Form.Item>:
                                <div className={style.textArea}>{record.checkup}</div>
                        }
                    </div>
                    <div className={style.rowStyle}>
                        实验室检查：<br/>
                        {
                            (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('labCheckup', {
                                        initialValue: record.labCheckup,
                                    })(
                                        <TextArea className={style.noneBorder} placeholder="患者表现正常" rows={5}
                                                  onChange={(event)=> {handleChange(event.target.value, "labCheckup")}}></TextArea>
                                    )}
                                </Form.Item>:
                                <div className={style.textArea}>{record.labCheckup}</div>
                        }
                    </div>
                    <Descriptions column={2} bordered className={style.descriptions}
                                  size="middle">
                        <Descriptions.Item label="康复科主任签字">
                            <Fragment>
                                {
                                    (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('doctorSign', {
                                                initialValue: record.doctorSign
                                            })(
                                                <Input onChange={(event)=> {handleChange(event.target.value, "doctorSign")}}/>
                                            )}
                                        </Form.Item>:
                                        <Fragment>{record.doctorSign}</Fragment>
                                }
                            </Fragment>
                        </Descriptions.Item>
                        <Descriptions.Item label="日期">
                            <Fragment>{record.doctorSignDate}</Fragment>
                        </Descriptions.Item>
                    </Descriptions>
                    <Sign isHidePrint={isHidePrint} record={record} handleChange={handleChange}
                      canEdit={canEdit} />

                    <div className={style.rowStyle}>
                        注：<br/>
                        <p>
                            一、需要康复的病种：各种原因所致的中枢神经系统疾病如脑出血后遗症、脑梗塞后遗症、脑外伤后遗症、脑肿瘤术后后遗症、脊髓损伤、骨关节功能障碍。
                            <br/>
                            二、各病种住院标准：
                            <br/>
                            1、脑梗塞、脑出血、脑外伤、脑肿瘤术后后遗症、脊髓损伤：急性起病稳定后三月内，A、偏瘫或截瘫肢体肌力0-Ⅲ级,或肌力3级以上但肌张力增高和（或）平衡协调功能障碍、和（或）本体感觉下降，B、高级脑功能障碍（认知功能严重障碍），C、吞咽功能严重障碍（如洼田氏饮水试验Ⅲ-Ⅴ级），D言语功能严重障碍（如BDAE○-Ⅱ级），E、大小便功能障碍。
                            <br/>
                            2、骨关节功能障碍：明确的外伤史，股骨颈骨折、股骨粗隆骨折、股骨干骨折等行内固定术、关节置换术后、腰椎间盘突出症术后，临床治疗病情稳定且存在确切的运动功能障碍的患者。
                            <br/>
                            三、本表一式二份，一份社保中心留存，一份住院康复医疗机构。提交社保中心审核时必须附相关疾病的出入院记录、化验单、检查（检验）报告单等资料以备核查。
                        </p>
                    </div>
                    <div className={style.tableStyle}>
                        <title>上级医院病历</title>
                        <UploadFile disabled ={!canEdit || !isDocter}
                                    successCallback ={(fileData={})=>{setApplyFile && setApplyFile(self,fileData)}}
                                    dataSource={uploadApplyFileDataSource}
                                    columns={columnsUpload({remove:(fileData={})=>{
                                            removeApplayFile && removeApplayFile(self,fileData)
                                    }})}
                                    expandParams = {{fileType:Static.fileUseType.yybl}}
                        />
                    </div>
            </div>
        );
    }
}

PropTypes.propTypes = {
    self: PropTypes.string.isRequired
};
export default InHospApplication;