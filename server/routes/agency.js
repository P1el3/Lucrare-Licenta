const express = require('express');
const agencyController = require('../controllers/agencyController');
const {addAgency} = agencyController;
const {getAgenciesInCity} = agencyController;
const {getAgencyDetails} = agencyController;
const {editAgencyDetails} = agencyController;
const {getAgencyByUser} = agencyController;

const router = express.Router();

router.post('/addAgency', addAgency)

router.get('/in-city/:city', getAgenciesInCity);

router.get('/agency-details-page/:agencyid', getAgencyDetails);

router.get('/agency-details/:userid', getAgencyByUser);

router.put(`/edit-agency/:agencyid`, editAgencyDetails);

module.exports = router
