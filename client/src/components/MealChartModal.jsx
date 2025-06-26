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
    { day: "Day-01", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-02", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-03", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-04", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-05", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-06", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-07", lunch: "Veg Meal", dinner: "Chicken Meal" },
  ];

  const monthlyMeals = [
    { day: "Day-01", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-02", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-03", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-04", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-05", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-06", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-07", lunch: "Veg Meal", dinner: "Chicken Meal" },
    { day: "Day-08", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-09", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-10", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-11", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-12", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-13", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-14", lunch: "Veg Meal", dinner: "Chicken Meal" },
    { day: "Day-15", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-16", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-17", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-18", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-19", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-20", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-21", lunch: "Veg Meal", dinner: "Chicken Meal" },
    { day: "Day-22", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-23", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-24", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-25", lunch: "Veg Meal", dinner: "Egg Meal" },
    { day: "Day-26", lunch: "Fish Meal", dinner: "Veg Meal" },
    { day: "Day-27", lunch: "Veg Meal", dinner: "Soya Meal" },
    { day: "Day-28", lunch: "Veg Meal", dinner: "Prime Meal" },
  ];

  const dailyMeals = [{ day: "Day-01", lunch: "Veg Meal", dinner: "Egg Meal" }];

  const mealsToRender =
    planType === "Monthly Plan"
      ? monthlyMeals
      : planType === "Weekly Plan"
      ? weeklyMeals
      : dailyMeals;
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

        <TableContainer sx={{ maxHeight: 400, overflow: "auto" }}>
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
              {mealsToRender.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.day}</TableCell>
                  <TableCell align="right">{item.lunch}</TableCell>
                  <TableCell align="right">{item.dinner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
