// Environment Context
const CONTEXT = process.env.NODE_ENV || 'DEVELOPMENT';

const mailer = require('../../utils/common/mailer');
const { getRandomNumber } = require('../../utils/common/utilityFunctions');
const HTMLGenerator = require('../../utils/common/html-generator');
const localStore = require('../../helpers/storage/local-store');

const SIGNUP_WELCOME_SUBJECT = 'Welcome to Dinero';
const SIGNUP_TEXT = 'Signup code: [[CODE]]';

function signupSequence(app) {
  app.all('/sendSignupCode', async (req, res, next) => {
    const pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    const valid = pattern.test(req.body.email);
    if (!valid) {
      return res.status(500).send('Enter a valid E-mail');
    }
    const email = req.body.email;

    // Generate random 6 digit code
    const code = getRandomNumber(100000, 999999);

    try {
      // Generate HTML from EJS
      const html = await HTMLGenerator({ template: 'signupcode', params: { code } });

      mailer(
        email,
        process.env.FROM_EMAIL,
        SIGNUP_WELCOME_SUBJECT,
        html,
        SIGNUP_TEXT.replace('[[CODE]]', code)
      );

      await saveCode(email, code);

      return res.send('Done');
    } catch (error) {
      return res.status(500).send('Failed to send code. Please contact us at admin@dinero.in.');
    }
  });
}

async function saveCode(email, code) {
  if (CONTEXT === 'PRODUCTION') {
    const redisStore = require('../../helpers/storage/redis-store');
    return await redisStore.set(email, code);
  } else {
    const localStore = require('../../helpers/storage/local-store');
    return localStore.set(email, code);
  }
}

module.exports = signupSequence;
