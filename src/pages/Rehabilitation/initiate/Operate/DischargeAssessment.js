// 入院申请
import React, {Component} from 'react';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const { Option  } = AutoComplete;//AutoOption
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
import ReactToPrint from 'react-to-print'
import _ from 'lodash';
import {Global, ReduxWarpper, BasicGroupComponent, Scrollbar, BreadcrumbCustom} from 'winning-megreziii-utils';
import curUtil from '../Util'
import Step from '@components/Step/Step';
import CheckScore from '@components/CheckScore/CheckScore';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import columnsaApplicationForAdmission from '../columnsaApplicationForAdmission'

const myStatic = {
    defaultCheckedList: ['0', "1"],
    //诊断主要依据选择值
    outsideOptions: [
        {label: '偏瘫或截肢体肌力3级，或者肌力3级以上但', value: '0'},
        {label: '层高级脑功能障碍', value: '1'},
        {label: '吞咽功能障碍', value: '2'},
        {label: '言语功能障碍', value: '3'},
        {label: '大小便功能障碍', value: '4'}
    ],
    plainParentOptions: {label: '骨关节功能障碍', value: '5'},
    plainOptions: [
        {label: '层股骨颈骨折', value: '6'},
        {label: '股骨粗隆骨折', value: '7'},
        {label: '股骨干骨折', value: '8'},
        {label: '关节置换', value: '9'},
        {label: '腰间盘突出', value: '10'}
    ],
    //上传文件默认值
    defaultUploadInfo: [{
        isTest:true,
        key: '1',
        name: '',
        size: '',
        uploadTime: '',
        uploadUser: '',
    }],
    // 得分选择值
    checkScore: [
        {text: '0', value: '0'},
        {text: '1', value: '1'},
        {text: '2', value: '2'},
        {text: '3', value: '3'},
    ],
    // 检查序号检查内容
    checkTitle: [
        {text: '从座位站起', name: 'czwzq'},
        {text: '无支持站立', name: 'wzczl'},
        {text: '无支持坐起', name: 'wzczq'},
        {text: '站立坐下', name: 'zlzx'},
        {text: '转移', name: 'zy'},
        {text: '闭目站立', name: 'bmzl'},
        {text: '双脚并拢站立', name: 'sjblzl'},
        {text: '上肢向前伸站立并向前移动', name: 'szxqszlbxqyd'},
        {text: '从地面拾起物品', name: 'cdmjqwp'},
        {text: '转身向后看', name: 'zsxhk'},
        {text: '转身360度', name: 'zs'},
        {text: '将一只脚放在台阶或凳子上', name: 'jyzjfztjhdzs'},
        {text: '两脚一前一后站立', name: 'ljyqyhzl'},
        {text: '单脚站立', name: 'djzl'},
    ], /**/
    //我是Tab页签
    radioType: {imIsTab: '0'},
    // 验证规则
    rulesConfig: {
        rules: [{required: true,  message: '请输入', whitespace: true}]
    },
    dateFormat : 'YYYY-MM-DD'
}

function onSelect(value) {
    console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}
function renderOption(item) {
    return (
        <Option key={item.ID}  value={item.personName}>
            <div className="global-search-item">
                <span className="global-search-item-desc">{item.personName}</span>
                <span className="global-search-item-count">{item.identityCard}</span>
            </div>
        </Option>
    );
}

class DischargeAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backUrl:'/rehabilitation/initiate',
            uploadData: [myStatic.initUploadDate],
            uploadBergData: [myStatic.initUploadDate],
            isHideTabs: true//true是隐藏所有Tabs, 打印时使用false
        }
        this.inside = React.createRef();
        this.button = {
            direction: Global.Direction.DOWN,
            datas: [
                {
                    type: 'null',
                    className: Global.BottomCss.Default,
                    text: '打印',
                    onClick: (e) => {
                        this.print();
                    }
                },
                {
                    type: 'primary',
                    className: Global.BottomCss.Default,
                    text: '保存',
                    onClick: (e) => {
                        this.handleSubmit();
                    }
                },
                {
                    type: 'primary',
                    className: Global.BottomCss.REMOVE,
                    text: '退回',
                    onClick: (e) => {
                        this.handleRemove(this.state.selectedRows);
                    }
                },
                {
                    type: 'primary',
                    className: Global.BottomCss.ADD,
                    text: '提交',
                    onClick: (e) => {
                        this.handleRemove(this.state.selectedRows);
                    }
                }
            ]
        }
        // this.checkUser = _.debounce(this.checkUser, 1000);
        this.checkUser = this.checkUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAutoSearch = this.handleAutoSearch.bind(this)
        this.onRadioChange = this.onRadioChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.submit = this.submit.bind(this);
        this.onCheckboxGroupChange = this.onCheckboxGroupChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.print = this.print.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPageTempObj = this.setPageTempObj.bind(this);
    }

    onAutoSelect(value) {
        console.log('onAutoSelect', value);
    }

    handleAutoSearch (personName) {
        this.props.dischargeAssessment.getUser(this,personName);
    };
    componentDidMount() {
        new Scrollbar(this.inside.current).show()
    }

    checkUser(name){
        this.props.dischargeAssessment.getUser(name);
    }
    handleSubmit(e){
        // if(!this.props.state.btnRequest) return
        let {record} = this.props.state.pageTempObjCY;
        record.type = '1';//0 = 入院，1 = 出院
        console.log("record",this.props.state.pageTempObjCY.record)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // let val = {...this.props.state.fromObj.record,...values}
                // this.props.userOperate.handleOperate(val,()=>{
                //     this.goBack()
                // })
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
        let isCheckChange = myStatic.checkTitle.find(res=>res.name == field);
        let _sumScore = 0;
        //平衡量表总分数
        if(isCheckChange){
            myStatic.checkTitle.map(res=>{
                let tempScore = record[res.name] ? Number(record[res.name]) : 0 ;
                _sumScore += tempScore;
            })
        }
        this.setPageTempObj({record,sumScore: _sumScore === 0? "" :_sumScore});
    }

    onRadioChange(value, name) {
        if (name == myStatic.radioType.imIsTab) {
            this.setPageTempObj({tabValue: value});
        }
    }

    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    }

    onCheckChange(checkedValues,field) {
        // 其他障碍选择
        let {record,checkedGroupList,checkAll} = this.props.state.pageTempObj;
        let _checkedValues = [...checkedValues,...checkedGroupList];
        if(checkAll){
            _checkedValues = [..._checkedValues,myStatic.plainParentOptions.value]
        }
        record[field] =_checkedValues;
        this.setPageTempObj({checkedOutsideList:checkedValues,record});
    }
    onCheckAllChange(e,field) {
        // 骨关节功能障碍 全选
        const checkAll = e.target.checked;
        let checkedGroupList = checkAll ? myStatic.plainOptions.map(res => res.value) : [];
        let {record,checkedOutsideList} = this.props.state.pageTempObj;
        let _checkedValues = [...checkedOutsideList,...checkedGroupList];
        if(checkAll){
            _checkedValues = [..._checkedValues,myStatic.plainParentOptions.value]
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
        const checkAll = checkedList.length === myStatic.plainOptions.length;
        let _checkedValues = [...checkedOutsideList,...checkedList];
        if(!!checkedList.length){
            _checkedValues = [..._checkedValues,myStatic.plainParentOptions.value]
        }
        record[field] =_checkedValues;
        // 骨关节功能障碍 子选
        this.setPageTempObj({
            checkedGroupList:checkedList,
            indeterminate: !!checkedList.length && checkedList.length < myStatic.plainOptions.length,
            checkAll: checkAll,
            record
        });
    };


    print() {
        Global.showLoading();
        this.setState({isHideTabs: false});
        setTimeout(function () {
            $('#print-application').click();
            Global.hideLoading();
        }, 1000);
    }

    submit() {
    }

    render() {
        let {tabValue,record={},personUserList,indeterminate,checkedGroupList,checkAll,sumScore,userName,uploadBergFiles:_uploadBergFiles} = this.props.state.pageTempObjCY;
        const { getFieldDecorator } = this.props.form;
        const uploadBergFiles = (_uploadBergFiles && _uploadBergFiles.length>0 ? _uploadBergFiles : myStatic.defaultUploadInfo);

        return (
            <div className={`winning-body ${style.winningBody}`} ref={this.inside}>
                <div className='winning-content'>

                    <BreadcrumbCustom first="康复" second="发起流程" third="康复出院申请" secondUrl={this.state.backUrl}/>
                    <Divider/>
                    <Step isShow={true}></Step>
                    <Divider/>
                    <Radio.Group className={style.raioTab} defaultValue={tabValue}
                                 onChange={(e) => this.onRadioChange(e.target.value, myStatic.radioType.imIsTab)}>
                        <Radio.Button value='1'>康复出院评估</Radio.Button>
                        <Radio.Button value='2'>Berg平衡量表</Radio.Button>
                    </Radio.Group>

                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.tabContent} ref={(el) => {this.refs = el}}>
                            <div name="tab1" className={(tabValue == "1" || !this.state.isHideTabs) ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <Descriptions title="无锡市康复医院2019年05月张三康复入院评估表" column={2} bordered
                                              className={style.descriptions}>
                                    <Descriptions.Item label="姓名">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('personName', {
                                                initialValue: record.personName,...myStatic.rulesConfig
                                            })(
                                                <AutoComplete
                                                    className="global-search"
                                                    style={{ width: '100%' }}
                                                    dataSource={personUserList.map(renderOption)}
                                                    // onSelect={this.onAutoSelect}
                                                    onSearch={_.debounce((e)=>{this.handleAutoSearch(e)}, 1000)}
                                                    onChange={(e)=>{this.handleChange(e,"personName")}}
                                                    placeholder="请输入"
                                                    optionLabelProp="value"
                                                >
                                                </AutoComplete>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="性别">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('sex', {
                                                initialValue: (record.sex && record.sex=="女") ? "1":"0",...myStatic.rulesConfig
                                            })(
                                                <Select onChange={(event)=> {this.handleChange(event, "sex")}}>
                                                    <Select.Option value="0">男</Select.Option>
                                                    <Select.Option value="1">女</Select.Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="年龄">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('age', {
                                                initialValue: record.age,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "age")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="证件号码">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('identityCard', {
                                                initialValue: record.identityCard,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "identityCard")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="床号">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('bedNumber', {
                                                initialValue: record.bedNumber,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "bedNumber")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="病区">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('lesion', {
                                                initialValue: record.lesion,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "lesion")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="住院号">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('inHospNumber', {
                                                initialValue: record.inHospNumber,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "inHospNumber")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="入院时间">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('inHospDate', {
                                                initialValue: record.inHospDate,rules: [{required: false, message: '请输入'}]
                                            })(
                                                <DatePicker  format={myStatic.dateFormat}
                                                             onChange={(date, dateString)=>  {this.handleChange(dateString, "inHospDate")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="入院诊断" span={2}>
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('inHospDiagnose', {
                                                initialValue: record.inHospDiagnose,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "inHospDiagnose")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                </Descriptions>
                                <div className={style.propList}>
                                    <header>
                                        <div>评估项目</div>
                                        <div>功能障碍及其程度</div>
                                    </header>
                                    <div>
                                        <div className={style.heightText}>1.脑高级功能复制</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "brainFun")}}/></div>
                                    </div>
                                    <div>
                                        <div>意识水平</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "mentLevel")}}/></div>
                                    </div>
                                    <div>
                                        <div>认知功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "cognitive")}}/></div>
                                    </div>
                                    <div>
                                        <div>言语功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "speak")}}/></div>
                                    </div>
                                    <div>
                                        <div>情感情绪</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "mood")}}/></div>
                                    </div>
                                    <div>
                                        <div className={style.heightText}>2.吞咽功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "swallowingFun")}}/></div>
                                    </div>
                                    <div>
                                        <div className={style.heightText}>3.运动功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "motionFun")}}/></div>
                                    </div>
                                    <div>
                                        <div>肌力</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "myodynamia")}}/></div>
                                    </div>
                                    <div>
                                        <div>肌张力</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "muscularTone")}}/></div>
                                    </div>
                                    <div>
                                        <div>平衡功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "balance")}}/></div>
                                    </div>
                                    <div>
                                        <div>感觉功能</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "sensibility")}}/></div>
                                    </div>
                                    <div>
                                        <div>浅感觉</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "superficialSen")}}/></div>
                                    </div>
                                    <div>
                                        <div>深感觉</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "deepSen")}}/></div>
                                    </div>
                                    <div>
                                        <div>复合感觉</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "compositeSen")}}/></div>
                                    </div>
                                    <div>
                                        <div>日常生活能力</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "dayLive")}}/></div>
                                    </div>
                                    <div>
                                        <div>合并症/并发症</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "syndrome")}}/></div>
                                    </div>
                                    <div>
                                        <div>心功能不全</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "cardiacFun")}}/></div>
                                    </div>
                                    <div>
                                        <div>肺部感染</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "pulInfection")}}/></div>
                                    </div>
                                    <div>
                                        <div>气管切开</div>
                                        <div><Input  onChange={(event)=> {this.handleChange(event.target.value, "tracheotomy")}}/></div>
                                    </div>
                                </div>
                                <div className={style.rowStyle}>
                                康复科评估意见：<br/>
                                <TextArea rows={5}></TextArea>
                            </div>
                                <Descriptions column={2} bordered className={style.descriptions}>
                                    <Descriptions.Item label="护理人员签字"></Descriptions.Item>
                                    <Descriptions.Item label="日期"></Descriptions.Item>
                                </Descriptions>
                                <div className={style.rowStyle}>
                                    医疗机构意见：<br/>
                                    <TextArea rows={5}></TextArea>
                                </div>
                                <Descriptions column={2} bordered className={style.descriptions}>
                                    <Descriptions.Item label="医疗机构签字"></Descriptions.Item>
                                    <Descriptions.Item label="日期"></Descriptions.Item>
                                </Descriptions>
                                <div className={style.rowStyle}>
                                    社保中心人员意见：<br/>
                                    <TextArea rows={5}></TextArea>
                                </div>
                                <Descriptions column={2} bordered className={style.descriptions}>
                                    <Descriptions.Item label="社保中心签字"></Descriptions.Item>
                                    <Descriptions.Item label="日期"></Descriptions.Item>
                                </Descriptions>
                            </div>

                            <div name="tab2" className={(tabValue == "2" || !this.state.isHideTabs) ? '' : style.hidden}
                                 style={{"pageBreakAfter": "always"}}>
                                <Descriptions title="Berg平衡量表" column={2} bordered className={style.descriptions}>
                                    <Descriptions.Item label="姓名">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                {getFieldDecorator('personName', {
                                                    initialValue: record.personName,...myStatic.rulesConfig
                                                })(
                                                    <AutoComplete
                                                        className="global-search"
                                                        style={{ width: '100%' }}
                                                        dataSource={personUserList.map(renderOption)}
                                                        onSearch={_.debounce((e)=>{this.handleAutoSearch(e)}, 1000)}
                                                        onChange={(e)=>{this.handleChange(e,"personName")}}
                                                        placeholder="请输入"
                                                        optionLabelProp="value"
                                                    >
                                                    </AutoComplete>
                                                )}
                                            </Form.Item>
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="性别">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('sex', {
                                                initialValue: (record.sex && record.sex=="女") ? "1":"0",...myStatic.rulesConfig
                                            })(
                                                <Select onChange={(event)=> {this.handleChange(event, "sex")}}>
                                                    <Select.Option value="0">男</Select.Option>
                                                    <Select.Option value="1">女</Select.Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="年龄">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('age', {
                                                initialValue: record.age,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "age")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="证件号码">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('identityCard', {
                                                initialValue: record.identityCard,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "identityCard")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="床号">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('bedNumber', {
                                                initialValue: record.bedNumber,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "bedNumber")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="住院号">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('inHospNumber', {
                                                initialValue: record.inHospNumber,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "inHospNumber")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="发病日期">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('fbrq', {
                                                initialValue: record.fbrq, rules: [{required: true,  message: '请输入'}]
                                            })(
                                                <DatePicker  format={myStatic.dateFormat}
                                                             onChange={(date, dateString)=>{this.handleChange(dateString, "fbrq")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="入院日期">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('inHospDate', {
                                                initialValue: record.inHospDate, rules: [{required: true,  message: '请输入'}]
                                            })(
                                                <DatePicker  format={myStatic.dateFormat}
                                                             onChange={(date, dateString)=>{this.handleChange(dateString, "inHospDate")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="临床诊断" span={2}>
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('clinicalDiagnose', {
                                                initialValue: record.clinicalDiagnose,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "clinicalDiagnose")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                </Descriptions>
                                <Descriptions column={2} bordered className={`${style.descriptions} ${style.marginTopDiv}`}>
                                    <Descriptions.Item label="评定人员">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('evaPerson', {
                                                initialValue: record.evaPerson,...myStatic.rulesConfig
                                            })(
                                                <Input
                                                    placeholder="请输入"
                                                    onChange={(event)=> {this.handleChange(event.target.value, "evaPerson")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="评定日期">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            {getFieldDecorator('evaDate', {
                                                initialValue: record.evaDate, rules: [{required: true,  message: '请输入'}]
                                            })(
                                                <DatePicker  format={myStatic.dateFormat}
                                                             onChange={(date, dateString)=>  {this.handleChange(dateString, "evaDate")}}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                </Descriptions>
                                <div className={style.propThreeList}>
                                    <header><title>检查序号</title><title>检查内容</title><title>得分(0-4)</title></header>
                                    <CheckScore data={myStatic.checkTitle} score={myStatic.checkScore}
                                                onChange={this.handleChange}></CheckScore>
                                    <div className={style.sumScore}>
                                        <span>总分</span>
                                        <div>
                                            {/*<Input readOnly/>*/}
                                            {sumScore}
                                        </div>
                                    </div>
                                    <footer><title>备注</title>
                                        <div>
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                {getFieldDecorator('remake', {
                                                    initialValue: record.remake,...myStatic.rulesConfig
                                                })(
                                                    <Input
                                                        placeholder="请输入"
                                                        onChange={(event)=> {this.handleChange(event.target.value, "remake")}}/>
                                                )}
                                            </Form.Item>
                                        </div>
                                    </footer>
                                </div>
                                <div className={style.tableStyle}>
                                    <header><span className={style.heightText}>出院小结</span>（入院评估无需增加出院小结）</header>
                                    <Upload {...curUtil.uploader(this,"uploadBergFiles",_uploadBergFiles) } >
                                        <Button>
                                            <Icon type="upload"/>上传附件
                                        </Button>
                                    </Upload>
                                    <Table columns={columnsaApplicationForAdmission(this)}
                                           dataSource={uploadBergFiles} pagination={false}/>
                                </div>
                            </div>
                        </div>

                        <div className={style.buttons}>
                            <ReactToPrint trigger={() =>
                                <Button id="print-application" type="primary" className={style.hidden}>打印</Button>} content={() => this.refs}/>
                            <BasicGroupComponent {...this.button}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
DischargeAssessment = Form.create({ name: 'ApplicationForAdmission' })(DischargeAssessment);
export default ReduxWarpper(mapStateToProps, mapDispatchToProps, store, DischargeAssessment);