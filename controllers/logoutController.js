const User = require('../model/User');

const logoutController = async (req, res) => {
    const { jwt: refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.sendStatus(204); // No content
    }

    try {
        const result = await User.updateOne(
            { refreshToken },
            { $set: { refreshToken: '' } }
        );

        if (result.modifiedCount === 0) {
            console.log('Nothing was modiefied on the document');
        }

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); // No content
    } catch (error) {
        console.error('Erro no logout:', error);
        return res.status(500).send('Erro Interno do Servidor');
    }
};

module.exports = logoutController;
