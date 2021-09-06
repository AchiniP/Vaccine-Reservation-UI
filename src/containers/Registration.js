import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import { withRouter, useHistory } from "react-router-dom"
import FAQ from './FAQ'
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/achinish/">
        Achini Hettiarachchi
        </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Registration() {
  let history = useHistory();
  const classes = useStyles();
  const [id, setId] = useState(null);


  async function fetchData() {
    const { data } = await axios.get(
      `http://localhost:8000/user/${id}/vaccineStatus`
    );

    if (data.length > 0) {
      history.push({
        pathname: '/status',
        search: `?query=${id}`,
        state: { userData: data }
      })
    } else {
      history.push({
        pathname: '/booking',
        search: `?query=${id}`,
        state: { userData: data }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData()
  };

  return (
    <React.Fragment>
      <div className="formdata">
        <Typography variant="h4" component="h1" gutterBottom>
          Covid 19 Vaccination Appoinment
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
            className={classes.field}
            label="Identification No."
            variant="outlined"
            fullWidth
            required
            type="string"
            placeholder="NRIC/FIN"
          />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </div>
      <div className="bottomContainer" align="bottom">
        <FAQ />
      </div>
      <Copyright />
    </React.Fragment>
  )
}

export default withRouter(Registration);
