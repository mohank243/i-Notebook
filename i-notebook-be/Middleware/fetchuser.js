const jwt = require('jsonwebtoken');


const SECRET_KEY = 'MohanIsAGoodBoy';
const fetchUser = (req ,res, next)=>{
    const token = req.header('auth-token');

    if(!token){
        res.status(401).json("please authenticate using a valid token")
    }
    try {
        const data = jwt.verify(token,SECRET_KEY)
        req.user = data.user
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json("please authenticate using a valid token")
    }
    


}
module.exports = fetchUser