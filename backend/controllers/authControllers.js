const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body;
       
        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
                message : "User already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            name : name,
            email : email,
            passwordHash : passwordHash
        });

        await newUser.save();

        // const accessToken = jwt.sign(
        //     {userId : newUser._id},
        //     process.env.JWT_SECRET,
        //     {expiresIn : '15m'}
        // );
        
        return res.status(200).json({
            message: "User registered successfully",
            // accessToken,
            user: {
                id: newUser._id,
                name : newUser.name,
                email: newUser.email
            }
        });
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message : "Server Error"
        });
    }

};

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({
                message : "Invalid email or password"
            });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message : "Invalid email or password"
            });
        }

        const accessToken = jwt.sign(
            {userId : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '15m'}
        );

        const refreshToken = jwt.sign(
            {
                userId : user._id,
                tokenVersion : user.refreshTokenVersion
            },
            process.env.JWT_REFRESH_SECRET,
            {expiresIn : '7d'}
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            secure : false,
            sameSite : 'lax',
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            message : "Login Successful",
            accessToken : accessToken
        });

    }
    catch(error){

        console.log(error);
        res.status(500).json({
            message : "Error"
        });
    }
};

const refresh = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            return res.status(401).json({
                message : "Refresh token missing"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        // console.log(decoded);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({
                message : "User not found"
            });
        }

        if(user.refreshTokenVersion !== decoded.tokenVersion){
            return res.status(401).json({
                message : "Refresh token is invalid"
            });
        }

        const accessToken = jwt.sign(
            {userId : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '15m'}
        );

        res.json({
            message : "Access token renewed",
            accessToken : accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message : "Server Error"
        });
    }
};

const logout = async (req, res) => {
    try{
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        };

        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            return res.status(200).json({
                message : "Already logged out"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        // console.log(decoded);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({
                message : "User not found"
            });
        }

        if (user && user.refreshTokenVersion === decoded.tokenVersion){
            user.refreshTokenVersion = (user.refreshTokenVersion || 0) + 1;

            await user.save();
        }

        res.clearCookie('refreshToken', cookieOptions);

        res.status(200).json({
            message : "Logout successful"
        });
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message : "Server error"
        });
    }
};

module.exports = { signup, login, refresh, logout }