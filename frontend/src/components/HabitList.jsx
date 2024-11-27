import React from "react";
import ProgressTracker from "./ProgressTracker";

const HabitList = ({ habits, onMarkComplete, onHabitDeleted }) => {
    const token = localStorage.getItem("token");

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this habit?")) {
            try {
                await deleteHabit(id, token);
                onHabitDeleted(id); // Remove habit from the list in the parent component
            } catch (error) {
                alert("Failed to delete habit!");
            }
        }
    };

    return (
        <div>
            {habits.map((habit) => (
                <div
                    key={habit._id}
                    className="flex justify-between p-4 my-2 border rounded"
                >
                    <div>
                        <h2 className="text-lg font-bold">{habit.name}</h2>
                        <p>{habit.description}</p>
                        <ProgressTracker progress={habit.progress} goal={habit.goal} />
                    </div>
                    <button
                        onClick={() => onMarkComplete(habit._id)}
                        className="px-4 py-2 text-white bg-green-500 rounded"
                    >
                        Mark Complete
                    </button>
                    <button
                            onClick={() => handleDelete(habit._id)}
                            className="px-4 py-2 text-white bg-red-500 rounded"
                    >
                            Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default HabitList;
