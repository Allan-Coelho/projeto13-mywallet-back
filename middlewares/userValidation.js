import Joi from 'joi';

function userValidation(request, response, next) {
    const nameSchema = Joi.string().min(1);
    const emailSchema = Joi.string().email();
    const passwordSchema = Joi.string().min(8);
    const isNameValid = nameSchema.validate(response.locals.body.name);
    const isEmailValid = emailSchema.validate(response.locals.body.email);
    const isPasswordValid = passwordSchema.validate(response.locals.body.password);

    if (isEmailValid.error !== undefined && isNameValid.error !== undefined && isPasswordValid.error !== undefined) {
        next();
        return
    }

    response.sendStatus(422);
}

export { userValidation }