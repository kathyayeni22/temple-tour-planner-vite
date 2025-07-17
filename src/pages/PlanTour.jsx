import React, { useEffect, useState } from "react";
import "./PlanTour.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const savePlanToFirebase = async (plan) => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, { plan }, { merge: true });
    alert("✅ Plan saved to your account!");
  } else {
    alert("⚠️ Please log in to save your plan.");
  }
};

function PlanTour() {
  const [plan, setPlan] = useState([]);

  // ✅ Fetch saved plan from Firebase on mount
  useEffect(() => {
    const fetchUserPlan = async () => {
      const user = auth.currentUser;
      const localPlan = JSON.parse(localStorage.getItem("plannedTemples")) || [];

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const firebasePlan = data.plan || [];
          setPlan(firebasePlan);
          localStorage.setItem("plannedTemples", JSON.stringify(firebasePlan));
        } else {
          setPlan(localPlan); // fallback to local
        }
      } else {
        setPlan(localPlan); // user not logged in
      }
    };

    fetchUserPlan();
  }, []);

  const handleRemove = (templeToRemove) => {
    const updatedPlan = plan.filter((t) => t.name !== templeToRemove.name);
    setPlan(updatedPlan);
    localStorage.setItem("plannedTemples", JSON.stringify(updatedPlan));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🗺️ Your Planned Temples</h2>

      {plan.length === 0 ? (
        <p>No temples added to your plan yet.</p>
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {plan.map((temple, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "250px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={temple.image}
                  alt={temple.name}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h3>{temple.name}</h3>
                <p>{temple.location || temple.significance}</p>
                <button
                  onClick={() => handleRemove(temple)}
                  style={{
                    marginTop: "8px",
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "6px 10px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => savePlanToFirebase(plan)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#1e88e5",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            💾 Save Plan
          </button>
        </>
      )}
    </div>
  );
}

export default PlanTour;
