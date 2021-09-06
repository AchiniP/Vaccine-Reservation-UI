import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function FAQ() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom>
        HEALTH ADVISORY
        </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Full COVID-19 vaccination consists of two doses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Doses for Pfizer-BioNTech/Comirnaty and Moderna vaccines should be at least 21 and 28 days apart, respectively, but can be taken with an interval of up to eight weeks (56 days) apart
          </Typography>
          <Typography>
            Encouraged to defer other vaccinations for 2 weeks or more, if possible
                    </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>COVID-19 vaccine is currently not recommended for</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Individuals below 12 (Pfizer-BioNTech/Comirnaty) or 18 (Moderna) years of age
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Postpone your appointment if you</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Are unwell or have a fever in the last 24 hours or Are serving Stay-Home Notice (SHN) or Quarantine Order (QO)
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
