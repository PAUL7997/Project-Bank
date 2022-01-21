const {Model} = require('objection');
const guid = require('objection-guid')();

class AccountUpdate extends guid(Model) {
    static tableName() {
        return 'account_update';
    }

    static get relationMappings() {

        const Account = require('./account');

        return {
            account:{
                relation: Model.BelongsToOneRelation,
                modelClass: Account,
                join: {
                    from: 'account_data.id',
                    to: 'account_update.accountId'
                }
            }
        };
    }
}

module.exports = AccountUpdate;