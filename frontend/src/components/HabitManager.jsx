import React, { useState } from "react";
import HabitForm from "./HabitForm";
import HabitUpdateForm from "./HabitUpdateForm";
import HabitList from "./HabitList";

const HabitManager = () => {
    const [habits, setHabits] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);

    const handleHabitCreated = (habit) => {
        setHabits([...habits, habit]);
    };

    const handleHabitUpdated = (updatedHabit) => {
        setHabits(habits.map((habit) => (habit._id === updatedHabit._id ? updatedHabit : habit)));
        setEditingHabit(null);
    };

    const handleHabitDeleted = (id) => {
        setHabits(habits.filter((habit) => habit._id !== id));
    };

    return (
        <div>
            <button onClick={() => setShowForm(true)} className="px-4 py-2 text-white bg-blue-500 rounded">
                Add New Habit
            </button>
            {showForm && (
                <HabitForm
                    onClose={() => setShowForm(false)}
                    onHabitCreated={handleHabitCreated}
                />
            )}
            {editingHabit && (
                <HabitUpdateForm
                    habit={editingHabit}
                    onClose={() => setEditingHabit(null)}
                    onHabitUpdated={handleHabitUpdated}
                />
            )}
            <HabitList
                habits={habits}
                onMarkComplete={(id) => console.log(`Mark complete for habit ${id}`)}
                onHabitDeleted={handleHabitDeleted}
            />
        </div>
    );
};

export default HabitManager;
