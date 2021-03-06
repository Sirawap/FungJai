import React, { useState, useEffect } from 'react';

import Layout from '../../src/components/layout';
import SubscriberComment from './subscriberComment';
import { getLiveRepo } from '../../src/liveRepo';

import { styled } from '@mui/material/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import { bgcolor, borderRadius, display, fontSize, height, width } from '@mui/system';
import { CleaningServicesSharp } from '@mui/icons-material';



const useStyles = makeStyles((theme) => ({
  root: {
		display: 'block',
    color: 'white',
    background: 'black',
    fontFamily: 'Noto Sans, sans-serif '
	},
  front:{
    zIndex: `1`,
    position: `relative`
  },
  flex:{
    display: `flex`
  },
  block:{
    display: `block`
  },
  end:{
    justifyContent: `end`
  },
  fixed:{
    position: `absolute`
  },
  textAlignCenter:{
    textAlign: `center`
  },
  alignCenter:{
    alignItems: `center`
  },
  justifyCenter:{
    justifyContent: `center`
  },
  spaceAround:{
    justifyContent: `space-around`
  },
  spaceEvenly:{
    justifyContent: `space-evenly`
  },
  spaceBetween:{
    justifyContent: `space-between`
  },
  bold:{
    fontWeight: `900`
  },
  header:{
    padding: `1rem`
  },
  closeButton:{
    right: `0`,
    padding: `1rem`
  },
  avatarImag:{
    width: `2.5rem`,
    height: `2.5rem`,
    borderRadius: `50px`,
    margin: `0 0 0 1rem`
  },
  marginDJInfo:{
    paddingLeft: `0.5rem`
  },
  genericLetter:{
    fontSize: `0.8rem`,
  },
  badge:{
    padding: `0 0.5rem 0 0rem `
  },
  spenderFrame:{
    width: `2.5rem`,
    height: `2.8rem`,
  },
  spenderAvatar:{
    width: `1.6rem`,
    height: `1.6rem`,
    margin: `0rem 0 0.35rem -2.05rem`
  },
  marginSubscriberComment:{
    marginTop: `7rem`
  },
  mediaButton:{
    width: `2.5rem`,
    height: `2.5rem`,
    borderRadius: `50px`,
  },
  groupMedia:{
    display: `block`,
    verticalAlign: `middle`,
    padding: `1rem`,
    width: `4.5rem`
  },
  mediaButton2:{
    width: `3rem`,
    height: `3rem`,
    borderRadius: `50px`,
  },
  commnetRowMargin:{
    paddingLeft: `1rem`,
    paddingRight: `1rem`,
    paddingBottom: `0.5rem`
  },
  currentMusicRowMargin:{
    padding: `1rem 1.5rem 1rem 1.5rem`
  },
  currentMusic:{
    border: `1px solid rgba(122, 122, 122, .5)`,
    borderRadius: `10px`,
    backgroundColor: `#212121`,
    padding: `0.25rem 0.25rem 0.25rem 0.25rem`
  },
  footer:{
    position: `fixed`,
    bottom: `0`,
    width: `100%`,
    background: `#000000`
  },
  middleRight:{
    position: `fixed`,
    top: `45%`,
    right: `0%`
  },
}));
// --------------------------------------------------------
// TODO : Fix footer                  check
// TODO : side multi media            uncheck
// TODO : add comment with enter      uncheck
// TODO : handler and hook            uncheck
// TODO : tidy the code               uncheck
// --------------------------------------------------------
const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '15rem',
  top: 0,
  left: 0,
  backgroundImage:
  `linear-gradient(to bottom, rgba(245, 246, 252, 0.5), rgba(0, 0, 0, 0.999)),url('/bg2.jpg')`
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Header = styled('div')(({ theme }) => ({ 
  fontSize: `1.25rem`,
  fontWeight: 900
}));
const subHeader = styled('div')(({ theme }) => ({
  fontSize: `1rem`,
}));

const Spacing = styled('div')(() => ({
  width: `1rem`
}));

