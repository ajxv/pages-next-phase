import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CheckCircle } from '@mui/icons-material'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import axios from 'axios'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress'

export default function Test() {
  const [username, setUsername] = useState('');
  const [phoneno, setPhoneno] = useState('')
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isTextboxVisible, setTextboxVisibility] = useState(false);
  const [otpResponse, setOtpResponse] = useState('')
  const [isMatch, setIsMatch] = useState(false)
  const [notMatch, setNotMatch] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [submitError, setSubmitError] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleOtpChange = (event) => {
    const inputOtp = event.target.value;
    if (/^\d{0,6}$/.test(inputOtp)) {
      setOtp(inputOtp);

    }
  };



  const handleButtonClick = (e) => {
    e.preventDefault()
    email && setTextboxVisibility(true)
    setIsMatch(false)
    setNotMatch(false)
    email && setIsTimerRunning(true)
    emailverification(email)
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  //Api call for otp verification  
  axios.defaults.withCredentials = true;
  const emailverification = (email) => {
    axios.post('http://127.0.0.1:8000/otp/send', { 'email': `${email}` }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },)
      .then(({ data }) => {
        setOtpResponse(data.otp)
        console.log(data);
      }).catch((err) => console.log(err))
  }

  const compareValues = () => {
    if (otpResponse && otpResponse === otp) {
      setIsMatch(true)
      setIsTimerRunning(false)
      console.log('value match')
    } else {
      setNotMatch(true)
      console.log('value not match')
    }
  };

  //Api call for create account
  const basicFormApi = (username, email, phoneno) => {

    axios.post('http://127.0.0.1:8000/CreateAccount', { 'email': `${email}`, 'name': `${username}`, 'mobile_number': `${phoneno}` },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err))

  }

  const handleSubmit = () => {
    basicFormApi(username, email, phoneno)
  }

  const handleError = () => {
    setSubmitError(true)
  }

  // tab control
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false)
  const login = (email, password) => {
    axios.defaults.withCredentials = true
    axios.post('http://127.0.0.1:8000/login', { 'email': `${email}`, 'password': `${password}` },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.statusText === 'OK') {
          navigate('/student/dashboard')
        }
      }).catch(err => {
        setLoading(false)
        setLoginError(true)
        console.log('error')
      })

  }
  const handleLoginSubmit = () => {
    login(loginEmail, password)
    setLoading(true)
  }


  //forgot password
  const [open, setOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPassMessage, setForgotPassMessage] = useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false)
  };
  const handleButton = () => {
    forgotPassword(forgotEmail)
  }
  const forgotPassword = (forgotEmail) => {
    axios.defaults.withCredentials = true
    axios.put('http://127.0.0.1:8000/ForgotPassword', { 'email': `${forgotEmail}` },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((res) => {
        console.log(res.data);
        setForgotPassMessage(res.data)
      }).catch(err => console.log(err))
  }


  return (
    <Grid container md={2} sm={6} xs={8}>
      <Grid item xs={12} sm={12} md={12} lg={12}>

        <Card elevation={5} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', marginTop: { xs: '5em', md: 0 },  paddingTop: '1em', height: 'auto', width: { md: 380, xs: 300 }, borderRadius: '1em' }}>
          <TabContext value={value}>
            <Box >
              <TabList onChange={handleChange} aria-label="tabs" centered>
                <Tab label="Login" value="1" />
                <Tab label="Register" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CardContent sx={{}}>
                <Grid item sx={{display: 'flex', justifyContent: 'center'}}>
                  <LockOpenIcon sx={{ fontSize: '35px' }} />


                </Grid>
                <Grid container  >
                  <Grid item xs={12} md={12}>
                    <Grid container spacing={2} >
                      {/* <Typography>Registration</Typography> */}

                      <Grid item xs={12} sm={12} md={12} lg={12} >

                        <TextField id="outlined-basic" label='Email' variant="outlined" sx={{ borderRadius: '2em', width: { md: 300, xs: 220 }, marginTop: '1em' }}
                          value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                      </Grid>
                      <Grid item xs={12} md={12} sx={{}}>
                        <TextField id="outlined-basic2" label='Password' variant="outlined" sx={{ width: { md: 300, xs: 220 }, marginTop: '1em' }}
                          value={password} onChange={(e) => setPassword(e.target.value)} />
                      </Grid>
                      <Grid container alignItems="center" justifyContent="flex-end">
                        <Button onClick={handleClickOpen} variant="text" sx={{ fontSize: { md: 12, xs: 10 }, marginRight: { md: '14px' } }}>Forgot Password?</Button>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>Forgot Password!!</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              please enter your email address here,new password will be shared to the entered email address
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Email Address"
                              type="email"
                              fullWidth
                              variant="standard"
                              value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                            />
                            {forgotPassMessage && (<Alert severity="info" sx={{ ml: {md:'7.2em',xs:'0em'}, width: {md:'22.5em',xs:'16em'}, mt: '0.8em', borderRadius: '0.8em' }}>{forgotPassMessage.message}</Alert>)}

                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleButton}>Send Password</Button>
                          </DialogActions>
                        </Dialog>
                      </Grid>

                    </Grid>
                    {loginError && (<Alert severity="error" sx={{ width: {md:'16em',xs:'14.5em'}, mt: '0.8em', ml:{ md:'1.8em',xs:'0em'},borderRadius: '0.5em' }}>INVALID CREDENTIALS!!</Alert>)}
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: { md: '1em', xs: '1em' } }}>
                      <Button variant="contained" disabled={loading} onClick={handleLoginSubmit} >{loading ? <CircularProgress size={22} /> : 'Submit'}</Button>
                    </Grid>

                  </Grid>
                </Grid>
              </CardContent>
            </TabPanel>
            <TabPanel value="2">
              <CardContent>
                    <Grid container spacing={2} xs={12} md={12} lg={12}>
                      {/* <Typography>Registration</Typography> */}
                      <Grid item xs={12} md={12} sx={{}} >
                        <TextField id="outlined-basic" label="Student Name" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ width: { md: 300, xs: 220 } }} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField id="outlined-basic1" label="Email" variant="outlined" disabled={isMatch} sx={{ width: { md: 300, xs: 220 } }} InputProps={{
                          endAdornment: <InputAdornment position="end" style={{ paddingRight: '1em' }}>
                            {isTimerRunning ? (
                              <CountdownCircleTimer

                                strokeWidth={3}
                                isPlaying
                                duration={300}
                                size={0}
                                colors={[['#004777', 0.33], ['#F7B801', 0.33],]}
                                onComplete={() => {
                                  setIsTimerRunning(false);
                                  setNotMatch(false)
                                  isMatch ? setTextboxVisibility(true) : setTextboxVisibility(false)
                                }}
                              >
                                {({ remainingTime }) => formatTime(remainingTime)}
                              </CountdownCircleTimer>
                            ) : (<Button size="small" onClick={handleButtonClick}>Send Otp</Button>)}</InputAdornment>,
                        }} value={email} onChange={(e) => setEmail(e.target.value)} />
                      </Grid>

                      <Grid item xs={12} md={12}>
                        {isTextboxVisible && (
                          <TextField
                            label="Enter OTP"
                            variant="outlined"
                            value={otp}
                            onChange={handleOtpChange}
                            disabled={isMatch}
                            InputProps={{
                              maxLength: 6,
                              endAdornment: <InputAdornment position="end">
                                {isMatch ? (<CheckCircle sx={{ color: 'green' }} />
                                ) : (
                                  <Button size="small" onClick={compareValues}>
                                    Verify OTP
                                  </Button>
                                )}</InputAdornment>,

                            }}
                            sx={{ width: { md: 300, xs: 220 }}}
                          />


                        )}
                        {notMatch && (<Alert severity="error" sx={{ width: '19em', mt: '0.8em', ml: '1.8em', borderRadius: '0.5em' }}>INVALID OTP!!</Alert>)}
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <TextField id="outlined-basic2" label="Mobile Number" variant="outlined" value={phoneno} onChange={(e) => setPhoneno(e.target.value)}
                          sx={{width: { md: 300, xs: 220 } }} />
                      </Grid>
                      <Grid item xs={12} md={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={isMatch ? handleSubmit : handleError} variant="contained" >Submit</Button>
                      </Grid>
                      <Grid container justifyContent="center" alignItems="center" sx={{ mt: '1em' }}>
                        {submitError && <Alert severity="error">please verify your email</Alert>}
                      </Grid>
                    </Grid>
              </CardContent>


            </TabPanel>
          </TabContext>

        </Card>
      </Grid>
    </Grid>
  );
}