import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import EnhancedTable from "./participantTable";

import { deleteParticipant } from "../../actions/RsvpAction";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box style={{ padding: "0 5px" }}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

function Partcipant(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [rsvp, setRsvp] = React.useState([]);

  useEffect(() => {
    if (rsvp !== props.rsvp.rsvp) {
      setRsvp(props.rsvp.rsvp);
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onDeleteParticipant = async (rsvpID, dataID) => {
    //eslint-disable-next-line
    let deleteParticipant;
    if (typeof dataID === "string") {
      deleteParticipant = await props.deleteParticipant(rsvpID, dataID);
    } else {
      dataID.forEach(async id => {
        deleteParticipant = await props.deleteParticipant(rsvpID, id);
      });
    }
  };

  return (
    <div>
      {rsvp.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              {rsvp.map((rsvp, index) => {
                return (
                  <Tab
                    key={rsvp.details._id}
                    label={rsvp.details.name}
                    {...a11yProps(index)}
                  />
                );
              })}
            </Tabs>
          </AppBar>
          {rsvp.map((rsvp, index) => {
            return (
              <TabPanel key={rsvp.details._id} index={index} value={value}>
                <EnhancedTable
                  participants={
                    rsvp.participants === undefined ? [] : rsvp.participants
                  }
                  keys={rsvp.details._id}
                  onDeleteParticipant={onDeleteParticipant}
                />
              </TabPanel>
            );
          })}
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    rsvp: state.rsvp
  };
}

export default connect(mapStateToProps, { deleteParticipant })(Partcipant);
