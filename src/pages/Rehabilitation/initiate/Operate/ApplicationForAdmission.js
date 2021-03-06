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
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import InHospApplication from '../../Service/Layout/InHospApplication/InHospApplication';
import InHospAssess from '../../Service/Layout/InHospAssess/InHospAssess';
import InHospBerg from '../../Service/Layout/InHospBerg/InHospBerg';
import Static from "@components/KFHL/Utils/Static";
import KFHLService from "@components/KFHL/Utils/Service";
class ApplicationForAdmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidePrint: true,//true是隐藏所有Tabs, 打印时使用false
        }
        this.backUrl='/rehabilitation/initiate';
        this.inside = React.createRef();
        this.currentDay = KFHLService.currentDay();
        this.handleChange = this.handleChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onCheckboxGroupChange = this.onCheckboxGroupChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
        this.handleAutoSearch = this.handleAutoSearch.bind(this);
    }
    componentWillMount(){
        // 页面回退显示提交的数据，刷新页面
        let isFrozenPaging =  Global.isFrozen() || (this.props.location.query ? this.props.location.query.frozenPaging : false);
        if(isFrozenPaging) return;
        // 只有医护人员访问的发起流程页面
        let query = this.props.location.query ||{};
        const record = query.record ? query.record :{};
        if(!record.inHospTableId){
            record.doctorSignDate = KFHLService.currentDay();
            this.setPageTempObj({canEdit: true,record:record,...{
                    // 显示哪个tab页
                    tabValue:'0',
                    // 诊断依据的上端依据['0','1', '2', '3', '4']
                    checkedOutsideList:[],
                    // 诊断依据的下端骨科组选择依据 ['6', '7','8', '9', '10']
                    checkedGroupList:[],
                    // 诊断依据的下端骨科组选择依据 全选设置,默认不全选
                    indeterminate:false,
                    // 诊断依据的下端骨科组选择依据 是否显示全选['5']
                    checkAll:false,
                    // 上传的申请文件
                    uploadApplyFiles:[],
                    // 上传的评估文件
                    uploadBergFiles:[],
                    // 在院人员模糊用户信息列表
                    personUserList:[],
                }});
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
    handleAutoSearch (personName) {
        this.props.common.getUser(this,personName,this.setPageTempObj);
    };
    handleSubmit(isSubmit){
        //是否提交 否则保存
        // if(!this.props.state.btnRequest) return
        let {record,uploadBergFiles=[]} = this.props.state.pageTempObj;
        // console.log("record",this.props.state.pageTempObj.record)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const handleOperate =()=>{
                    record.type = curUtil.myStatic.type.inHosp;
                    record.outHospFileIds = uploadBergFiles.map(res=>res.fileId);
                    this.props.applicationForAdmission.handleOperate(record,isSubmit,()=>{
                        KFHLService.goBackUrl(this,this.backUrl);
                    })
                }
                if(isSubmit){
                    let title = curUtil.getAuditAgreeTxt(_m.user.js_lx,true);
                    Global.showConfirm({title,
                        onConfirm:()=> {
                            handleOperate();
                        }
                    });
                }else{
                    handleOperate();
                }

            }else{
                message.error(Static.tipsTxt.inputError);
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
        let {tabValue="0",canEdit,record={},uploadBergFiles,uploadApplyFiles,personUserList=[]} = this.props.state.pageTempObj;
        const { isHidePrint } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { removeBergFile,setBergFile,removeApplayFile,setApplyFile  } = this.props.applicationForAdmission;
        const uploadBergFileDataSource = (uploadBergFiles && uploadBergFiles.length>0 ? uploadBergFiles : Static.defaultUploadInfo);
        const uploadApplyFileDataSource = (uploadApplyFiles && uploadApplyFiles.length>0 ? uploadApplyFiles : Static.defaultUploadInfo);

        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>
                    <BreadcrumbCustom first="康复" second="发起流程" third="康复入院申请" secondUrl={this.backUrl}/>
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
                                <InHospApplication self={this} isDocter={true} canEdit={canEdit}
                                                   getFieldDecorator ={getFieldDecorator}
                                                   isHidePrint ={isHidePrint}
                                                   uploadApplyFileDataSource={uploadApplyFileDataSource}
                                                   removeApplayFile={removeApplayFile}
                                                   setApplyFile={setApplyFile}
                                                   onCheckAllChange={this.onCheckAllChange}
                                                   onCheckChange={this.onCheckChange}
                                                   handleChange={this.handleChange}
                                                   handleAutoSearch ={this.handleAutoSearch}
                                                   personUserList = {personUserList}
                                />
                            </div>


                            <div name="tab2" className={(tabValue == "1") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <InHospAssess self={this} isDocter={true} canEdit={canEdit}
                                              getFieldDecorator ={getFieldDecorator}
                                              isHidePrint ={isHidePrint}
                                              handleChange={this.handleChange}
                                              handleAutoSearch ={this.handleAutoSearch}
                                              personUserList = {personUserList}
                                />
                            </div>

                            <div name="tab3" className={(tabValue == "2") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <InHospBerg self={this} isDocter={true} canEdit={canEdit}
                                            getFieldDecorator ={getFieldDecorator}
                                            isHidePrint ={isHidePrint}
                                            removeBergFile ={removeBergFile}
                                            setBergFile ={setBergFile}
                                            uploadBergFileDataSource ={uploadBergFileDataSource}
                                            record={record}
                                            handleChange={this.handleChange}
                                            handleAutoSearch ={this.handleAutoSearch}
                                            personUserList = {personUserList}

                                />
                            </div>
                        </div>

                        <div className={style.buttons}>
                            <ReactToPrint trigger={() => <Button id="print-application" className={style.hidden}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...KFHLService.getButton(this,{canEdit,print:this.print,handleSubmit:this.handleSubmit,isDocter:true})}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
ApplicationForAdmission = Form.create({ name: 'ApplicationForAdmission' })(ApplicationForAdmission);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, ApplicationForAdmission);