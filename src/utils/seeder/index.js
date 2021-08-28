const Permissions = require("../../resources/access_controller/permission.model");
const Roles = require("../../resources/access_controller/roles.model");
const usersModal = require("../../resources/Users/users.modal");
const Users = require("../../resources/Users/users.modal");
const permissionList = require("./permissionList");
// const rolesList = require('./rolesList')
const bcrypt = require('bcrypt')

module.exports = {
  init: async () => {
    const userCount = await Users.countDocuments();

    console.log("Seed check...");
    if (userCount === 0) {
      console.log('here')
      // await module.exports.seedPermissions();
      // await module.exports.seedRoles();
      await module.exports.seedAdministrator();
    }
    console.log("Seed check done ###");
  },
  seedAdministrator: async () => {
    console.log("seeding admin");
    try {
      console.log("seed staff");
      const admin = {
        firstName: "Root",
        lastName: "Admin",
        email: "root@admin.com",
        gender: "male",
        password: bcrypt.hashSync('toor', 8),
        role: 3
        // Add more properties needed here
      };
      //   Call register user from here
      try {
        await usersModal.create(admin);
      } catch (error) {
        console.log(error);
      }
      console.log("seed staff done");
      return true;
    } catch (e) {
      return {
        developerMessage: e.message,
      };
    }
  },
  seedPermissions: async () => {
    try {
      const count = await Permissions.countDocuments();
      if (count === 0) {
        await Permissions.insertMany(permissionList)
          .then((res) => res)
          .catch((err) => {
            console.log(err)
            throw err;
          });
        console.log('seed permissions done');
      }
    } catch (e) {
      return {
        developerMessage: e.message,
      };
    }
  },
  seedRoles: async () => {
    try {
      const rolesList = [
        {
          name: 'Super Admin',
          description: 'Role for a Super Admin',
          genericName: 'ROLE_SUPER_ADMIN',
          type: 1,
          target: 'System',
          approvalStatus: 1,
          permissions: await (await Permissions.find({}, '_id')).map(item => item._id)
        },
      ]
      const roleCount = await Roles.countDocuments();
      if (roleCount === 0) {
        console.log('seed roles start');
        await Roles.insertMany(rolesList)
        console.log('seed roles done');
      }
    } catch (error) {
      console.log(error)
    }
  },
};

// dhs

// demorgrah\phic health survey


// takwimu mtu wa ict

// kusafiri

// training kweenye mifumo yao

// ofisi ya taifa ya takwum


// tanzania demorgaphic