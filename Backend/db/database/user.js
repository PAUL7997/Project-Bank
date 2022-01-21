require('../config')

const User = require('../models/user');

const createUser = async (data) =>
{
    try
    {
        let user = await User.query().insert(data)

        if(!user)
        {
            return {
                status: 0,
                error:error
            }
        }

        return user;
    }
    catch (error)
    {
        console.log(error)
        return {error: error};
    }
};

const updateUser = async (id, data) =>
{
    try
    {
        let userData = await User.query().patchAndFetchById(id,data);

        return userData;
    }
    catch (error)
    {
        console.log(error)
    }
}
const getUser = async() =>
{
    try
    {
        let user = await User.query();

        return user;
    }
    catch (error)
    {
        return {error:error};
    }
}

const getUserById = async(id)=>
{
    try
    {
       
        let user = await User.query().findById(id);

        return user;
    }
    catch (error)
    {
        console.log(error)
    }
};

const deleteUser = async(id)=>
{
    try
    {
        let user = await User.query().deleteById(id);

        return user;

    }
    catch (error)
    {
        console.log(error)
    }
};

const getDetailsByEmail = async(email)=>
{
    let user = await User.query().where({email:email});

    return user;
};

const getUserDetailsByNumber = async(accountNumber) =>
{
    let user = await User.query().where({account:accountNumber}).first();

    if(!user)
    {
        return false;
    }

    return user;

};

const authenticateUser = async(role)=>
{
    try
    {
        let roleUsers = await User.query().where({role:role});

        return roleUsers;
    }
    catch(error)
    {
        console.log(error)
    }
}
module.exports = {
    createUser : createUser,
    updateUser : updateUser,
    getUser : getUser,
    getUserById : getUserById,
    deleteUser : deleteUser,
    getDetailsByEmail : getDetailsByEmail,
    getUserDetailsByNumber : getUserDetailsByNumber,
    authenticateUser : authenticateUser
}