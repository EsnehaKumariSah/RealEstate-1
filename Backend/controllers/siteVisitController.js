import siteVisit from "../models/siteVisit.js";

export const createSiteVisit = async (req, res) => {//controller hai
    try {// use for  catch error

        const { Property_Id, Visitor_name,Contact_no,Agent_Id, Sheduled_date, Visit_status} = req.body;
        if(!Property_Id || !Visitor_name|| !Contact_no  || !Agent_Id||! Sheduled_date|| ! Visit_status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await siteVisit.create({Property_Id, Visitor_name,Contact_no,Agent_Id, Sheduled_date, Visit_status})
        res.status(201).json({
            success:true,
            message: 'siteVisit created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the siteVisit', details: error.message });
    }
};

export const getAllSiteVisit = async (req, res) => {
    try {
        const siteVisits = await siteVisit.find();
        res.json(siteVisits);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// export const getsiteVisitById = async (req, res) => {
//     try {
//         const siteVisitId = req.params.id;
//         const siteVisit = await siteVisit.findById(siteVisitId);
//         if (!siteVisit) {
//             return res.status(404).json({ message: 'siteVisit id not found' });
//         }
//         res.json(siteVisit);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

export const updateSiteVisit = async (req, res) => {
    try {
        const { Property_Id, Visitor_name,Contact_no,Agent_Id, Sheduled_date, Visit_status  } = req.body;
        const siteVisitId = req.params.id; 

        const existingsiteVisit = await siteVisit.findById(siteVisitId);
        if (!existingsiteVisit) {
            return res.status(404).json({ message: 'siteVisit not found' });
        }

        const updateData = {
           Property_Id, Visitor_name,Contact_no,Agent_Id, Sheduled_date, Visit_status
        };

        const updatedsiteVisit = await siteVisit.findByIdAndUpdate(
            siteVisitId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'siteVisit updated successfully',
            siteVisit: updatedsiteVisit
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteSiteVisit = async (req, res) => {
    try {
        const siteVisitId = req.params.id; 
        const deletedsiteVisit = await siteVisit.findByIdAndDelete(siteVisitId); 
        if (!deletedsiteVisit) {
            return res.status(404).json({ message: 'siteVisit not found' });
        }
        res.json({
            success:true,
            message: 'siteVisit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};