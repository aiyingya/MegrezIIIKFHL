import {message} from "antd/lib/index";
const uploader =(self,fileName,filesList=[])=>{
    return  {
        // showUploadList:false,
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            const date = info.file.lastModifiedDate;
            const curDate = date.getFullYear() + "/" + Number(date.getMonth() + 1) + "/" + date.getDate()
            console.log("文件名：" + info.file.name + " 文件大小：" + (info.file.size / 1024) + "KB" + " 上传时间:" + curDate);
            //uploadBergFiles
            const count = filesList.length + 1;

            self.setPageTempObj({fileName:filesList.push({
                    isTest:true,
                    key: count,
                    name: '',
                    size: '',
                    uploadTime: '',
                    uploadUser: '',
                })})
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
};

const currentDay = new Date();

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

export default {
    // 初始化编辑中机构列表的选中数据
    uploader,
    formItemLayout
}