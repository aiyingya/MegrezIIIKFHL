import React from 'react';
import {Modal,Input,Form} from 'antd';
import curUtil from "../Util/index";

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [],
            record: this.props.record || {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    handleChange(nextTargetKeys, direction, moveKeys) {
        // 左边移动到右边
        this.props.userRole.setUserRoleList(nextTargetKeys)
    }
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        // 显示选中的项
        this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});
    }
    submit(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let record =this.state.record;
                this.props.submit({...record,...values,oldCode:record.code,oldName:record.name,term: "修改"});
            }
        });
    }
    render() {
        const record =  this.state.record;
        const title =  Object.keys(record).length > 0 ? '新增' : '编辑';
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={true}
                title={title}
                onOk={this.submit}
                onCancel={this.props.close}
                confirmLoading={this.props.loading}
                width = {550}
                /*footer={
                    <div>
                        <Button type="primary" onClick={()=>this.props.submit()} loading={this.props.state.btnRequestLoading}>保存</Button>
                        <Button type="secondary" onClick={()=>this.props.close()}>
                            取消
                        </Button>
                    </div>
                }*/
            >
                <Form>
                    <Form.Item {...curUtil.formItemLayout} label="类别代码">
                        {getFieldDecorator('typeCode', {
                            initialValue: record.typeCode,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" disabled={true}/>
                        )}
                    </Form.Item>
                    <Form.Item {...curUtil.formItemLayout} label="类别名称">
                        {getFieldDecorator('typeName', {
                            initialValue: record.typeName,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" disabled={true}/>
                        )}
                    </Form.Item>
                    <Form.Item {...curUtil.formItemLayout} label="代码值">
                        {getFieldDecorator('code', {
                            initialValue: record.code,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item {...curUtil.formItemLayout} label="代码名称">
                        {getFieldDecorator('name', {
                            initialValue: record.name,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

EditModal = Form.create({ name: 'DRGSDictFrom' })(EditModal);
export default EditModal;