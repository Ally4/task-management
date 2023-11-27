import Joi from '@hapi/joi';
export const task = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),  
  address: Joi.string().required(),
  category: Joi.string().required(),
  tests: Joi
  .array()
  .items(
    Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
    })
  )
  .required(),
});
export const validateTask = (req, res, next) => {
  const { error } = task.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};