import React from 'react';
import OperandButton from "../../../components/OperandButton";
import OperatorButton from "../../../components/OperatorButton";
import {List, ListItem, ListItemText, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import actionExercises from "../actions/exercises";
import {connect} from "react-redux";
import {parseInput} from '../../../utils/math'
import {setValuesAndCalculate} from "../../../utils/math";
import {Buttons, Header, ButtonReceive} from "../../../styles/CalculatorStyles";

class Calculator extends React.Component {
    operators = ['+', '-', '*', "/"]
    exerciseHistory = []
    resultHistory = []

    constructor(props) {
        super(props);
        this.state = {
            input: 0,
            count: 0
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

        if(this.state.input === 0){ // check if customer want to enter negative value
            if(operator === '-'){
                this.setState({
                    input: operator
                })
            }
        }

        else if (this.operators.includes(lastSymbol)) {
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

    saveToHistory(num1, num2, operator, result) {
        let mathExercise = `${num1}${operator}${num2}=`
        this.exerciseHistory.push(mathExercise)
        this.resultHistory.push(result)
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            count: event.target.value
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div style={Buttons}>
                    <h1 style={Header}>Calculator</h1>
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
                        <Button style={ButtonReceive} variant="contained" size={"large"} color={"primary"} onClick={() => actionExercises({
                            exercisesCount: this.state.count,
                        })(this.props.dispatch)
                            .then((data) => {
                                this.calculateExercises(data.exercises)
                            })}>
                            Get exercises & calculate them
                        </Button>
                    </div>
                    <TextField style={{
                        'marginLeft': '40px',
                        'marginTop': '5px'
                    }}
                               id="outlined-multiline-flexible"
                               size='medium'
                               label={'count'}
                               color='secondary'
                               onChange={this.handleChange}
                    />
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
                        <h2 style={{...Header,
                        marginLeft: '110px'}}>History</h2>
                        <ul>
                            {this.exerciseHistory.map((item, index) => (
                                <ListItem key={`${index}`}>
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

export default connect(mapReduxStateToProps, mapDispatchToProps)(Calculator);
