import {
  Modal,
  Box,
} from "@mui/material";
import { TimeSlotForm } from "../TimeSlotForm/TimeSlotForm";

export const TimeSlotModal = ({ openTimeSlot, onCloseTimeSlot }) => {
  return (
    <Modal open={openTimeSlot} onClose={onCloseTimeSlot}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          minWidth: 400,
        }}
      >
        <TimeSlotForm onCloseTimeSlot={onCloseTimeSlot} />
      </Box>
    </Modal>
  );
};
