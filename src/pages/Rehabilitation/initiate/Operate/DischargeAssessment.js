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
import {message} from "antd/lib/index";
class DischargeAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidePrint: true//true是隐藏所有Tabs, 打印时使用false
        }
        this.backUrl='/rehabilitation/initiate';
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        this.inside = React.createRef();
        this.currentDay = KFHLService.currentDay();
        this.handleChange = this.handleChange.bind(this);
        this.handleAutoSearch = this.handleAutoSearch.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
    }


    handleAutoSearch (personName) {
        this.props.common.getUser(this,personName,this.setPageTempObj);
    };

    componentWillMount(){
        // 页面回退显示提交的数据，刷新页面
        let isFrozenPaging =  Global.isFrozen() || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if(isFrozenPaging) return;
        // 只有医护人员访问的发起流程页面
        let query = this.props.location.query ||{};
        const record = query.record ? query.record :{};
        if(!record.inHospTableId){
            record.doctorSignDate = KFHLService.currentDay();
            this.setPageTempObj({canEdit: true,record:record});
        }else{
            let recordVal={};
            let setStoreVal={};
            if ((record.flowStatus == Static.flowStatus.agree || record.flowStatus == Static.flowStatus.awaitAudit)) {
                //已通过 或 待审核 不可做任何操作
                setStoreVal={canEdit: false}
            }else{
                setStoreVal={canEdit: true}
                recordVal={doctorSignDate:KFHLService.currentDay()};
            }
            this.props.common.getInfo(this,{inHospTableId:record.inHospTableId,recordVal,setStoreVal},this.setPageTempObj);
        }
    }

    componentDidMount() {
        new Scrollbar(this.inside.current).show();

    }

    handleSubmit(isSubmit){
        // if(!this.props.state.btnRequest) return
        let {record} = this.props.state.pageTempObjCY;
        record.type = curUtil.myStatic.type.outHosp;//0 = 入院，1 = 出院
        this.props.form.validateFields((err, values) => {
            if (!err) {

                const handleOperate =()=>{
                    this.props.dischargeAssessment.handleOperate(record,isSubmit,()=>{
                        KFHLService.goBackUrl(this,this.backUrl);
                    })
                }

                if(isSubmit){
                    let title = curUtil.getAuditAgreeTxt(this.user.js_lx,false);
                    Global.showConfirm({title,
                        onConfirm:()=> {
                            handleOperate();
                        },
                        className:style.blue
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
        this.props.dischargeAssessment.setPageTempObj(this,{...object});
    }

    handleChange(val, field) {
        // 表单变更立即触发的事件
        let {record ={}} = this.props.state.pageTempObjCY;
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

    render() {
        let {tabValue,canEdit,record={},uploadBergFiles,personUserList=[]} = this.props.state.pageTempObjCY;
        const { isHidePrint } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { removeBergFile,setBergFile } = this.props.dischargeAssessment;
        const uploadBergFileDataSource = (uploadBergFiles && uploadBergFiles.length>0 ? uploadBergFiles : Static.defaultUploadInfo);

        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>

                    <BreadcrumbCustom first="康复" second="发起流程" third="康复出院申请" secondUrl={this.backUrl}/>
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
                                <OutHospAssess self={this} isDocter={true} canEdit={canEdit}
                                               getFieldDecorator ={getFieldDecorator}
                                               isHidePrint ={isHidePrint}
                                               handleChange={this.handleChange}
                                               personUserList = {personUserList}
                                               record={record}
                                               handleAutoSearch ={this.handleAutoSearch}
                                />
                            </div>

                            <div name="tab2" className={(tabValue == "2") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <OutHospBerg self={this}isDocter={true} canEdit={canEdit} record={record}
                                             getFieldDecorator ={getFieldDecorator}
                                             isHidePrint ={isHidePrint}
                                             removeBergFile ={removeBergFile}
                                             setBergFile ={setBergFile}
                                             uploadBergFileDataSource ={uploadBergFileDataSource}
                                             handleChange={this.handleChange}
                                             handleAutoSearch ={this.handleAutoSearch}
                                             personUserList = {personUserList}
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