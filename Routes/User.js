const express = require('express');
const router = express.Router();
const zod = require("zod");
const UserDb = require("../Database/db");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = "121212";
const authMiddleware = require('../Middlewares/authmiddleware')

// -----------------sign up code here -------- //
const signupBody = zod.object({
    Username: zod.string(),
    Name: zod.string(),
    LastName: zod.string(),
    Password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "INPUTS ARE NOT VALIDATE"
        })
    }

    const existingUser = await UserDb.findOne({
        Username: req.body.Username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await UserDb.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Name: req.body.Name,
        LastName: req.body.LastName,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_TOKEN);

    res.json({
        message: "User created successfully",
        token: token
    })
})
// -------------------sign up code ends here -------// 




// --------------login code starts here-------------//
const UserValidateInLogin = zod.object({
    Username: zod.string(),
    Password: zod.string()
})

router.post('/login', async function (req, res) {
    const { success } = UserValidateInLogin.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: "inputs are not valid "
        })
    }

    const user = await UserDb.findOne({
        Username: req.body.Username,
        Password: req.body.Password
    })
    if (user) {
        const token = jwt.sign({
            userid: user._id
        }, JWT_TOKEN)

        res.json({
            token: token,
            msg: "logged"
        })

        return;
    }

    res.status(411).json({
        msg: "Logging failed"
    })


})
//------------------ login code ends here ------------//








//---------- update code starts here ------//
const updateBody = zod.object({
    Password: zod.string().optional(),
    Name: zod.string().optional(),
    LastName: zod.string().optional()

})
router.put('/update', authMiddleware, async function (req, res) {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: "error while updating info"
        })
    }
    await UserDb.updateOne(req.body, {
        _id: req.userId

    })

    res.json({
        msg: "updated successfully"
    })

})



router.get('/view-users', async function (req, res) {
    const filter = req.query.filter || "";

    const users = await UserDb.find({
        $or: [{
            Name: {
                $regex: filter
            },
            LastName: {
                $regex: filter

            }




        }]

    })

    res.json({
        user: users.map(user => ({
            username: user.Username,
            name: user.Name,
            LastName: user.LastName,
            password: user.password,
            id: user._id

        }))

    })



})
module.exports = router;