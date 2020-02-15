module.exports = getTokenOptions = () => ({
    expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRE)),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
});