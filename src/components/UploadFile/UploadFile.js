import React,{Component,Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Upload, Button, Icon, Table} from 'antd';
import reqwest from 'reqwest';
import {message} from "antd/lib/index";
import jsonApi from "userCentre";
import {Global} from 'winning-megreziii-utils';

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
        };
    }
    render() {
        const { uploading } = this.state;
        let { successCallback,dataSource=[],columns,disabled,expandParams={}} =  this.props;
        //expandParams 扩展参数,需要上传的参数
        const props = {
            showUploadList:false,
            beforeUpload: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('fileName', file.name);
                // formData.append('uploadUser', _m.user.);
                Object.keys(expandParams).map(key=>{
                    formData.append(key, expandParams[key]);
                });
                this.setState({uploading: true});
                if(process.env.NODE_ENV == 'development'){
                    // Mock 数据
                    this.setState({uploading: false});
                    let count = Math.floor(Math.random() * (1000 - 1) + 1);
                    successCallback({
                        fileId:count,
                        fileName: file.name,
                        fileSize: (file.size / 1024) + "KB" ,
                        fileType: null,
                        fileUrl: "D:/download/",
                        hospTableId:null,
                        id:count,
                        uploadDate: "2020-02-22",
                        uploadUser: 'admin',
                    });
                    return false;
                }

                // You can use any AJAX library you like
                // url ='https://www.mocky.io/v2/5cc8019d300000980a055e76'// mock上传地址需要使用此地址
                reqwest({
                    url: jsonApi.api.file_upload,
                    method: 'post',
                    processData: false,
                    data: formData,
                    cache: false,//上传文件无需缓存
                    dataType: 'json', //返回值类型，一般设置为json、application/json
                    contentType: false, //必须
                    success: (result) => {
                        //message.success(`${file.name} 文件上传成功！`);
                        this.setState({uploading: false});
                        Global.alert(result,{successFun:()=>{
                            successCallback(result.data);
                        }});
                    },
                    error: () => {
                        this.setState({uploading: false});
                        message.error(`${file.name} 文件上传失败！`);
                    }
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
    columns: PropTypes.object.isRequired
};
export default UploadFile;