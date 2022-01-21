const {Model} = require('objection');
const guid = require('objection-guid')();

// class User extends Model {
//     static tableName = 'user';
  
//     static get relationMappings() 
//     {

//         const UserRoles = require('./userRole');

//       movies: {
//         relation: Model.ManyToManyRelation,
//         modelClass: UserRoles,
//         join: {
//           from: 'user.id',
//           through: {
//             // persons_movies is the join table.
//             from: 'user_role.roleId',
//             to: 'user_role.userId'
//           },
//           to: 'role.id'
//         }
//       }
//     };
//   }

class User extends guid(Model) {
    static tableName() {
        return 'users';
    }

    static get relationMappings() {

        const UserRole = require('./userRole');
        const Account = require('./account');

        return {

            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: Account,
                join: {
                    from: 'account.userId',
                    to: 'users.id'
                }
            },
            userRole: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserRole,
                join: {
                    from: 'user_role.id',
                    to:'usersId'
                }
            }
        };
    }
}

module.exports = User;