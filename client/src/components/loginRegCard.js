import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress'


export default function LoginRegCard() {
  
  const navigate = useNavigate()

  // tab control
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false)
  const [loading, setLoading] = useState(false)

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
  const handleLoginSubmit = (event) => {
    event.preventDefault()
    login(loginEmail, password)
    setLoading(true)
  }

  // Forgot password
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPassMessage, setForgotPassMessage] = useState('')
  const showPasswordResetDialog = () => {
    setForgotPasswordDialogOpen(true);
  };
  const closePasswordResetDialog = () => {
    setForgotPasswordDialogOpen(false)
  };
  const handleForgotPasswordButton = () => {
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

  // Register
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const registerUser = (username, email, password) => {

    axios.post('http://127.0.0.1:8000/CreateAccount', { 'email': `${email}`, 'name': `${username}`, 'password': `${password}` },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err))

  }

  const handleRegistrationSubmit = (event) => {
    event.preventDefault()
    registerUser(registerUsername, registerEmail, registerPassword)
  }


  return (
    <Card elevation={5} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', paddingTop: '1em', height: 'auto', width: { md: 380, xs: 300 }, minWidth: 300, borderRadius: '1em' }}>
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label="tabs" centered>
        <Tab label="Login" value="1" />
        <Tab label="Register" value="2" />
      </TabList>
      <TabPanel value="1">
        {/* LOGIN TAB */}
        <CardContent>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <LockOpenIcon sx={{ fontSize: '35px' }} />
          </Box>
          <form onSubmit={handleLoginSubmit}>
            <TextField required id="login-email" label='Email' variant="outlined" sx={{width: '100%', marginTop: '1em' }} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            <TextField required id="login-password" label='Password' variant="outlined" sx={{ width: '100%', marginTop: '1em' }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Box sx={{display: 'flex', justifyContent: 'right'}}>
              <Button onClick={showPasswordResetDialog} variant="text" sx={{ fontSize: { md: 12, xs: 10 }}}>Forgot Password?</Button>
              <Dialog open={forgotPasswordDialogOpen} onClose={closePasswordResetDialog}>
                <DialogTitle>Password Reset</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter your Email Id to reset password.
                    New password will be sent to given email.
                  </DialogContentText>
                  <TextField 
                    required
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
                  <Button onClick={closePasswordResetDialog}>Cancel</Button>
                  <Button onClick={handleForgotPasswordButton}>Send Password</Button>
                </DialogActions>
              </Dialog>
            </Box>
            {loginError && (<Alert severity="error" sx={{ width: {md:'16em',xs:'14.5em'}, mt: '0.8em', ml:{ md:'1.8em',xs:'0em'},borderRadius: '0.5em' }}>INVALID CREDENTIALS!!</Alert>)}
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1em'}}>
              <Button type='submit' variant="contained" disabled={loading}>{loading ? <CircularProgress size={22} /> : 'Submit'}</Button>
            </Box>
          </form>
        </CardContent>
      </TabPanel>

      <TabPanel value="2">
        {/* REGISTER TAB */}
        <CardContent>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <PersonIcon sx={{ fontSize: '35px' }} />
          </Box>
          <form onSubmit={handleRegistrationSubmit}>
            <TextField required id="register-username" label="Student Name" variant="outlined" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} sx={{ width: '100%', marginTop: '1em' }} />
            <TextField required id="register-email" label="Email" variant="outlined" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} sx={{ width: '100%', marginTop: '1em' }} />
            <TextField required id="register-password" label="Password" variant="outlined" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} sx={{ width: '100%', marginTop: '1em' }} />
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1em'}}>
            <Button type='submit' variant="contained" >Submit</Button>
            </Box>
          </form>
        </CardContent>
      </TabPanel>
    </TabContext>
    </Card>
  );
}