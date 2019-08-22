// 入院申请
import React,{Component} from 'react';
import { Upload , Input, Button, Divider,Icon  ,Checkbox ,Radio,Descriptions ,Table} from 'antd';
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
// import ReactToPrint from 'react-to-print'
import {Global,ReduxWarpper,BasicGroupComponent,Scrollbar} from 'winning-megreziii-utils';
import Step from '@components/Step/Step';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import style from '../common.less'
import columnsaApplicationForAdmission from '../columnsaApplicationForAdmission'

const defaultCheckedList = [];
// const plainOptions = ['层股骨颈骨折', '股骨粗隆骨折', '股骨干骨折', '关节置换', '腰间盘突出'];
// const outsideOptions = ['偏瘫或截肢体肌力3级，或者肌力3级以上但', '层高级脑功能障碍', '吞咽功能障碍', '言语功能障碍', '大小便功能障碍'];

const outsideOptions = [
    { label: '偏瘫或截肢体肌力3级，或者肌力3级以上但', value: '0' },
    { label: '层高级脑功能障碍', value: '1' },
    { label: '吞咽功能障碍', value: '2' },
    { label: '言语功能障碍', value: '3' },
    { label: '大小便功能障碍', value: '4' }
];
const plainParentOptions = { label: '骨关节功能障碍', value: '5' }
const plainOptions = [
    { label: '层股骨颈骨折', value: '6' },
    { label: '股骨粗隆骨折', value: '7' },
    { label: '股骨干骨折', value: '8' },
    { label: '关节置换', value: '9' },
    { label: '腰间盘突出', value: '10' }
];
const initUploadDate ={
    key: '1',
    name: '2',
    size: '3',
    uploadTime: '2015-5-5',
    uploadUser: '小',
}

class ApplicationForAdmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedOutsideList: defaultCheckedList,
            checkedList: defaultCheckedList,
            indeterminate: false,
            checkAll: false,
            uploadData:[initUploadDate]
        }
        this.inside = React.createRef();
        this.uploader={
            // showUploadList:false,
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                const date = info.file.lastModifiedDate;
                const curDate = date.getFullYear() +"/"+ Number(date.getMonth()+1) +"/"+date.getDate()
                console.log("文件名："+info.file.name+" 文件大小："+(info.file.size/1024)+"KB"+" 上传时间:"+curDate)
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        }
        this.button ={
            direction : Global.Direction.DOWN,
            datas:[
                {
                    type : 'primary',
                    className: Global.BottomCss.ADD,
                    text:'打印',
                    onClick:(e)=>{
                        this.goEditApplicationForAdmission();
                    }
                },
                {
                    type : 'primary',
                    className: Global.BottomCss.REMOVE,
                    text:'康复出院评估',
                    onClick:(e)=>{
                        this.handleRemove(this.state.selectedRows);
                    }
                }
            ]
        }
        this.handleChange = this.handleChange.bind(this)
        this.onRadioChange = this.onRadioChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.submit = this.submit.bind(this);
        this.onCheckboxGroupChange = this.onCheckboxGroupChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
    }
    componentDidMount(){
        new Scrollbar(this.inside.current).show()
    }
    handleChange(nextTargetKeys, direction, moveKeys) {
    }
    onRadioChange(nextTargetKeys, direction, moveKeys) {
    }
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    }
    onCheckboxGroupChange(checkedList){
        // 骨关节功能障碍 子选
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    };
    onCheckAllChange(e){
        // 骨关节功能障碍 全选
        this.setState({
            checkedList: e.target.checked ? plainOptions.map(res=>res.value) : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    onCheckChange(checkedValues) {
        // 选择其他障碍
        console.log('checked = ', checkedValues);
        this.setState({
            checkedOutsideList: checkedValues,
        });
    }

    submit(){
    }
    render() {
        return (
            <div className={`winning-body`} ref={this.inside}>
                <div className='winning-content'>
                    <Step></Step>

                    <Divider />

                    <Radio.Group className={style.raioTab} defaultValue="a" onChange={this.onRadioChange}>
                        <Radio.Button value="a">康复入院申请</Radio.Button>
                        <Radio.Button value="b">康复入院评估</Radio.Button>
                        <Radio.Button value="c">Berg平衡量表</Radio.Button>
                    </Radio.Group>

                    <div className={style.tabContent}>
                        <Descriptions className={style.descriptions} title="无锡市康复医院2019年05月张三康复入" column={2} bordered>
                            <Descriptions.Item label="姓名" >Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="性别" >Prepaid</Descriptions.Item>
                            <Descriptions.Item label="年龄">Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="诊断科室">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="疾病名称">Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="个人编号">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="身份证号">Prepaid</Descriptions.Item>
                            <Descriptions.Item ></Descriptions.Item>
                        </Descriptions>

                        <div className={style.rowStyle}>
                            诊断主要依据：<br />
                            <CheckboxGroup
                                className={style.checkboxFlex}
                                options={outsideOptions}
                                value={this.state.checkedOutsideList}
                                onChange={this.onCheckChange}
                            />
                            <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                                value="5"
                            >
                                {plainParentOptions.label}
                            </Checkbox>
                            <br />
                            <CheckboxGroup
                                className={style.checkboxChild}
                                options={plainOptions}
                                value={this.state.checkedList}
                                onChange={this.onCheckboxGroupChange}
                            />
                        </div>
                        <div className={style.rowStyle}>
                            临床表现：<br />
                            <TextArea placeholder="患者表现正常" rows={4}></TextArea>
                        </div>
                        <div className={style.rowStyle}>
                            体格检查（专科检查）：<br />
                            <TextArea placeholder="患者表现正常" rows={4}></TextArea>
                        </div>
                        <div className={style.rowStyle}>
                            实验室检查：<br />
                            <TextArea placeholder="患者表现正常" rows={4}></TextArea>
                        </div>

                        <Descriptions column={2} bordered className={style.descriptions}>
                            <Descriptions.Item label="康复科主任签字"></Descriptions.Item>
                            <Descriptions.Item label="日期" ></Descriptions.Item>
                        </Descriptions>
                        <div className={style.rowStyle}>
                            医疗机构意见：<br />
                            <TextArea rows={4}></TextArea>
                        </div>
                        <Descriptions column={2} bordered className={style.descriptions}>
                            <Descriptions.Item label="医疗机构签字"></Descriptions.Item>
                            <Descriptions.Item label="日期" ></Descriptions.Item>
                        </Descriptions>
                        <div className={style.rowStyle}>
                            社保中心人员意见：<br />
                            <TextArea rows={4}></TextArea>
                        </div>
                        <Descriptions column={2} bordered className={style.descriptions}>
                            <Descriptions.Item label="签字"></Descriptions.Item>
                            <Descriptions.Item label="日期" ></Descriptions.Item>
                        </Descriptions>
                        <div className={style.rowStyle}>
                            注：<br />
                            <TextArea className ={style.noneBorder} placeholder="一、需要康复的病种：这里一大段文本" rows={6}></TextArea>
                        </div>
                        <div className={style.tableStyle}>
                            <title>上级医院病历</title>
                            <Upload {...this.uploader} >
                                <Button>
                                    <Icon type="upload" />上传附件
                                </Button>
                            </Upload>
                            <Table columns={columnsaApplicationForAdmission(this)} dataSource={this.state.uploadData}  pagination={ false }/>
                        </div>
                    </div>

                    <div className={style.buttons} ref={(el)=>{this.refs =el}}>
                        {/*<ReactToPrint trigger ={()=><a href="#" ><Button type="primary"></Button>打印</a>}*/}
                        {/*content={()=>this.refs}*/}
                        {/*/>*/}
                    <BasicGroupComponent {...this.button}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,ApplicationForAdmission);