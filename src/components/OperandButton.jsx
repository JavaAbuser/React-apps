import React from 'react';
import Button from '@material-ui/core/Button';

class OperandButton extends React.Component {
    render() {
        const {
            operandValue,
            onClick
        } = this.props;

        return (
            <Button variant="contained" size={"large"} color={"primary"} onClick={onClick}>{operandValue}</Button>
        );
    }
}

export default OperandButton;