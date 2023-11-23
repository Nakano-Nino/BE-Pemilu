import * as Joi from 'joi'

const createArticleSchema = Joi.object({
    articleName: Joi.string().min(10).required(),
    description: Joi.string().min(20).required(),
    image: Joi.required(),
    author: Joi.required(),
    createdAt: Joi.required(),
    User: Joi.required() 
})

export default createArticleSchema