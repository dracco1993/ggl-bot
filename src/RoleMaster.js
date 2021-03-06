import { adminChannelName, gameRoleColor } from "../config/config.json";

class RoleMaster {
  constructor() {
    console.log("I AM THE ROLE MASTER!");
  }

  attemptRoleAdd(user, roleName) {
    // Grab the potential role we want to add
    const role = this.getRole(user.guild, roleName);

    // If the correct role exists already
    if (role !== null) {
      console.log("GOT IT!");
      this.addRole(user, role);
    } else {
      // Ask the admins to add the new game role
      const channel = user.guild.channels.find("name", adminChannelName);
      if (channel !== null) {
        channel.send(`
          ${user.displayName} is now playing ${roleName}, but we don't have a role for it... Add it with "!cgr ${roleName}"
        `);
      }
    }
  }

  addRole(user, role) {
    // Check to see if the user already has that role

    // Maybe want to return if this worked or not later on?
    user.addRole(role).catch(console.error);
    console.log(`Role "${role.name}" given to ${user.displayName}.`);
  }

  getRole(guild, roleName) {
    return guild.roles.find("name", roleName);
  }

  createRole(guild, roleName, color = gameRoleColor) {
    return new Promise((resolve, _) => {
      // Create/save the new role
      guild
        .createRole({
          name: roleName,
          color: color,
          permissions: [],
          mentionable: true
        })
        .then(() => {
          resolve(
            `Created new role with name \`"${roleName}"\` and color ${color}`
          );
        });
    });
  }

  removeRole() {
    // member.removeRole(role).catch(console.error);
  }
}

export default RoleMaster;
