import crypto from 'crypto';

export function hashPassword(password:string){
    const salt = crypto.randomBytes(16).toString("hex");

    const hash = crypto.pbkdf2Sync(password,salt,1000,64,"sha512").toString('hex');

    return { hash,salt};
}
export function verifyPassword(
    {canditatePassword,salt,hash}:{canditatePassword:string,salt:string,hash:string}){
    const canditatehash = crypto.pbkdf2Sync(canditatePassword,salt,1000,64,"sha512").toString('hex');

    return canditatehash === hash;

}