import { Repository } from "typeorm";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { partai } from "../entity/partai";
import * as fs from "fs"
import cloudinary from "../utils/cloudinary";
import { extractPublicId } from "cloudinary-build-url";

export default new class partaiServices {
    private readonly partaiRepository: Repository<partai> = AppDataSource.getRepository(partai)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const fetchedData = await this.partaiRepository.find({})
            return res.status(200).json(fetchedData)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const partaiId = req.params.id

            const fetchedData = await this.partaiRepository.findOneBy({ id: Number(partaiId) })
            return res.status(200).json(fetchedData)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const role = res.locals.loginSession.user.role
            
            if(role == "user"){
                res.status(403).json({ message: "Forbidden" })
                return
            }

            const data = req.body
            const uploaded = req.file.path
            let imageUrl: string = ''

            if(fs.existsSync(uploaded)){
                let cloudinaryResponse = await cloudinary.uploader.upload(uploaded, {folder: "partai"})
                imageUrl = cloudinaryResponse.secure_url
                fs.unlinkSync(uploaded)
            }

            const obj = this.partaiRepository.create({
                name: data.name,
                ketum: data.ketum,
                vissionMission: data.vissionMission,
                address: data.address,
                image: imageUrl,
                Paslon: data.PaslonId
            })

            await this.partaiRepository.save(obj)
            return res.status(200).json(obj)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const role = res.locals.loginSession.user.role
            
            if(role == "user"){
                res.status(403).json({ message: "Forbidden" })
                return
            }

            const partaiId = req.params.id
            const data = req.body
            const uploaded = req.file.path
            let imageUrl: string = ''

            const fetchedData = await this.partaiRepository.findOneBy({ id: Number(partaiId) });
            let url = fetchedData.image as string
            const publicId = extractPublicId(url)

            await cloudinary.uploader.destroy(publicId)

            if(fs.existsSync(uploaded)){
                let cloudinaryResponse = await cloudinary.uploader.upload(uploaded, {folder: "partai"})
                imageUrl = cloudinaryResponse.secure_url
                fs.unlinkSync(uploaded)
            }

            const obj = this.partaiRepository.create({
                name: data.name,
                ketum: data.ketum,
                vissionMission: data.vissionMission,
                address: data.address,
                image: imageUrl,
                Paslon: data.PaslonId
            })

            this.partaiRepository.merge(fetchedData, obj)
            const results = await this.partaiRepository.save(fetchedData)
            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const role = res.locals.loginSession.user.role
            
            if(role == "user"){
                res.status(403).json({ message: "Forbidden" })
                return
            }

            const partaiId = req.params.id

            const fetchedData = await this.partaiRepository.findOneBy({ id: Number(partaiId) })
            let url = fetchedData.image as string
            const publicId = extractPublicId(url)

            const results = await this.partaiRepository.delete(partaiId)
            await cloudinary.uploader.destroy(publicId)

            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }
}