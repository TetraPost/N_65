const Provider = require('models/provider');

const saveProvide = async (strategies, profile, userId) => {
  const user = new Provider({
    provider: strategies,
    providerUserId: profile.id,
    displayName: profile.displayName,
    photos: {
      value: profile.photos[0].value,
    },
    userId,
    providerLog: profile._json,
  });
  user.save(async (err) => {
    if (err) console.log(err);
  });
};

module.exports = {
  saveProvide,
};