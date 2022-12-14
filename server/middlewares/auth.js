export const canChangeTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (task.postedBy._id.toString() !== req.user._id.toString()) {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};
