require('dotenv').config()
const jwt = require('jsonwebtoken')
const NewUsers = require('../models/auth.models')

const protect = async (req, res, next) => {
     try {
          // Would like to propose that you do this perhaps soon:
          // const token = req.headers.authorization.replace("Bearer", "")
          // So the token can be utilized automatically
          const tokenAll = req.headers.authorization;
          
          
          const tokenPart = tokenAll.split(' ')
          const token = tokenPart[1]
          
          //  return error if there is no token
          if (!token) {
               return (res.status(401).json({message: "Unauthorized or expired login"}))
          }

          //  verify token if there is token
          let decoded;

          jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
               if (err) {
                    return err
               }

               decoded = decode;
          });

          if (decoded) {
               const user = await NewUsers.findById(decoded);

               if (user) {
                    req.user = user;

                    next();
               } else {
                res.status(401).json({message: "Unauthorized Here!"})
               }
          }
          else{
            res.status(401).json({message: "Unauthorized token!"})
          }
     } catch (err) {
          res.status(500).json({message: err.message})
     }
};

module.exports = protect