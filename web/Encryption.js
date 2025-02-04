import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";

const saltRounds = 10;

const hashedValue = async (data) => {
    try {
        return await bcrypt.hash(data, saltRounds); // ✅ Returns the hashed value
    } catch (error) {
        throw new Error("Error hashing data: " + error.message);
    }
};
//var Hashed= await hashedValue("asadasdasd");




const CompareHash = async (hashedData, plainData) => {
    try {
        return await bcrypt.compare(plainData, hashedData);
    } catch (error) {
        throw new Error("Error comparing hashes: " + error.message);
    }
};
//var Comp=await CompareHash("$2b$10$M4TmdjmOrPLOIgn2UuSAT.1grnGUW2lYwCi5aLu0RK3GKYN0WW/B6","1234");


//!secret key will be changed after production
const encryptAES = (text) => {
    return CryptoJS.AES.encrypt(text, "secretKey").toString();
};
  



const decryptAES = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, "secretKey");
    return bytes.toString(CryptoJS.enc.Utf8);
};





export{CompareHash,hashedValue,encryptAES,decryptAES}