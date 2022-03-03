const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "944412260089-4dnnfv7fa695rin048024gaa9cmnt1pv.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://127.0.0.1:3000/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);
