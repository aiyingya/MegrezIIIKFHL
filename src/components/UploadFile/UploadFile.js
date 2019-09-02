import React,{Component,Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Upload, Button, Icon, Table} from 'antd';
import reqwest from 'reqwest';
import {message} from "antd/lib/index";

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
        };
    }
    render() {
        const { uploading } = this.state;
        let { url,successCallback,dataSource,columns,disabled} =  this.props;
        const props = {
            showUploadList:false,
            beforeUpload: (file) => {
                let fileList =  [file];
                const formData = new FormData();
                fileList.forEach(file => {
                    formData.append('files[]', file);
                    formData.append('fileName[]', file.name);
                });
                this.setState({uploading: true,});
                // You can use any AJAX library you like
                reqwest({
                    url: url || 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                    method: 'post',
                    processData: false,
                    data: formData,
                    success: (date) => {
                        successCallback(file);
                        this.setState({uploading: false});
                        message.success(`${file.name} 文件上传成功！`);
                    },
                    error: () => {
                        this.setState({uploading: false});
                        message.error(`${file.name} 文件上传失败！`);
                    },
                });
                return false;
            }
        };
        return (
            <Fragment>
                <Upload {...props} disabled={disabled}>
                    {
                        disabled ?
                            <Button style={{cursor: 'not-allowed'}}>
                                <Icon type="upload"/>上传附件
                            </Button>:
                            <Button loading={uploading}>
                                {uploading ? '':<Icon type="upload" />} 上传附件
                            </Button>
                    }
                </Upload>

                <Table columns={columns}
                       rowKey={record => record.fileId}
                       dataSource={dataSource} pagination={false}/>
            </Fragment>
        );
    }
}

PropTypes.propTypes = {
    successCallback: PropTypes.string.isRequired,
    dataSource: PropTypes.string.isRequired,
    columnsaApplicationForAdmission: PropTypes.string.isRequired
};
export default UploadFile;