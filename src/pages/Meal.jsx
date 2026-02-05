import React, { useMemo } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import useUserStore from '../store/userStore';
import MealInputForm from '../components/MealInputForm';

const Meal = () => {
  // Select the raw mealLog. Zustand will efficiently update this component only when mealLog changes.
  const mealLog = useUserStore((state) => state.currentUser?.mealLog || []);

  // useMemo will cache the filtered list. The filter logic will only re-run if the mealLog array changes.
  const dailyMeals = useMemo(() => {
    const today = new Date();
    return mealLog.filter(meal => {
      if (!meal || !meal.date) return false; // Defensive check for valid meal entries
      const mealDate = new Date(meal.date);
      return mealDate.getFullYear() === today.getFullYear() &&
             mealDate.getMonth() === today.getMonth() &&
             mealDate.getDate() === today.getDate();
    });
  }, [mealLog]);

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Log Your Meal
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <MealInputForm />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h2" gutterBottom>Today's Meals</Typography>
          <List>
            {dailyMeals.length > 0 ? (
              dailyMeals.map((meal, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={`${meal.description} - ${meal.calories} calories`}
                    secondary={new Date(meal.date).toLocaleTimeString()}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No meals logged yet today.</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Meal;
