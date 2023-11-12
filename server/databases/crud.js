import db from './connection.js'

export async function getStoredPassword(email) {

    const query = 'SELECT password FROM userbase WHERE email = ?';
    
    try {
        const storedPassword = await db.get(query, [email]);        

        if (storedPassword) {
            return storedPassword.password;
        } else {
            //random encrypted string
            return "$2b$14$ucxFu1.gSbbQ/pljcl5gOeVcQhv1uioMpq1stESFH1b8PQrZI7EUC"
        }
    } catch (error) {
        console.error('Error retrieving password:', error);
        return "null"
    }
}
