const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({
    path: './config/config.env'
})

const Bootcamp = require('./models/Bootcamp')

mongoose.connect(process.env.MONGOOSE_CONNECTION_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        console.log('Data Imported...')
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        console.log('Data Deleted...')
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.env[2] === '-d') {
    deleteData()
}