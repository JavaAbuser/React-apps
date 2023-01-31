import React from 'react';
import Button from '@material-ui/core/Button';

class OperatorButton extends React.Component {
    render() {
        const {
            operatorValue,
            onClick
        } = this.props;

        return (
            <Button variant="contained" color={"secondary"} onClick={onClick}>{operatorValue}</Button>
        );
    }
}

export default OperatorButton;