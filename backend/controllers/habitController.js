const Habit = require("../models/habitModel");
const asyncHandler = require("express-async-handler");

const createHabit = asyncHandler(async(req,res)=>{
    const { name,description,frequency,startDate,progress,isActive,category,goal } = req.body;
    if(!name|| !description  || !description || !frequency || !startDate || !goal === undefined){
        return res.status(400).json({message:"Please provide all required fields!"})
    }

    const habit = new Habit({
        user: req.user._id,
        name,description,frequency,startDate,
        progress: progress || [],
        isActive: isActive || true,
        category,goal
    })

    const createdHabit = await habit.save();
    res.status(200).json({createdHabit});
})

const getHabit = asyncHandler(async(req,res)=>{
    const habits = await Habit.find({user:req.user._id});
    res.status(200).json({habits});
})

const updateHabit = asyncHandler(async(req,res)=>{
    const habits = await Habit.findById(req.params.id);
    if(!habits){
        return res.status(400).json({message:"Habit not found"});
    }
    if(habits.user.toString() !== req.user._id.toString()){
        return res.status(400).json({message:"Unauthorised access"});
    }

    const allowedUpdates = ['name', 'description', 'frequency', 'startDate', 'isActive', 'category', 'goal', 'progress'];
    const updates = Object.keys(req.body).reduce((acc, key) => {
        if (allowedUpdates.includes(key)) acc[key] = req.body[key];
        return acc;
    }, {});

    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id,updates,{ new:true });
    res.status(200).json({updatedHabit});
})

const deleteHabit = asyncHandler(async(req,res) => {
    const habit = await Habit.findById(req.params.id);

    if(!habit){
        return res.status(400).json({message:"Habit not found"});
    }
    if(habit.user.toString() !== req.user._id.toString()){
        return res.status(400).json({message:"Unauthorised access"});
    }

    await habit.deleteOne()
    res.status(200).json({message:"Habit deleted"});
})

const markHabitComplete = asyncHandler(async(req,res) => {
    const habit = await Habit.findById(req.params.id);
     
    if(!habit){
        return res.status(404).json({message: "Habit not found"});
    }
    if(habit.user.toString() !== req.user._id.toString()){
        return res.status(400).json({message: "Unauthorised Access"});
    }

    const currentDate = new Date();
    const alreadyCompleted = habit.progress.some(date=>
        new Date(date).toDateString() === currentDate.toString()
    );
    if(alreadyCompleted){
        return res.status(400).json({message:"Habit already marked as completed"})
    }

    habit.progress.push(currentDate);
    await habit.save();
    res.status(200).json({message:"Habit marked as complete ",habit})
})

module.exports = {
    createHabit,getHabit,updateHabit,deleteHabit,markHabitComplete
}