// 入院申请
// 注意页面上的打印，input框有提示文本的时候打印时不能仅删除边框，直接使用文本
import React, {Component, Fragment} from 'react';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker} from 'antd';
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
import ReactToPrint from 'react-to-print'
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import curUtil from '../Util'
import Step from '@components/Step/Step';
import UploadFile from '@components/KFPG/UploadFile';
import CheckScore from '@components/CheckScore/CheckScore';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import columnsaApplicationForAdmission from '../columnsaApplicationForAdmission'

class ApplicationForAdmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backUrl:'/rehabilitation/initiate',
            isHidePrint: true,//true是隐藏所有Tabs, 打印时使用false
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
                        this.handleSubmit();
                    }
                }
            ]
        }
        this.handleChange = this.handleChange.bind(this)
        this.onRadioChange = this.onRadioChange.bind(this)
        this.onCheckboxGroupChange = this.onCheckboxGroupChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
    }

    componentDidMount() {
        new Scrollbar(this.inside.current).show()
    }

    handleSubmit(e){
        // if(!this.props.state.btnRequest) return
        let {record} = this.props.state.pageTempObj;
        record.type = '0';//0 = 入院，1 = 出院
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
        this.props.applicationForAdmission.setPageTempObj(this,{...object});
    }

    handleChange(val, field) {
        // 表单变更立即触发的事件
        let {record ={},sumScore} = this.props.state.pageTempObj;
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

    onCheckChange(checkedValues,field) {
        // 其他障碍选择
        let {record,checkedGroupList,checkAll} = this.props.state.pageTempObj;
        let _checkedValues = [...checkedValues,...checkedGroupList];
        if(checkAll){
            _checkedValues = [..._checkedValues,curUtil.myStatic.plainParentOptions.value]
        }
        record[field] =_checkedValues;
        this.setPageTempObj({checkedOutsideList:checkedValues,record});
    }
    onCheckAllChange(e,field) {
        // 骨关节功能障碍 全选
        const checkAll = e.target.checked;
        let checkedGroupList = checkAll ? curUtil.myStatic.plainOptions.map(res => res.value) : [];
        let {record,checkedOutsideList} = this.props.state.pageTempObj;
        let _checkedValues = [...checkedOutsideList,...checkedGroupList];
        if(checkAll){
            _checkedValues = [..._checkedValues,curUtil.myStatic.plainParentOptions.value]
        }
        record[field] =_checkedValues;
        this.setPageTempObj({
            checkedGroupList: checkedGroupList,
            indeterminate: false,
            checkAll: checkAll,
            record
        });

    };
    onCheckboxGroupChange(checkedList,field) {
        // 骨头关节子选
        let {record,checkedOutsideList} = this.props.state.pageTempObj;
        const checkAll = checkedList.length === curUtil.myStatic.plainOptions.length;
        let _checkedValues = [...checkedOutsideList,...checkedList];
        if(!!checkedList.length){
            _checkedValues = [..._checkedValues,curUtil.myStatic.plainParentOptions.value]
        }
        record[field] =_checkedValues;
        // 骨关节功能障碍 子选
        this.setPageTempObj({
            checkedGroupList:checkedList,
            indeterminate: !!checkedList.length && checkedList.length < curUtil.myStatic.plainOptions.length,
            checkAll: checkAll,
            record
        });
    };

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
        let {tabValue=0,record={},checkedOutsideList,indeterminate,checkedGroupList,checkAll,sumScore,uploadApplyFiles:_uploadApplyFiles,
            uploadBergFiles:_uploadBergFiles} = this.props.state.pageTempObj;
        const { getFieldDecorator } = this.props.form;
        const { setApplyFile,setBergFile,removeApplayFile,removeBergFile } = this.props.applicationForAdmission;
        const { isHidePrint } = this.state;
        const uploadApplyFiles = (_uploadApplyFiles && _uploadApplyFiles.length>0 ? _uploadApplyFiles : curUtil.myStatic.defaultUploadInfo);
        const uploadBergFiles = (_uploadBergFiles && _uploadBergFiles.length>0 ? _uploadBergFiles : curUtil.myStatic.defaultUploadInfo);

        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>
                    <BreadcrumbCustom first="康复" second="发起流程" third="康复入院申请" secondUrl={this.state.backUrl}/>
                    <Divider/>
                    <Step isShow={true}></Step>
                    <Divider/>
                    <Radio.Group className={style.raioTab} defaultValue={tabValue}
                                 onChange={(e) => this.onRadioChange(e.target.value, curUtil.myStatic.radioType.imIsTab)}>
                        <Radio.Button value='0'>康复入院申请</Radio.Button>
                        <Radio.Button value='1'>康复入院评估</Radio.Button>
                        <Radio.Button value='2'>Berg平衡量表</Radio.Button>
                    </Radio.Group>

                    <Form onSubmit={this.handleSubmit}>

                    <div className={isHidePrint ?  style.tabContent : style.tabContent +' '+style.showPrint} ref={(el) => {this.refs = el}} >
                        <div name="tab1" className={(tabValue == "0") ? '' : style.hidden}
                             style={{"pageBreakAfter": "always"}}>
                            <Descriptions title="无锡市康复医院2019年05月张三康复入院申请表" column={2} bordered
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
                                                            onChange={(event)=> {this.handleChange(event.target.value, "personName")}}/>
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
                                <Descriptions.Item label="诊断科室">
                                    <Fragment>
                                        {
                                            isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
                                                    {getFieldDecorator('diagnoseDept', {
                                                        initialValue: record.diagnoseDept,...curUtil.myStatic.rulesConfig
                                                    })(
                                                        <Input
                                                            placeholder="请输入"
                                                            onChange={(event)=> {this.handleChange(event.target.value, "diagnoseDept")}}/>
                                                    )}
                                                </Form.Item>:
                                                <Fragment>{record.diagnoseDept}</Fragment>
                                        }
                                    </Fragment>
                                </Descriptions.Item>
                                <Descriptions.Item label="疾病名称">
                                    <Fragment>
                                        {
                                            isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
                                                    {getFieldDecorator('illnessName', {
                                                        initialValue: record.illnessName,...curUtil.myStatic.rulesConfig
                                                    })(
                                                        <Input
                                                            placeholder="请输入"
                                                            onChange={(event)=> {this.handleChange(event.target.value, "illnessName")}}/>
                                                    )}
                                                </Form.Item>:
                                                <Fragment>{record.personName}</Fragment>
                                        }
                                    </Fragment>
                                </Descriptions.Item>
                                <Descriptions.Item label="个人编号">
                                    <Fragment>
                                        {
                                            isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
                                                    {getFieldDecorator('personId', {
                                                        initialValue: record.personId,...curUtil.myStatic.rulesConfig
                                                    })(
                                                        <Input
                                                            placeholder="请输入"
                                                            onChange={(event)=> {this.handleChange(event.target.value, "personId")}}/>
                                                    )}
                                                </Form.Item>:
                                                <Fragment>{record.personId}</Fragment>
                                        }
                                    </Fragment>
                                </Descriptions.Item>
                                <Descriptions.Item label="身份证号">
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
                                <Descriptions.Item></Descriptions.Item>
                            </Descriptions>
                            <div className={style.rowStyle}>
                                诊断主要依据：<br/>
                                <CheckboxGroup
                                    className={style.checkboxFlex}
                                    options={curUtil.myStatic.outsideOptions}
                                    value={checkedOutsideList}
                                    onChange={(e)=>this.onCheckChange(e,"diagnoseGists")}
                                />
                                <Checkbox
                                    indeterminate={indeterminate}
                                    onChange={(e)=>this.onCheckAllChange(e,"diagnoseGists")}
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
                                    onChange={(e)=>this.onCheckboxGroupChange(e,"diagnoseGists")}
                                />
                            </div>
                            <div className={style.rowStyle}>
                                临床表现：<br/>
                                <Form.Item style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('clinicalMani', {
                                        initialValue: record.clinicalMani,
                                    })(
                                        <TextArea className={style.noneBorder} placeholder="患者表现正常" rows={5}></TextArea>
                                    )}
                                </Form.Item>

                            </div>
                            <div className={style.rowStyle}>
                                体格检查（专科检查）：<br/>
                                <Form.Item style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('checkup', {
                                        initialValue: record.checkup,
                                    })(
                                        <TextArea className={style.noneBorder} placeholder="患者表现正常" rows={5}></TextArea>
                                    )}
                                </Form.Item>
                            </div>
                            <div className={style.rowStyle}>
                                实验室检查：<br/>
                                <Form.Item style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('labCheckup', {
                                        initialValue: record.labCheckup,
                                    })(
                                        <TextArea className={style.noneBorder} placeholder="患者表现正常" rows={5}></TextArea>
                                    )}
                                </Form.Item>
                            </div>
                            <Descriptions column={2} bordered className={style.descriptions}
                                          size="middle">
                                <Descriptions.Item label="康复科主任签字">
                                    <Fragment>
                                        {
                                            isHidePrint ? <Form.Item style={{ marginBottom: 0 }}>
                                                    {getFieldDecorator('initPerson', {
                                                        initialValue: record.initPerson
                                                    })(
                                                        <Input onChange={(event)=> {this.handleChange(event.target.value, "initPerson")}}/>
                                                    )}
                                                </Form.Item>:
                                                <Fragment>{record.initPerson}</Fragment>
                                        }
                                    </Fragment>

                                </Descriptions.Item>
                                <Descriptions.Item label="日期">
                                    {this.currentDay}
                                </Descriptions.Item>
                            </Descriptions>
                            <div className={style.rowStyle}>
                                医疗机构意见：<br/>
                                <TextArea className={style.noneBorder} rows={5} ></TextArea>
                            </div>
                            <Descriptions column={2} bordered className={style.descriptions}
                                          size="middle">
                                <Descriptions.Item label="医疗机构签字"></Descriptions.Item>
                                <Descriptions.Item label="日期"></Descriptions.Item>
                            </Descriptions>
                            <div className={style.rowStyle}>
                                社保中心人员意见：<br/>
                                <TextArea className={style.noneBorder} rows={5}></TextArea>
                            </div>
                            <Descriptions column={2} bordered className={style.descriptions}
                                          size="middle">
                                <Descriptions.Item label="签字"></Descriptions.Item>
                                <Descriptions.Item label="日期"></Descriptions.Item>
                            </Descriptions>
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
                                <UploadFile config={curUtil.uploader(this,{method:setApplyFile})}
                                            dataSource={uploadApplyFiles}
                                            columns={columnsaApplicationForAdmission(this,{remove:removeApplayFile})}/>
                            </div>
                        </div>

                        <div name="tab2" className={(tabValue == "1") ? '' : style.hidden}
                             style={{"pageBreakAfter": "always"}}>
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
                                                            onChange={(event)=> {this.handleChange(event.target.value, "personName")}}/>
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
                            <div className={`${style.propList} ${style.marginTopDiv}`}>
                                <header>
                                    <div>评估项目</div>
                                    <div>功能障碍及其程度</div>
                                </header>
                                <div>
                                    <div className={style.heightText}>1.脑高级功能复制</div>
                                    <div><Input onChange={(event)=> {this.handleChange(event.target.value, "brainFun")}}/></div>
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

                        <div name="tab3" className={(tabValue == "2") ? '' : style.hidden}
                             style={{"pageBreakAfter": "always"}}>
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
                                                            onChange={(event)=> {this.handleChange(event.target.value, "personName")}}/>
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
                                                initialValue: record.remake
                                            })(
                                                <Input
                                                    placeholder="请输入"
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
                                            columns={columnsaApplicationForAdmission(this,{remove:removeBergFile})}
                                            disabled={true}/>
                            </div>
                        </div>
                    </div>

                    <div className={style.buttons}>
                        <ReactToPrint trigger={() => <Button id="print-application" className={style.hidden}>打印</Button>} content={() => this.refs}/>
                        <BasicGroupComponent {...this.button}/>
                    </div>
                    </Form>
                </div>
            </div>
        );
    }
}
ApplicationForAdmission = Form.create({ name: 'ApplicationForAdmission' })(ApplicationForAdmission);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, ApplicationForAdmission);