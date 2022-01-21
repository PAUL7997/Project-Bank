const db = require('../../db/database/user');
var bcrypt = require("bcrypt");
const user = require('../../db/database/user');
const AccountDb = require('../../db/database/account');
const accNumber = Math.floor(Math.random() * 100000000000);
const Authentication = require('../auth/authentication');
const Role = require('../../db/database/role');
const {userTypes} = require('../auth/token');
const sendEmail = require('../service/smtp');
const smtp = require('../service/smtp');
const createUser = async (data)=>
{
    try
    {
        let user = await db.getUser();

        let email = data.email ? data.email.toLowerCase() : null;
        
        for(let index = 0; index<user.length; index++)
        {
           let email = user[index].email;
            
           if(email == data.email.toLowerCase())
           {
                return {
                    status:0,
                    message:"User already exists!"
                }
            }
        };

        if(data.firstName.length < 2 || data.lastName.length < 2)
        {
            return {
                status:0,
                message:"Name should have minimum characters!"
            }
        };

        
        let userParams = 
        {
            account:data.role == userTypes.CUSTOMER ? accNumber : data.role == userTypes.ADMIN ? 1 : null,
            firstName: data.firstName,
            lastName: data.lastName,
            email: email,
            phone: data.phone,
            role: data.role == userTypes.CUSTOMER ? userTypes.CUSTOMER : data.role == userTypes.ADMIN ? userTypes.ADMIN : null,
            password:bcrypt.hashSync(data.password, 10),
            address: data.address,
            city:data.city,
            zipcode:data.zipcode,
            createdAt: new Date()
        };

        const token = await Authentication.generateToken(userParams);
        
        let userData = await db.createUser(userParams);

        let sendAddress = {
            email:userData.email,
            subject: "User Created!"
        }
        smtp.sendEmail(sendAddress).then(console.log("SENt"))
        if(userData.error)
        {
            return {

                status:0,
                message:"User creation failed!"
            }
        };

        if(userData.role == userTypes.CUSTOMER)
        {
            let accountParams = 
            {
                account:userData.account,
                userId:userData.id,
                type: userData.role == userTypes.CUSTOMER ? data.type : null ,
                credited : 0,
                debited :0,
                balance:0,
                createdBy:userData.id,
                createdAt:new Date()
            };

            let accountData = await AccountDb.createAccount(accountParams);

            if(!accountData)
            {
                return {
                    status:0,
                    message: "Account creation failed!"
                };
            };

            return {
                status: 1,
                user: {
                    userData: userData,
                    accountData : accountData
                },
                token: token,
                message:"User created!"
            }

        }

        return {
            status: 1,
            user: userData,
            token: token,
            message:"User created!"
        }
        
    }
    catch(error)
    {
        console.log(error)
        return {
            status:0,
            message:message.error,

        }
    }
};

const updateUser = async(id, userDetails)=>{

    try
    {
        let userData = await db.getUserById(id);
    
        if(!userData)
        {
            return {
                status:0,
                message:"User not found!"
            }
        };

        let userParams = {
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            phone:userDetails.phone,
            city:userDetails.city,
            updatedAt: new Date(),
            updatedBy: userData.id
        };
        
        if(userDetails.password)
        {
            userParams.password = bcrypt.hashSync(userDetails.password, 10)
        };

        let updateUserData = await db.updateUser(id, userParams);
            
        console.log(updateUserData);

        return {
            status:1,
            user:updateUserData,
            message: "User updated!"
        }
    }
    catch (error)
    {
        console.log(error)
    }
};

const getUser = async () =>
{
    try
    {
        
        let userData = await db.getUser();

        if(!userData)
        {
            return {
                status:0,
                message:"User not found!"
            }
        };

        return {
            status:1,
            user:userData
        }
    }
    catch (error)
    {
        return {
            status:0,
            message:error
        }
    }
}

const getUserById = async(id) =>
{
    try
    {
        let userData = await db.getUserById(id);

        if(!userData)
        {
            return{
                status:0,
                message:"User not found!"
            }
        };

        if(userData.role == 'Admin')
        {
            return{
                status:1,
                user:userData
            }
        }
        else
        {
            return {
                status:1,
                user:userData
            }
        }
    }
    catch (error)
    {
        console.log(error)
    }
};

const deleteUser = async(id) =>
{
    try
    {
        let userData = await db.getUserById(id);

        if(!userData)
        {
            return{
                status:0,
                message:"User not found!"
            };
        };

        let user = await db.deleteUser(id);

        return{
            status:1,
            message:"User deleted!"
        }
    }
    catch (error)
    {
        console.log(error)
    }
};

const loginUser = async(userDetails, role, tokens) =>
{
    try
    {
        if(!(userDetails.account && userDetails.password))
        {
            return{
                status:0,
                message:"Credintials is missing!"
            }
        }
        let accountNumber = userDetails.account;

        let user = await db.getUserDetailsByNumber(accountNumber);

        if(!user)
        {
            return {
                status:0,
                message:"User not found! Please Signup"
            }
        };

        if(!bcrypt.compareSync(userDetails.password, user.password))
        {
            return{
                status:0,
                message:"Invalid Password!"
            };
        };

        return {
            status:1,
            User:user,
            role:user.role,
            tokens:tokens.token
        }
    }
    catch (error)
    {
        console.log(error)
        return {
            status:0,
            message:error.message
        }
    }
};

const authenticateUser = async(role, res)=>
{
    try
    {
        if(!role)
        {
            return{
                status:0,
                message:'Role not mentioned!'
            };
        };

        // let roleUsers = await Role.UserRoles(role); Another Method
       
        await Role.UserRoles(role, async function(roleUsers)
        {
            let token = await Authentication.generateToken(roleUsers);

            if(roleUsers.status == 0)
            {
                return res.json({
                    status:0,
                    message:`${role} found!`
                });
            };
    
            return res.json({
                status:1,
                user:roleUsers,
                token:token
            });
        });
    }
    catch(error)
    {
        console.log(error)
    }
};
module.exports = {
    createUser : createUser,
    updateUser : updateUser,
    getUser : getUser,
    getUserById: getUserById,
    deleteUser : deleteUser,
    loginUser : loginUser,
    authenticateUser : authenticateUser
}