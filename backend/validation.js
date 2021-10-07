const Joi = require('joi');

//signup validation
const signupValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
    
        email: Joi.string()
            .email()
            .min(6)
            .max(50)
            .required(),
    
        password: Joi.string()
            .min(4)
            .max(1000)
            .required(),
    });
    return schema.validate(data);
}

module.exports.signupValidation = signupValidation;

    