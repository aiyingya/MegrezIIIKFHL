// 入院申请
import React, {Component,Fragment} from 'react';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const { Option  } = AutoComplete;//AutoOption
const RadioGroup = Radio.Group;
const {TextArea} = Input;
import ReactToPrint from 'react-to-print'
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import curUtil from '@components/KFHL/Util';
import Step from '@components/Step/Step';
import UploadFileNoName from '@components/UploadFile/UploadFile';
import CheckScore from '@components/KFHL/CheckScore/CheckScore';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import OutHospAssess from '@components/KFHL/OutHospAssess/OutHospAssess';
import OutHospBerg from '@components/KFHL/OutHospBerg/OutHospBerg';
import RejectModal from './RejectModal';

class DischargeAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backUrl:'/rehabilitation/agent',
            isHidePrint: true//true是隐藏所有Tabs, 打印时使用false
        }
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        this.inside = React.createRef();
        this.currentDay = curUtil.currentDay();
        this.checkUser = this.checkUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAutoSearch = this.handleAutoSearch.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
        this.setApplyFile = this.setApplyFile.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.showReject = this.showReject.bind(this);
    }

    handleAutoSearch (personName) {
        this.props.dischargeAssessment.getUser(this,personName);
    };
    componentDidMount() {
        new Scrollbar(this.inside.current).show();
        if(Global.isFrozen()) return;
        //判断当前发起流程是否可以操作；
        let query = this.props.location.query ||{};
        const record = query.record ? query.record :{}
        if (record.inHospTableId && (record.flowStatus == curUtil.myStatic.flowStatus.agree || record.flowStatus == curUtil.myStatic.flowStatus.awaitAudit)) {
            //已通过 或 待审核 不可做任何操作
            this.setPageTempObj({canEdit: false});
        }else{
            this.setPageTempObj({canEdit: true});
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
            name: file.name,
            size: (file.size / 1024) + "KB" ,
            uploadTime:curUtil.currentDay(),
            uploadUser: this.user.yh_mc || 'admin',
            fileId:count,
            fileUrl:'https://github.com/vuejs/vuepress/archive/master.zip'
        });
    }
    handleReject(rejectContent){
        let {record={}} = this.props.state.pageTempObjCY;
        this.props.common.handleReject(this,{flowTableId:record.flowTableId,backCause:rejectContent,fun:()=>{
           this.hideModal();
        }});
    }
    showReject(){
        let rejectTxts = [];
        switch (this.user.js_lx){
            case( curUtil.myStatic.currentRole.medicalInstitution):
                rejectTxts = curUtil.myStatic.auditReject.inHospMedicalInstitution;
                break;
            case( curUtil.myStatic.currentRole.socialInsurance):
                rejectTxts = curUtil.myStatic.auditReject.socialInsurance;
                break;
        }
        this.setPageTempObj({showRejectModal: true,rejectTxts:rejectTxts});
    }
    hideModal(){
        this.setPageTempObj({showRejectModal: false});
    }

    render() {
        let {tabValue,canEdit,record={},showRejectModal,rejectTxts} = this.props.state.pageTempObjCY;
        const { isHidePrint } = this.state;

        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>
                    <BreadcrumbCustom first="康复" second="流程待办" third="出院评估" secondUrl={this.state.backUrl}/>
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
                                <OutHospAssess self={this}/>
                            </div>

                            <div name="tab2" className={(tabValue == "2") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <OutHospBerg self={this}/>
                            </div>
                        </div>

                        <div className={style.buttons}>
                            <ReactToPrint trigger={() =>
                                <Button id="print-application" type="primary" className={style.hidden}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...curUtil.getButton(this,{canEdit,print:this.print,handleSubmit:this.handleSubmit,isDocter:false,showReject:this.showReject})}/>
                        </div>
                    </Form>
                </div>
                {showRejectModal && <RejectModal isShow={showRejectModal} close={this.hideModal} rejectCallback={(context)=>{this.handleReject(context)}} confirmLoading={this.props.state.btnRequestLoading}
                             rejectTxts={rejectTxts}/>}
            </div>
        );
    }
}
DischargeAssessment = Form.create({ name: 'ApplicationForAdmission' })(DischargeAssessment);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, DischargeAssessment);