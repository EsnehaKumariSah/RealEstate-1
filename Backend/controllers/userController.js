import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {//controller hai
    try {// use for  catch error

        const {email, password } = req.body;
        if( !email ||!password) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        const existingUser = await User.findOne({emailId: email})
        if(existingUser) {
            return res.status(400).json({success: false, message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({emailId: email, password: hashedPassword})
        res.status(201).json({
            success:true,
            message: 'user created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the user', details: error.message });
    }
};
export const getAllUser = async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getUserById = async (req, res) => {
    try {
        const UserId = req.params.id;
        const User = await User.findById(UserId);
        if (!User) {
            return res.status(404).json({ message: 'User id not found' });
        }
        res.json(User);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { emailId,password } = req.body;
        const UserId = req.params.id; 

        const existingUser = await User.findById(UserId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateData = {
            emailId,password
        };

        const updatedUser = await User.findByIdAndUpdate(
            UserId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'User updated successfully',
            User: updatedUser
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const UserId = req.params.id; 
        const deletedUser = await User.findByIdAndDelete(UserId); 
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            success:true,
            message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};