const FooterPlaceholder = styled('div')(() => ({
  width: `100%`,
  height: `10rem`
}));

const CommentInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 20,
    position: 'relative',
    backgroundColor: `#212121`,
    fontSize: 16,
    width: '90%',
    margin: `0rem 1rem   0rem 0rem`,
    padding: '10px 12px',
    color: `white`,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    },
  },
}));


export default function Home({ live }) {
	// Initial setup
	const classes = useStyles();

	// All comment state
	const [comments, setComment] = useState(live.comments);

  // comment state
  const [_comment,setUserComment] = useState('');

  // uploading
  const [uploading, setUploading] = useState(false);
  const [scroll,setScroll] = useState(false);


	// Check that data is loaded correctly
	if (Object.keys(live).length === 0 && live.constructor === Object) {
    console.log(live)
		return (
			<Layout id={id}>
				<div>
					<h1>An error occurred - try refreshing</h1>
				</div>
			</Layout>
		);
	}

	// Handlers
  const handleClose= () => {
    console.log('closing live page')
  }

  const commentHandler =(event) => {
    // console.log(event.target.value)
    setUserComment(event.target.value)
  }

  const shareHandler=()=>{
    if(_comment == '' || _comment == null){
      console.log('nothing to upload')
      return 'nothing to upload'
    }
    
    if(_comment != '' || _comment != null){
      comments.push({
        sbName: 'sb', 
        sbComment: _comment
      }) 
      console.log('upload successful')
    }
    // clear the comment input
    setUserComment('')
    document.getElementById('comment_input').value = ''
    // set state
    setComment(comments)
    setUploading(true)
    uploadingTimer()
  }

  async function uploadingTimer(){
    setTimeout(() => {
      setUploading(false)
      scrollTimer()
    }, 2000)
  }

  async function scrollTimer(){
    setScroll(true)
    setTimeout(() => setScroll(false), 1000)
  }

	return (
		// <Layout id={id}>
      // <div>page</div>
    // </Layout>


    <div className={classes.root}>
      {/*----------------- header -----------------*/}
      <div className={classes.block}>
        <Grid container spacing={0} className={classes.front}>
          {/* live music name */}
          <Grid item xs={10}>
            <div className={classes.header}>
              <Header>{live.liveName}</Header>
              <subHeader>{live.cast}</subHeader>
            </div>
          </Grid>
          {/* close button */}
          <Grid item xs={2} className={classes.closeButton} >
            <img 
              alt = 'close button'
              src ='/close-live-button.svg'
              onClick={handleClose}
            />
          </Grid>
          
          
          {/* dj Avatar */}
          <Grid item xs={2}>
            <img 
              alt = 'profile'
              src ='/avatar-empty.png'
              className={classes.avatarImag}
              onClick={handleClose}
            />
          </Grid>
          {/* dj info */}
          <Grid item xs={6} className={classes.marginDJInfo}>           
            <div className={`${classes.genericLetter} ${classes.flex} `}>
              <img alt='DJ badge' src='/badge-dj.svg' className={classes.badge} />
              <div className={`${classes.bold}`}>{live.djName}</div>
            </div>
            <div className={`${classes.genericLetter} ${classes.flex}`}>
              {live.port}
              <Spacing />
              <img alt='dot' src='/dot.svg' className={classes.badge} />
              <img alt='listenr count image' src='/ear.svg' className={classes.badge} />
              {live.listener}
            </div>
          </Grid>
          {/* spender */}
          <Grid item xs={4} className={`${classes.flex} ${classes.spaceAround}`}>
            <div>
              <img alt='ellipse1' src='/top-spender/mushroom1.png' className={classes.spenderFrame} />
              <img alt='ellipse1' src='/ellipse 78.png' className={classes.spenderAvatar} />
            </div>
            <div>
              <img alt='ellipse1' src='/top-spender/mushroom2.png' className={classes.spenderFrame} />
              <img alt='ellipse1' src='/ellipse 82.png' className={classes.spenderAvatar} />
            </div>
            <div>
              <img alt='ellipse1' src='/top-spender/mushroom3.png' className={classes.spenderFrame} />
              <img alt='ellipse1' src='/ellipse 87.png' className={classes.spenderAvatar} />
            </div>
          </Grid>
        </Grid>
        <WallPaper className={classes.back} />
      </div>
      
      {/*----------------- body - sb comment show -----------------*/}
      <div className={`${classes.flex} ${classes.marginSubscriberComment}`}>
        <Grid container spacing={0} >
          {/* list of comment */}
          <Grid item xs={10}>
            <Grid item xs={12}><SubscriberComment name='sb' comment='can scroll here' ></SubscriberComment></Grid>
            {comments.map((comment,i)=>{
              return(
                <SubscriberComment name={comment.sbName} comment={comment.sbComment}></SubscriberComment>
              )
            })}
          </Grid>

          {/* UNFIXED side bar media button  ***commenting*** */}
          <Grid item xs={2} className={`${classes.flex} ${classes.alignCenter}`}>
            <div className={classes.groupMedia }>
              {/* uncomment for unfixed side media button */}
              {/* <img alt='mic' src='/Component 207.png' className={classes.mediaButton}/>
              <img alt='playlist' src='/song-queue-list.png' className={classes.mediaButton}/> */}
            </div>
          </Grid>
        </Grid>
        {/* FIXED sidebar media button */}
        <div className={`${classes.front} ${classes.middleRight}`} >
          <div className={classes.groupMedia}>
            <img alt='mic' src='/Component 207.png' className={classes.mediaButton}/>
            <img alt='playlist' src='/song-queue-list.png' className={classes.mediaButton}/>
          </div>
        </div>
      </div>
      
      {/* Footer placeholder */}
      <FooterPlaceholder />

      {/*----------------- Footer -----------------*/}
      <div className={classes.footer}>
        <div className={`${classes.flex} ${classes.justifyCenter}`}>
          {uploading === true ? 'uploading ...' : ''}
          {scroll === true ? 'please scroll down' : ''}
        </div>
        {/* playing music */}
        <div className={classes.currentMusicRowMargin}>
          <Grid container spacing={1} className={classes.currentMusic} >
            <Grid item xs={3}>
              <img alt='album image' src='/albumThumpnail.png' />
            </Grid>
            <Grid item xs={5}>
              <div>
                <b>{live.musicName}</b><br/>
                {live.musicID}
              </div>
            </Grid>
            <Grid item xs={4} className={`${classes.spaceAround} ${classes.flex}`}>
            <img alt='add to fav icon' src='/Add to Fav.png' className={classes.mediaButton}/>
              <img alt='share icon' src='/share.svg' className={classes.mediaButton}/>
            </Grid>
          </Grid>
        </div>

        {/* comment row */}
        <Grid container spacing={0} className={classes.commnetRowMargin}>
          {/* comment input */}
          <Grid item xs={9}>  
            <Box
              component="form"
              noValidate
              sx={{
                display: 'grid',
                gridTemplateColumns: { sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <FormControl variant="standard">
                <CommentInput 
                  placeholder='?????????????????????????????????????????????' 
                  id="comment_input"
                  onChange={commentHandler}
                />
              </FormControl>
            </Box>
          </Grid>
          {/* media button */}
          <Grid item xs={3} className={`${classes.spaceAround} ${classes.flex}`}>
            <img 
              alt='share comment image' 
              src='/share.svg' 
              className={classes.mediaButton}
              onClick={shareHandler}
            />
            <img alt='gift image' src='/like.png' className={classes.mediaButton}/>
          </Grid>
        </Grid>
      </div>
    </div>
	);
}

export async function getServerSideProps(ctx) {
	// Get params
	let env = process.env.NEXT_PUBLIC_ENV;
	let id = ctx.params.id;
	let live = {};

	// Get initial data
	let liveRepo = getLiveRepo({ env, id, url: process.env.NEXT_PUBLIC_BE });
	try {
		live = await liveRepo.getLive();
	} catch (e) {
		// TODO handle error
	}

	return {
		props: {
			live
		}
	};
}
