// 入院申请
import React, {Component,Fragment} from 'react';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const { Option  } = AutoComplete;//AutoOption
const RadioGroup = Radio.Group;
const {TextArea} = Input;
import ReactToPrint from 'react-to-print'
import _ from 'lodash';
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import curUtil from '../Util'
import Step from '@components/Step/Step';
import UploadFile from '@components/KFPG/UploadFile';
import CheckScore from '@components/CheckScore/CheckScore';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import columnsaApplicationForAdmission from '../columnsaApplicationForAdmission'

class DischargeAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backUrl:'/rehabilitation/initiate',
            isHidePrint: true//true是隐藏所有Tabs, 打印时使用false
        }
        this.inside = React.createRef();
        this.currentDay = curUtil.currentDay();
        this.button = {
            direction: Global.Direction.DOWN,
            datas: [
                {
                    type: 'null',
                    className: Global.BottomCss.Default,
                    text: '打印',
                    onClick: (e) => {
                        this.print();
                    }
                },
                {
                    type: 'primary',
                    className: Global.BottomCss.ADD,
                    text: '保存',
                    onClick: (e) => {
                        this.handleSubmit();
                    }
                },
                {
                    type: 'primary',
                    className: Global.BottomCss.REMOVE,
                    text: '退回',
                    disabled:true
                },
                {
                    type: 'primary',
                    className: Global.BottomCss.ADD,
                    text: '提交',
                    onClick: (e) => {
                        this.handleRemove();
                    }
                }
            ]
        }
        this.checkUser = this.checkUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAutoSearch = this.handleAutoSearch.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
    }


    handleAutoSearch (personName) {
        this.props.dischargeAssessment.getUser(this,personName);
    };
    componentDidMount() {
        new Scrollbar(this.inside.current).show()
    }

    checkUser(name){
        this.props.dischargeAssessment.getUser(name);
    }
    handleSubmit(e){
        // if(!this.props.state.btnRequest) return
        let {record} = this.props.state.pageTempObj;
        record.type = '1';//0 = 入院，1 = 出院
        console.log("record",this.props.state.pageTempObj.record)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // let val = {...this.props.state.fromObj.record,...values}
                this.props.applicationForAdmission.handleOperate(record,()=>{
                    this.goBack();
                })
            }
        });
    }

    setPageTempObj(object={}){
        this.props.dischargeAssessment.setPageTempObjCY(this,{...object});
    }


    handleChange(val, field) {
        // 表单变更立即触发的事件
        let {record ={},sumScore} = this.props.state.pageTempObjCY;
        record[field] = val;
        let isCheckChange = curUtil.myStatic.checkTitle.find(res=>res.name == field);
        let _sumScore = 0;
        //平衡量表总分数
        if(isCheckChange){
            curUtil.myStatic.checkTitle.map(res=>{
                let tempScore = record[res.name] ? Number(record[res.name]) : 0 ;
                _sumScore += tempScore;
            })
        }
        this.setPageTempObj({record,sumScore: _sumScore === 0? "" :_sumScore});
    }
    onRadioChange(value, name) {
        if (name == curUtil.myStatic.radioType.imIsTab) {
            this.setPageTempObj({tabValue: value});
        }
    }

    clickDownLoad(url){
        window.location.href=url;
    }
    print() {
        // 打印
        Global.showLoading();
        this.setState({isHidePrint: false});
        setTimeout(()=> {
            $('#print-application').click();
            Global.hideLoading();
            this.setState({isHidePrint: true});
        }, 1000);
    }

    render() {
        let {tabValue,record={},personUserList,indeterminate,checkedGroupList,checkAll,sumScore,userName,uploadBergFiles:_uploadBergFiles} = this.props.state.pageTempObjCY;
        const { getFieldDecorator } = this.props.form;
        const { setBergFile,removeBergFile } = this.props.dischargeAssessment;
        const { isHidePrint } = this.state;
        const uploadBergFiles = (_uploadBergFiles && _uploadBergFiles.length>0 ? _uploadBergFiles : curUtil.myStatic.defaultUploadInfo);

        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>

                    <BreadcrumbCustom first="康复" second="发起流程" third="康复出院申请" secondUrl={this.state.backUrl}/>
                    <Divider/>
                    <Step isShow={true}></Step>
                    <Divider/>
                    <Radio.Group className={style.raioTab} defaultValue={tabValue}
                                 onChange={(e) => this.onRadioChange(e.target.value, curUtil.myStatic.radioType.imIsTab)}>
                        <Radio.Button value='0'>康复出院评估</Radio.Button>
                        <Radio.Button value='1'>Berg平衡量表</Radio.Button>
                    </Radio.Group>

                    <Form onSubmit={this.handleSubmit}>
                        <div className={isHidePrint ?  style.tabContent : style.tabContent +' '+style.showPrint} ref={(el) => {this.refs = el}} >
                            <div name="tab1" className={(tabValue == "0") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <Descriptions title="无锡市康复医院2019年05月张三康复入院评估表" column={2} bordered
                                              className={style.descriptions}>
                                    <Descriptions.Item label="姓名">
                                        <Fragment>
                                            {
                                                isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
                                                        {getFieldDecorator('personName', {
                                                            initialValue: record.personName,...curUtil.myStatic.rulesConfig
                                                        })(
                                                            <AutoComplete
                                                                className="global-search"
                                                                style={{ width: '100%' }}
                                                                dataSource={personUserList.map(curUtil.renderOption)}
                                                                // onSelect={this.onAutoSelect}
                                                                onSearch={_.debounce((e)=>{this.handleAutoSearch(e)}, 1000)}
                                                                onChange={(e)=>{this.handleChange(e,"personName")}}
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
                                                isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
                                                        {getFieldDecorator('sex', {
                                                            initialValue: (record.sex && record.sex=="女") ? "1":"0",...curUtil.myStatic.rulesConfig
                                                        })(
                                                            <Select onChange={(event)=> {this.handleChange(event, "sex")}}>
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
                                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
                                                        {getFieldDecorator('age', {
                                                            initialValue: record.age,...curUtil.myStatic.rulesConfig
                                                        })(
                                                            <Input
                                                                placeholder="请输入"
                                                                onChange={(event)=> {this.handleChange(event.target.value, "age")}}/>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "identityCard")}}/>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "bedNumber")}}/>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "lesion")}}/>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "inHospNumber")}}/>
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
                                                                         onChange={(date, dateString)=>  {this.handleChange(dateString, "inHospDate")}}/>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "inHospDiagnose")}}/>
                                                        )}
                                                    </Form.Item>:
                                                    <Fragment>{record.inHospDiagnose}</Fragment>
                                            }
                                        </Fragment>
                                    </Descriptions.Item>
                                </Descriptions>
                                <div className={style.propList}>
                                    <header>
                                        <div>评估项目</div>
                                        <div>功能障碍及其程度</div>
                                    </header>
                                    <div>
                                        <div className={style.heightText}>1.脑高级功能复制</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "brainFun")}}/></div>
                                    </div>
                                    <div>
                                        <div>意识水平</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "mentLevel")}}/></div>
                                    </div>
                                    <div>
                                        <div>认知功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "cognitive")}}/></div>
                                    </div>
                                    <div>
                                        <div>言语功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "speak")}}/></div>
                                    </div>
                                    <div>
                                        <div>情感情绪</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "mood")}}/></div>
                                    </div>
                                    <div>
                                        <div className={style.heightText}>2.吞咽功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "swallowingFun")}}/></div>
                                    </div>
                                    <div>
                                        <div className={style.heightText}>3.运动功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "motionFun")}}/></div>
                                    </div>
                                    <div>
                                        <div>肌力</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "myodynamia")}}/></div>
                                    </div>
                                    <div>
                                        <div>肌张力</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "muscularTone")}}/></div>
                                    </div>
                                    <div>
                                        <div>平衡功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "balance")}}/></div>
                                    </div>
                                    <div>
                                        <div>感觉功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "sensibility")}}/></div>
                                    </div>
                                    <div>
                                        <div>浅感觉</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "superficialSen")}}/></div>
                                    </div>
                                    <div>
                                        <div>深感觉</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "deepSen")}}/></div>
                                    </div>
                                    <div>
                                        <div>复合感觉</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "compositeSen")}}/></div>
                                    </div>
                                    <div>
                                        <div>日常生活能力</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "dayLive")}}/></div>
                                    </div>
                                    <div>
                                        <div>合并症/并发症</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "syndrome")}}/></div>
                                    </div>
                                    <div>
                                        <div>心功能不全</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "cardiacFun")}}/></div>
                                    </div>
                                    <div>
                                        <div>肺部感染</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "pulInfection")}}/></div>
                                    </div>
                                    <div>
                                        <div>气管切开</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "tracheotomy")}}/></div>
                                    </div>
                                </div>
                                <div className={style.rowStyle}>
                                康复科评估意见：<br/>
                                <TextArea className={style.noneBorder} rows={5}></TextArea>
                            </div>
                                <Descriptions column={2} bordered className={style.descriptions}>
                                    <Descriptions.Item label="护理人员签字">
                                        <Fragment>
                                            {
                                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
                                                        {getFieldDecorator('nurse', {
                                                            initialValue: record.evaPerson
                                                        })(
                                                            <Input
                                                                placeholder="请输入"
                                                                onChange={(event)=> {this.handleChange(event.target.value, "nurse")}}/>
                                                        )}
                                                    </Form.Item>:
                                                    <Fragment>{record.nurse}</Fragment>
                                            }
                                        </Fragment>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="日期">
                                        {this.currentDay}
                                    </Descriptions.Item>
                                </Descriptions>
                                <div className={style.rowStyle}>
                                    医疗机构意见：<br/>
                                    <TextArea className={style.noneBorder} rows={5}></TextArea>
                                </div>
                                <Descriptions column={2} bordered className={style.descriptions}>
                                    <Descriptions.Item label="医疗机构签字"></Descriptions.Item>
                                    <Descriptions.Item label="日期"></Descriptions.Item>
                                </Descriptions>
                                <div className={style.rowStyle}>
                                    社保中心人员意见：<br/>
                                    <TextArea className={style.noneBorder} rows={5}></TextArea>
                                </div>
                                <Descriptions column={2} bordered className={style.descriptions}>
                                    <Descriptions.Item label="社保中心签字"></Descriptions.Item>
                                    <Descriptions.Item label="日期"></Descriptions.Item>
                                </Descriptions>
                                <footer className={style.footer}><title className={style.tRight}>备注</title>
                                    <div>
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('remake', {
                                                initialValue: record.remake,...curUtil.myStatic.rulesConfig
                                            })(
                                                <Input onChange={(event)=> {this.handleChange(event.target.value, "remake")}}/>
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
                                                    onChange={(e)=>this.handleChange(e,"isOutHosp")}
                                                />
                                            )}
                                        </Form.Item>
                                    </div>
                                </footer>

                            </div>

                            <div name="tab2" className={(tabValue == "1") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <Descriptions title="Berg平衡量表" column={2} bordered className={style.descriptions}>
                                    <Descriptions.Item label="姓名">
                                        <Fragment>
                                            {
                                                isHidePrint ?<Form.Item style={{ marginBottom: 0 }}>
                                                        {getFieldDecorator('personName', {
                                                            initialValue: record.personName,...curUtil.myStatic.rulesConfig
                                                        })(
                                                            <AutoComplete
                                                                className="global-search"
                                                                style={{ width: '100%' }}
                                                                dataSource={personUserList.map(curUtil.renderOption)}
                                                                onSearch={_.debounce((e)=>{this.handleAutoSearch(e)}, 1000)}
                                                                onChange={(e)=>{this.handleChange(e,"personName")}}
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
                                                isHidePrint ?   <Form.Item style={{ marginBottom: 0 }}>
                                                        {getFieldDecorator('sex', {
                                                            initialValue: (record.sex && record.sex=="女") ? "1":"0"
                                                        })(

                                                            <Select onChange={(event)=> {this.handleChange(event, "sex")}}>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "age")}}/>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "identityCard")}}/>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "bedNumber")}}/>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "inHospNumber")}}/>
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
                                                                         onChange={(date, dateString)=>{this.handleChange(dateString, "fbrq")}}/>
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
                                                                         onChange={(date, dateString)=>{this.handleChange(dateString, "inHospDate")}}/>
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
                                                                onChange={(event)=> {this.handleChange(event.target.value, "clinicalDiagnose")}}/>
                                                        )}
                                                    </Form.Item>:
                                                    <Fragment>{record.clinicalDiagnose}</Fragment>
                                            }
                                        </Fragment>

                                    </Descriptions.Item>
                                </Descriptions>
                                <Descriptions column={2} bordered className={`${style.descriptions} ${style.marginTopDiv} ${style.borderTop}`}>
                                    <Descriptions.Item label="评定人员">
                                        <Fragment>
                                            {
                                                isHidePrint ?  <Form.Item style={{ marginBottom: 0 }}>
                                                        {getFieldDecorator('evaPerson', {
                                                            initialValue: record.evaPerson
                                                        })(
                                                            <Input
                                                                placeholder="请输入"
                                                                onChange={(event)=> {this.handleChange(event.target.value, "evaPerson")}}/>
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
                                                                         onChange={(date, dateString)=>  {this.handleChange(dateString, "evaDate")}}/>
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
                                                onChange={this.handleChange}></CheckScore>
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
                                                    initialValue: record.remake,...curUtil.myStatic.rulesConfig
                                                })(
                                                    <Input
                                                        onChange={(event)=> {this.handleChange(event.target.value, "remake")}}/>
                                                )}
                                            </Form.Item>
                                        </div>
                                    </footer>
                                </div>
                                <div className={style.tableStyle}>
                                    <header><span className={style.heightText}>出院小结</span>（入院评估无需增加出院小结）</header>
                                    <UploadFile config={curUtil.uploader(this,{method:setBergFile})}
                                                dataSource={uploadBergFiles}
                                                columns={columnsaApplicationForAdmission(this,{remove:removeBergFile})}/>
                                </div>
                            </div>
                        </div>

                        <div className={style.buttons}>
                            <ReactToPrint trigger={() =>
                                <Button id="print-application" type="primary" className={style.hidden}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...this.button}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
DischargeAssessment = Form.create({ name: 'ApplicationForAdmission' })(DischargeAssessment);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, DischargeAssessment);