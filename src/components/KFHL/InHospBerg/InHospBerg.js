import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import { Input, Descriptions, Select,Form,DatePicker} from 'antd';
const {TextArea} = Input;
import curUtil from '../Util'
import style from '../common.less'
import CheckScore from '@components/CheckScore/CheckScore';
import columnsUpload from "@/components/KFHL/Columns/columnsUpload";
import UploadFile from '@components/UploadFile/UploadFile';

class InHospBerg  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {self} = this.props;
        let {record={},sumScore, uploadBergFiles:_uploadBergFiles} = self.props.state.pageTempObj;
        const { getFieldDecorator } = self.props.form;
        const { removeBergFile } = self.props.applicationForAdmission;
        const { isHidePrint } = self.state;
        const uploadBergFiles = (_uploadBergFiles && _uploadBergFiles.length>0 ? _uploadBergFiles : curUtil.myStatic.defaultUploadInfo);

        return (
            <div className={style.tabSelf}>
                <Descriptions title="Berg平衡量表" column={2} bordered className={style.descriptions}
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
                    <Descriptions.Item label="发病日期">
                        <Fragment>
                            {
                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('fbrq', {
                                            initialValue: record.fbrq, rules: [{required: true,  message: '请输入'}]
                                        })(
                                            <DatePicker  format={curUtil.myStatic.dateFormat}
                                                         onChange={(date, dateString)=>{self.handleChange(dateString, "fbrq")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.fbrq}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="入院日期">
                        <Fragment>
                            {
                                isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('inHospDate', {
                                            initialValue: record.inHospDate, rules: [{required: true,  message: '请输入'}]
                                        })(
                                            <DatePicker  format={curUtil.myStatic.dateFormat}
                                                         onChange={(date, dateString)=>{self.handleChange(dateString, "inHospDate")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.inHospDate}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="临床诊断" span={2}>
                        <Fragment>
                            {
                                isHidePrint ?<Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('clinicalDiagnose', {
                                            initialValue: record.clinicalDiagnose,...curUtil.myStatic.rulesConfig
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {self.handleChange(event.target.value, "clinicalDiagnose")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.clinicalDiagnose}</Fragment>
                            }
                        </Fragment>

                    </Descriptions.Item>
                </Descriptions>
                <Descriptions column={2} bordered className={`${style.descriptions} ${style.marginTopDiv} ${style.borderTop}`}>
                    size="middle">
                    <Descriptions.Item label="评定人员">
                        <Fragment>
                            {
                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('evaPerson', {
                                            initialValue: record.evaPerson
                                        })(
                                            <Input
                                                placeholder="请输入"
                                                onChange={(event)=> {self.handleChange(event.target.value, "evaPerson")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.evaPerson}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                    <Descriptions.Item label="评定日期">
                        <Fragment>
                            {
                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('evaDate', {
                                            initialValue: record.evaDate
                                        })(
                                            <DatePicker  format={curUtil.myStatic.dateFormat}
                                                         onChange={(date, dateString)=>  {self.handleChange(dateString, "evaDate")}}/>
                                        )}
                                    </Form.Item>:
                                    <Fragment>{record.evaDate}</Fragment>
                            }
                        </Fragment>
                    </Descriptions.Item>
                </Descriptions>
                <div className={style.propThreeList}>
                    <header><title>检查序号</title><title>检查内容</title><title>得分(0-4)</title></header>
                    <CheckScore data={curUtil.myStatic.checkTitle} score={curUtil.myStatic.checkScore}
                                onChange={self.handleChange}></CheckScore>
                    <div className={style.sumScore}>
                        <span>总分</span>
                        <div>
                            {/*<Input readOnly/>*/}
                            {sumScore}
                        </div>
                    </div>
                    <footer className={style.footer}><title>备注</title>
                        <div>
                            <Form.Item style={{ marginBottom: 0 }}>
                                {getFieldDecorator('remake', {
                                    initialValue: record.remake
                                })(
                                    <Input
                                        placeholder="请输入"
                                        onChange={(event)=> {self.handleChange(event.target.value, "remake")}}/>
                                )}
                            </Form.Item>
                        </div>
                    </footer>
                </div>
                <div className={style.tableStyle}>
                    <header><span className={style.heightText}>出院小结</span>（入院评估无需增加出院小结）</header>
                    <UploadFile successCallback ={self.setBergFile}
                                dataSource={uploadBergFiles}
                                columns={columnsUpload(self,{remove:removeBergFile})}
                                disabled={true}/>
                </div>
            </div>
        );
    }
}

PropTypes.propTypes = {
    self: PropTypes.string.isRequired
};
export default InHospBerg;