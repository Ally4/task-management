import Joi from '@hapi/joi';

export const login = Joi.object().keys({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(1).max(30).trim().required(),
});

export const validationLogin = (req, res, next) => {
  const { error } = login.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
