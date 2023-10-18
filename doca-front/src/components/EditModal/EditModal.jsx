import { Modal, TextField, Button, Box, Typography, FormHelperText } from "@mui/material";

export const EditModal = ({ field, open, onClose, onSave, newValue, setNewValue }) => {
    let MAX_CHARACTERS;

    if (field === 'description') {
        MAX_CHARACTERS = 50;
    } else if (field === 'phone') {
        MAX_CHARACTERS = 12;
    } else if (field === "clabe") {
        MAX_CHARACTERS = 18;
    } else if (field === "adress") {
        MAX_CHARACTERS = 30;
    } else {
        MAX_CHARACTERS = 5;
    }

    const handleChange = (e) => {
        let value = e.target.value;

        if (field === 'phone') {
            value = value.replace(/[^0-9]/g, '');

            // Format the phone number as xxx-xxx-xxxx
            if (value.length > 3) {
                value = `${value.slice(0, 3)}-${value.slice(3)}`;
            }
            if (value.length > 7) {
                value = `${value.slice(0, 7)}-${value.slice(7)}`;
            }
        } else if (field === 'price' || field === 'clabe') {
            value = value.replace(/[^0-9]/g, '');
        }

        if (value.length > MAX_CHARACTERS) {
            value = value.substring(0, MAX_CHARACTERS); // Truncate the value to max characters
        }
        setNewValue(value);
    };

    const handleSave = () => {
        onSave(field, newValue);
        onClose();
    };

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
                    Editar / Añadir información
                </Typography>
                <TextField
                    fullWidth
                    label="Nueva información"
                    variant="outlined"
                    value={newValue}
                    onChange={handleChange}
                    inputProps={{
                        maxLength: MAX_CHARACTERS, // Set the maximum number of characters allowed
                    }}
                />
                {field === 'phone' && (
                    <FormHelperText error={!/^\d{3}-\d{3}-\d{4}$/.test(newValue)}>
                        El número de teléfono debe tener el formato xxx-xxx-xxxx
                    </FormHelperText>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        {newValue.length} / {MAX_CHARACTERS}
                    </Typography>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
