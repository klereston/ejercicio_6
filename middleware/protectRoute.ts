import jwt from 'jsonwebtoken'

const JWT_SECRET = "ASD123"
const protectRoute: any = async (req: any, res: any, next: any) => {
    
    const token = req.cookies.jwtCookie
    if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                req.body.user_id = JSON.stringify((<any>decoded).user_id)
                next()
            } catch (error) {
                return res.status(401).json("Unautorized - No token Provided")
            }
    } else {
        return res.status(401).json("Unautorized")
    }        
}

export default protectRoute
    