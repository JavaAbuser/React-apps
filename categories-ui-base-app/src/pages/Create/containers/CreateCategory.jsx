import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'components/Button';
import TextField from 'components/TextField';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import actions from '../actions/actions'
import * as PAGES from "../../../constants/pages";
import Link from "../../../components/Link";

const getClasses = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const CreateCategory = ({authorities}) => {
    const classes = getClasses();

    const canSeeList = useAccessValidate({
        neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
        ownedAuthorities: authorities
    });

    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        console.log(categoryName);
    }, [categoryName])

    return (
        <div className={classes.container}>
            <br/>
            <TextField label="Category name" variant="standard" value={categoryName} onChange={event => setCategoryName(event.target.value)}/>
            <br/>
            <Link to={location => ({
                ...location,
                pathname: `/${PAGES.SHOW}`,
                search: `${location.search}`,
            })}>
                <Button variant="outlined" onClick={(event) => {
                    dispatch(actions.fetchCreateCategory(categoryName))
                    setCategoryName(event.target.value)
                }}>save</Button>
            </Link>
            {!canSeeList && (
                <Typography>
                    Не могу ничего показать :(
                </Typography>
            )}
        </div>
    )
};

export default CreateCategory;