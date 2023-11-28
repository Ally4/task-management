import Joi from '@hapi/joi';

export const edit = Joi.object().keys({
  firstName: Joi.string().min(5).max(15).trim(),
  lastName: Joi.string().min(5).max(15).trim(),
  email: Joi.string().email().trim(),
  address: Joi.string().min(5).max(15).trim(),
  phoneNumber: Joi.string().min(5).max(15).trim(),
});

export const validationEdit = (req, res, next) => {
  const { error } = edit.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
