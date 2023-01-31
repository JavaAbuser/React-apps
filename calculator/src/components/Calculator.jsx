import React from 'react';
import OperandButton from "./OperandButton";
import OperatorButton from "./OperatorButton";
import {withStyles} from '@material-ui/core/styles';
import {styled, TextField} from "@material-ui/core";

const styles = () => (
    {
        Buttons: {
            backgroundColor: '#94CDFF',
            width: '15%',
            height: '100%',
            borderRadius: '15px 15px 15px 15px',
            textAlign: 'center',
            verticalAlign: 'center',
            padding: '1px 20px 20px 20px'
        },
        Header: {
            fontFamily: 'Trebuchet MS',
            fontSize: '30px'
        }
    }
);

class Calculator extends React.Component {
    operators = ['+', '-', '*', "/"]

    num1;
    num2;
    operator;
    constructor(props) {
        super(props);
        this.state = {
            input: 0
        };
    }

    enterNumber(number) {
        const input = this.state.input

        if (input === 0 && input.toString().length <= 1) {
            this.setState({
                input: number
            })
        } else {
            this.setState({
                input:
                    input.toString() + number
            })
        }
    }

    deleteLastNumber() {
        const input = this.state.input;
        const inputLength = this.state.input.length;

        if (inputLength === 1 || input === 0) {
            this.setState({
                input: 0
            })
        } else {
            this.setState({
                input:
                    input.toString().slice(0, inputLength - 1)
            })
        }
    }

    setEmptyInput() {
        this.setState({input: 0})
    }

    enterOperator(operator) {
        let prevInput = this.state.input;
        const lastSymbol = prevInput.toString().slice(-1);

        if(this.operators.includes(lastSymbol)){
            this.setState({
                input: this.state.input.toString().replace(lastSymbol, operator)
            })
        } else {
            this.setState({
                input: this.state.input.toString() + operator})
        }

        this.num1 = (this.num1) ? 0 : prevInput;
        console.log(this.num1)
    }

    calculate(num1, num2, operator){

    }


    render() {
        const {
            classes
        } = this.props;

        return (
            <div className="Calculator">
                <div className={classes.Buttons}>
                    <h1 className={classes.Header}>Calculator</h1>
                    <OperandButton operandValue={0} onClick={() => this.enterNumber(0)}/>
                    <OperandButton operandValue={1} onClick={() => this.enterNumber(1)}/>
                    <OperandButton operandValue={2} onClick={() => this.enterNumber(2)}/>
                    <OperandButton operandValue={3} onClick={() => this.enterNumber(3)}/>
                    <br/>
                    <OperandButton operandValue={4} onClick={() => this.enterNumber(4)}/>
                    <OperandButton operandValue={5} onClick={() => this.enterNumber(5)}/>
                    <OperandButton operandValue={6} onClick={() => this.enterNumber(6)}/>
                    <OperandButton operandValue={7} onClick={() => this.enterNumber(7)}/>
                    <br/>
                    <OperandButton operandValue={8} onClick={() => this.enterNumber(8)}/>
                    <OperandButton operandValue={9} onClick={() => this.enterNumber(9)}/>

                    <OperatorButton operatorValue={'AC'} onClick={() => this.deleteLastNumber()}/>
                    <OperatorButton operatorValue={'C'} onClick={() => this.setEmptyInput()}/>
                    <br/>
                    <OperatorButton operatorValue='+' onClick={() => this.enterOperator('+')}/>
                    <OperatorButton operatorValue='-' onClick={() => this.enterOperator('-')}/>
                    <OperatorButton operatorValue='*' onClick={() => this.enterOperator('*')}/>
                    <OperatorButton operatorValue='/' onClick={() => this.enterOperator('/')}/>
                    <br/>
                    <br/>
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        defaultValue={0}
                        value={this.state.input}
                        size='medium'
                    />
                </div>
                <h1>{this.state.input}</h1>
            </div>
        );
    }
}

export default withStyles(styles)(Calculator);