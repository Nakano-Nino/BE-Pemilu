import { Repository } from "typeorm";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { paslon } from "../entity/paslon";
import createPaslonSchema from "../utils/paslonValidator";
import cloudinary from "../utils/cloudinary";
import { extractPublicId } from "cloudinary-build-url"
import * as fs from "fs"

export default new class PaslonServices {
    private readonly paslonRepository: Repository<paslon> = AppDataSource.getRepository(paslon)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const fetchedData = await this.paslonRepository.find({relations: ['Partai'] });

            const listPaslon = fetchedData.map((paslon) => {
                return{
                    orderNum: paslon.orderNum,
                    image: paslon.image,
                    vissionMission: paslon.VissionMission,
                    coalition: paslon.Partai.map((partai) => {
                        return{
                            name: partai.name
                        }
                    })
                }
            })

            return res.status(200).json(listPaslon);
        } catch (error) {
            return res.status(500).json({ Error: "error while finding datas" })
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id)

            const fetchedData = await this.paslonRepository.findOne({ where: {id: userId}, relations: ['Partai']})
            return res.status(200).json(fetchedData)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            let uploaded = req.file.path
            let imageUrl: string = ''

            if(fs.existsSync(uploaded)){
                let cloudinaryResponse = await cloudinary.uploader.upload(uploaded, {folder: "paslon"})
                imageUrl = cloudinaryResponse.secure_url
                fs.unlinkSync(uploaded)
            }

            const { error } = createPaslonSchema.validate(data)
            if (error) return res.status(400).json({ error: error })

            const obj = this.paslonRepository.create({
                name: data.name,
                orderNum: data.orderNum,
                VissionMission: data.VissionMission,
                image: imageUrl,
            })
            
            await this.paslonRepository.save(obj)
            return res.status(200).json(obj)
        } catch (error) {
            return res.status(500).json({ Error: "Error while creating data" })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id
            const data = req.body
            let uploaded = req.file.path
            let imageUrl: string = ''

            const fetchedData = await this.paslonRepository.findOneBy({ id: Number(userId) });
            let url = fetchedData.image as string
            const publicId = extractPublicId(url)

            await cloudinary.uploader.destroy(publicId)

            if(fs.existsSync(uploaded)){
                let cloudinaryResponse = await cloudinary.uploader.upload(uploaded, {folder: "paslon"})
                imageUrl = cloudinaryResponse.secure_url
                fs.unlinkSync(uploaded)
            }

            const obj = this.paslonRepository.create({
                name: data.name,
                orderNum: data.orderNum,
                VissionMission: data.VissionMission,
                image: imageUrl
            })

            this.paslonRepository.merge(fetchedData, obj)
            const results = await this.paslonRepository.save(fetchedData)
            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id

            const fetchedData = await this.paslonRepository.findOneBy({ id: Number(userId) })
            let url = fetchedData.image as string
            const publicId = extractPublicId(url)

            const results = await this.paslonRepository.delete(userId)
            await cloudinary.uploader.destroy(publicId)

            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }
}