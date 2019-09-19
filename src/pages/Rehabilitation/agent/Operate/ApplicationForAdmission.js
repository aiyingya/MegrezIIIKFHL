// 入院申请
// 注意页面上的打印，input框有提示文本的时候打印时不能仅删除边框，直接使用文本
import React, {Component, Fragment} from 'react';
import {message} from "antd/lib/index";
import { Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker} from 'antd';
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
import ReactToPrint from 'react-to-print'
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import curUtil from '../../Service/Util';
import Step from '@components/Step/Step';
import style from '../common.less'
import InHospApplication from '../../Service/Layout/InHospApplication/InHospApplication';
import InHospAssess from '../../Service/Layout/InHospAssess/InHospAssess';
import InHospBerg from '../../Service/Layout/InHospBerg/InHospBerg';
import RejectModal from './RejectModal';
import Static from "@components/KFHL/Utils/Static";
import KFHLService from "@components/KFHL/Utils/Service";
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';

class ApplicationForAdmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidePrint: true,//true是隐藏所有Tabs, 打印时使用false
        }
        this.backUrl='/rehabilitation/agent';
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        this.inside = React.createRef();
        this.currentDay = KFHLService.currentDay();
        this.handleChange = this.handleChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this)
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
        this.hideReject = this.hideReject.bind(this);
        this.handleReject = this.handleReject.bind(this);
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
            if ((record.flowStatus == Static.flowStatus.agree || record.flowStatus == Static.flowStatus.awaitAudit)) {
                //已通过 或 待审核 不可做任何操作
                setStoreVal={canEdit: false};
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
            this.props.common.getInfo(this,{inHospTableId:record.inHospTableId,recordVal,setStoreVal},this.setPageTempObj);
        }
    }
    componentDidMount() {
        new Scrollbar(this.inside.current).show();
    }
    handleSubmit(){
        // 只能提交不能保存
        // if(!this.props.state.btnRequest) return
        let {record} = this.props.state.pageTempObj;
        record.type = curUtil.myStatic.type.inHosp;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const handleOperate =()=>{
                    this.props.common.handleCommit(record,()=>{
                        KFHLService.goBackUrl(this,this.backUrl);
                    })
                }
                let title = curUtil.getAuditAgreeTxt(this.user.js_lx,true);
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
        this.props.applicationForAdmission.setPageTempObj(this,{...object});
    }

    handleChange(val, field) {
        // 表单变更立即触发的事件
        let {record ={}} = this.props.state.pageTempObj;
        record[field] = val;
         this.setPageTempObj({record});
    }

    onRadioChange(value, name) {
        if (name == curUtil.myStatic.radioType.imIsTab) {
            this.setPageTempObj({tabValue: value});
        }
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
                this.hideReject();
            }});
    }
    showReject(){
        let rejectTxts = curUtil.getAuditRejectTxt(this.user.js_lx,true);
        this.setPageTempObj({showRejectModal: true,rejectTxts});
    }
    hideReject(){
        this.setPageTempObj({showRejectModal: false});
    }

    render() {
        let {tabValue="0",canEdit,record={},showRejectModal,rejectTxts,uploadBergFiles,uploadApplyFiles} = this.props.state.pageTempObj;
        const { isHidePrint } = this.state;
        const { getFieldDecorator } = this.props.form;
        const uploadBergFileDataSource = (uploadBergFiles && uploadBergFiles.length>0 ? uploadBergFiles : Static.defaultUploadInfo);
        const uploadApplyFileDataSource = (uploadApplyFiles && uploadApplyFiles.length>0 ? uploadApplyFiles : Static.defaultUploadInfo);
        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>
                    <BreadcrumbCustom first="康复" second="流程待办" third="入院评估" secondUrl={this.backUrl}/>
                    <Divider/>
                    <Step isShow={false} node={record.node}></Step>
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
                                <InHospApplication self={this} isDocter={false}canEdit={canEdit}
                                                   getFieldDecorator ={getFieldDecorator}
                                                   isHidePrint ={isHidePrint}
                                                   uploadApplyFileDataSource={uploadApplyFileDataSource}
                                />
                            </div>


                            <div name="tab2" className={(tabValue == "1") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <InHospAssess self={this} isDocter={false} canEdit={canEdit}
                                              getFieldDecorator ={getFieldDecorator}
                                              isHidePrint ={isHidePrint}/>
                            </div>

                            <div name="tab3" className={(tabValue == "2") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <InHospBerg self={this} isDocter={false} canEdit={canEdit}
                                            getFieldDecorator ={getFieldDecorator}
                                            isHidePrint ={isHidePrint}
                                            uploadBergFileDataSource ={uploadBergFileDataSource}
                                            record={record}
                                />
                            </div>
                        </div>

                        <div className={style.buttons}>
                            <ReactToPrint trigger={() => <Button id="print-application" className={style.hidden}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...KFHLService.getButton(this,{canEdit,print:this.print,handleSubmit:this.handleSubmit,isDocter:false,showReject:this.showReject})}/>
                        </div>
                    </Form>
                </div>
                {showRejectModal && <RejectModal isShow={showRejectModal} close={this.hideReject} rejectCallback={(context)=>{this.handleReject(context)}} confirmLoading={this.props.state.btnRequestLoading}
                                                 rejectTxts={rejectTxts}/>}
            </div>
        );
    }
}
ApplicationForAdmission = Form.create({ name: 'ApplicationForAdmission' })(ApplicationForAdmission);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, ApplicationForAdmission);