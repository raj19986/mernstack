require('dotenv').config()

const productsData = require('./products')
const connectDB = require('./db')
const Product = require('./Product')

const usersData = require('./users')
const User = require('./User')

connectDB()

const importData = async () => {
    try {
        await Product.deleteMany({})

        await Product.insertMany(productsData)

        

        await User.insertMany(usersData)

        console.log(" Data import success")
        process.exit()
    } catch (error) {
        console.error("Error with  Data import ")
        process.exit(1)
    }
}

importData()