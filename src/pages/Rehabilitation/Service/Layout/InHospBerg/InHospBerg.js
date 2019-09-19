import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import { Input, Descriptions, Select,Form,DatePicker, AutoComplete } from 'antd';
const {TextArea} = Input;
import curUtil from '../../Util'
import style from '../../../../../components/KFHL/common.less'
import CheckScore from '@components/KFHL/CheckScore/CheckScore';
import columnsUpload from "@/components/KFHL/Columns/columnsUpload";
import UploadFile from '@components/UploadFile/UploadFile';
import Static from "@components/KFHL/Utils/Static";
import moment from 'moment';
import KFHLService from "@/components/KFHL/Utils/Service";
import {Global} from "winning-megreziii-utils";
import nursingUtils from "@/pages/Nursing/Service/Util";
import _ from "lodash";
class InHospBerg  extends Component {
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
        let {self,record={},canEdit,isDocter,getFieldDecorator,isHidePrint,uploadBergFileDataSource,removeBergFile,setBergFile,
            personUserList=[],
            handleAutoSearch=()=>{},
            handleChange=()=>{}} = this.props;
        let newCheckTitle = Global.setFormsValue(curUtil.myStatic.checkTitle,record);
        let sumScore = 0;
        //平衡量表总分数
        newCheckTitle.map(res=>{
            sumScore +=  Number(res.value);
        })
        return (
            <div className={isHidePrint ?  style.tabSelf : style.tabSelf +' '+style.showPrint}>
                <Descriptions title="Berg平衡量表" column={2} bordered className={style.descriptions}
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
                    <Descriptions.Item label="发病日期">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('fbrq', {
                                            initialValue: record.fbrq && moment(record.fbrq),
                                            rules: [{required: true,  message: '请输入'}]
                                        })(
                                            <DatePicker  format={Static.dateFormat}
                                                         onChange={(date, dateString)=>{handleChange(dateString, "fbrq")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.fbrq}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="入院日期">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospDate', {
                                            initialValue: record.inHospDate && moment(record.inHospDate), rules: [{required: true,  message: '请输入'}]
                                        })(
                                            <DatePicker  format={Static.dateFormat}
                                                         onChange={(date, dateString)=>{handleChange(dateString, "inHospDate")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.inHospDate}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="临床诊断" span={2}>
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?<Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('clinicalDiagnose', {
                                            initialValue: record.clinicalDiagnose,...Static.rulesConfig.required
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "clinicalDiagnose")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.clinicalDiagnose}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                </Descriptions>

                <Descriptions column={2} bordered className={`${style.descriptions} ${style.marginTopDiv} ${style.borderTop}`} size="middle">
                    <Descriptions.Item label="评定人员">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('evaPerson', {
                                            initialValue: record.evaPerson
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {handleChange(event.target.value, "evaPerson")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.evaPerson}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="评定日期">
                        <Fragment>
                            {
                                (isHidePrint && canEdit && isDocter) ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('evaDate', {
                                            initialValue: record.evaDate && moment(record.evaDate)
                                        })(
                                            <DatePicker  format={Static.dateFormat}
                                                         onChange={(date, dateString)=>  {handleChange(dateString, "evaDate")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.evaDate}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                </Descriptions>

                <div className={style.propThreeList}>
                    <header><title>检查序号</title><title>检查内容</title><title>得分(0-4)</title></header>
                    <CheckScore data={newCheckTitle} score={curUtil.myStatic.checkScore}
                                onChange={handleChange} canEdit={canEdit}></CheckScore>
                    <div className={style.sumScore}>
                        <span>总分</span>
                        <div>
                            {sumScore}
                        </div>
                    </div>
                    <footer className={style.footer}><title>备注</title>
                        <div>
                            {
                                (isHidePrint && canEdit && isDocter) ?   <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('remake', {
                                            initialValue: record.remake
                                        })(
                                            <Input
                                                onChange={(event)=> {handleChange(event.target.value, "remake")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.remake}</Fragment>
                            }
                        </div>
                    </footer>
                </div>
                <div className={style.tableStyle}>
                    <header><span className={style.heightText}>出院小结</span>（入院评估无需增加出院小结）</header>
                    <UploadFile disabled={!canEdit || !isDocter}
                                successCallback ={(fileData={})=>{setBergFile && setBergFile(self,fileData)}}
                                dataSource={uploadBergFileDataSource}
                                columns={columnsUpload({remove:(fileData={})=>{
                                        if(canEdit && isDocter){
                                            removeBergFile && removeBergFile(self,fileData)
                                        }
                                }})}
                                expandParams = {{fileType:Static.fileUseType.cyxj}}
                    />
                </div>
            </div>
        );
    }
}

PropTypes.propTypes = {
    self: PropTypes.string.isRequired
};
export default InHospBerg;