import React from 'react';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

export default function CTA({ ctaText, buttonText, path }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box position="absolute" top="40px" right="40px">
      <Grid container alignItems="center" justify="flex-end">
        <Box mr={3}>
          <Typography color="textSecondary">{ctaText}</Typography>
        </Box>
        <Button
          onClick={() => history.push(`${path}`)}
          size="large"
          className={classes.secondaryBtn}
          variant="text"
          color="secondary"
        >
          {buttonText}
        </Button>
      </Grid>
    </Box>
  );
}
