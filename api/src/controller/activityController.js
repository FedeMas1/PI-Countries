const { Activity , Country } = require('../db')

const createActivity = async function(activity) {
    const newActivity  = await Activity.create({
        name: activity.name,
        difficulty: activity.difficulty,
        duration: activity.duration,
        season: activity.season
    })

Promise.all(activity.countries.map(async element => {
    let activityCountrie = await Country.findOne({
        where:{ 
            id: element
        }
    })
    await newActivity.addCountry(activityCountrie)
}));
}

module.exports = {
    createActivity
}