import { Box } from '@mui/material';
import CustomAppBar from '../components/customAppBar';
import LoginRegCard from '../components/loginRegCard';

export default function Login() {
  return (
    <Box>
        <CustomAppBar />
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh'}}>
            <LoginRegCard/>
        </Box>
    </Box>
  );
}