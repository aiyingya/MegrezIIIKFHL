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
import InHospApplication from '../../../Rehabilitation/Service/Layout/InHospApplication/InHospApplication';
import InHospAssess from '../../../Rehabilitation/Service/Layout/InHospAssess/InHospAssess';
import InHospBerg from '../../../Rehabilitation/Service/Layout/InHospBerg/InHospBerg';
import StageAssessmentLayout from '../../Service/Layout/StageAssessment';
import curUtil from "@/pages/Nursing/Service/Util";
import Static from "@components/KFHL/Utils/Static";
import KFHLService from "@components/KFHL/Utils/Service";
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
    }
    componentDidMount() {
        new Scrollbar(this.inside.current).show();
        let query = this.props.location.query ||{};
        const record = query.record ? query.record :{}
        //只有医护人员访问的发起流程页面
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
    handleSubmit(isSubmit){
        //是否提交 否则保存
        // if(!this.props.state.btnRequest) return
        let {record} = this.props.state.pageTempObj;
        // console.log("record",this.props.state.pageTempObj.record)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let title = "是否保存？"
                if(isSubmit){
                    title = `【${nursingUtils.myStatic.auditAgree.inHospDocter[0]}】已完成，确认要发送到下一步【${nursingUtils.myStatic.auditAgree.inHospDocter[1]}】`
                }
                Global.showConfirm({title,
                    onConfirm:()=> {
                        // let val = {...this.props.state.fromObj.record,...values}
                        this.props.stageAssessment.handleOperate(record,()=>{
                            this.goBack();
                        })
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
        console.log(record)
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
    render() {
        const { isHidePrint } = this.state;
        const {dict} = this.props.state.staticStatus;
        const {record={},monthList,canEdit} = this.props.state.pageTempObjStag;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>
                    <BreadcrumbCustom first="护理" second="发起流程" third="护理入院申请" secondUrl={this.backUrl}/>
                    <Divider/>
                    <Step isShow={false} node={record.node}></Step>
                    <Divider/>

                    <Form onSubmit={this.handleSubmit}>
                        <div className={isHidePrint ?  style.tabContent : style.tabContent +' '+style.showPrint} ref={(el) => {this.refs = el}} >
                            <StageAssessmentLayout self={this} record={record} getFieldDecorator={getFieldDecorator} isHidePrint={isHidePrint}
                                                 canEdit={canEdit} dict={dict} handleChange={this.handleChange} monthList={monthList} isDocter={true}/>
                        </div>
                        <div className={style.buttons}>
                            <ReactToPrint trigger={() => <Button id="print-application" style={{display:'none'}}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...KFHLService.getButton(this,{canEdit:canEdit,print:this.print,handleSubmit:this.handleSubmit})}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
StageAssessment = Form.create({ name: 'NursingStageAssessment' })(StageAssessment);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, StageAssessment);