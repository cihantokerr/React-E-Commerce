import bcrypt from "bcrypt";

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


//var Comp=await CompareHash("$2b$10$irlRNhId.5L3tAI0hCryRexy30K9aSSNwkp6DvFtgrARWidcmqHhW","asadasdasd");


export{CompareHash,hashedValue}