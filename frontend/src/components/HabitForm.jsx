import { useState } from "react";
import {createHabit} from "../api/habitAPI"

const  HabitForm = ({onClose,onHabitCreated}) => {
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [frequency,setFrequency] = useState("daily");
    const [startDate,setStartDate] = useState("");
    const [goal,setGoal] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const newHabit = await createHabit(
                {name,description,frequency,startDate,goal},
                token
            );
            onHabitCreated(newHabit.createdHabit);
            onClose();
        }
        catch(error){
            alert("Failed to create Habit!");
        }
    };

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <form
                onSubmit={handleSubmit}
                className="p-6 space-y-4 bg-white rounded shadow-md"
            >
                <h2 className="text-xl font-bold">Create a new Habit</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border"
                    required
                />
                <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full p-2 border"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="number"
                    placeholder="Goal (e.g., 10 days)"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full p-2 border"
                />
                <button className="px-4 py-2 text-white bg-blue-500 rounded">
                    Create Habit
                </button>
                <button 
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 ml-2 text-white bg-gray-500 rounded"
                >
                    Cancel
                </button>
            </form>
        </div>

    )
}

export default HabitForm;