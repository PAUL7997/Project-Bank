require("../config");

const Account = require("../models/account");

const createAccount = async(data)=>
{
    try
    {
        let account = await Account.query().insert(data);
        
        return account;
    }
    catch(error)
    {
        console.log(error);
    }
};

const UpdateAccount = async(id,data)=>
{
    try
    {
        let account = await Account.query().patchAndFetchById(id, data);

        return account;
    }
    catch(error)
    {
        console.log(error)
    }
}
const getAccountByNumber = async(number)=>
{
    try
    {
        let account = await Account.query().where({account:number});

        return account;
    }
    catch(error)
    {
        console.log(error)
    }
};

const getAccountById = async(id)=>
{
    try
    {
        let account = await Account.query().findById(id);

        return account;
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports = {
    createAccount : createAccount,
    UpdateAccount : UpdateAccount,
    getAccountByNumber : getAccountByNumber,
    getAccountById : getAccountById
}