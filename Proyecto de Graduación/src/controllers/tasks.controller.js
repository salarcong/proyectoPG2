import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate("user");
    res.json(tasks);
};

export const createTasks = async (req, res) => {
    const { name, description, date, } = req.body;

    const newTask = new Task({
        name,
        description,
        date,
        user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json({savedTask,
        createdAt: newTask.save.createdAt,
        updatedAt: newTask.save.updatedAt,
    });
};

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({message: "Task not found"});
    res.json(task);
};

export const deleteTasks = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({message: "Task not found"});
    return res.sendStatus(204);
};

export const updateTasks = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, 
        {
            new: true
        }
    );
    if (!task) return res.status(404).json({message: "Task not found"});
    res.json(task);
};