import './index.css';
import Button from '@mui/material/Button';
import CustomAppBar from '../components/appBar';
import { Box } from '@mui/material';
function Index() {
  return (
    <Box>
      <CustomAppBar />
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh'}}> 
          <Button variant="contained" sx={{m: 1}}>ProcessPages</Button>
          <Button variant="contained" sx={{m: 1}}>Pdf2Excel</Button>
      </Box>
    </Box>
  );
}

export default Index;
