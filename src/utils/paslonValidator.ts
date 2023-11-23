import * as Joi from 'joi'

const createPaslonSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    orderNum: Joi.number().required(),
    VissionMission: Joi.string().min(10).max(100).required(),
    Partai: Joi.required()
})

export default createPaslonSchema