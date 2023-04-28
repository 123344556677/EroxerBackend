import mongoose from 'mongoose'

mongoose.set('strictQuery', true);
const connection = async (URL) => {
    try {
        mongoose.set('strictQuery', false);
        console.log('database is running')

        await mongoose.connect(URL)
    }
    catch (error) {
        console.log('database is not connected', error)
    }
}

export default connection;