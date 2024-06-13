//importing modules
const bcrypt = require('bcrypt');
const db = require("../models");
const jwt = require("jsonwebtoken");
const {parse} = require("dotenv")
const Agentii = db.agentii;

const addAgency = async (req, res) => {
    try {

        const {
            userid, numeagentie, nrtelagentie, nrmasini, nratv, nrmotociclete, localitate, adresa
        } = req.body;
        const data = {
            userid,
            numeagentie,
            nrtelagentie,
            nrmasini,
            nratv,
            nrmotociclete,
            localitate,
            adresa,
        };
        console.log(data)
        // Saving the agency
        const agency = await Agentii.create(data);

        if (agency) {
            return res.status(201).send({message: "Agency added successfully", agency});
        } else {
            return res.status(409).send("Failed to add agency");
        }
    } catch (error) {
        console.error("Add Agency Error:", error);
        return res.status(500).send({message: "An error occurred", error: error.message});
    }
}

const getAgenciesInCity = async (req, res) => {
    const {city} = req.params;
    try {
        const agencies = await Agentii.findAll({
            where: {
                localitate: city
            }
        });
        res.status(200).json(agencies);
    } catch (error) {
        console.error("Get Agency Error:", error);
        res.status(500).send({message: "An error occurred", error: error.message});
    }
}

const getAgencyDetails = async (req, res) => {
    const {agencyid} = req.params;
    try {
        const agency = await Agentii.findOne({
            where: {
                agentieid: agencyid
            }
        });
        res.status(200).json(agency);
    } catch (error) {
        console.error("Get Agency Details Error: ", error);
        res.status(500).send({message: "An error occurred", error: error.message});
    }
}

const getAgencyByUser = async (req, res) => {
    const {userid} = req.params;
    try {
        const agency = await Agentii.findOne({
            where: {
                userid: userid
            }
        });
        res.status(200).json(agency);
    } catch (error) {
        console.error("Get Agency Details Error: ", error);
        res.status(500).send({message: "An error occurred", error: error.message});
    }
}

const editAgencyDetails = async (req, res) => {
    try {
        const {agencyid} = req.params;
        if (!agencyid) {
            return res.status(401).send("No agency found.");
        }

        // Găsirea agenției în baza de date
        const agency = await Agentii.findByPk(agencyid)

        if (!agency) {
            return res.status(404).send("Agency not found.");
        }

        // Extragerea datelor din corpul cererii
        const {
            numeagentie,
            nrtelagentie,
            nrmasini,
            nratv,
            nrmotociclete,
            localitate,
            adresa,
        } = req.body;

        // Actualizarea agenției în baza de date
        const updatedAgency = await agency.update({
            numeagentie: numeagentie,
            nrtelagentie: nrtelagentie,
            nrmasini: nrmasini,
            nratv: nratv,
            nrmotociclete: nrmotociclete,
            localitate: localitate,
            adresa: adresa
        });

        // Răspunsul cu detaliile agenției actualizate
        return res.status(200).json({
            message: "Agency details updated successfully",
            agency: updatedAgency
        });
    } catch (error) {
        console.error("Edit agency error: ", error);
        return res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
}


module.exports = {
    addAgency,
    getAgenciesInCity,
    getAgencyDetails,
    editAgencyDetails,
    getAgencyByUser,
}
