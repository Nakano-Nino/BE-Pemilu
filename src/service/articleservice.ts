import { Repository } from "typeorm";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { artikel } from "../entity/article";

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

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id

            const fetchedData = await this.articleRepository.findOneBy({ id: Number(id) });
            return res.status(200).json(fetchedData)
        } catch (error) {
            return res.status(500).json({ Error: "error while finding data" })
        }
    }
}