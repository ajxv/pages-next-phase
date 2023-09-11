import './index.css';
import Button from '@mui/material/Button';
import CustomAppBar from '../components/customAppBar';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Index() {

  const navigate = useNavigate()
  return (
    <Box>
      <CustomAppBar />
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh'}}> 
          <Button variant="contained" sx={{m: 1}} onClick={()=>navigate('/ProcessPages')}>ProcessPages</Button>
          <Button variant="contained" sx={{m: 1}} onClick={()=>navigate('/Pdf2Excel')}>Pdf2Excel</Button>
      </Box>
    </Box>
  );
}

export default Index;
