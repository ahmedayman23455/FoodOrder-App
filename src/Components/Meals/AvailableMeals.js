import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import loadingImg from "../../assets/loading.gif";

// React Component
const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://react-http-9f84f-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        // when i throw error inside promise will lead to promise rejected
        throw new Error("failed to fectch meals");
      }
      const mealsFB = await response.json();
      const listOfMeals = [];
      for (const [key, value] of Object.entries(mealsFB)) {
        listOfMeals.push({ id: key, ...value });
      }
      setMeals(listOfMeals);
      setIsLoading(false);
    };

    sendRequest().catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  //default: not exist meals
  let mealsAvailable = <p>no meals found</p>;

  // when the meals fetched from firebase
  if (meals.length > 0)
    mealsAvailable = (
      <ul>
        {meals.map((meal) => {
          return <MealItem meal={meal} key={meal.id} />;
        })}
      </ul>
    );

  // if exist error
  if (error) {
    mealsAvailable = <p style={{ color: "red" }}>{error}</p>;
  }

  // if meals loading
  if (isLoading) {
    mealsAvailable = <img src={loadingImg} alt="loading" />;
  }

  // console.log("mealsAvailable", mealsAvailable);
  return (
    <Card className={classes.meals}>
      <ul>{mealsAvailable}</ul>
    </Card>
  );
};

export default AvailableMeals;
