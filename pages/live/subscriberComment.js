import React, { Component, useState } from 'react';
import Grid from '@mui/material/Grid';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  flex:{
    display: `flex`,
  },
  justifyCenter: {
    justifyContent: `center`
  },
  avatarPadding:{
    padding: `0.5rem 1rem 0.5rem 1rem`
  },
  avatarImage: {
		width: `2.5rem`,
    height: `2.5rem`,
	},
  lineHeight:{
    lineHeight: `1.75rem`
  },
  
}));

const SubscriberCommnet = ({
	name,
  comment
}) => {
	// Initial setup
	const classes = useStyles();

  return (
		<div className={classes.flex}>
      <div className={classes.avatarPadding}>
        <img alt='avatar image' src='/Ellipse 78.png' 
        className={`${classes.avatarImage}`} />
      </div>
      <div className={classes.lineHeight}>
        {name}<br/>

        {comment}
      </div>
    </div>
	);
};

export default SubscriberCommnet;
