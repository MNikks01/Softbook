
import bcrypt from "bcryptjs";

const saltRounds = 10;

const hashPassword = async (inputPassword) => {

    let hashedPassword = await bcrypt.hash(
        inputPassword,
        saltRounds,
        async (err, hash) => {
            if (err) console.log('error', err);
            console.log('hashed password', hash);
            // hashPassword = hash
        }
    );


    return hashedPassword
}

export default hashPassword