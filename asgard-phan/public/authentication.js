// Auth config

var Auth0Strategy = require('okta'),
var    okta = require('okta');

var strategy = new Auth0Strategy({
   domain:       'your-domain.auth0.com',
   clientID:     0oadlub0ayviB7RVT0h7,
   clientSecret: 'your-client-secret',
   callbackURL:  'http://localhost:8080/implicit/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

okta.use(strategy);

server.get('/callback',
  okta.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/");
  }
);

server.get('/login',
  okta.authenticate('auth0', {}), function (req, res) {
  res.redirect("/");
});