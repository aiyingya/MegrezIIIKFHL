// 入院申请
// 注意页面上的打印，input框有提示文本的时候打印时不能仅删除边框，直接使用文本
import React, {Component, Fragment} from 'react';
import {message} from "antd/lib/index";
import { Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker} from 'antd';
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
import ReactToPrint from 'react-to-print'
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import nursingUtils from '../../Service/Util';
import Step from '@components/Step/Step';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import StageAssessmentLayout from '../../Service/Layout/StageAssessment';
import Static from "@components/KFHL/Utils/Static";
import KFHLService from "@components/KFHL/Utils/Service";import RejectModal from './RejectModal';

class StageAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidePrint: true,//true是隐藏所有Tabs, 打印时使用false
        }
        this.backUrl='/nursing/initiate';
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        this.inside = React.createRef();
        this.handleChange = this.handleChange.bind(this)
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showReject = this.showReject.bind(this);
    }

    componentWillMount(){
        // 页面回退显示提交的数据，刷新页面
        let isFrozenPaging =  Global.isFrozen() || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if(isFrozenPaging) return;
        //机构和社保人员访问的待办流程页面
        let query = this.props.location.query ||{};
        const record = query.record ? query.record :{};

        if(!record.inHospTableId){console.error("页面必须有数据")}
        else{
            let recordVal={};
            let setStoreVal={};
            if ((record.flowStatus == nursingUtils.myStatic.flowStatus.agree || record.flowStatus == nursingUtils.myStatic.flowStatus.awaitAudit)) {
                //已通过 或 待审核 不可做任何操作
                setStoreVal={canEdit: false};
                this.props.common.getInfo(this,{inHospTableId:record.inHospTableId},this.setPageTempObj);
            }else{
                setStoreVal={canEdit: true};
                switch (this.user.js_lx){
                    case Static.currentRole.medicalInstitution:
                        recordVal={hospSignDate:KFHLService.currentDay()};
                        break;
                    case Static.currentRole.socialInsurance:
                        recordVal={sicSignDate:KFHLService.currentDay()};
                        break;
                }
            }
            this.props.common.getInfo(this,{inHospTableId:record.inHospTableId,tableType:nursingUtils.myStatic.flowType.StageAssessment, recordVal,setStoreVal},this.setPageTempObj);
        }
    }
    componentDidMount() {
        new Scrollbar(this.inside.current).show();

    }

    handleSubmit(isSubmit){
        // 只能提交不能保存
        // if(!this.props.state.btnRequest) return
        let {record} = this.props.state.pageTempObj;
        // console.log("record",this.props.state.pageTempObj.record)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const handleOperate =()=>{
                    this.props.common.handleCommit({...record,commitType:Static.commitType.hlStageAssessment},()=>{
                        KFHLService.goBackUrl(this,this.backUrl);
                    })
                }
                let title = nursingUtils.getAuditAgreeTxt(this.user.js_lx,true);
                Global.showConfirm({title,
                    onConfirm:()=> {
                        handleOperate();
                    }
                });
            }else{
                message.error("请检查必选项！");
            }
        });
    }
    setPageTempObj(object={}){
        this.props.stageAssessment.setPageTempObj(this,{...object});
    }
    handleChange(val, field) {
        // 表单变更立即触发的事件
        let {record ={}} = this.props.state.pageTempObj;
        record[field] = val;
        this.setPageTempObj({record});
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
    handleReject(rejectContent){
        let {record={}} = this.props.state.pageTempObj;
        this.props.common.handleReject(this,{inHospTableId:record.inHospTableId,backCause:rejectContent,fun:()=>{
                this.hideModal();
            }});
    }
    hideReject(){
        this.setPageTempObj({showRejectModal: false});
    }
    showReject(){
        let rejectTxts = nursingUtils.getAuditRejectTxt(this.user.js_lx,false);
        this.setPageTempObj({showRejectModal: true,rejectTxts});
    }
    render() {
        const { isHidePrint } = this.state;
        const {dict} = this.props.state.staticStatus;
        const {record={},monthList,canEdit,showRejectModal,rejectTxts} = this.props.state.pageTempObjStag;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>
                    <BreadcrumbCustom first="护理" second="发起流程" third="护理入院申请"  secondUrl={this.backUrl}/>
                    <Divider/>
                    <Step isShow={false} node={record.node}></Step>
                    <Divider/>

                    <Form onSubmit={this.handleSubmit}>
                        <div className={isHidePrint ?  style.tabContent : style.tabContent +' '+style.showPrint} ref={(el) => {this.refs = el}} >
                            <StageAssessmentLayout self={this} record={record} getFieldDecorator={getFieldDecorator} isHidePrint={isHidePrint}
                                                 canEdit={canEdit} dict={dict} handleChange={this.handleChange} monthList={monthList} isDocter={false}/>
                        </div>
                        <div className={style.buttons}>
                            <ReactToPrint trigger={() => <Button id="print-application" style={{display:'none'}}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...KFHLService.getButton(this,{canEdit:canEdit,print:this.print,handleSubmit:this.handleSubmit,showReject:this.showReject})}/>
                        </div>
                    </Form>
                </div>
                {showRejectModal && <RejectModal isShow={showRejectModal} close={this.hideReject} rejectCallback={(context)=>{this.handleReject(context)}} confirmLoading={this.props.state.btnRequestLoading}
                                                 rejectTxts={rejectTxts}/>}
            </div>
        );
    }
}
StageAssessment = Form.create({ name: 'NursingAgentStageAssessment' })(StageAssessment);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, StageAssessment);