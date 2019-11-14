import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Switch,
  Card,
  CardContent,
  CardHeader,
  Button,
  InputLabel,
  Input,
  TextareaAutosize
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  transitions: {
    transitionDuratio: 2
  },
  card: {
    width: 275,
    height: 350
  },
  cardEdit:{
    width: "100%"
  },
  cardHeader: {
    textAlign: "center"
  },
  cardMainButton: {
    borderRadius: 50,
    marginBottom: 10
  },
  inputLabel: {
    marginTop: "1em",
    fontWeight: "bold"
  },
  input: {
    marginTop: ".5em"
  },
}));

export default function RsvpCard(props) {
  const classes = useStyles();
  const [rsvp, setRsvp] = React.useState(props.rsvpDetails);
  const [expanded, setExpanded] = React.useState(false);

  const [rootClass, setRootClass] = React.useState();
  const [cardClass, setCardClass] = React.useState(classes.card)

  const handleExpandClick = () => {
    if (!expanded) {
      setRootClass(classes.root)
      setCardClass(classes.cardEdit)
    } else {
      setRootClass()
      setCardClass(classes.card)
    }
    setExpanded(!expanded);
  };

  const cancelEdit = () => {
    handleExpandClick();
    return setRsvp(props.rsvpDetails)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRsvp({
      ...rsvp,
      [name]: value
    })
  }

  const handleChangeSwitch = (e) => {
    const name = e.target.name
    const checked = e.target.checked
    setRsvp({
      ...rsvp,
      [name]: checked
    })
  }
  
  return (
    <Grid key={rsvp._id} item className={rootClass}>
      <Card className={cardClass}>
        <CardHeader title={rsvp.name} className={classes.cardHeader} />
        {!expanded ? (
          <CardContent>
            <Grid container justify="center">
              <Grid container>
                <Button
                  color="primary"
                  size="large"
                  variant="outlined"
                  fullWidth
                  className={classes.cardMainButton}
                  onClick={handleExpandClick}
                >
                  Edit
                    </Button>
              </Grid>
              <Grid container>
                <Button
                  color="primary"
                  size="large"
                  variant="outlined"
                  fullWidth
                  className={classes.cardMainButton}
                >
                  Delete
                    </Button>
              </Grid>
              <Grid container>
                <Button
                  color="primary"
                  size="large"
                  variant="outlined"
                  fullWidth
                  className={classes.cardMainButton}
                >
                  Participants
                    </Button>
              </Grid>
            </Grid>
          </CardContent>
        ) : (
            <CardContent>
              <Grid container>
                <Grid item xs={2}>
                  <InputLabel className={classes.inputLabel}>
                    Open Public
              </InputLabel>
                </Grid>
                <Grid item>
                  <Switch
                    name="public"
                    color="primary"
                    checked={rsvp.public}
                    onChange={e => handleChangeSwitch(e)}
                  />
                </Grid>
              </Grid>
              <InputLabel className={classes.inputLabel}>Rsvp Name</InputLabel>
              <Input
                fullWidth
                value={rsvp.name}
                type="text"
                name="name"
                onChange={e => handleChange(e)}
              />
              <InputLabel className={classes.inputLabel}>Description</InputLabel>
              <TextareaAutosize
                value={rsvp.description}
                type="text"
                name="description"
                rows="5"
                style={{ width: "100%" }}
                className={classes.input}
                onChange={e => handleChange(e)}
              />
              <InputLabel className={classes.inputLabel}>Seat</InputLabel>
              <Input
                fullWidth
                value={rsvp.seatCount}
                type="number"
                name="seatCount"
                onChange={e => handleChange(e)}
              />
              <InputLabel className={classes.inputLabel}>Price</InputLabel>
              <Input
                fullWidth
                value={rsvp.price}
                type="number"
                name="price"
                onChange={e => handleChange(e)}
              />
              <Button onClick={() => props.onEditRsvp(rsvp._id, rsvp)}>Update</Button>
              <Button onClick={() => cancelEdit()}>Cancel</Button>
            </CardContent>
          )}
      </Card>
    </Grid>
  )
}