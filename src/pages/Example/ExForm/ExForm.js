import React, {Component} from 'react';
import {
    Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber,Button, Radio,
    Row, Col, Icon,
} from 'antd';
import {Scrollbar} from 'winning-megreziii-utils';

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
};

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

class ExForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormLayoutChange = this.handleFormLayoutChange.bind(this);
    }

    //滚动条
    componentDidMount(){
        new Scrollbar(this.refs.inside).show();
    }

    //普通表单
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(['username'], {force: true});
    }

    //三种布局方式
    handleFormLayoutChange (e){
        this.setState({ formLayout: e.target.value });
    }

    //表格上方的一般搜索框，mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <Form.Item label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [{
                                required: true,
                                message: 'Input something!',
                            }],
                        })(
                            <Input placeholder="placeholder" />
                        )}
                    </Form.Item>
                </Col>
            );
        }
        return children;
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayoutX = this.state.formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        } : null;
        const buttonItemLayoutX = this.state.formLayout === 'horizontal' ? {
            wrapperCol: { span: 14, offset: 4 },
        } : null;

        return (
            <div style={{"width": "100%","height":"100%", "padding": "30px"}} ref="inside">
                <span>普通表单</span>
                <div style={{"border": "1px solid black"}}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="Name">
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your name',
                                }],
                            })(
                                <Input placeholder="Please input your name"/>
                            )}
                        </Form.Item>
                        <Form.Item {...formTailLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>
                                Check
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <br/>
                <hr/>
                <br/>
                <span>校验样式</span>
                <div style={{"border": "1px solid black"}}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            label="Fail"
                            validateStatus="error"
                            help="Should be combination of numbers & alphabets"
                        >
                            <Input placeholder="unavailable choice" id="error"/>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Warning"
                            validateStatus="warning"
                        >
                            <Input placeholder="Warning" id="warning"/>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Validating"
                            hasFeedback
                            validateStatus="validating"
                            help="The information is being validated..."
                        >
                            <Input placeholder="I'm the content is being validated" id="validating"/>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Success"
                            hasFeedback
                            validateStatus="success"
                        >
                            <Input placeholder="I'm the content" id="success"/>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Warning"
                            hasFeedback
                            validateStatus="warning"
                        >
                            <Input placeholder="Warning" id="warning2"/>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Fail"
                            hasFeedback
                            validateStatus="error"
                            help="Should be combination of numbers & alphabets"
                        >
                            <Input placeholder="unavailable choice" id="error2"/>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Success"
                            hasFeedback
                            validateStatus="success"
                        >
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Warning"
                            hasFeedback
                            validateStatus="warning"
                        >
                            <TimePicker style={{width: '100%'}}/>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Error"
                            hasFeedback
                            validateStatus="error"
                        >
                            <Select defaultValue="1">
                                <Option value="1">Option 1</Option>
                                <Option value="2">Option 2</Option>
                                <Option value="3">Option 3</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Validating"
                            hasFeedback
                            validateStatus="validating"
                            help="The information is being validated..."
                        >
                            <Cascader defaultValue={['1']} options={[]}/>
                        </Form.Item>

                        <Form.Item
                            label="inline"
                            {...formItemLayout}
                            style={{marginBottom: 0}}
                        >
                            <Form.Item
                                validateStatus="error"
                                help="Please select the correct date"
                                style={{display: 'inline-block', width: 'calc(50% - 12px)'}}
                            >
                                <DatePicker/>
                            </Form.Item>
                            <span style={{display: 'inline-block', width: '24px', textAlign: 'center'}}>-</span>
                            <Form.Item style={{display: 'inline-block', width: 'calc(50% - 12px)'}}>
                                <DatePicker/>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Success"
                            hasFeedback
                            validateStatus="success"
                        >
                            <InputNumber style={{width: '100%'}}/>
                        </Form.Item>
                    </Form>
                </div>
                <br/>
                <hr/>
                <br/>
                <span>三种布局方式</span>
                <div style={{"border": "1px solid black"}}>
                    <Form layout={this.state.formLayout}>
                        <Form.Item
                            label="Form Layout"
                            {...formItemLayoutX}
                        >
                            <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                                <Radio.Button value="horizontal">Horizontal</Radio.Button>
                                <Radio.Button value="vertical">Vertical</Radio.Button>
                                <Radio.Button value="inline">Inline</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Field A"
                            {...formItemLayoutX}
                        >
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item
                            label="Field B"
                            {...formItemLayoutX}
                        >
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item {...buttonItemLayoutX}>
                            <Button type="primary">Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
                <span>表格上方的一般搜索框</span>
                <div style={{"border": "1px solid black","padding":"10px"}}>
                    <Form
                        className="ant-advanced-search-form"
                        onSubmit={this.handleSubmit}
                    >
                        <Row gutter={24}>{this.getFields()}</Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit">Search</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedExForm = Form.create({name: 'ExForm'})(ExForm);

export default WrappedExForm;