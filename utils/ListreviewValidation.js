const Joi = require('joi');
module.exports.listValidation =Joi.object({
    title: Joi.string().required(),
   price: Joi.number().integer().min(0).required(),
   address: Joi.string().required(),
   owner: Joi.string().required(),

})
module.exports.reviewValidation =Joi.object({
    comment: Joi.string().min(5).max(180).required(),
})