import Property from "../models/Property.js";

export const createProperty = async (req, res) => {//controller hai
    try {// use for  catch error

        const {  propertyTitle, propertyType, address, price, areaSqft, furnishing, status } = req.body;
        if(!propertyTitle || !propertyType || !address|| !price|| !areaSqft|| !furnishing ||!status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Property.create({ propertyTitle, propertyType, address, price, areaSqft, furnishing, status })
        res.status(201).json({
            success:true,
            message: 'Property created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Property', details: error.message });
    }
};

export const getAllProperty = async (req, res) => {
    try {
        const propertys = await Property.find();
        res.json(propertys);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getPropertyById = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property id not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProperty = async (req, res) => {
    try {
        const {  propertyTitle, propertyType, address, price, areaSqft, furnishing, status} = req.body;
        const propertyId = req.params.id; 

        const existingProperty = await Property.findById(propertyId);
        if (!existingProperty) {
            return res.status(404).json({ message: 'property not found' });
        }

        const updateData = {
            propertyTitle, propertyType, address, price, areaSqft, furnishing, status
        };

        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'Property updated successfully',
            property: updatedProperty
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.id; 
        const deletedProperty = await Property.findByIdAndDelete(propertyId); 
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({
            success:true,
             message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};