const {Model} = require('objection');
const guid = require('objection-guid')();

class UserRole extends guid(Model) {
    static tableName() {
        return 'users';
    }

    static get relationMappings() {

        const User = require('./user');
        const UserRole = require('./userRole');

        return {
            userRole: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    to: 'user_role.roleId'
                }
            }
        };
    }
}

module.exports = UserRole;