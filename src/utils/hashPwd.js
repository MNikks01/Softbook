
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

const verifyPwd = (inpPwd, hashedPwd) => {
    try {
        bcrypt.verify(inpPwd, hashedPwd, (err, isMatch) => {
            if (err) {
                return false
            }
            return isMatch
        })
    } catch (error) {
        return false
    }
}

export { hashPassword, verifyPwd }