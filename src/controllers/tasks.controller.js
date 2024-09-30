import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate("user");
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({message: "Error al obtener las tareas"});
    }
};

export const createTasks = async (req, res) => {
    try {
        const { name, description, date, } = req.body;

        const newTask = new Task({
            name,
            description,
            date,
            user: req.user.id,
        });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({message: "Error al crear la tarea"});
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("user");
        if (!task) return res.status(404).json({message: "Tarea no encontrada"});
        res.json(task);
    } catch (error) {
        return res.status(404).json({message: "Tarea no encontrada"});
}
};

export const deleteTasks = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({message: "Tarea no encontrada"});
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({message: "Tarea no encontrada"});
    }
};

export const updateTasks = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, 
            {
                new: true
            }
        );
        if (!task) return res.status(404).json({message: "Tarea no encontrada"});
        res.json(task);
    } catch (error) {
        return res.status(404).json({message: "Tarea no encontrada"});
    }
};