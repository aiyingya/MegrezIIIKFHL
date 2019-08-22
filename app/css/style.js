import _content from "./router/Content.less";
import _header from "./router/Header.less";
import _sider from "./router/Sider.less";
import _siderFooter from "./router/SiderFooter.less";
import _siderHeader from "./router/SiderHeader.less";
import _iframe from "./router/Iframe.less";
import _excludeScrollbar from "./utils/exclude-Scrollbar.less";
import _breadcrumb from "./utils/Breadcrumb.less";
import _buttonGroup from "./utils/ButtonGroup.less";
import _form from "./utils/Form.less";
import _iconfont from "./iconfont/iconfont.less";
import _iconfontjs from './iconfont/font/iconfont';
// From表单页排版
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
};
// From表单页的按钮排版
const buttonItemLayout ={
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12,offset:5}
    }
}
module.exports={
    _content,
    _header,
    _sider,
    _siderFooter,
    _siderHeader,
    _iframe,
    _excludeScrollbar,
    _breadcrumb,
    _buttonGroup,
    _form,
    _iconfont,
    _iconfontjs,
    formItemLayout,
    buttonItemLayout
}