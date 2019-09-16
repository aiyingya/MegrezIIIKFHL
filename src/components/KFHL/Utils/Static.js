const myStatic = {
    // 验证规则
    rulesConfig: {
        required:{
            rules: [{required: true,  message: '请输入', whitespace: true}],
        },
        identityCard: {
            rules:[{required: true, pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证'}]
        },
        age: {
            rules: [{required: true, pattern:/(^(?:[1-9]?\d|256)$)/, message: '请输入正确的年龄'}]
        },
        telephone:{
            rules: [{
                pattern:/((\d{2,5}-)?\d{7,8}(-\d{1,})?)|(^\d{11}$)/,
                message: '请输入正确的电话号码',
            }],
        }
    },
    dateFormat : 'YYYY-MM-DD',
    // 对应数据字典中的 KFHL_JS 属性
    currentRole:{
        docter: "0",//医护人员
        medicalInstitution: "1",//医疗机构
        socialInsurance:'2',//社保中心
    },
    // 对应数据字典中的 KFHL_ST 属性 状态
    flowStatus:{
        agree: "0",//通过
        reject: "1",//不通过
        awaitAudit:'2',//待审核
        awaitSubmit:'3'//待提交
    },
    //上传文件默认值
    defaultUploadInfo: [{
        isTest:true,
        fileId:'1',
        fileUrl:'',
        fileName: '',
        size: '',
        uploadDate: '',
        uploadUser: '',
    }],
    myEnum:{
        sex:{
            man: "0",//男
            woman: "1",//女
        },
        hyzk:{
            yes: "0",//是
            no: "1",//否
        }
    },
    myDict:{
        sex: [
            {
                "name": "男",
                "value": "0"
            },
            {
                "name": "女",
                "value": "1"
            }
        ],
        hyzk: [
            {
                "name": "未婚",
                "value": "1"
            },
            {
                "name": "已婚",
                "value": "0"
            }
        ],
        gx: [
            {
                "name": "父子",
                "value": "0"
            },
            {
                "name": "父女",
                "value": "1"
            },
            {
                "name": "母子 ",
                "value": "2"
            },
            {
                "name": "母女",
                "value": "3"
            },{
                "name": "夫妻 ",
                "value": "4"
            },
            {
                "name": "兄妹",
                "value": "5"
            }
        ],
    }

}

export default myStatic