const RoleNames = {
    superuser: 'superuser',
    admin: 'admin',
    member: 'member',
    user: "user",
}

const RoleValue = {
    [RoleNames.superuser]: 1,
    [RoleNames.admin]: 2,
    [RoleNames.member]: 3,
    [RoleNames.user]: 4
}

const READ = 0x1
const DELETE = 0x1 << 1
const UPDATE = 0x1 << 2
const CREATE = 0x1 << 3
const READ_SELF = 0x1 << 4
const DELETE_SELF = 0x1 << 5
const UPDATE_SELF = 0x1 << 6
const CREATE_SELF = 0x1 << 7
const DELETE_SELF_ON_ATLEAST_TWO = 0x1 << 8

const TableNames = {
    User: "User",
    Student: "Student",
    Arts: "Arts",
    Articles: "Articles"
}

const roleComparison = (userA, userB) => {
    if(userA.role > userB.role){
        return true
    } else {
        return false
    }
}

const Roles = {
    [RoleNames.superuser]: {
        [Permissions.User]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF_ON_ATLEAST_TWO | UPDATE_SELF,
        [Permissions.Student]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF ,
        [Permissions.Arts]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF ,
        [Permissions.Articles]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF ,        
    },
    [RoleNames.admin]: {
        [TableNames.User]: READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF | UPDATE | READ,
        [TableNames.Student]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF,
        [TableNames.Arts]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF,
        [TableNames.Articles]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF 
    },
    [RoleNames.member]: {
        [TableNames.User]: READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF,
        [TableNames.Student]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF,
        [TableNames.Arts]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF,
        [TableNames.Articles]: READ | DELETE | UPDATE | CREATE | READ_SELF | CREATE_SELF | DELETE_SELF | UPDATE_SELF 
    }
}