import React from 'react';
import OperandButton from "../../../components/OperandButton";
import OperatorButton from "../../../components/OperatorButton";
import {List, ListItem, ListItemText, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import actionExercises from "../actions/exercises";
import {connect} from "react-redux";
import {parseInput} from '../../../utils/math'
import {setValuesAndCalculate} from "../../../utils/math";
import {calculateExercises} from '../../../utils/math'

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
        },
        ButtonReceive: {
            marginTop: '5px'
        }
    }
);

class Calculator extends React.Component {
    operators = ['+', '-', '*', "/"]
    exerciseHistory = []
    resultHistory = []

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
        let input = this.state.input;
        let inputLength = input.length;

        if (inputLength === 1 || !inputLength) {
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

        if (this.operators.includes(lastSymbol)) {
            this.setState({
                input: this.state.input.toString().replace(lastSymbol, operator)
            })
        } else {
            this.setState({
                input: this.state.input.toString() + operator
            })
        }
        if (operator === '=') {
            let parsedInput = parseInput(prevInput)
            let result = setValuesAndCalculate(parsedInput)
            this.saveToHistory(parsedInput[1], parsedInput[3], parsedInput[2], result)

            this.setState({
                input: result
            })
        }
    }

    calculateExercises(exercises){
        exercises.forEach((exercise) => {
            let parsedInput = parseInput(exercise)
            let result = setValuesAndCalculate(parsedInput)
            this.saveToHistory(parsedInput[1], parsedInput[3], parsedInput[2], result)

            this.setState({
                input: this.state.input
            })
        })
    }
    // setValuesAndCalculate(result){
    //     if (result) {
    //         let num1 = result[1]
    //         let num2 = result[3]
    //         let operator = result[2]
    //
    //         this.calculate(num1, num2, operator)
    //
    //         this.setState({
    //             input: 0
    //         })
    //     }
    // }

    // parseInput(input) {
    //     const regExp = /(\d+)\s*(.)\s*(\d+)/;
    //     // let input = this.state.input;
    //     let result = input.toString().match(regExp)
    //     if (result[3] !== '') {
    //         return result
    //     }
    // }

    // calculate(num1, num2, operator) {
    //     num1 = parseInt(num1);
    //     num2 = parseInt(num2);
    //
    //     let result
    //
    //     if (operator === '+') {
    //         result = num1 + num2
    //     } else if (operator === '-') {
    //         result = num1 - num2
    //     } else if (operator === '*') {
    //         result = num1 * num2
    //     } else if (operator === '/') {
    //         result = num1 / num2
    //     }
    //
    //     return result;
    //
    //     // this.setState({
    //     //     input: result.toString()
    //     // })
    //
    //     // this.saveToHistory(num1, num2, operator, result)
    // }

    // calculateExercises(exercises){
    //     exercises.forEach((exercise) => {
    //         let result = this.parseInput(exercise);
    //         this.setValuesAndCalculate(result)
    //         })
    // }

    saveToHistory(num1, num2, operator, result) {
        let mathExercise = `${num1}${operator}${num2}=`
        this.exerciseHistory.push(mathExercise)
        this.resultHistory.push(result)
    }

    render() {
        console.log(this.props)
        return (
            <div className="Calculator">
                <div>
                    <h1>Calculator</h1>
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
                    <OperatorButton operatorValue='=' onClick={() => this.enterOperator('=')}/>
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
                <div>
                    <div>
                        <Button variant="contained" size={"large"} color={"primary"} onClick={() => actionExercises({
                            exercisesCount: 2,
                        })(this.props.dispatch)
                            .then((data) => {
                                this.calculateExercises(data.exercises)
                            })}>
                            Get exercises & calculate them
                        </Button>
                    </div>
                </div>
                <div className="History">
                    <List
                        sx={{
                            width: '100%',
                            backgroundColor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': {padding: 0},
                        }}
                    >
                        <h2 style={{
                            fontFamily: 'Comic Sans MS',
                            marginLeft: '110px'
                        }}>History</h2>
                        <ul>
                            {this.exerciseHistory.map((item, index) => (
                                <ListItem key={`${item}`}>
                                    <ListItemText primary={`${item}${this.resultHistory[index]}`}/>
                                </ListItem>
                            ))}
                        </ul>
                    </List>
                </div>
            </div>
        );
    }
}
const mapReduxStateToProps = reduxState => ({
    ...reduxState
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

// export default withStyles(styles)(Calculator);
export default connect(mapReduxStateToProps, mapDispatchToProps)(Calculator);
