import React, { useState } from "react";

function App() {
  const meals = [
    { id: 1, name: "Biryani", price: 150, isAvailable: true },
    { id: 2, name: "Noodles", price: 100, isAvailable: false },
    { id: 3, name: "Paneer Curry", price: 180, isAvailable: true },
  ];

  const [selectedMeals, setSelectedMeals] = useState([]);
  const [showAvailable, setShowAvailable] = useState(true);
  const [sortOrder, setSortOrder] = useState("low");

  // Filter meals
  const filteredMeals = showAvailable
    ? meals.filter((m) => m.isAvailable)
    : meals;

  // Sort meals
  const sortedMeals = [...filteredMeals].sort((a, b) =>
    sortOrder === "low" ? a.price - b.price : b.price - a.price
  );

  // Add meal (no duplicates)
  const addMeal = (meal) => {
    const alreadyAdded = selectedMeals.find((m) => m.id === meal.id);
    if (!alreadyAdded) {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };

  // Total price
  const total = selectedMeals.reduce((sum, meal) => sum + meal.price, 0);

  return (
    <div>
      <h1>Meal App</h1>

      {/* ✅ FILTER BUTTON */}
      <button onClick={() => setShowAvailable(!showAvailable)}>
        {showAvailable ? "Show All Meals" : "Show Available Only"}
      </button>

      {/* ✅ SORT BUTTON */}
      <button onClick={() => setSortOrder(sortOrder === "low" ? "high" : "low")}>
        Sort: {sortOrder === "low" ? "Low → High" : "High → Low"}
      </button>

      <h2>Meals List</h2>

      {sortedMeals.map((meal) => (
        <div key={meal.id}>
          {meal.name} - ₹{meal.price}{" "}
          {meal.isAvailable ? (
            <button onClick={() => addMeal(meal)}>Add</button>
          ) : (
            <span style={{ color: "red" }}>Not Available</span>
          )}
        </div>
      ))}

      <h2>Selected Meals</h2>

      {selectedMeals.length === 0 && <p>No meals selected</p>}

      {selectedMeals.map((meal) => (
        <div key={meal.id}>
          {meal.name} - ₹{meal.price}
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default App;