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
import AdmissionAssessmentLayout from '../../Service/Layout/AdmissionAssessment';
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
        let {record} = this.props.admissionAssessment.pageTempObj;
        // 所有人员都可以看的查看页面，只能查看
        this.setPageTempObj({record:record});
    }

    handleSubmit(isSubmit){
        //是否提交 否则保存
        // if(!this.props.state.btnRequest) return
        let {record} = this.props.state.pageTempObj;
        record.type = '0';//0 = 入院，1 = 出院
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
                        this.props.admissionAssessment.handleOperate(record,()=>{
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
        this.props.admissionAssessment.setPageTempObj(this,{...object});
    }
    handleChange(val, field) {
        // 表单变更立即触发的事件
        let {record ={},sumScore} = this.props.state.pageTempObj;
        record[field] = val;
        let isCheckChange = nursingUtils.myStatic.checkTitle.find(res=>res.name == field);
        let _sumScore = 0;
        //平衡量表总分数
        if(isCheckChange){
            nursingUtils.myStatic.checkTitle.map(res=>{
                let tempScore = record[res.name] ? Number(record[res.name]) : 0 ;
                _sumScore += tempScore;
            })
        }
        this.setPageTempObj({record,sumScore: _sumScore === 0? "" :_sumScore});
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
                    <BreadcrumbCustom first="护理" second="发起流程" third="护理入院申请" secondUrl={this.backUrl}/>
                    <Divider/>
                    <Step isShow={false} node={record.node}></Step>
                    <Divider/>

                    <Form onSubmit={this.handleSubmit}>
                        <div className={isHidePrint ?  style.tabContent : style.tabContent +' '+style.showPrint} ref={(el) => {this.refs = el}} >
                                <AdmissionAssessmentLayout self={this} record={record} getFieldDecorator={getFieldDecorator} isHidePrint={isHidePrint}
                                                     canEdit={false} dict={dict} isDocter={false}/>
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
AdmissionAssessment = Form.create({ name: 'NursingSearchApplicationForAdmission' })(AdmissionAssessment);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, AdmissionAssessment);