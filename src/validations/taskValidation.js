import Joi from '@hapi/joi';
export const task = Joi.object().keys({
  title: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),  
  address: Joi.string().required(),
  description: Joi.string().required(),
  // assignee: Joi
  // .array()
  // .items(
  //   Joi.object({
  //     firstName: Joi.string(),
  //     lastName: Joi.string(),
  //   })
  // )
  // .required(),
  priority: Joi.string().required(),
  project: Joi.string().required(),
  pdf: Joi.string().required(),
  picture: Joi.string().required(),
});
export const validateTask = (req, res, next) => {
  console.log("this is the req", req)
  const { error } = task.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};