import React, { useState, useEffect } from 'react'
import axios from 'axios'
import queryString from 'query-string';
import { withRouter, useLocation, useHistory } from "react-router-dom"
import { Legenda } from '../components/legenda';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import moment from "moment";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({
    comboOptions: {
        fontSize: '12px',
        color: 'red'
    },
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: "block",
    },
}));

const Booking = () => {

    const classes = useStyles();
    const location = useLocation();
    let history = useHistory();
    const [vaccineCenterList, setVaccineCenterList] = useState([]);
    const [vaccineCenter, setVaccineCenter] = useState();
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = React.useState(null);
    const [open, setOpen] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSlotChange = (value) => {
        setSelectedTimeSlot(value.vaccineSlotAvailabilityId);
    };


    useEffect(() => {
        axios.get(`http://localhost:8000/vaccineCenter`).then(res => {
            setVaccineCenterList(res.data);
        })
    }, []);


    useEffect(() => {
        if (vaccineCenter) {
            axios.get(`http://localhost:8000/vaccineCenter/availability`, { params: { vaccineCenterId: vaccineCenter.id } }).then(res => {
                if (res.status === 200) {
                    setAvailableSlots(res.data);
                } else {
                    // TODO MANAGE ERROR
                }
            });
        }
    }, [vaccineCenter, location]);

    useEffect(() => {
        if (location.pathname === '/booking/update' && location.state) {
            const vcAvailabilityId = location.state.userData ? location.state.userData.vaccineSlotId : null;
            const vcSelectedDate = location.state.userData ? location.state.userData.selectedDate : null;
            if (vcAvailabilityId) {
                axios.get(`http://localhost:8000/vaccineCenter/availability/${vcAvailabilityId}`).then(res => {
                    if (res.status === 200) {
                        const selectedData = res.data[0];
                        const selectedVC = vaccineCenterList.filter(record => record.id === selectedData.vaccineCenterId);
                        setSelectedTimeSlot(vcAvailabilityId);
                        setVaccineCenter(selectedVC[0]);
                        setSelectedDate(vcSelectedDate)
                    } else {
                        // TODO MANAGE ERROR
                    }
                });
            }
        }
    }, [location, vaccineCenterList]);

    const saveBooking = () => {
        const params = queryString.parse(location.search)
        const userId = params.query
        if (userId && selectedTimeSlot && vaccineCenter) {
            axios.post(`http://localhost:8000/user/${userId}/vaccineStatus`, {
                vaccineSlotId: selectedTimeSlot,
                status: "PENDING",
                date: selectedDate
            }).then(res => {
                if (res.status === 201) {
                    history.push({
                        pathname: '/status',
                        search: `?query=${userId}`,
                    })

                } else {
                    //TODO
                }
            }).catch(error => {
                console.log(error.response.data.error)
                setShowAlert(true);
                setAlert("Couldnt Make The reservation -", error.message);
            })
        }
    };

    const updateBooking = () => {
        const params = queryString.parse(location.search)
        const userId = params.query
        if (userId && selectedTimeSlot && vaccineCenter) {
            axios.put(`http://localhost:8000/user/${userId}/vaccineStatus`, {
                vaccineSlotId: selectedTimeSlot,
                status: "PENDING",
                date: selectedDate
            }).then(res => {
                if (res.status === 200) {
                    history.push({
                        pathname: '/status',
                        search: `?query=${userId}`,
                    })

                } else {
                    //TODO
                }
            }).catch(error => {
                console.log(error.response.data.error)
                setShowAlert(true);
                setAlert("Could not Update The reservation -", error.message);
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (location.pathname === '/booking/update') {
            await updateBooking()
        } else {
            await saveBooking();
        }

    };

    return (
        <div>
            <div>
                <Typography variant="h4" component="h1" gutterBottom>
                    Book Your Covid 19 Vaccination Appoinment
                </Typography>
                {showAlert && <Collapse in={open}>
                    <Alert severity="error"
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
                <Legenda />
                <div className="formdata">
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Autocomplete
                            value={vaccineCenter}
                            onChange={(event, newValue) => {
                                setVaccineCenter(newValue);
                            }}
                            id="combo-box-demo"
                            options={vaccineCenterList}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300, color: "black" }}
                            renderInput={(params) => <TextField {...params} label="Center" variant="outlined" />}
                        />
                        {vaccineCenter && (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date"
                                    format="dd/MM/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date"
                                    }}
                                    minDate={moment().add(1, "days")}
                                    maxDate={moment().add(15, "days")}
                                />
                            </MuiPickersUtilsProvider>
                        )}
                        {selectedDate &&
                            availableSlots
                                .filter(
                                    (record) =>
                                        moment(record.validFrom) < moment(selectedDate) &&
                                        moment(record.validTo) >= moment(selectedDate)
                                )
                                .map((record) =>
                                (

                                    <div class="btn-group">
                                        <Button
                                            className={classes.field}
                                            value={record}
                                            aria-label="left aligned"
                                            variant={record.vaccineSlotAvailabilityId === selectedTimeSlot ? "contained" : "outlined"}
                                            color={record.maxCount - record.currentCount < 10 ? "secondary" : "primary"}
                                            onClick={() => handleTimeSlotChange(record)}
                                            disabled={record.maxCount <= record.currentCount}
                                        >
                                            {record.timseSlotName}
                                        </Button>
                                    </div>
                                )
                                )}
                        {vaccineCenter && selectedTimeSlot &&
                            <div class="btn-group">
                                <Button type="submit" color="primary" variant="contained">
                                    Submit
             </Button>
                            </div>
                        }
                    </form></div>
            </div>
        </div>
    );

};

export default withRouter(Booking);
