const myStatic = {
    // 验证规则
    rulesConfig: {
        rules: [{required: true,  message: '请输入', whitespace: true}]
    },
    dateFormat : 'YYYY-MM-DD',
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
    // 对应数据字典中的 KFHL_JS 属性
    currentRole:{
        docter: "0",//医护人员
        medicalInstitution: "1",//医疗机构
        socialInsurance:'2',//社保中心
    }
}

export default myStatic