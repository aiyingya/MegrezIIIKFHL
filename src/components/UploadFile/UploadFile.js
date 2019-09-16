import React,{Component,Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Upload, Button, Icon, Table} from 'antd';
import reqwest from 'reqwest';
import {message} from "antd/lib/index";
import {Global,Uc} from 'winning-megreziii-utils';
import jsonApi from "userCentre";
import api from "@/api/RehabilitationApi";
import {loadingEnd, search, setSearchObj} from "@/pages/Rehabilitation/initiate/Redux/Actions";

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
        let { successCallback,dataSource=[],columns,disabled} =  this.props;

        const props = {
            showUploadList:false,
            beforeUpload: (file) => {
                const formData = new FormData();
                let fileList =  [file];
                fileList.forEach(file => {
                    formData.append('files', file);
                    formData.append('fileName', file.name);
                });
                // formData.append('file', file);
                // formData.append('fileName', file.name);

                this.setState({uploading: true,});
                // You can use any AJAX library you like
                // url ='https://www.mocky.io/v2/5cc8019d300000980a055e76'// mock上传地址需要使用此地址
                reqwest({
                    url: jsonApi.api.UploadFile,
                    method: 'post',
                    processData: false,
                    data: formData,
                    cache: false,//上传文件无需缓存
                    dataType: 'json', //返回值类型，一般设置为json、application/json
                    contentType: false, //必须
                    success: (result) => {
                        console.log("上传成功返回：",result)
                        this.setState({uploading: false});
                        /*if(status.status == "done" ){
                            console.log("mock上传文件成功。")
                            let count = Math.floor(Math.random() * (1000 - 1) + 1);
                            let mockFile = {
                                fileName: file.name,
                                fileSize: (file.size / 1024) + "KB" ,
                                uploadDate: "2020-02-22",
                                uploadUser: 'admin',
                                fileId:count,
                            }
                            this.setState({uploading: false});
                            successCallback({...mockFile});
                            message.success(`${file.name} 文件上传成功！`);
                        }*/
                        // Global.alert(result,{successFun:()=>{
                        //         successCallback(result.data);
                        //         this.setState({uploading: false});
                        //         // message.success(`${file.name} 文件上传成功！`);
                        // }});
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