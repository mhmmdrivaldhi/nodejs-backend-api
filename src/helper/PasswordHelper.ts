import bcrypt from 'bcrypt';

const PasswordHasing = async(password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const PasswordCompare = async(password: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export default { PasswordHasing, PasswordCompare    
}