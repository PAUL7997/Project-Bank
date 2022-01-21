const userRole = require('../../db/database/userRole');


const getUserRoleById = async (id) =>
{
    try
    {
        let userRoleData = await userRole.getUserRoleById(id);

        if(!userRoleData)
        {
            return {
                status:0,
                message:"User role not found!"
            }
        }
    }
    catch (error)
    {
        console.log(error);
        return {
            status:0,
            message:error.message
        }
    }
};

module.exports = {
    getUserRoleById : getUserRoleById
}