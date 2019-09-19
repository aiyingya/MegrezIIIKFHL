import React from 'react';
import Static from "@/components/KFHL/Utils/Static";
const myStatic = {
    defaultCheckedList: ['0', "1"],
    //诊断主要依据选择值
    outsideOptions: [
        {label: '偏瘫或截肢体肌力3级，或者肌力3级以上但', value: '0'},
        {label: '层高级脑功能障碍', value: '1'},
        {label: '吞咽功能障碍', value: '2'},
        {label: '言语功能障碍', value: '3'},
        {label: '大小便功能障碍', value: '4'}
    ],
    plainParentOptions: {label: '骨关节功能障碍', value: '5'},
    plainOptions: [
        {label: '层股骨颈骨折', value: '6'},
        {label: '股骨粗隆骨折', value: '7'},
        {label: '股骨干骨折', value: '8'},
        {label: '关节置换', value: '9'},
        {label: '腰间盘突出', value: '10'}
    ],
    // 得分选择值
    checkScore: [
        {text: "0", value: "0"},
        {text: "1", value: "1"},
        {text: "2", value: "2"},
        {text: "3", value: "3"},
    ],
    // 检查序号检查内容
    checkTitle: [
        {text: '从座位站起', name: 'czwzq'},
        {text: '无支持站立', name: 'wzczl'},
        {text: '无支持坐起', name: 'wzczq'},
        {text: '站立坐下', name: 'zlzx'},
        {text: '转移', name: 'zy'},
        {text: '闭目站立', name: 'bmzl'},
        {text: '双脚并拢站立', name: 'sjblzl'},
        {text: '上肢向前伸站立并向前移动', name: 'szxqszlbxqyd'},
        {text: '从地面拾起物品', name: 'cdmjqwp'},
        {text: '转身向后看', name: 'zsxhk'},
        {text: '转身360度', name: 'zs'},
        {text: '将一只脚放在台阶或凳子上', name: 'jyzjfztjhdzs'},
        {text: '两脚一前一后站立', name: 'ljyqyhzl'},
        {text: '单脚站立', name: 'djzl'},
    ], /**/
    //我是Tab页签
    radioType: {imIsTab: "0"},
    //据此考虑
    outHospResult: [
        {label: '出院', value: "0"},
        {label: '继续住院', value: "1"},
        {label: '结算并继续住院', value: "2"}
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
    // 对应数据字典中的 KFHL_TB 属性
    flowType:{
        inHosp: "0",// 入院评估
        outHosp: "1",// 出院评估
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


const getAuditAgreeTxt = (role,isInHosp=true)=>{
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
    return txt;
}

const getAuditRejectTxt = (role,isInHosp=true)=>{
    let currentRole = Static.currentRole;
    let txt= '';
    switch (role){
        case currentRole.medicalInstitution:
            txt =`${myStatic.auditReject.outHospMedicalInstitution[0]}=>${myStatic.auditReject.outHospMedicalInstitution[1]}`
            break;
        case currentRole.socialInsurance:
            txt =`${myStatic.auditReject.socialInsurance[0]}=>${myStatic.auditReject.socialInsurance[1]}`
            break;
        default:
            // 默认当做医生提交
            if(!isInHosp){
                // 出院
                txt =`${myStatic.auditReject.inHospMedicalInstitution[0]}=>${myStatic.auditReject.inHospMedicalInstitution[1]}`
            }else{
                txt =`${myStatic.auditReject.outHospMedicalInstitution[0]}=>${myStatic.auditReject.outHospMedicalInstitution[1]}`
            }
            break;
    }
    return txt;
}

export default {
    myStatic,
    // 获取提交文本
    getAuditAgreeTxt,
    // 获取驳回文本
    getAuditRejectTxt
}

