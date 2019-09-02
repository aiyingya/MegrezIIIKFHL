import React,{Component,Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Upload, Button, Icon, Table} from 'antd';
class UploadFile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {config,dataSource,columns,disabled} =  this.props;
        return (
            <Fragment>
                <Upload {...config} disabled={disabled}>
                    {
                        disabled ?
                            <Button style={{cursor: 'not-allowed'}}>
                                <Icon type="upload"/>上传附件
                            </Button>:
                            <Button >
                                <Icon type="upload"/>上传附件
                            </Button>
                    }
                </Upload>
                <Table columns={columns}
                       dataSource={dataSource} pagination={false}/>
            </Fragment>
        );
    }
}

PropTypes.propTypes = {
    config: PropTypes.bool.isRequired,
    dataSource: PropTypes.bool.isRequired,
    columnsaApplicationForAdmission: PropTypes.bool.isRequired
};
export default UploadFile;