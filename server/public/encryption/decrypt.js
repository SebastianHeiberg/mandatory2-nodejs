import bcrypt from 'bcrypt'

async function comparePasswords(plainTextPassword, storedHashPassword){
    const compareResult = await bcrypt.compare(plainTextPassword, storedHashPassword)
    return compareResult    
}

export default comparePasswords