import Lease from "../models/Lease.js";

export const createLease = async (req, res) => {//controller hai
    try {// use for  catch error

        const { name, email, phone, address, StartDate, EndDate, MonthlyRent ,Deposite, status ,Lstatus  } = req.body;
        if(!name || !email || !phone|| !address || !StartDate|| !EndDate || !MonthlyRent||! Deposite|| !status||!Lstatus) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Lease.create({name, email, phone, address, StartDate, EndDate, MonthlyRent ,Deposite, status ,Lstatus })
        res.status(201).json({
            success:true,
            message: 'Lease created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Lease', details: error.message });
    }
};

export const getAllLease = async (req, res) => {
    try {
        const Leases = await Lease.find();
        res.json(Leases);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getLeaseById = async (req, res) => {
    try {
        const LeaseId = req.params.id;
        const Lease = await Lease.findById(LeaseId);
        if (!Lease) {
            return res.status(404).json({ message: 'Lease id not found' });
        }
        res.json(Lease);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateLease = async (req, res) => {
    try {
        const {  name, email, phone, address, StartDate, EndDate, MonthlyRent ,Deposite, status ,Lstatus  } = req.body;
        const LeaseId = req.params.id; 

        const existingLease = await Lease.findById(LeaseId);
        if (!existingLease) {
            return res.status(404).json({ message: 'Lease not found' });
        }

        const updateData = {
            name, email, phone, address, StartDate, EndDate, MonthlyRent ,Deposite, status ,Lstatus  
        };

        const updatedLease = await Lease.findByIdAndUpdate(
            LeaseId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'Lease updated successfully',
            Lease: updatedLease
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteLease = async (req, res) => {
    try {
        const LeaseId = req.params.id; 
        const deletedLease = await Lease.findByIdAndDelete(LeaseId); 
        if (!deletedLease) {
            return res.status(404).json({ message: 'Lease not found' });
        }
        res.json({ 
            success:true,
            message: 'Lease deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};