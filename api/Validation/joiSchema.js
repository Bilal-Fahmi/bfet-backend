const joi = require ('joi')

exports.SignupSchema = joi.object({
    name: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email : joi.string()
        .email({minDomainSegments:2})
        .required(),
    password: joi.string()
        .min(5)
        .required(),
    confirmpassword: joi.ref('password')

})

exports.LoginSchema = joi.object({

    email : joi.string()
        .email({minDomainSegments:2})
        .required(),
    password: joi.string()
        .min(5)
        .required(),

})