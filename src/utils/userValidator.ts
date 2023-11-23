import * as Joi from 'joi'

export const registerSchema = Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})