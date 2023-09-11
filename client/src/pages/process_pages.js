import { Box } from '@mui/material'
import React from 'react'
import CustomAppBar from '../components/customAppBar'

export default function processPages() {

    const handleFormSubmit = () => {

    }

  return (
    <Box>
        <CustomAppBar/>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh'}}>
            <form onSubmit={handleFormSubmit}>

            </form>
        </Box>
    </Box>
  )
}
