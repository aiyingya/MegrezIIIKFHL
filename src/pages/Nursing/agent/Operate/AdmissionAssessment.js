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
import AdmissionAssessmentLayout from '../../Service/Layout/AdmissionAssessment';
import Static from "@components/KFHL/Utils/Static";
import KFHLService from "@components/KFHL/Utils/Service";

class AdmissionAssessment extends Component {
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
    }

    componentDidMount() {
        new Scrollbar(this.inside.current).show();
        if(Global.isFrozen()) return;
        //机构和社保人员访问的待办流程页面
        let query = this.props.location.query ||{};
        const record = query.record ? query.record :{};

        if(!record.inHospTableId){console.error("页面必须有数据")}
        else{
            if ((record.flowStatus == nursingUtils.myStatic.flowStatus.agree || record.flowStatus == nursingUtils.myStatic.flowStatus.awaitAudit)) {
                //已通过 或 待审核 不可做任何操作
                this.setPageTempObj({canEdit: false});
                this.props.common.getInfo(this,{inHospTableId:record.inHospTableId},this.setPageTempObj);
            }else{
                switch (this.user.js_lx){
                    case Static.currentRole.medicalInstitution:
                        this.props.common.getInfo(this,{inHospTableId:record.inHospTableId, recordVal:{hospSignDate:KFHLService.currentDay()}},this.setPageTempObj);
                        break;
                    case Static.currentRole.socialInsurance:
                        this.props.common.getInfo(this,{inHospTableId:record.inHospTableId, recordVal:{doctorSignDate:KFHLService.currentDay()}},this.setPageTempObj);
                        break;
                }
                this.setPageTempObj({canEdit: true});
            }


        }
    }


    handleSubmit(isSubmit){
        //是否提交 否则保存
        // if(!this.props.state.btnRequest) return
        let {record} = this.props.state.pageTempObj;
        // console.log("record",this.props.state.pageTempObj.record)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let handleOperate =()=>{
                    this.props.admissionAssessment.handleOperate(record,()=>{
                        KFHLService.goBackUrl(this,this.backUrl);
                    })
                }
                if(isSubmit){
                    let title = `【${nursingUtils.myStatic.auditAgree.inHospDocter[0]}】已完成，确认要发送到下一步【${nursingUtils.myStatic.auditAgree.inHospDocter[1]}】`;
                    Global.showConfirm({title,
                        onConfirm:()=> {
                            handleOperate();
                        }
                    });
                }else{
                    handleOperate();
                }
            }else{
                message.error("请检查必选项！");
            }
        });
    }
    setPageTempObj(object={}){
        this.props.admissionAssessment.setPageTempObj(this,{...object});
    }
    handleChange(val, field) {
        // 表单变更立即触发的事件
        let {record ={},sumScore} = this.props.state.pageTempObj;
        record[field] = val;
       /* //平衡量表总分数
        let isCheckChange = nursingUtils.myStatic.checkTitle.find(res=>res.name == field);
        let _sumScore = 0;
        if(isCheckChange){
            nursingUtils.myStatic.checkTitle.map(res=>{
                let tempScore = record[res.name] ? Number(record[res.name]) : 0 ;
                _sumScore += tempScore;
            })
        }
        this.setPageTempObj({record,sumScore: _sumScore === 0? "" :_sumScore});*/         this.setPageTempObj({record});
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
        const { isHidePrint } = this.state;
        const {dict} = this.props.state.staticStatus;
        const {record={}} = this.props.state.pageTempObj;
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
                            <AdmissionAssessmentLayout self={this} record={record} getFieldDecorator={getFieldDecorator} isHidePrint={isHidePrint}
                                                       canEdit={true} dict={dict}  isDocter={false}/>
                        </div>
                        <div className={style.buttons}>
                            <ReactToPrint trigger={() => <Button id="print-application" style={{display:'none'}}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...KFHLService.getButton(this,{canEdit:true,print:this.print,handleSubmit:this.handleSubmit})}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
AdmissionAssessment = Form.create({ name: 'NursingAgentApplicationForAdmission' })(AdmissionAssessment);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, AdmissionAssessment);