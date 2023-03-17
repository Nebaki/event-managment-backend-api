const sendToken = (user, statuscode, res) => {
    //create jwt token
    const token = user.getJwtToken();
  
    //options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statuscode).json({
      status: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;