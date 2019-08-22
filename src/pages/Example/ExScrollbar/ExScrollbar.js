import React, {Component} from 'react';
import styles from './ExScrollbar.less';
import {Scrollbar} from 'winning-megreziii-utils';

class ExScrollbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        new Scrollbar(this.refs.a).show();
    }
    render() {
        return (
            <div className={styles.out} ref="a">
                <div className={styles.inside}>

                </div>
            </div>
        );
    }
}

export default ExScrollbar;