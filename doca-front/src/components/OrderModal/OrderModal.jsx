import { Modal, TextField, Button, Box, Typography, FormHelperText } from "@mui/material";

export const OrderModal = ({ open, onClose, patient }) => {    
    
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    minWidth: 400,
                }}
            >
                <Typography sx={{ mb: 1 }}>
                    {patient.paciente.name} {patient.paciente.lastName}
                </Typography>
                
                
            </Box>
        </Modal>
    );
};
