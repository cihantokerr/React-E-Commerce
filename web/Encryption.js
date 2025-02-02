import bcrypt from "bcrypt";

const saltRounds = 10;

const hashedValue = async (data) => {
    try {
        return await bcrypt.hash(data, saltRounds); // ✅ Returns the hashed value
    } catch (error) {
        throw new Error("Error hashing data: " + error.message);
    }
};

var Hashed= await hashedValue("asadasdasd");




const CompareHash = async (hashedData, plainData) => {
    try {
        return await bcrypt.compare(plainData, hashedData);
    } catch (error) {
        throw new Error("Error comparing hashes: " + error.message);
    }
};





var Comp=await CompareHash("$2b$10$M4TmdjmOrPLOIgn2UuSAT.1grnGUW2lYwCi5aLu0RK3GKYN0WW/B6","1234");


export{CompareHash,hashedValue}