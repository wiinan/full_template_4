const { googleauth } = require("../models");
const { handleError, handleCreate } = require("./handleServices/handlesUtils");
const jwt = require("jsonwebtoken");

const googleAuth = async (req) => {
  const { user, sessionID, rawHeaders, headers } = req;

  const userGoogle = await googleauth.findOne({ sessionID });

  if (userGoogle) {
    console.log(userGoogle);
    const userLogged = jwt.sign({ userGoogle }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    return { userLogged, userGoogle };
  }

  await handleCreate(googleauth, {
    sessionID,
    username: user.displayName,
    email: user.emails[0].value,
    photo_url: user.photos[0].value,
    general_info: {
      sessionID,
      rawHeaders,
      headers,
    },
  });

  const userLogin = { rawHeaders, user, sessionID, headers };

  const userLogged = jwt.sign({ userLogin }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  return { userLogged, userLogin };
};

const indexUser = async (req) => {
  const { sessionID } = req;

  const user = await googleauth.findOne({ sessionID });
  return user;
};

const googleApp = async (req) => {
  const { sessionID, headers } = req;
  const { id } = req.params;

  handleError(!id, "Usuario nao encontrado!");

  const userLogin = { sessionID, headers };

  const userLogged = jwt.sign({ userLogin }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  return userLogin;
};

module.exports = {
  googleApp,
  indexUser,
  googleAuth,
};
