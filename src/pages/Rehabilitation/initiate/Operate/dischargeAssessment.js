// 入院申请
import React,{Component} from 'react';
import { Form, Input, Button, Divider,Select,TreeSelect,Upload,Icon } from 'antd';
import {Global,ReduxWarpper,BreadcrumbCustom,Scrollbar} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';

class ApplicationForAdmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [],
            record: this.props.record || {}
        }
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
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    handleChange(nextTargetKeys, direction, moveKeys) {
    }
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    }
    submit(){
    }
    render() {
        return (
            <div className={`winning-body`} ref={this.inside}>
                <div className='winning-content'>
                    <div className="">
                        <Upload {...this.uploader} >
                            <Button>
                                <Icon type="upload" /> 选择上传文件
                            </Button>
                        </Upload>
                    </div>
                    <div>sdf</div>
                </div>
            </div>
        );
    }
}

export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,ApplicationForAdmission);