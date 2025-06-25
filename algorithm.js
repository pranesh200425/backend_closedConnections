let initial_gid = 0;

const max_members_of_group = 100;

let groups = {};

//when user signs in we shuld add him to a group
//added later
//

//initializing groups

for (let i = 0; i < max_members_of_group; i++) {
  groups[i] = [];
}

//adding a user to a group
for (let i = 0; i < max_members_of_group; i++) {
  groups[0].push(i);
}

console.log(groups);
console.log(groups);
