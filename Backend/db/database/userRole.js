require('../config');

const UserRole = require('../models/userRole');

const getUserRoleById = async(id) =>
{
    let role = await UserRole.query().findById(id);

    return role;
};

module.exports = {
    getUserRoleById : getUserRoleById
}