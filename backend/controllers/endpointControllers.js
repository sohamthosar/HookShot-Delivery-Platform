const Endpoint = require('../models/Endpoint');
const cache = require('../utils/cache');
const mongoose = require('mongoose');

const createEndpoints = async (req, res) => {
    try{
        const { url } = req.body;

        if(!(url && URL.canParse(url) && (url.startsWith('http://') || url.startsWith('https://')))){
            return res.status(400).json({
                message : "URL is invalid"
            });
        }

        const newEndpoint = new Endpoint({
            userId : req.user.userId,
            url : url
        });

        await newEndpoint.save();

        cache.del("endpoints:" + req.user.userId);

        return res.status(201).json({
            message : "New Endpoint saved", 
            newEndpoint : newEndpoint
        });
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

const getEndpoints = async (req, res) => {
    try{
        const endpoints = await Endpoint.find({
            userId : req.user.userId
        });

        return res.status(200).json(endpoints);
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

const updateEndpoints = async (req, res) => {
    try{
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid endpoint ID"
            });
        }

        const { url } = req.body;
        const updates = {};

        if(url !== undefined) updates.url = url;
        // if(active !== undefined) updates.active = active;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update"
            });
        }
    
        if(updates.url && !(URL.canParse(updates.url) && (updates.url.startsWith('http://') || updates.url.startsWith('https://')))){
            return res.status(400).json({
                message : "URL is invalid"
            });
        }


        const updatedEndpoint = await Endpoint.findOneAndUpdate(
            {
                _id : req.params.id,
                userId : req.user.userId
            },
            {
                $set : updates
            },
            {
                new: true, 
                runValidators: true
            }
        );

        if(!updatedEndpoint){
            return res.status(404).json({
                message : "Endpoint not found or unauthorized"
            });
        }

        cache.del("endpoints:" + req.user.userId);

        return res.status(200).json({
            message : "Endpoint Updated Sucessfully", updatedEndpoint
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

const deleteEndpoints = async (req, res) => {
    try{
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid endpoint ID"
            });
        }

        const deletedEndpoint = await Endpoint.findOneAndDelete(
            {
                _id : req.params.id,
                userId : req.user.userId
            }
        );

        if(!deletedEndpoint){
            return res.status(404).json({
                message : "Endpoint not found or unauthorized"
            });
        }

        cache.del("endpoints:" + req.user.userId);

        return res.status(200).json({
            message : "Endpoint Deleted Sucessfully", deletedEndpoint
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

module.exports = { getEndpoints, createEndpoints, updateEndpoints, deleteEndpoints };