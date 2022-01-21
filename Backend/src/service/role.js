const dbRole = require('../../db/database/role');

//DELETED IN DB
// const getUserRole = async(role)=>
// {
//     try
//     {
//         let userRoleData = await dbRole.getUserRole(role);

//         if(!userRoleData)
//         {
//             return {
//                 status:0,
//                 message:"User role not found!"
//             };
//         };

//         return {
//             status:1,
//             user:userRoleData
//         }
//     }
//     catch (error)
//     {
//         console.log(error)

//         return{
//             status:0,
//             message:error.message
//         }
//     }
// };

module.exports = {
    // getUserRole : getUserRole
}