const {Model} = require('objection');
const guid = require('objection-guid')();

class Account extends guid(Model) {
    static tableName() {
        return 'account_data';
    }

    static get relationMappings() {

        const UserRole = require('./userRole');
        const User = require('./user');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'account_data.userId',
                    to: 'user.id'
                }
            },
            userRole:{
                relation: Model.BelongsToOneRelation,
                modelClass: UserRole,
                join: {
                    from: 'user_role.userId',
                    to:'users.id'
                }
            },
        };
    }
}

module.exports = Account;