import {
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function MealChartModal({ isOpen, onClose, planType }) {
  if (!isOpen) return null;

  const weeklyMeals = [
    { day: "Monday", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Tuesday", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Wednesday", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Thursday", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Friday", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Saturday", lunch: "Veg Meal", dinner: "Soya Meal" },
    {
      day: "Sunday",
      lunch: "Veg Meal",
      dinner: planType === "Monthly" ? "Chicken Meal" : "Fish Meal",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <Paper
        elevation={6}
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg w-full max-w-xl"
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="h3">
            Meal Chart - {planType}
          </Typography>
          <IconButton onClick={onClose} color="error">
            <CloseIcon />
          </IconButton>
        </Grid>

        {/* <TableContainer component={Paper}> */}
        <Table
          size="small"
          sx={{
            "& .MuiTableCell-root": {
              color: "inherit",
              borderBottomColor: "#ccc",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Day</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Lunch</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Dinner</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weeklyMeals.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.day}</TableCell>
                <TableCell align="right">{item.lunch}</TableCell>
                <TableCell align="right">{item.dinner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </TableContainer> */}
      </Paper>
    </div>
  );
}
