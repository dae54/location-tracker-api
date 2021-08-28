const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./users.modal");

module.exports = {
  registerUser: async (req, res, errorCb) => {
    try {
      let user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 8);
      await user.save();
      return res.status(200).json({ message: 'Sign up is successful. Use your email and password to login' });
    } catch (error) {
      return errorCb({
        status: 500,
        message: error.message,
        developerMessage: error.message,
        stack: error,
        src: "Register User",
      });
    }
  },
  login: async (req, res, error) => {
    try {
      // CHECK IF USER EXISTS
      let user = await User.findOne({ email: req.body.email }, "+password email role");
      console.log(user)
      if (!user)
        return res.status(406).json({
          message: 'Invalid credentials',
        });
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(406).json({
          message: 'Invalid credentials',
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          roleId: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2 days' }
      );

      // UPDATE USER AUTHTOKEN
      const authenticatedUser = await User.findOneAndUpdate(
        { email: req.body.email },
        { token },
        { useFindAndModify: false, new: true }
      )
      return res.status(200).json(authenticatedUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
      // return error({
      //   status: 500,
      //   message: error.message,
      //   developerMessage: error.message,
      //   stack: error,
      //   src: "Login",
      // });
    }
  },
  updateUser: async (req, res, errorCb) => {
    const update = req.body.userDetails;
    return await User.findByIdAndUpdate(
      req.params.userId,
      update,
      { new: true },
      (error, updatedUser) => {
        if (error) {
          return errorCb({
            status: 500,
            message: error.message,
            developerMessage: error.message,
            stack: error,
            src: "updateUser",
          });
        }
        res.status(200).json(updatedUser);
      },
      { new: true }
    ).exec();
  },
  signOut: async (req, res, errorCb) => {
    console.log("sign out");
    await User.updateOne(
      { _id: req.body.userId },
      { token: "" },
      { useFindAndModify: false }
    )
      .then(() => res.status(200).json({}))
      .catch((error) => {
        console.log(error);
        return errorCb({
          status: 500,
          message: error.message,
          developerMessage: error.message,
          stack: error,
          src: "signOut",
        });
      });
  },
  getAll: async (req, res, errorCb) => {
    console.log("get by all");
    let data = await User.find({});
    // const { filter } = req.query;
    // Get all users here
    return res.status(200).json(data);
  },
  getById: async (req, res, errorCb) => {
    // Get User By Id here
    return res.status(200).json({});
  },
  deleteUser: async (req, res, errorCb) => {
    await User.deleteOne({ _id: req.params.userId }).exec();
    res.status(202).json({
      message: "sucess fully deleted",
    });
  },
  resetPassword: async (req, res, errorCb) => {
    // Reset password here
  },
};
