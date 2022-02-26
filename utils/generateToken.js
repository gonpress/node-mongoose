import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    const loginJwt = jwt.sign(
        {id},
        process.env.JWT_SECRET,
        { expiresIn:'30d'}
    )

    return loginJwt;
}

export default generateToken;