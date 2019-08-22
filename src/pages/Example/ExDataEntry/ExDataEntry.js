import React, {Component} from 'react';
import moment from 'moment';
import {
    Input,
    Icon,
    Checkbox,
    Radio,
    DatePicker,
    TimePicker,
    Select,
    Cascader,
    InputNumber,
    Switch,
    TreeSelect,
    Upload,
    Button
} from 'antd';
import {Scrollbar} from 'winning-megreziii-utils';

//下拉联动数据
import CascaderOptions from './CascaderOptions'

//下拉树数据
import TreeData from './TreeData'

const TextArea = Input.TextArea;
const Password = Input.Password;
const Search = Input.Search;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

class ExDataEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            textArea: ''
        };
        this.emitEmpty = this.emitEmpty.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeTextArea = this.onChangeTextArea.bind(this);
    }

    componentDidMount() {
        new Scrollbar(this.refs.inside).show();
    }

    emitEmpty() {
        this.refs.userNameInput.focus();
        this.setState({userName: ''});
    }

    onChangeUserName(e) {
        this.setState({userName: e.target.value});
    }

    onChangeTextArea(e) {
        this.setState({textArea: e.target.value});
    }

    render() {
        //后缀input使用
        const suffix = this.state.userName ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
        //radio和checkbox
        const options = [
            {label: 'Apple', value: 'Apple'},
            {label: 'Pear', value: 'Pear'},
            {label: 'Orange', value: 'Orange', disabled: true},
        ];
        //下拉多选
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        //uploader
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange({file, fileList}) {
                if (file.status !== 'uploading') {
                    console.log(file, fileList);
                }
            },
            defaultFileList: [
                {
                    uid: '1',
                    name: 'xxx.png',
                    status: 'done',
                    response: 'Server Error 500', // custom error message to show
                    url: 'http://www.baidu.com/xxx.png',
                },
                {
                    uid: '2',
                    name: 'yyy.png',
                    status: 'done',
                    url: 'http://www.baidu.com/yyy.png',
                },
                {
                    uid: '3',
                    name: 'zzz.png',
                    status: 'error',
                    response: 'Server Error 500', // custom error message to show
                    url: 'http://www.baidu.com/zzz.png',
                }
            ],
        };
        return (
            <div style={{"width": "100%", "height": "100%", "padding": "50px"}} ref="inside">
                <Input size="large" placeholder="large size"/>
                <br/><br/>
                <Input placeholder="default size"/>
                <br/><br/>
                <Input size="small" placeholder="small size"/>

                <br/><br/>

                <Password placeholder="input password"/>

                <br/><br/>

                <Input placeholder="username"
                       suffix={suffix}
                       value={this.state.userName}
                       onChange={this.onChangeUserName}
                       ref="userNameInput"/>

                <br/><br/>

                <Input placeholder="disabled usage" disabled/>

                <br/><br/>

                <InputGroup compact>
                    <Select defaultValue="Zhejiang">
                        <Option value="Zhejiang">Zhejiang</Option>
                        <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                    <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
                </InputGroup>

                <br/><br/>

                <Search placeholder="input search text"/>

                <br/><br/>

                <span className={'ant-input-affix-wrapper'}>
                    <TextArea placeholder="Autosize height based on content lines"
                              autosize={{minRows: 4, maxRows: 8}}
                              value={this.state.textArea}
                              onChange={this.onChangeTextArea} ref="textArea"/>
                    <span className={"ant-input-suffix"}>{this.state.textArea.length}/300</span>
                 </span>

                <br/><br/>

                <CheckboxGroup options={options} defaultValue={['Pear']}/>

                <br/><br/>

                <RadioGroup options={options}/>

                <br/><br/>

                <DatePicker/>
                <br/><br/>
                <MonthPicker/>
                <br/><br/>
                <RangePicker/>
                <br/><br/>
                <WeekPicker/>
                <br/><br/>
                <DatePicker defaultValue={moment('2015-06-06', 'YYYY-MM-DD')} disabled/>
                <br/><br/>
                <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
                <br/><br/>

                <Select defaultValue="lucy" style={{width: 120}}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>

                <br/><br/>

                <Select
                    mode="tags"
                    style={{width: '100%'}}
                    placeholder="Tags Mode"

                >
                    {children}
                </Select>

                <br/><br/>

                <Cascader style={{width: '100%'}} options={CascaderOptions} placeholder="Please select"/>

                <br/><br/>

                <InputNumber
                    defaultValue={1000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />

                <br/><br/>

                <Switch defaultChecked/>
                <br/>
                <Switch defaultChecked disabled/>
                <br/>
                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked/>
                <br/>
                <Switch checkedChildren="1" unCheckedChildren="0"/>
                <br/>
                <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="close"/>} defaultChecked/>

                <br/><br/>

                <TreeSelect
                    style={{width: 300}}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    treeData={TreeData}
                    placeholder="Please select"
                    treeDefaultExpandAll
                />

                <br/><br/>

                <Upload {...props}>
                    <Button>
                        <Icon type="upload"/> Click to Upload
                    </Button>
                </Upload>

            </div>
        );
    }
}

export default ExDataEntry;