import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import actions from '../actions/actions'
import * as PAGES from 'constants/pages';
import Link from "../../../components/Link";
import { Transition } from 'react-transition-group';
import {Button} from "@material-ui/core";

const getClasses = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },

    typography: {
        color: 'blue',
        fontSize: '30px'
    },
}));

const Show = ({
        authorities
    }) => {
    const classes = getClasses();
    const store = useSelector(({reducer}) => reducer);
    const dispatch = useDispatch();

    const [listCategories, setList] = useState([]);

    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ', 'МОЖНО_ДРУГУЮ_ШТУКУ'],
    });
    const [updated, setUpdate] = useState(false);

    useEffect(() => {
        console.log("1")
        dispatch(actions.fetchGetCategories());
        setUpdate(true);
    }, [])

    useEffect(() => {
        console.log("2")
        if (updated) {
            dispatch(actions.fetchGetCategories());
            setUpdate(false);
        }
        setList(store.list);
    }, [store.list])

    return (
        <div className={classes.container}>
            <div>
                <Link to={location => ({
                    ...location,
                    pathname: `/${PAGES.CREATE}`,
                    search: `${location.search}`,
                })}>
                    <Button variant="contained">create</Button>
                </Link>
            </div>
            <br/>
            {canSeeList && listCategories.map((item) => (
                <div>
                    <Typography className={classes.typography} key={item.id}>
                        {item.name}
                        <Transition>
                            <div className="operations">
                                <Link to={location => ({
                                    ...location,
                                    pathname: `/${PAGES.CREATE}`,
                                    search: `${location.search}`,
                                })}>
                                    <Button variant="contained">update</Button>
                                </Link>

                                <Button variant="contained" onClick={() => {
                                    dispatch(actions.fetchDeleteCategory(item.id))
                                    }}>delete</Button>
                            </div>
                        </Transition>
                    </Typography>
                </div>
            ))}
            {!canSeeList && (
                <Typography>
                    Не могу ничего показать :(
                </Typography>
            )}
        </div>
    )
};

export default Show;