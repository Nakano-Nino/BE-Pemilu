import { AppDataSource } from "./data-source"
import * as express from 'express'
import articleRoute from "./route/articleRouter"
import paslonRoute from "./route/paslonRouter"
import partaiRoute from "./route/partaiRouter"
import voterRoute from "./route/voterRouter"
import userRoute from "./route/userRouter"
import * as cors from "cors"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const  port = 5000

        app.use(express.json())
        app.use("/api/v1", articleRoute)
        app.use("/api/v1", paslonRoute)
        app.use("/api/v1", partaiRoute)
        app.use("/api/v1", voterRoute)
        app.use("/api/v1", userRoute)
        
        const options:cors.CorsOptions = {
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false,
            optionsSuccessStatus: 204
        }
        app.use(cors(options))

        app.listen(port, ()=> `App listening on port ${port}`)
    })
    .catch(error => console.log(error))
