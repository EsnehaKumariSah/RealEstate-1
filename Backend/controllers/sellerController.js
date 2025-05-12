import Seller from "../models/seller.js";

export const createSeller = async (req, res) => {//controller hai
    try {// use for  catch error

        const { name, email, phone, address,Id,ListedPrice, status } = req.body;
        if(!name || !email || !phone|| !address  || !Id ||! ListedPrice|| !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must be exactly 10 digits ',
            });
        }
        await Seller.create({name, email, phone, address , Id , ListedPrice , status})
        res.status(201).json({
            success:true,
            message: 'Seller created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Seller', details: error.message });
    }
};

export const getAllSeller = async (req, res) => {
    try {
        const Sellers = await Seller.find();
        res.json(Sellers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getSellerById = async (req, res) => {
    try {
        const SellerId = req.params.id;
        const Seller = await Seller.findById(SellerId);
        if (!Seller) {
            return res.status(404).json({ message: 'Seller id not found' });
        }
        res.json(Seller);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSeller = async (req, res) => {
    try {
        const { name, email, phone, address,Id ,ListedPrice, status  } = req.body;
        const SellerId = req.params.id; 

        const existingSeller = await Seller.findById(SellerId);
        if (!existingSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const updateData = {
            name, email, phone, address,Id,ListedPrice, status
        };

        const updatedSeller = await Seller.findByIdAndUpdate(
            SellerId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'Seller updated successfully',
            Seller: updatedSeller
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteSeller = async (req, res) => {
    try {
        const SellerId = req.params.id; 
        const deletedSeller = await Seller.findByIdAndDelete(SellerId); 
        if (!deletedSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.json({
            success:true,
            message: 'Seller deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};