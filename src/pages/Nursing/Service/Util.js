import React from 'react';
import {message} from "antd/lib/index";
import {Global} from 'winning-megreziii-utils';
import Static from "@components/KFHL/Utils/Static";

const myStatic = {
    radios:{
        // 意识
        ys: [
            {label: '清楚', value: '0'},
            {label: '模糊', value: '1'},
            {label: '嗜睡', value: '2'},
            {label: '烦躁', value: '3'},
            {label: '昏迷', value: '4'}
        ],
        // 表情
        bq: [
            {label: '正常', value: '0'},
            {label: '冷漠', value: '1'},
            {label: '痛苦', value: '2'}
        ],
        jyl: [
            {label: '良好', value: '0'},
            {label: '减退', value: '1'}
        ],
        ljnl: [
            {label: '完全理解', value: '0'},
            {label: '部分理解', value: '1'},
            {label: '无法理解', value: '2'},
        ],
        sl: [
            {label: '良好', value: '0'},
            {label: '模糊', value: '1'},
        ],
        tl: [
            {label: '正常', value: '0'},
            {label: '减退', value: '1'},
            {label: '严重减退', value: '2'},
        ],
        bdnl: [
            {label: '清晰表达', value: '0'},
            {label: '含糊表达', value: '1'},
            {label: '不能表达', value: '2'},
        ],
        qx: [
            {label: '低落', value: '0'},
            {label: '正常', value: '1'},
            {label: '亢奋', value: '2'},
        ],
        xwzz: [
            {label: '游荡', value: '0'},
            {label: '言语粗鲁', value: '1'},
            {label: '行为粗鲁', value: '2'},
            {label: '破坏性行为', value: '3'},
            {label: '多疑', value: '4'}
        ],
        sm: [
            {label: '正常', value: '0'},
            {label: '入睡困难', value: '1'},
            {label: '早睡', value: '2'},
            {label: '药物辅助睡眠', value: '3'},
        ],
        db: [
            {label: '正常', value: '0'},
            {label: '便秘', value: '1'},
            {label: '腹泻', value: '2'},
            {label: '失禁', value: '3'},
        ],
        xb: [
            {label: '尿频', value: '0'},
            {label: '尿急', value: '1'},
            {label: '尿痛', value: '2'},
            {label: '尿中断', value: '3'},
        ],
        sy: [
            {label: '正常', value: '0'},
            {label: '入睡困难', value: '1'},
            {label: '早睡', value: '2'},
            {label: '药物辅助睡眠', value: '3'},
        ],
        cy: [
            {label: '可独立完成', value: '0'},
            {label: '需要部分帮助', value: '1'},
            {label: '需极大帮助或完全依赖他人', value: '2'},
        ],
        xs: [
            {label: '可独立完成', value: '0'},
            {label: '需要他人帮助', value: '1'}
        ],
        jjkn: [
            {label: '有', value: '0'},
            {label: '无', value: '1'},
        ],
        tykn: [
            {label: '有', value: '0'},
            {label: '无', value: '1'},
        ],
        zznl: [
            {label: '全部自理', value: '0'},
            {label: '协助', value: '1'},
            {label: '尿痛', value: '2'},
            {label: '尿中断', value: '3'},
        ],
        hdnl: [
            {label: '自行下床活动', value: '0'},
            {label: '坐椅子', value: '1'},
            {label: '卧床自行翻身', value: '2'},
            {label: '辅助翻身', value: '3'},
        ],
        jl: [
            {label: '0级', value: '0'},
            {label: 'I级', value: '1'},
            {label: 'II级', value: '2'},
            {label: 'III级', value: '3'},
            {label: 'IV级', value: '4'},
            {label: 'V级', value: '5'},
        ],
        qsyyzk: [
            {label: '良好', value: '0'},
            {label: '中等', value: '1'},
            {label: '不良', value: '2'},
            {label: '肥胖', value: '3'},
            {label: '消瘦', value: '4'},
            {label: '恶病质', value: '5'},
        ],
        pfnm: [
            {label: '正常', value: '0'},
            {label: '黄染', value: '1'},
            {label: '紫绀水肿', value: '2'},
            {label: '潮红', value: '3'},
        ],
        kq: [
            {label: '正常', value: '0'},
            {label: '溃疡', value: '1'},
            {label: '假膜', value: '2'},
        ],
        xs: [
            {label: '正常', value: '0'},
            {label: '左偏', value: '1'},
            {label: '右偏', value: '2'},
        ],
        bcg: [
            {label: '正常', value: '0'},
            {label: '左变浅', value: '1'},
            {label: '右变浅', value: '2'},
        ],
        yy: [
            {label: '正常', value: '0'},
            {label: '红肿', value: '1'},
            {label: '出血', value: '2'},
            {label: '溃疡', value: '3'},
        ],
        y: [
            {label: '义齿', value: '0'},
            {label: '缺齿', value: '1'},
        ],
        dglx: [
            {label: '无', value: '0'},
            {label: '胃管', value: '1'},
            {label: '器官', value: '2'},
            {label: '鼻导管', value: '3'},
            {label: '导尿管', value: '4'},
        ],
        dgqk: [
            {label: '畅通', value: '0'},
            {label: '不畅通', value: '1'},
        ],
        rc: [
            {label: '无', value: '0'}
        ],
        lyqjzdz: [
            {label: '医院', value: '0'},
            {label: '家庭', value: '1'},
            {label: '老年公寓', value: '2'},
            {label: '护理院', value: '3'},
            {label: '其他', value: '4'},
        ],
        bcrymd: [
            {label: '医疗护理', value: '0'},
            {label: '出院后康复护理', value: '1'},
            {label: '临终关怀', value: '2'},
        ],
        clyj: [
            {label: '暂不收治入院治疗', value: '0'},
            {label: '收治本院', value: '1'},
            {label: '建议转送上级护理院或医院治疗', value: '2'},
        ],
    },
    //上传文件默认值
    defaultUploadInfo: [{
        isTest:true,
        fileId:'1',
        fileUrl:'',
        fileSize: '',
        fileName: '',
        uploadDate: '',
        uploadUser: '',
    }],
    //据此考虑
    outHospResult: [
        {label: '出院', value: '0'},
        {label: '今日出院', value: '1'},
        {label: '继续住院治疗', value: '2'},
        {label: '结算并继续住院治疗', value: '3'},
        {label: '转院', value: '4'}
    ],
    dieResult:[
        {label: '是', value: '0'},
        {label: '否', value: '1'},
    ],
    yysw:[
        {label: '出院小结', value: '0'},
        {label: '死亡记录', value: '1'},
    ],
    //审核驳回
    auditReject:{
        // 入院医疗机构驳回
        inHospMedicalInstitution:['医疗机构审核','入院评估'],
        // 出院医疗机构驳回
        outHospMedicalInstitution:['医疗机构审核','出院评估'],
        // 社保驳回
        socialInsurance:['社保中心审核','医疗机构审核']
    },
    //审核提交
    auditAgree:{
        // 入院医护人员提交
        inHospDocter:['入院评估','医疗机构审核'],
        // 出院医护人员提交
        outHospDocter:['出院评估','医疗机构审核'],
        // 医疗机构提交
        medicalInstitution:['医疗机构审核','社保中心审核'],
        // 社保中心提交
        socialInsurance:['社保中心审核','归档'],
    },
    //0=入院评估，1=出院评估，2 = 阶段性评估
    flowType:{
        AdmissionAssessment:"0",
        DischargeAssessment:"1",
        StageAssessment:"2",
    },
    // 填报状态：对应数据字典中的 KFHL_TAB_S 属性
    tableStatus:{
        completed:"0", //已填
        notFilledIn:"1" //未填
    },
    type:{
        inHosp:"0", // 入院
        outHosp:"1" // 出院
    },
    // 查看Tab页的页码
    lookTab:{
        inhospApplication:"0", // 入院申请
        inHospAssess:"1", // 入院评估
        inHospBerg:"2", // 入院berg
        outHospAssess:"1", // 出院评估
        outHospBerg:"2" // 出院berg
    }
}

