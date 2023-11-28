import Joi from '@hapi/joi';

export const signup = Joi.object().keys({
  firstName: Joi.string().min(5).max(15).trim().required(),
  lastName: Joi.string().min(5).max(15).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(5).max(30).trim().required(),
  confirmPassword: Joi.string().min(5).max(30).trim().required(),
  address: Joi.string().min(5).max(15).trim().required(),
  phoneNumber: Joi.string().min(5).max(15).trim().required(),
});

export const validationSignup = (req, res, next) => {
  const { error } = signup.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
