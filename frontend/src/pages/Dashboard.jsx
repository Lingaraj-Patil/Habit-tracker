import { useEffect, useState } from "react";
import { getHabits, markHabitComplete, deleteHabit, updateHabit } from "../api/habitAPI";
import ProgressTracker from "../components/ProgressTracker";
import HabitForm from "../components/HabitForm";
import HabitUpdateForm from "../components/HabitUpdateForm";

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [showHabitForm, setShowHabitForm] = useState(false); // State for creating habits
    const [editingHabit, setEditingHabit] = useState(null); // State for editing habits
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const data = await getHabits(token);
                setHabits(data.habits || []); // Handle case if habits are undefined
            } catch (error) {
                alert("Failed to load habits");
            }
        };
        fetchHabits();
    }, [token]);

    const handleMarkComplete = async (habitId) => {
        try {
            const updatedHabit = await markHabitComplete(habitId, token);
            
            // Update the state with the new progress
            setHabits((prev) =>
                prev.map((habit) =>
                    habit._id === habitId ? updatedHabit : habit
                )
            );
    
            alert("Habit progress updated!");
        } catch (error) {
            console.error("Failed to mark habit as complete:", error.message);
            alert("Failed to mark as complete");
        }
    };
    
    const handleHabitCreated = (newHabit) => {
        setHabits((prev) => [...prev, newHabit]); // Add the new habit to the list
    };

    const handleHabitUpdated = (updatedHabit) => {
        setHabits((prev) => {
            const updatedHabits = prev.map((habit) =>
                habit._id === updatedHabit._id ? updatedHabit : habit
            );
            console.log("Updated Habits List:", updatedHabits); // Check if the state is correct
            return updatedHabits;
        });
        setEditingHabit(null); // Close the update form
    };
    

    const handleDeleteHabit = async (habitId) => {
        if (window.confirm("Are you sure you want to delete this habit?")) {
            try {
                await deleteHabit(habitId, token);
                setHabits((prev) => prev.filter((habit) => habit._id !== habitId)); // Remove habit from UI
                alert("Habit deleted successfully");
            } catch (error) {
                alert("Failed to delete habit");
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Your Habits</h1>
            <button
                className="px-4 py-2 my-4 text-white bg-blue-500 rounded"
                onClick={() => setShowHabitForm(true)} // Show habit form
            >
                Create Habit
            </button>

            {/* Show Habit Form Modal */}
            {showHabitForm && (
                <HabitForm
                    onClose={() => setShowHabitForm(false)} // Close the form
                    onHabitCreated={handleHabitCreated} // Callback to update habits
                />
            )}

            {/* Show Update Form Modal */}
            {editingHabit && (
                <HabitUpdateForm
                    habit={editingHabit}
                    onClose={() => setEditingHabit(null)} // Close the update form
                    onHabitUpdated={handleHabitUpdated} // Callback to update habit in the list
                />
            )}

            {/* List of Habits */}
            {habits.map((habit) => (
                <div
                    key={habit._id}
                    className="flex justify-between p-4 my-2 border rounded"
                >
                    <div>
                        <h2 className="text-lg font-bold">{habit.name}</h2>
                        <p>{habit.description}</p>
                        <ProgressTracker
                            progress={habit.progress}
                            goal={habit.goal}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={ ()=> handleMarkComplete(habit._id)}
                            className="px-4 py-2 text-white bg-green-500 rounded"
                        >
                            Mark Complete
                        </button>
                        <button
                            onClick={() => setEditingHabit(habit)}
                            className="px-4 py-2 text-white bg-yellow-500 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteHabit(habit._id)}
                            className="px-4 py-2 text-white bg-red-500 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* No Habits Message */}
            {habits.length === 0 && (
                <p className="mt-4 text-gray-500">No habits yet. Create one!</p>
            )}
        </div>
    );
};

export default Dashboard;

