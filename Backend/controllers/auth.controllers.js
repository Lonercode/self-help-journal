const auth = require('../models/auth.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')


//Create token for registration
const createRegToken = (user) => {
    const token = jwt.sign({_id: user._id.toString("hex")}, process.env.JWT_SECRET, {expiresIn: "1h"})
    return token
}
//create token for other routes
const createToken = (user) => {
    const token = jwt.sign({_id: user._id.toString("hex")}, process.env.JWT_SECRET, {expiresIn: "1d"})
    return token
}

//Register new users
const signUp = async(req, res, next) => {
    try{
        const exists = await auth.findOne({email: req.body.email})
        if (exists && exists.verified == true){
            res.status(400).json({message: "You already have an account with us. Please login :)"})
        }

        
        else{
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                confirmPassword: req.body.confirmPassword
            }
            const equalPassword = await bcrypt.compare(newUser.confirmPassword, newUser.password)
            if (!equalPassword){
                res.status(401).json({message: "Both passwords must be the same"})
              
                
            }
            else{
                const person = await auth.create(newUser)
                const userToken = createRegToken(person)
                const link = `https://otu-heart.netlify.app/verify`
                
                await sendMail(
                    person.email,
                    "Welcome to the Otu (Heart) Online Self-Help Journal",
                    {
                        name: person.name,
                        link: link
                    },
                    './templates/confirmUser.hbs'
                )

                res.status(201).json({message: "Registration successful! Please note that you have 1 hour until the link expires :)", token: userToken, id: person._id})
            }
        }

    }

    catch(err){
        res.status(500).json({message: err.message})

    }

}

//For when the registration link is expired; so a new token is obtained for registration
const expiredRegLink = async(req, res, next) => {
    try{
    const regUser = await auth.findOne({email: req.body.email})
    if (regUser && regUser.verified == false){

    const userToken = createRegToken(regUser)

    res.cookie("token", userToken, {
        withCredentials: true,
        httpOnly:false
    })
    const link = `http://localhost:3600/otu-heart/verifyAccount?id=${regUser._id}&token=${userToken}`
        
        await sendMail(
            regUser.email,
            "Welcome to the Otu (Heart) Online Self-Help Journal",
            {
                name: regUser.name,
                link: link
            },
            './templates/confirmUser.hbs'
        )

        res.status(201).json({message: "Registration successful! Check your email. Please note that you have 1 hour until the link expires :)"})
        
    }
    else{
        res.status(401).json({message: "Register or Login"})
    }
}
catch(err){
    res.status(500).json({message: err.message})
}
}



//Confirm user signup with with email verification link
const confirm = async (req, res, next) => {
    try{
        const user = await auth.findOne(req.user)
        
       
        if (user){
            await auth.findOneAndUpdate(
                req.user,
                 
                {verified: true}
                
            )
                
            await user.save()
            
            res.json({message: "Account is confirmed"})
    
        }
        else{
            res.json({message:"Please check your email or register"})
        }

    } catch (err){
        res.status(500).json(err.message)
    }
}



//User login
const login = async(req, res, next) => {
    try{
    const user = await auth.findOne({email: req.body.email});
    
    if (user){
        const pass = await bcrypt.compare(req.body.password, user.password)

    if (pass && user.verified == true){
        const userToken = createToken(user)
    

        res.status(200).json({message: "You have successfully logged in", token: userToken, name: user.name})

        
    }
    else{
        res.status(401).json({message: "You must register first or verify your account"})
    }
    }
    else{
    res.status(401).json({message: "You must register first or verify your account"})
    }
}
    catch(err){
        res.status(500).json({message: err.message})
    }
}


//Forgot password link
const forgotPassword = async(req, res, next) => {
    try{
        const user = await auth.findOne({email: req.body.email})
    if (!user){
        res.status(401).json({message: "Please sign up for an account"})
    }
    else{
        const userToken = createToken(user)

       
        const link = `https://otu-heart.netlify.app/resetPassword?id=${user._id}&token=${userToken}`
        
        await sendMail(
            user.email,
            "Reset your password",
            {
                name: user.name,
                link: link
            },
            './templates/resetPassword.hbs'
        )

        res.status(201).json({message: "Check your email for the reset link :)", token : userToken})

    }
}
catch(err){
    res.status(500).json({message: err.message})
}
}

const confirmReset = async(req, res, next) => {
    res.status(200).json({message: "Valid link"})
}


//Reset password route
const resetPassword = async (req, res, next) => {
    try{
        const user = await auth.findOne(req.user)
        if (user){
            await auth.findOneAndUpdate(
                req.user,
                {password: await bcrypt.hash(req.body.password, 10)}
            )
            await user.save()
            res.json({message: "Your password is reset. You can login now."})
    
        }
        else{
            res.json({message:"Please check your email or register"})
        }

    } catch (err){
        res.status(500).json(err.message)
    }
}


const logout = async(req, res, next) => {

}


module.exports = {
    signUp,
    confirm,
    expiredRegLink,
    login,
    forgotPassword,
    confirmReset,
    resetPassword
}