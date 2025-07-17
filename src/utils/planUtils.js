// src/utils/planUtils.js
export const addToPlan = (temple) => {
  const existingPlan = JSON.parse(localStorage.getItem("plannedTemples")) || [];
  const alreadyAdded = existingPlan.some((t) => t.name === temple.name);

  if (!alreadyAdded) {
    const updatedPlan = [...existingPlan, temple];
    localStorage.setItem("plannedTemples", JSON.stringify(updatedPlan));
    alert(`${temple.name} added to your plan!`);
  } else {
    alert(`${temple.name} is already in your plan.`);
  }
};
