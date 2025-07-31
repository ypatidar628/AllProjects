const User = require('../db/user');



async function addUser(name, email, password, isAdmin) {
    const user = await User.create({ name, email, password, isAdmin });
    return user.toObject();
}

async function updateUser(id, name, email, password, isAdmin) {
    let user = await User.findByIdAndUpdate(id, { name, email, password, isAdmin }, { new: true });
    return user.toObject();
}

async function deleteUser(id) {
    const delUser = await User.findByIdAndDelete(id);   
    return  delUser.toObject() ;
}

module.exports = { addUser, updateUser , deleteUser };