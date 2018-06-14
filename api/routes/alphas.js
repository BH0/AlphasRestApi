/// Dependencies 
const express = require("express"); 
const router = express.Router(); 
const multer = require("multer"); 

/// Middleware 
const checkAuth = require("../middleware/checkAuth"); 

/// Controllers 
const AlphasController = require("../controllers/alphas"); 

const storage = multer.diskStorage({ 
    destination: (req, file, callback) => { 
        callback(null, "./uploads/"); 
    }, 
    filename: (req, file, callback) => { 
        // callback(null, new Date().toISOString() + file.originalname); // for MacOS 
        // callback(null, new Date().toISOString().replace(/:/g, '-')); // for Windows  OS 
        callback(null, file.originalname); 
    } 
}); 

const fileFilter = (req, file, callback) => { 
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" ) { 
        callback(null, true); 
    } else { 
        callback(null, false); 
    } 
} 

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter 
}); 

/// Get All Alphas  
router.get("/", AlphasController.alphas_get_all); 

/// Get Alpha by ID 
router.get("/:alphaId", AlphasController.alphas_get_by_id); 

/// Post [Create new] Alpha 
router.post("/", checkAuth, upload.single("image"), AlphasController.alpha_create_alpha); 

/// Patch Update [Is similar to PUT, see: https://stackoverflow.com/a/21661036] 
router.patch("/:alphaId", checkAuth, AlphasController.alphas_update_alpha); 

/// Delete Alpha by ID 
router.delete("/:alphaId", checkAuth, AlphasController.alphas_delete_alpha); 

module.exports = router; 