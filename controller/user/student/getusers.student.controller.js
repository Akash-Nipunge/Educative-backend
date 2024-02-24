import {StudentData} from '../../../model/student.model.js'
const getUsers = asyncHandler(async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await StudentData.find({
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
        { rollNo: { $regex: filter } },
      ],
    });

    res.json({
      users: users.map((user) => ({
        email: user.email,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        rollNo: user.rollNo,
        role: user.role,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error("Error in getUsers:", error.message);
    res.status(500).send("Internal server error");
  }
});
