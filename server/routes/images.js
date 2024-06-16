const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Setează directorul de bază pentru încărcări
const uploadBasePath = './uploadss'; // asigură-te că acest director există

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const agencyId = req.params.agencyId;
        const dir = `${uploadBasePath}/${agencyId}/`;
        console.log('Directorul', dir);

        // Crează directorul dacă nu există
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
            console.log('Directorul a fost creat.', dir);
        }else{
            console.log('Directorul exista');
        }

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload/:agencyId', upload.array('images', 12), (req, res) => {
    try {
        res.send({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An internal server error occurred' });
    }
});

router.get('/get-images/:agencyId', (req, res) => {
    try{
        const getAgencyImages = (agencyId) => {
            const directoryPath = path.join(__dirname, '..', 'uploadss', agencyId.toString());
            try {
                const files = fs.readdirSync(directoryPath);
                return files.map((file) => `uploadss/${agencyId}/${file}`);
            } catch (error) {
                console.error('Error reading directory', error);
                return []; // Return an empty array if there's an error (e.g., directory not found)
            }
        };
        const agencyId = req.params.agencyId;
        let images;
        images = getAgencyImages(agencyId);
        res.send({message: "Here are your files", images: images})
    } catch (error) {
        console.error(error);
        res.status(500);
    }
})




module.exports = router
