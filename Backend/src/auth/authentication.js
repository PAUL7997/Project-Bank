const jwt = require('jsonwebtoken');
const JwtConfig = require('./token');

const generateToken = async(user) =>
{
    return await jwt.sign({sub:user.decoded, role:user.role}, JwtConfig.secrect, {expiresIn: 84600});
};

const verifyToken = async(token, next)=>
{
    try
    {
       await jwt.verify(token, JwtConfig.secrect, async function(error, decoded)
        {   
            if(error)
            {
                let result = {
                    status:0,
                    message:"UnAuthorize"
                };
                next(result);
            };
            
            let result = {
                status:1,
                decoded:decoded.user
            }
            next(result);    
            
        });
    }
    catch (error)
    {
        return {
            status:0,
            message:error.message
        };
    };
};

function generateUUID() 
{
    return uuidv4().split('-').join('').toUpperCase();
}

module.exports = {
    verifyToken : verifyToken,
    generateToken : generateToken,
    generateUUID : generateUUID
}