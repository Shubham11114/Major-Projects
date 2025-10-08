const Joi = require('joi');


module.exports.listingSchema = Joi.object({
    listing:Joi.object({

    title:Joi.string()
    .alphanum()
    .min(5)
    .required(),
    description:Joi.string().required(),
    location:Joi.string().required(),
    price:Joi.number(),
    country:Joi.string().required(),
    image:Joi.string().allow("",null)
    }).required()
    
})