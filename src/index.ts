import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './data-source'

//services
import { registerUser } from './services/user/registerUser'
import { loginUser } from './services/user/loginUser'
import { verifyUser } from './services/user/verifyUser'
import { createUrl } from './services/url/createUrl'
import { deactivateUrl } from './services/url/deactivateUrl'
import { activateUrl } from './services/url/activateUrl'
import { redirectUrl } from './controllers/url/redirectUrl'

const app = express()
app.use(express.json())

//USER

app.post('/register', async (req, res) => {
    try {
        const result = await registerUser(req.body)
        res.status(200).json(result)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

app.post('/login', async (req, res) => {
    try {
        const result = await loginUser(req.body)
        res.status(200).json(result)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

app.post('/verify', async (req, res) => {
    try {
        const result = await verifyUser(req.body)
        res.status(200).json(result)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

//URL ROUTES

app.post('/url', async (req, res) => {
    try {
        const result = await createUrl(req.body)
        res.status(200).json(result)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

app.patch('/url/deactivate', async (req, res) => {
    try {
        const result = await deactivateUrl(req.body)
        res.status(200).json(result)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

app.patch('/url/activate', async (req, res) => {
    try {
        const result = await activateUrl(req.body)
        res.status(200).json(result)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

//REDIRECT IMPORTANTE
app.get('/url/:shortUrl', redirectUrl)

// INICIALIZAR DB + SERVER

AppDataSource.initialize()
    .then(() => {
        console.log('DB conectada')

        app.listen(3000, () => {
            console.log('Server corriendo en http://localhost:3000')
        })
    })
    .catch((error) => {
        console.error('Error al conectar DB:', error)
    })