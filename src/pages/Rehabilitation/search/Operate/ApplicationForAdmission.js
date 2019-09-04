// 查看
// 注意页面上的打印，input框有提示文本的时候打印时不能仅删除边框，直接使用文本
import React, {Component, Fragment} from 'react';
import {message} from "antd/lib/index";
import { Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker} from 'antd';
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
import ReactToPrint from 'react-to-print'
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import curUtil from '@components/KFHL/Util';
import Step from '@components/Step/Step';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import InHospApplication from '@components/KFHL/InHospApplication/InHospApplication';
import InHospAssess from '@components/KFHL/InHospAssess/InHospAssess';
import InHospBerg from '@components/KFHL/InHospBerg/InHospBerg';


class ApplicationForAdmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backUrl:'/rehabilitation/search',
            isHidePrint: true,//打印时使用false
        }
        this.user = Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        this.inside = React.createRef();
        this.currentDay = curUtil.currentDay();
        this.handleChange = this.handleChange.bind(this)
        this.onRadioChange = this.onRadioChange.bind(this)
        this.onCheckboxGroupChange = this.onCheckboxGroupChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
        this.setApplyFile = this.setApplyFile.bind(this);
        this.setBergFile = this.setBergFile.bind(this);
    }

    componentDidMount() {
        new Scrollbar(this.inside.current).show();
        this.setPageTempObj({canEdit: false});
        if(Global.isFrozen()) return;
        //判断当前发起流程是否可以操作；
        let query = this.props.location.query ||{};
        const record = query.record ? query.record :{};
        if (record.inHospTableId) {
            this.setPageTempObj({tabValue: record.lookType});
        }
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
                    title = `【${curUtil.myStatic.auditAgree.inHospDocter[0]}】已完成，确认要发送到下一步【${curUtil.myStatic.auditAgree.inHospDocter[1]}】`
                }
                Global.showConfirm({title,
                    onConfirm:()=> {
                        // let val = {...this.props.state.fromObj.record,...values}
                        this.props.applicationForAdmission.handleOperate(record,()=>{
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
    setBergFile(file={}){
        let user =  Global.localStorage.get(Global.localStorage.key.userInfo) || {};
        let count = Math.floor(Math.random() * (1000 - 1) + 1);
        this.props.applicationForAdmission.setBergFile(this,{
            name: file.name,
            size: (file.size / 1024) + "KB" ,
            uploadTime: curUtil.currentDay(),
            uploadUser: this.user.yh_mc || 'admin',
            fileId:count,
            fileUrl:'https://github.com/vuejs/vuepress/archive/master.zip'
        });
    }

    render() {
        let {tabValue="0",canEdit} = this.props.state.pageTempObj;
        const { isHidePrint } = this.state;
        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>
                    <BreadcrumbCustom first="康复" second="查询" third="康复入院查看" secondUrl={this.state.backUrl}/>
                    <Divider/>
                    <Step isShow={true}></Step>
                    <Divider/>

                    {/*<Radio.Group className={style.raioTab} defaultValue={tabValue}*/}
                                 {/*onChange={(e) => this.onRadioChange(e.target.value, curUtil.myStatic.radioType.imIsTab)}>*/}
                        {/*<Radio.Button value='0'>康复入院申请</Radio.Button>*/}
                        {/*<Radio.Button value='1'>康复入院评估</Radio.Button>*/}
                        {/*<Radio.Button value='2'>Berg平衡量表</Radio.Button>*/}
                    {/*</Radio.Group>*/}

                    <div className={style.seatDiv}></div>
                        <Form onSubmit={this.handleSubmit}>
                        <div className={isHidePrint ?  style.tabContent : style.tabContent +' '+style.showPrint} ref={(el) => {this.refs = el}} >
                            <div name="tab1" className={(tabValue == "0") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <InHospApplication self={this}/>
                            </div>


                            <div name="tab2" className={(tabValue == "1") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                               <InHospAssess self={this}/>
                            </div>

                            <div name="tab3" className={(tabValue == "2") ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <InHospBerg self={this}/>
                            </div>
                        </div>
                        {/*<div className={style.buttons}>*/}
                            {/*<ReactToPrint trigger={() => <Button id="print-application" className={style.hidden}>打印</Button>} content={() => this.refs}/>*/}
                            {/*<BasicGroupComponent {...curUtil.getButton(this,{canEdit,print:this.print,handleSubmit:this.handleSubmit})}/>*/}
                        {/*</div>*/}
                        <div className={style.seatDiv}></div>
                    </Form>
                </div>
            </div>
        );
    }
}
ApplicationForAdmission = Form.create({ name: 'ApplicationForAdmission' })(ApplicationForAdmission);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, ApplicationForAdmission);