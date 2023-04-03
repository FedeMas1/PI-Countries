const { Router } = require('express');
const { getCountryApi, getCountryDetail, searchCountryByName} = require("../controller/countryController");

const router = Router();

router.get("/", async (req, res, next) => {
    if (!req.params.id && !req.query.name) {
        try {
            const api = await getCountryApi();
            res.status(200).send(api)
        } catch (error) {
            next(error)
        }
    }
    else {
        next()
    }
}) 

router.get("/:id", async (req, res, next) => {
    if (req.params.id && !req.query.name) {
        try {
            const detail = await getCountryDetail(req.params.id);
            // const detailActivity = await
            res.status(200).send(detail)
        } catch (error) {
            next(error)
        }
    }
    else {
        next()
    }
})

 router.get("/", async (req, res, next) => {
   try {
    if (!req.params.id && req.query.name) {
        const search = await searchCountryByName(req.query.name)
        res.status(200).send(search)
    }
   } catch (error) {
    next(error)
   }
})

module.exports = router