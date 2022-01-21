const db = require('../../db/database/account');
const AccountUpdate = require('../../db/database/account_update');
const {AccountTypes} = require('../auth/token');






const updateAccount = async(id,data)=>
{
    try
    {
        let account = await db.getAccountById(id);

        if(!account)
        {
            return {
                status:0,
                message:"Account not found!"
            };
        };

        let updateParams = 
        {
            userId:account.userId,
            account:account.account,
            credited:data.credited,
            debited:data.debited,
            updatedAt:new Date(),
            updatedBy:account.userId
        };
       
        if(data.credited)
        {
            updateParams.balance = data.credited ? parseInt(data.credited) + account.balance : account.balance;
        }
        else if(data.debited)
        {
            updateParams.balance = data.debited ? account.balance - data.debited : account.balance;
        }
        else if(data.balance)
        {
            updateParams.balance = data.balance;
        }
        
        if(data.type == account.type || data.type == account.type)
        {
            return {
                status:0,
                message:`Same account ${data.type}! change to different`
            };
        }
        else if(data.type)
        {
            updateParams.type = data.type == AccountTypes.ZERO ? AccountTypes.ZERO  : data.type == AccountTypes.SAVINGS ? AccountTypes.SAVINGS : account.type;
        };

        let updateData = await db.UpdateAccount(id,updateParams);

        if(!updateData)
        {
            return{
                status:0,
                message:"Account not upated!"
            };
        };

        let detailsParams = 
        {
            accountId:updateData.id,
            accountNumber:account.account,
            balance:updateData.balance,
            updatedBy:updateData.id
        }

        if(data.credited)
        {
            detailsParams.credited = data.credited ? parseInt(data.credited) : null;
        }
        else if(data.debited)
        {
            detailsParams.debited = data.debited ? data.debited : null;
        }

        let accountUpdate = await AccountUpdate.updateAccount(detailsParams);

        return{
            status:1,
            account:updateData,
            message:"Account updated!"
        };
    }
    catch(error)
    {
        console.log(error);
    }
};

module.exports = {
    updateAccount : updateAccount
}