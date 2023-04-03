const { Country, Activity } = require("../db");
const axios = require("axios");
const { Sequelize } = require("sequelize")

const country = async function () {
    try {
        const api = await axios('https://restcountries.com/v3/all')
        const apiData = api.data?.map(async element => {
            await Country.findOrCreate({
                where: {
                    id: element.cca3,
                    name: element.name['common'],
                    flags: element.flags[0],
                    continents: element.continents[0],
                    capital: element.capital !== undefined ? element.capital[0] : 'No esta definido Capital',
                    subregion: element.subregion !== undefined ? element.subregion : 'No esta definido Subregion',
                    area: element.area,
                    population: element.population,
                },
                row: false
            })
            await Promise.all(apiData)
            return apiData
        })


    } catch (error) {
        console.log(error)
    }
}

const getCountryApi = async function () {
    try {
        const countriesData = country();
        const getCountries = await Country.findAll({
            attributes: ['id', 'name', 'flags', 'continents', "population"],
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }
        })
        return getCountries
    } catch (error) {
        console.log(error)
    }
}

const getCountryDetail = async function (id) {
    try {
        const countriesData = await country();
        const iD = id.toUpperCase();
        const deatilCountry = await Country.findOne({
            where: {
                id: iD
            },
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }

        });
        return deatilCountry
    }
    catch (error) {
        console.log(error)
    }
}

const searchCountryByName = async function (name) {
    try {
        const countrie = await Country.findAll({
            where:
            {
                name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name + '%')
            },

            raw: true
        })

        Promise.all(countrie)
        if (countrie.length > 0) {
            return countrie
        } return 'No se encontro el pais'
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getCountryApi,
    getCountryDetail,
    searchCountryByName,
}