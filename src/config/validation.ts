import * as joi from 'joi';

export const validationSchema = joi.object({
    PORT: joi.number(),
    HOST_DB: joi.string(),
    PORT_DB: joi.string(),
    USER_DB: joi.string(),
    PASSWORD_DB: joi.string(),
    NAME_DB: joi.string()
});