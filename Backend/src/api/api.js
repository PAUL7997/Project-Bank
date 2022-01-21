const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')
app.use(cookieParser());
const {userTypes,secrect} = require('../auth/token');

const authorizes = require('../api/Authroization');
const authorize = authorizes.authorize

//Service Calls
const user = require('../service/user');
const role = require('../service/role');
const userRole = require('../service/userRole');
const account = require('../service/account');

//Authentication
const Authentication = require('../auth/authentication'); 
// const Account = require('../../db/models/account');

app.use(session({
    secret: secrect,
    resave:false,
    saveUninitialize: true,
    cookie : {maxAge:60}
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/authenticate",async(req, res)=>
{
    try
    {
        return res.json(await user.authenticateUser(req.headers.role, res));
    }
    catch (error)
    {
        console.log(error);
        return {
            status:0,
            message:error.message
        }
    }
})
//AUTHENTICATION
// var tokenVerifier = async(req, res, next)=>
// {
//     const token = req.headers.token;

//     if(!token)
//     {
//         return res.json({
//             status:0,
//             message:"NO TOKEN"
//         })
//     }
//     else
//     {
//         await Authentication.verifyToken(token, async function(tokenResult)
//         {
//             if(tokenResult.status == 1)
//             {
//                let tokenUser = tokenResult;

//                let newToken = await Authentication.generateToken(tokenUser);

//                req.rpUser = tokenUser;

//                next();
//             }
//             else if(tokenResult.status == 0)
//             {
//                 return res.json({
//                     status:0,
//                     message:'NO TOKEN'
//                 });
//             };
//         });
//     };
// };
// app.use(tokenVerifier);

//API CALLS

//Create User
app.post("/api/create/user", async function(req, res)
{
    try
    {
        let session = req.session;
        session.isLoggedIn = true
        let userData = req.body;
        console.log(userData)
        return res.json(await user.createUser(userData));
    }
    catch (error)
    {
        console.log(error);
    }
});

// Update User
app.post("/api/update/user/details/by/:id", async(req, res)=>
{
    try
    {   
        let userData = req.body;
        console.log(req.params.id,userData)

        return res.json(await user.updateUser(req.params.id, userData));
    }
    catch (error)
    {
        console.log(error)
    }
})
// Get All User Details
app.get("/api/user/details/",  async(req, res)=>
{
    try
    {
        return res.json(await user.getUser());
    }
    catch (error)
    {
        console.log(error)
    }
});

// Get User Details by Id
app.get("/api/user/details/by/:id", async(req, res)=>
{
    try
    {
        console.log('API!')
        console.log('API',req.signedCookies)
        return res.json(await user.getUserById(req.params.id));
    }
    catch (error)
    {
        console.log(error)
    }
});

//Delete User by Id
app.delete("/api/user/delete/by/:id", async(req, res)=>
{
    try
    {
        return res.json(await user.deleteUser(req.params.id));
    }
    catch (error)
    {
        console.log(error)
    }
});

// Login User
app.get('/login', (req,res)=>
{
    res.sendFile(__dirname + '/views/login.html')
})
app.post("/api/user/login",  async(req, res)=>
{
    
    console.log(req.body)
    let role = req.headers.role;
    console.log("API",req.session)
    return res.json(await user.loginUser(req.body, role, req.headers))
});

//Get User roles by name Deleted In DB
// app.get("/api/user/roles/by/:name", async(req, res)=>
// {
//     try 
//     {
//         return res.json(await role.getUserRole(req.params.name))
//     } catch (error) 
//     {
//         console.log(error)
//     }
// });

//Get User role by Id
app.get("/api/user/roles/by/:id", async(req,res)=>
{
    try
    {
        return res.json(await userRole.getUserRoleById(req.params.id));
    }
    catch (error)
    {
        console.log(error);
        return {
            status:0,
            message:error.message
        }
    }
});

//Update account by Id
app.post("/api/update/account/by/:id", async(req,res)=>
{
    try
    {
        return res.json(await account.updateAccount(req.params.id, req.body));
    }
    catch(error)
    {
        console.log(error)
    }
})
app.all('*', (req, res, next) => 
{
    res.status(404).json({
        status: 0,
        message: `Could not find ${req.originalUrl} on this server!`
    });
});

module.exports = app;