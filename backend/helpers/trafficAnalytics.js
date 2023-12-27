const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');

const Links = require('../db/models/Links');
const linkTraffic = require('../db/models/LinkTraffic');

async function lastHourData(linkKey) {
    const linkId = linkKey;
  
    const now = new Date();
    let startTime, interval;

    try{
        startTime = moment(now).subtract(1, 'hour').toDate(); 
        interval = 'minutes';
        //   else if (selectedOption === 'past24Hours') {
        //     startTime = moment(now).subtract(24, 'hours').toDate();
        //     interval = 'hours'; // You can adjust the interval as needed
        //   } else {
        //     return res.status(400).json({ error: 'Invalid selected option' });
        //   }
        
        const intervals = [];
        for (let i = 0; i < 31; i++) {
            const intervalStart = moment(startTime).add(i * 2, interval).toDate();
            const intervalEnd = moment(intervalStart).add(2, interval).toDate();
            const intervalName = `${moment(intervalStart).format('h:mm A')} - ${moment(intervalEnd).format('h:mm A')}`;
            intervals.push({ start: intervalStart, end: intervalEnd, name: intervalName });
        }
        
        const clicksData = await Promise.all(
            intervals.map(async ({ start, end, name }, index) => {
                const clicks = await linkTraffic.count({
                    where: {
                        linkKey: linkId,
                        createdAt: {
                            [Op.gte]: start,
                            [Op.lt]: end,
                        },
                    },
                });
                return { name, Clicks: clicks };
            })
        );

        return clicksData;
    } catch(error){
        console.log(error)
    }
}


async function last24hours(linkKey){
    const linkId = linkKey;
  
    const now = new Date();
    let startTime, interval;

    try{
        startTime = moment(now).subtract(24, 'hours').toDate();
        interval = 'hours';
       
        const intervals = [];
        for (let i = 0; i < 31; i++) {
            const intervalStart = moment(startTime).add(i * 2, interval).toDate();
            const intervalEnd = moment(intervalStart).add(2, interval).toDate();
            const intervalName = `${moment(intervalStart).format('h:mm A')} - ${moment(intervalEnd).format('h:mm A')}`;
            intervals.push({ start: intervalStart, end: intervalEnd, name: intervalName });
        }
        
        const clicksData = await Promise.all(
            intervals.map(async ({ start, end, name }, index) => {
                const clicks = await linkTraffic.count({
                    where: {
                        linkKey: linkId,
                        createdAt: {
                            [Op.gte]: start,
                            [Op.lt]: end,
                        },
                    },
                });
                return { name, Clicks: clicks };
            })
        );

        return clicksData;
    } catch(error){
        console.log(error)
    }
}


async function allTimeData(linkKey) {
    const linkId = linkKey;

    try {
        // Find the earliest and latest timestamps in the LinkTraffic table
        const { minTimestamp, maxTimestamp } = await linkTraffic.findOne({
            attributes: [
                [Sequelize.fn('MIN', Sequelize.col('createdAt')), 'minTimestamp'],
                [Sequelize.fn('MAX', Sequelize.col('createdAt')), 'maxTimestamp'],
            ],
            where: {
                linkKey: linkId,
            },
            raw: true,
        });

        if (!minTimestamp || !maxTimestamp) {
            // Handle the case when there's no data available
            return [];
        }

        // Calculate the number of intervals based on the time range
        const intervalDuration = 1 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

        const intervals = [];
        let intervalStart = new Date(minTimestamp);
        while (intervalStart.getTime() <= maxTimestamp) {
            const intervalEnd = new Date(intervalStart.getTime() + intervalDuration);
            const intervalName = `${moment(intervalStart).format('MMM D, YYYY')}`;
            intervals.push({ start: intervalStart, end: intervalEnd, name: intervalName });
            intervalStart = intervalEnd;
        }

        const clicksData = await Promise.all(
            intervals.map(async ({ start, end, name }, index) => {
                const clicks = await linkTraffic.count({
                    where: {
                        linkKey: linkId,
                        createdAt: {
                            [Op.gte]: start,
                            [Op.lt]: end,
                        },
                    },
                });
                return { name, Clicks: clicks };
            })
        );

        return clicksData;
    } catch (error) {
        console.log(error);
    }
}


async function last30Days(linkKey) {
    const linkId = linkKey;

    try {
        // Calculate the start time as 30 days ago
        const startTime = moment().subtract(30, 'days').toDate();

        // Find the latest timestamp in the LinkTraffic table
        const { maxTimestamp } = await linkTraffic.findOne({
            attributes: [
                [Sequelize.fn('MAX', Sequelize.col('createdAt')), 'maxTimestamp'],
            ],
            where: {
                linkKey: linkId,
                createdAt: {
                    [Op.gte]: startTime,
                },
            },
            raw: true,
        });

        if (!maxTimestamp) {
            // Handle the case when there's no data available
            return [];
        }

        // Calculate the number of intervals based on the time range
        const intervalCount = 30;
        const intervalDuration = 24 * 60 * 60 * 1000;

        const intervals = [];
        for (let i = 0; i < intervalCount; i++) {
            const intervalStart = new Date(startTime.getTime() + i * intervalDuration);
            const intervalEnd = new Date(startTime.getTime() + (i + 1) * intervalDuration);
            const intervalName = `${moment(intervalStart).format('MMM D, YYYY')}`;
            intervals.push({ start: intervalStart, end: intervalEnd, name: intervalName });
        }

        const clicksData = await Promise.all(
            intervals.map(async ({ start, end, name }, index) => {
                const clicks = await linkTraffic.count({
                    where: {
                        linkKey: linkId,
                        createdAt: {
                            [Op.gte]: start,
                            [Op.lt]: end,
                        },
                    },
                });
                return { name, Clicks: clicks };
            })
        );

        return clicksData;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { lastHourData, last24hours, allTimeData, last30Days };
