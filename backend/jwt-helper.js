import jsonWebToken from "jsonwebtoken";

const validateToken = (req, res, next) => {
    const bearerHeader = req.header('authorization')
    if (!bearerHeader) return res.status(401).send('Access Denied')
    try {
        const verified = jsonWebToken.verify(bearerHeader, process.env.ACCESS_TOKEN);
        console.log(verified)
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}

export default validateToken