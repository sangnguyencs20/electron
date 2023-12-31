const { updateRefreshToken, generateTokens } = require('../utils/tokens');
const { isUserExist, createOneUser, getUserByName, isPasswordMatched, getOneUserById } = require('../services/user');
const { hashPassword } = require('../utils/helperAuth');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!await isUserExist(username)) {
            return res.status(401).json({ message: 'Sai tài khoản, vui lòng thử lại!' });
        }

        const user = await getUserByName(username);

        if (!isPasswordMatched(password, user.password)) {
            return res.status(401).json({ message: 'Sai mật khẩu, vui lòng thử lại!' });
        }

        const tokens = generateTokens(user);
        updateRefreshToken(username, tokens.refreshToken);

        return res.status(200).json({ ...tokens, user });
    } catch (error) {
        console.error('Error during login:', error);
        res.sendStatus(500);
    }
};




const logout = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await getOneUserById(id);

        if (!user) {
            return res.sendStatus(404);
        }

        user.refreshToken = null;
        await user.save();

        res.sendStatus(204); // send response only once
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // send response only once
    }
};



const signup = async (req, res) => {
    const user = req.body;
    try {
        if (await isUserExist(user.username)) {
            return res.status(401).json({ message: 'Tên tài khoản đã tồn tại, vui lòng chọn tên khác!' });
        }

        const hashedPassword = hashPassword(user.password);
        user.password = hashedPassword;


        const newUser = await createOneUser(user);
        const tokens = generateTokens(newUser);
        await updateRefreshToken(newUser.username, tokens.refreshToken);

        return res.status(201).json({ ...tokens, newUser });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const confirmPassword = async (req, res) => {
    const id = req.userId;
    const { password } = req.body;

    try {
        const user = await getOneUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!isPasswordMatched(password, user.password)) {
            return res.status(401).json({ message: 'Sai mật khẩu, vui lòng thử lại!' });
        }

        return res.status(200).json({ message: 'Xác nhận  mật khẩu thành công!' });
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports = {
    login,
    signup,
    logout,
    confirmPassword
};