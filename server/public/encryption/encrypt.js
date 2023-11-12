import bcrypt from 'bcrypt'

async function hashpassword(plainTextPassword){
    const saltRounds = 14
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds)
    
    return hashedPassword
}


export default hashpassword



