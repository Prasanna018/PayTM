const zod = require("zod")

const UserValidate = zod.object({
    Username: zod.string(),
    Name: zod.string(),
    LastName: zod.string(),
    Password: zod.string(),

})

const UserValidateInLogin = zod.object({
    Username: zod.string(),
    Password: zod.string()
})

module.exports = { UserValidate, UserValidateInLogin }