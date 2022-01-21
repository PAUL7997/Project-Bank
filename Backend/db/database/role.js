require('../config')
const Role = require('../models/role');

const UserRoles = async(roles, next)=> 
{
    try
    {
       let role = roles.toUpperCase();
    
        if(!role)
        {
            let result = {
                status:0,
                message:"Provide Role!"
            };

            next(result);
        };

        if(role=="ADMIN")
        {
            let user = {
                "id":"12345",
                "firstName":"PAUL",
                "lastName":"SUDHAKAR",
                "role":"ADMIN"
            }
              next(user);   
        }
        else if(role ==="CUSTOMER")
        {
            //Customer support 
        }
        else
        {
            let result = {
                status:0,
            };

            next(result);
        };
    }
    catch(error)
    {
        console.log(error)
    };
};

// DELETED IN DB
// const getUserRole = async(role)=>
// {
//     let userRole = await Role.query().where({role:role});

//     return userRole;
// };


module.exports = {
    // getUserRole : getUserRole,
    UserRoles : UserRoles
}