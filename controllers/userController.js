const User = require('../models/userModel');

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, { __v: 0 });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    // BUILDING A QUERY
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((field) => delete queryObj[field]);
    // console.log(queryObj);

    let query = User.find(queryObj);

    // 1) SORTING
    // ?sort=name,username
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      // 'name username'
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 2) FIELD LIMITING
    // ?fields=name,username,email,phone,website
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    const users = await query;

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};
