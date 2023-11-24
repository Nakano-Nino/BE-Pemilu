import { Repository } from "typeorm";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { artikel } from "../entity/article";
import cloudinary from "../utils/cloudinary";
import * as fs from "fs"
import { extractPublicId } from "cloudinary-build-url";
import createArticleSchema from "../utils/articleValidator";

export default new class ArticleServices {
    private readonly articleRepository: Repository<artikel> = AppDataSource.getRepository(artikel);

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const fetchedData = await this.articleRepository.find({});
            return res.status(200).json(fetchedData);
        } catch (error) {
            return res.status(500).json({ Error: "error while finding datas" })
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id

            const fetchedData = await this.articleRepository.findOne({ where: {id: Number(id)}, relations: ['User'] });

            return res.status(200).json(fetchedData)
        } catch (error) {
            return res.status(500).json({ Error: "error while finding data" })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession
            const userId = loginSession.user.id
            const userName = loginSession.user.fullName

            const data = req.body
            const uploaded = req.file.path
            let imageUrl: string = ''

            if(fs.existsSync(uploaded)){
                let cloudinaryResponse = await cloudinary.uploader.upload(uploaded, {folder: "artikel"})
                imageUrl = cloudinaryResponse.secure_url
                fs.unlinkSync(uploaded)
            }

            const obj = this.articleRepository.create({
                articleName: data.articleName,
                description: data.description,
                image: imageUrl,
                author: userName,
                createdAt: new Date(),
                User: userId
            })

            const { error } = createArticleSchema.validate(obj)
            if (error) return res.status(400).json({ Error: error })

            await this.articleRepository.save(obj)
            return res.status(200).json(obj)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession
            const userId = loginSession.user.id
            const userName = loginSession.user.fullName

            const artikelId = req.params.id
            const data = req.body
            const uploaded = req.file.path
            let imageUrl: string = ''

            const fetchedData = await this.articleRepository.findOneBy({ id: Number(artikelId) });
            let url = fetchedData.image as string
            const publicId = extractPublicId(url)

            await cloudinary.uploader.destroy(publicId)

            if(fs.existsSync(uploaded)){
                let cloudinaryResponse = await cloudinary.uploader.upload(uploaded, {folder: "artikel"})
                imageUrl = cloudinaryResponse.secure_url
                fs.unlinkSync(uploaded)
            }

            const obj = this.articleRepository.create({
                articleName: data.articleName,
                description: data.description,
                image: imageUrl,
                author: userName,
                createdAt: fetchedData.createdAt,
                User: userId
            })

            this.articleRepository.merge(fetchedData, obj)
            const results = await this.articleRepository.save(fetchedData)
            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const artikelId = req.params.id

            const fetchedData = await this.articleRepository.findOneBy({ id: Number(artikelId) })
            let url = fetchedData.image as string
            const publicId = extractPublicId(url)

            const results = await this.articleRepository.delete(artikelId)
            await cloudinary.uploader.destroy(publicId)

            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }
}