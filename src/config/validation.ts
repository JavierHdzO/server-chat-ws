import * as joi from 'joi';

export const validationSchema = joi.object({
    PORT: joi.number(),
    PASSWORD_DB: joi.string(),
    USERNAME_DB: joi.string(),
    NAME_DB: joi.string(),
    HOST_DB: joi.string(),
    PORT_DB: joi.string()
});