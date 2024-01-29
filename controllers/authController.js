import User from '../models/userModel'
import catchAsync from '../utils/catchAsync'

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body)
    res.status(201).json({
        user: newUser
    })
})