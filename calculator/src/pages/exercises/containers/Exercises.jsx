import React from 'react';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import actionExercises from "../actions/exercises";

class Exercises extends React.Component {
    render(){
        console.log(this.props)
        return(
            <div>
                <Button variant="contained" size={"large"} color={"primary"} onClick={() => actionExercises({
                    exercisesCount: 2,
                })(this.props.dispatch)
                    .then((data) => {
                        // ?
                        console.log(data.exercises)
                    })}>
                    Get exercises & calculate them
                </Button>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    ...reduxState
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapReduxStateToProps, mapDispatchToProps)(Exercises);