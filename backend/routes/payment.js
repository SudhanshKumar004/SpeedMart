const router = require("express").Router();


router.post("/orders", async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        res.status(200).json({ message: "Backend is working fine!" });
    } catch (error) {
        console.error("Error in /orders route:", error);
        res.status(500).json({ message: "Something went wrong in backend!" });
    }
});



module.exports = router