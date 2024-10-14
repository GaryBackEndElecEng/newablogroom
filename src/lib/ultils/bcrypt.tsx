import bcrypt from "bcryptjs";

export async function hashKey(pswd: string) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(pswd, salt)
}
export async function hashComp(pswdHash: string | null, hash: string | undefined) {
    if (pswdHash && hash) {
        const comp = await bcrypt.compare(pswdHash, hash);
        return comp
    } else {
        return false
    }
}
export async function genHash(pswd: string) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(pswd, salt)
}
export async function compToHash(pswd: string, hash: string) {
    const comp = bcrypt.compare(pswd, hash);
    return comp
}
// async function hashKey(pswd) {
//     let salt = bcrypt.genSaltSync(8);
//     return bcrypt.hashSync(pswd, salt)
// async function hash_comp2(pswdHash,hash) {
//         var comp = await bcrypt.compare(pswdHash, hash);
//         return comp
// }