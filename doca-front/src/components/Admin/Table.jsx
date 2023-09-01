import * as React from "react";
import { DataGrid, GridExpandMoreIcon } from "@mui/x-data-grid";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
const svHost = import.meta.env.VITE_HOST;

export const Table = ({ row, column, title }) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [isExpanded, setIsExpanded] = React.useState(
    title === "Usuarios" ? true : false
  );

  const handleAccordionChange = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2, gap: 2 }}>
      <Accordion expanded={isExpanded} onChange={handleAccordionChange}>
        <AccordionSummary sx={{ p: 3 }}>
          <Box
            className="title"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "left",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontFamily: "work sans", fontSize: "2.2rem" }}
            >
              {title}
            </Typography>
            <SvgIcon component={GridExpandMoreIcon} inheritViewBox />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {row.length > 0 && column.length > 0 ? (
            <Box>
              <DataGrid
                rows={row}
                columns={column}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>
          ) : (
            <Typography
              sx={{
                fontFamily: "work sans",
                fontSize: isMobile ? "1.4rem" : "1.5rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {`No hay ${title.toLowerCase()} disponibles`}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
