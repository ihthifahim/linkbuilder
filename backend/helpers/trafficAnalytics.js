const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');
const {DateTime} = require('luxon');
const axios = require('axios');

const sequelize = require('../config/sequelize');

const Links = require('../db/models/Links');
const linkTraffic = require('../db/models/LinkTraffic');

async function lastHourData(linkKey, timezone) {
    const linkId = linkKey;
    const now = DateTime.now();
    
    let startTime, interval;

    try{
        startTime = moment(now).subtract(24, 'hours').toDate();
        const endTime = moment().toDate();
        interval = 'minutes';

        const intervals = [];
        for (let i = 0; i < 30; i++) {
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

        
        const totalClicks = await linkTraffic.findOne({
            attributes: [
                'linkKey',
                [Sequelize.fn('COUNT', '*'), 'totalClicks'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime,
                    [Op.lt]: endTime,
                },
            },
            raw: true,
        });
        
    
        const clicksByCountry = await linkTraffic.findAll({
            attributes: [
                ['location_country', 'country'],
                [sequelize.fn('COUNT', '*'), 'countryCount'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime,
                    [Op.lt]: endTime,
                },
            },
            group: ['location_country'],
            order: [
                [Sequelize.literal('countryCount DESC')],
            ],
        });

        const countryData = clicksByCountry.map(entry => ({
            country: entry.get('country'),
            count: entry.get('countryCount'),
        }));

        
        return {clicksData, countryData, totalClicks, linkKey};
        

    } catch(error){
        console.log(error)
    }
}


async function last24hours(linkKey, timezone){
    const linkId = linkKey;
  
    const now = new Date();
    let startTime, interval;

    try{
        startTime = moment(now).tz(timezone).subtract(24, 'hours').toDate();
        const endTime = moment().tz(timezone).toDate();
        interval = 'hours';
       
        const intervals = [];
        for (let i = 0; i < 12; i++) {
            const intervalStart = moment(startTime).tz(timezone).add(i * 2, interval).toDate();
            const intervalEnd = moment(intervalStart).tz(timezone).add(2, interval).toDate();
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

        const totalClicks = await linkTraffic.findOne({
            attributes:[
                'linkKey',
                [sequelize.fn('COUNT', '*'), 'totalClicks']
            ],
            where: {
                linkKey: linkId,
                createdAt: {
                    [Op.gte]: startTime,
                    [Op.lt]: endTime
                },
            },
            raw: true,
        })

        const clicksByCountry = await linkTraffic.findAll({
            attributes: [
                ['location_country', 'country'],
                [sequelize.fn('COUNT', '*'), 'countryCount'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime,
                    [Op.lt]: endTime,
                },
            },
            group: ['location_country'],
            order: [
                [Sequelize.literal('countryCount DESC')],
            ],
        });

        const countryData = clicksByCountry.map(entry => ({
            country: entry.get('country'),
            count: entry.get('countryCount'),
        }));

        

        return {clicksData, countryData, totalClicks};

    } catch(error){
        console.log(error)
    }
}


async function allTimeData(linkKey, timezone) {
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

        const clicksByCountry = await linkTraffic.findAll({
            attributes: [
                ['location_country', 'country'],
                [sequelize.fn('COUNT', '*'), 'countryCount'],
            ],
            where: {
                linkKey: linkKey,
            },
            group: ['location_country'],
            order:[
                [sequelize.literal('countryCount DESC')],
            ],
        });

        const totalClicks = await linkTraffic.findOne({
            attributes:[
                'linkKey',
                [sequelize.fn('COUNT', '*'), 'totalClicks']
            ],
            where: {
                linkKey: linkKey,
            },
            raw: true,
        })

        const countryData = clicksByCountry.map(entry => ({
            country: entry.get('country'),
            count: entry.get('countryCount'),
        }));
        

        return {clicksData, countryData, totalClicks};


    } catch (error) {
        console.log(error);
    }
}


async function last30Days(linkKey, timezone) {
    const linkId = linkKey;

    try {
        const startTime = moment().tz(timezone).subtract(30, 'days').toDate();
        const endTime = moment().tz(timezone).toDate();
        const maxTimestampResult = await linkTraffic.findOne({
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

        if (!maxTimestampResult.maxTimestamp) {
            return [];
        }

        // Calculate the number of intervals based on the time range
        const intervalCount = 15; // 30 days divided into 15 intervals (2 days each)
        const intervalDuration = 2 * 24 * 60 * 60 * 1000;

        const intervals = [];
        for (let i = 0; i < intervalCount; i++) {
            const intervalStart = moment(startTime).add(i * intervalDuration, 'milliseconds');
            const intervalEnd = moment(startTime).add((i + 1) * intervalDuration, 'milliseconds');
            const intervalName = `${intervalStart.format('MMM D, YYYY')} - ${intervalEnd.format('MMM D, YYYY')}`;
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


           
        const clicksByCountry = await linkTraffic.findAll({
            attributes: [
                ['location_country', 'country'],
                [sequelize.fn('COUNT', '*'), 'countryCount'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime,
                    [Op.lt]: endTime,
                },
            },
            group: ['location_country'],
            order: [
                [Sequelize.literal('countryCount DESC')],
            ],
        });

        const totalClicks = await linkTraffic.findOne({
            attributes: [
                'linkKey',
                [Sequelize.fn('COUNT', '*'), 'totalClicks'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime,
                    [Op.lt]: endTime,
                },
            },
            raw: true,
        });

        const countryData = clicksByCountry.map(entry => ({
            country: entry.get('country'),
            count: entry.get('countryCount'),
        }));

        return { clicksData, countryData, totalClicks };

    } catch (error) {
        console.error(error);
    }
}

module.exports = { lastHourData, last24hours, allTimeData, last30Days };
