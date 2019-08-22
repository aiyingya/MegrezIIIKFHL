import React from 'react';
export default ()=>{
    return [
        {
            title: '代码类别',
            dataIndex: 'typeCode',
            width:"280px",
            render:(text,record,index)=>(
                <div>{record.typeName}【{record.typeCode}】</div>
            )
        }
    ]
}