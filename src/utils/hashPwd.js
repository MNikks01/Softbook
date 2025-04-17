
import bcrypt from "bcryptjs";

const hashPassword = async (inputPassword) => {
    const saltRounds = 10;

    try {
        let hashedPassword = await bcrypt.hash(inputPassword, saltRounds);
        return hashedPassword
    } catch (error) {
        return error
    }
}

const verifyPwd = async (inpPwd, hashedPwd) => {
    try {
        const isMatch = await bcrypt.compare(inpPwd, hashedPwd)
        return isMatch
    } catch (error) {
        console.log('error', error)
        return false
    }
}

export { hashPassword, verifyPwd }