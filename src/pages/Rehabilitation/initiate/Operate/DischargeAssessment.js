// 入院申请
import React, {Component,Fragment} from 'react';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const { Option  } = AutoComplete;//AutoOption
const RadioGroup = Radio.Group;
const {TextArea} = Input;
import ReactToPrint from 'react-to-print'
import _ from 'lodash';
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import curUtil from '../../Service/Util';
import Step from '@components/Step/Step';
import UploadFileNoName from '@components/UploadFile/UploadFile';
import CheckScore from '@components/KFHL/CheckScore/CheckScore';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import OutHospAssess from '../../Service/Layout/OutHospAssess/OutHospAssess';
import OutHospBerg from '../../Service/Layout/OutHospBerg/OutHospBerg';
import Static from "@components/KFHL/Utils/Static";
import KFHLService from "@components/KFHL/Utils/Service";
class DischargeAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backUrl:'/rehabilitation/initiate',
            isHidePrint: true//true是隐藏所有Tabs, 打印时使用false
        }
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        this.inside = React.createRef();
        this.currentDay = KFHLService.currentDay();
        this.checkUser = this.checkUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAutoSearch = this.handleAutoSearch.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
        this.setApplyFile = this.setApplyFile.bind(this);
    }


    handleAutoSearch (personName) {
        this.props.dischargeAssessment.getUser(this,personName);
    };
    componentDidMount() {
        new Scrollbar(this.inside.current).show();
        if(Global.isFrozen()) return;
        // 只有医护人员访问的发起流程页面
        let query = this.props.location.query ||{};
        const record = query.record ? query.record :{};
        if(!record.inHospTableId){
            record.doctorSignDate = KFHLService.currentDay();
            this.setPageTempObj({canEdit: true,record:record});
        }else{
            if ((record.flowStatus == curUtil.myStatic.flowStatus.agree || record.flowStatus == curUtil.myStatic.flowStatus.awaitAudit)) {
                //已通过 或 待审核 不可做任何操作
                this.setPageTempObj({canEdit: false});
            }else{
                this.props.common.getInfo(this,record.inHospTableId,{doctorSignDate:KFHLService.currentDay()});
                this.setPageTempObj({canEdit: true});
            }
        }
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
    setApplyFile(file={}){
        let count = Math.floor(Math.random() * (1000 - 1) + 1);
        this.props.applicationForAdmission.setApplyFile(this,{
            fileName: file.name,
            size: (file.size / 1024) + "KB" ,
            uploadDate:KFHLService.currentDay(),
            uploadUser: this.user.yh_mc || 'admin',
            fileId:count,
            fileUrl:'https://github.com/vuejs/vuepress/archive/master.zip'
        });
    }

    render() {
        let {tabValue,canEdit,record={},uploadBergFiles} = this.props.state.pageTempObjCY;
        const { isHidePrint } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { removeBergFile,setBergFile } = this.props.dischargeAssessment;
        const uploadBergFileDataSource = (uploadBergFiles && uploadBergFiles.length>0 ? uploadBergFiles : curUtil.myStatic.defaultUploadInfo);

        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>

                    <BreadcrumbCustom first="康复" second="发起流程" third="康复出院申请" secondUrl={this.state.backUrl}/>
                    <Divider/>
                    <Step isShow={false} node={record.node}></Step>
                    <Divider/>
                    <Radio.Group className={style.raioTab} defaultValue={tabValue}
                                 onChange={(e) => this.onRadioChange(e.target.value, curUtil.myStatic.radioType.imIsTab)}>
                        <Radio.Button value='1'>康复出院评估</Radio.Button>
                        <Radio.Button value='2'>Berg平衡量表</Radio.Button>
                    </Radio.Group>

                    <Form onSubmit={this.handleSubmit}>
                        <div className={isHidePrint ?  style.tabContent : style.tabContent +' '+style.showPrint} ref={(el) => {this.refs = el}} >
                            <div name="tab1" className={(tabValue == "1") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <OutHospAssess self={this}isDocter={true} canEdit={canEdit}
                                               getFieldDecorator ={getFieldDecorator}
                                               isHidePrint ={isHidePrint}/>
                            </div>

                            <div name="tab2" className={(tabValue == "2") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <OutHospBerg self={this}isDocter={false} canEdit={false}
                                             getFieldDecorator ={getFieldDecorator}
                                             isHidePrint ={isHidePrint}
                                             removeBergFile ={removeBergFile}
                                             setBergFile ={setBergFile}
                                             uploadBergFileDataSource ={uploadBergFileDataSource}
                                />

                            </div>
                        </div>

                        <div className={style.buttons}>
                            <ReactToPrint trigger={() =>
                                <Button id="print-application" type="primary" className={style.hidden}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...KFHLService.getButton(this,{canEdit,print:this.print,handleSubmit:this.handleSubmit,isDocter:true})}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
DischargeAssessment = Form.create({ name: 'ApplicationForAdmission' })(DischargeAssessment);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, DischargeAssessment);