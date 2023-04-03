const { Router } = require('express');
const {createActivity} = require("../controller/activityController");

const router = Router();


router.get("/", async (req, res, next) => {
    try{
        const dataBody = await createActivity(req.body)
        res.status(200).send(dataBody)
    } catch(e) {
        next(e)
    }
}) 

module.exports = router