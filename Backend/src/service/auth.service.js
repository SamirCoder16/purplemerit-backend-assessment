import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const authRepository = {
    createUser: async (userData) => {
        const user = new User(userData);
        return await user.save();
    },
    findUserByEmail: async (email) => {
        return await User.findOne({ email }).select('+password');
    },
    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },
    getAllUsers: async () => {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 }) // latest users first
            .lean(); // js objects faster than mongoose documents
        const totalUsers = await User.countDocuments();
        return {
            users,
            totalUsers,
        };
    },
    findUserById: async (userId) => {
        return await User.findById(userId).select('-password')
    },
    updateUserById: async (userId, updateData) => {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    },
    resetPasswordByEmail: async (email, hashedPassword) => {
       return await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
    }
};

export default authRepository;