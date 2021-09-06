import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { withRouter, useLocation, useHistory } from "react-router-dom";
import queryString from 'query-string';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import pending from '../pending.jpg';
import completed from '../completed.jpg';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        height: 500,
    },
    media: {
        height: 300,
        maxWidth: 1000,
    },
    app: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const UserVaccineStatus = () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [user, setUser] = useState({});
    const [status, setStatus] = useState(null);
    const [open, setOpen] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        console.log(location.pathname);
        console.log(location.search);
        console.log(location.state);
    }, [location]);

    useEffect(() => {
        const params = queryString.parse(location.search)
        const userId = params.query
        axios.get(`http://localhost:8000/user/${userId}/vaccineStatus`).then(res => {
            setUser(res.data[0]);
            const userData = res.data ? res.data[0] : null;
            if (userData && new Date(userData.selectedDate) < new Date()) {
                setStatus('COMPLETED')
            }
        })
    }, [location]);

    const deleteBooking = () => {
        if (user) {
            const { nic, vaccineSlotId } = user;
            axios.delete(`http://localhost:8000/user/${nic}/vaccineStatus`, { params: { vaccineSlotId } }).then(res => {
                if (res.status === 200) {
                    setShowAlert(true);
                    setAlert("Your Booking is Successfully Cancelled");
                } else {
                    // TODO MANAGE ERROR
                }
            })
        }
    };


    const updateBooking = () => {
        const params = queryString.parse(location.search)
        const userId = params.query
        history.push({
            pathname: '/booking/update',
            search: `?query=${userId}`,
            state: { userData: user }
        })
    }

    return (
        <div className={classes.app}>
            {showAlert && <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {alert}
                </Alert>
            </Collapse>}
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Typography
                            className={"MuiTypography--subheading"}
                            variant={"h6"}
                        >
                            {(status !== 'COMPLETED') ? `Your vaccination slot is scheduled on ${moment(user.selectedDate).format('YYYY-MM-DD')}` : "Vaccination Completed"}
                        </Typography>
                    </CardContent>
                    {status !== 'COMPLETED' ?
                        <CardMedia
                            className={classes.media}
                            image={pending}
                            title="Vaccine Status Pending"
                        /> : <CardMedia
                            className={classes.media}
                            image={completed}
                            title="Vaccine Status Completed"
                        />}
                </CardActionArea>
                {(status !== 'COMPLETED') ?
                    <React.Fragment>
                        <Divider className="divider" light />
                        <CardActions>
                            <Button size="small" color="primary" variant="outlined" onClick={() => deleteBooking()}>
                                Cancel Booking
        </Button>
                            <Button size="small" color="primary" variant="outlined" onClick={() => updateBooking()}>
                                Change Date
        </Button>
                        </CardActions>
                    </React.Fragment>
                    : ''}
            </Card>
        </div>
    );

}

export default withRouter(UserVaccineStatus);
