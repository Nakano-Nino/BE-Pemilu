import { AppDataSource } from "./data-source"
import * as express from 'express'
import articleRoute from "./route/articleRouter"
import paslonRoute from "./route/paslonRouter"
import partaiRoute from "./route/partaiRouter"
import voterRoute from "./route/voterRouter"
import * as cors from "cors"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const  port = 5000

        app.use(express.json())
        app.use(cors())    
        app.use("/api/v1", articleRoute)
        app.use("/api/v1", paslonRoute)
        app.use("/api/v1", partaiRoute)
        app.use("/api/v1", voterRoute)    

        app.listen(port, ()=> `App listening on port ${port}`)
    })
    .catch(error => console.log(error))
