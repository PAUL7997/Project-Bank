require("../config");
const AccountUpdate = require('../models/account_update');


const updateAccount = async(data)=>
{
    try
    {console.log(data)
        let account = await AccountUpdate.query().insert(data);
        
        return account;
    }
    catch(error)
    {
        console.log(error);
    }
};

module.exports = {
    updateAccount : updateAccount
}