import Joi from 'joi';

function transactionValidation(request, response, next) {
    const { type, value, description, date } = response.locals.body;
    const schema = Joi.object({
        type: Joi.string().valid('debit', 'credit').required(),
        value: Joi.number().positive().precision(2).min(0.01).required(),
        description: Joi.string().min(1).default("Operation").required(),
        date: Joi.number().min(0).positive().required(),
    });
    const validation = schema.validate({
        type: type,
        value: value,
        description: description,
        date: date
    });

    if (validation.error !== undefined) {
        response.status(422).send(`${validation.error.details.context.value} is invalid. Try another value.`);
        return
    };

    console.log(validation.value)
    response.locals.body = validation.value;
    next();
}

export default transactionValidation 