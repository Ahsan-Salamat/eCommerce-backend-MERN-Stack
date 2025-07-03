export default (user, statuscode, res) => {
  //create jwt token
  const token = user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statuscode).cookie("token", token, options).json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  })
};