const currentDay = ()=>{
    const date = new Date();
    let month = (date.getMonth()+1);
    month = month >= 10 ? month: '0'+month;
    let day =date.getDate();
    day = day >= 10 ? day: '0'+day;
    return date.getFullYear()+"-"+month+"-"+day;
}

const uploader =(self,{method})=>{
    return  {
        showUploadList:false,
        name: 'file',
        // action: api.file_upload,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload(file, fileList){ Global.showLoading();},
        onChange({file,fileList,event}) {
            let user =  Global.localStorage.get(Global.localStorage.key.userInfo) ||{};
            const date = file.lastModifiedDate;
            const curDate = date.getFullYear() + "/" + Number(date.getMonth() + 1) + "/" + date.getDate();
            if (file.status !== 'uploading') {
                // console.log("文件名：" + file.name + " 文件大小：" + (file.size / 1024) + "KB" + " 上传时间:" + curDate,file, fileList);
            }
            if (file.status === 'done') {
                Global.hideLoading();
                message.success(`${file.name} 文件上传成功！`);

                let count = Math.floor(Math.random() * (1000 - 1) + 1);
                method(self,{
                    fileName: file.name,
                    size: (file.size / 1024) + "KB" ,
                    uploadDate: curDate,
                    uploadUser: user.yh_mc || 'admin',
                    fileId:count,
                    fileUrl:'https://github.com/vuejs/vuepress/archive/master.zip'
                })

            } else if (file.status === 'error') {
                Global.hideLoading();
                message.error(`${file.name} 文件上传失败！`);
            }
        }
    }
};

const getAuditAgreeTxt = (role,isInHosp = true)=>{
    let currentRole = Static.currentRole;
    let txt= '';
    switch (role){
        case currentRole.medicalInstitution:
            txt =`【${myStatic.auditAgree.medicalInstitution[0]}】已完成，确认要发送到下一步【${myStatic.auditAgree.medicalInstitution[1]}】`
            break;
        case currentRole.socialInsurance:
            txt =`【${myStatic.auditAgree.socialInsurance[0]}】已完成，确认要发送到下一步【${myStatic.auditAgree.socialInsurance[1]}】`
            break;
        default:
            // 默认当做医生提交
            if(!isInHosp){
                // 出院
                txt =`【${myStatic.auditAgree.inHospDocter[0]}】已完成，确认要发送到下一步【${myStatic.auditAgree.inHospDocter[1]}】`
            }else{
                txt =`【${myStatic.auditAgree.outHospDocter[0]}】已完成，确认要发送到下一步【${myStatic.auditAgree.outHospDocter[1]}】`
            }
            break;

    }
}
export default {
    myStatic,
    // 初始化编辑中机构列表的选中数据
    currentDay,
    // 初始化编辑中机构列表的选中数据
    uploader,
    //获取提交文本
    getAuditAgreeTxt
}