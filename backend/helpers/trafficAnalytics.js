const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');
const {DateTime} = require('luxon');


const sequelize = require('../config/sequelize');
const linkTraffic = require('../db/models/LinkTraffic');


async function lastHourData(linkKey, timezone) {
    const linkId = linkKey;
    const now = DateTime.now().setZone(timezone);
    let startTime, interval;

    try{

        startTime = now.minus({ hours: 1 });
        const endTime = now;
        
        interval = 'minutes';

        const intervals = [];
        for (let i = 0; i < 30; i++) {
            const intervalStart = startTime.plus({ minutes: i * 2 });
            const intervalEnd = intervalStart.plus({ minutes: 2 });
            const intervalName = `${intervalStart.toFormat('h:mm a')} - ${intervalEnd.toFormat('h:mm a')}`;
            intervals.push({ start: intervalStart, end: intervalEnd, name: intervalName });
        }
        
        const clicksData = await Promise.all(
            intervals.map(async ({ start, end, name }, index) => {
                const clicks = await linkTraffic.count({
                    where: {
                        linkKey: linkId,
                        createdAt: {
                            [Op.gte]: start.toJSDate(),
                            [Op.lt]: end.toJSDate(),
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
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
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
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
                },
            },
            group: ['location_country'],
            order: [
                [Sequelize.literal('countryCount DESC')],
            ],
        });

        const clicksByReferer = await linkTraffic.findAll({
            attributes:[
                [sequelize.fn('COALESCE', sequelize.col('referrer'), 'null_placeholder'), 'referrer'], // Replace null with 'null_placeholder'
                [sequelize.fn('COUNT', '*'), 'refererCount'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
                },
            },
            group: [sequelize.fn('COALESCE', sequelize.col('referrer'), 'null_placeholder')], // Group by the replaced value
            order: [
                [Sequelize.literal('refererCount DESC')],
            ],
        })

        const clicksByDevice = await linkTraffic.findAll({
            attributes: [
                ['device_device', 'device'],
                [sequelize.fn('COUNT', '*'), 'deviceCount'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
                },
            },
            group: ['device_device'],
            order: [
                [Sequelize.literal('deviceCount DESC')],
            ],
        });

        const deviceData = clicksByDevice.map(entry => ({
            device: entry.get('device'),
            count: entry.get('deviceCount'),
        }));

        const refererData = clicksByReferer.map(entry => ({
            referer: entry.get('referrer') === '' ? 'direct' : entry.get('referrer'),
            count: entry.get('refererCount')
        }));
        const countryData = clicksByCountry.map(entry => ({
            country: entry.get('country'),
            count: entry.get('countryCount'),
        }));

        const result = {clicksData, countryData, totalClicks, linkKey, refererData, deviceData};        
        return result;
    } catch(error){
        console.log(error)
    } 
  
}


async function last24hours(linkKey, timezone){
    const linkId = linkKey;
  
    const now = DateTime.now().setZone(timezone);
    let startTime, interval;

    try{
        startTime = now.minus({ hours: 24 });
        const endTime = now;
        interval = 'hours';
       
        const intervals = [];
        for (let i = 0; i < 12; i++) {
            const intervalStart = startTime.plus({ hours: i * 2 });
            const intervalEnd = intervalStart.plus({ hours: 2 });
            const intervalName = `${intervalStart.toFormat('h:mm a')} - ${intervalEnd.toFormat('h:mm a')}`;
            intervals.push({ start: intervalStart, end: intervalEnd, name: intervalName });
        }
        
        const clicksData = await Promise.all(
            intervals.map(async ({ start, end, name }, index) => {
                const clicks = await linkTraffic.count({
                    where: {
                        linkKey: linkId,
                        createdAt: {
                            [Op.gte]: start.toJSDate(),
                            [Op.lt]: end.toJSDate(),
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
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
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
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
                },
            },
            group: ['location_country'],
            order: [
                [Sequelize.literal('countryCount DESC')],
            ],
        });

        const clicksByReferer = await linkTraffic.findAll({
            attributes:[
                [sequelize.fn('COALESCE', sequelize.col('referrer'), 'null_placeholder'), 'referrer'], // Replace null with 'null_placeholder'
                [sequelize.fn('COUNT', '*'), 'refererCount'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
                },
            },
            group: [sequelize.fn('COALESCE', sequelize.col('referrer'), 'null_placeholder')], // Group by the replaced value
            order: [
                [Sequelize.literal('refererCount DESC')],
            ],
        })

        const clicksByDevice = await linkTraffic.findAll({
            attributes: [
                ['device_device', 'device'],
                [sequelize.fn('COUNT', '*'), 'deviceCount'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
                },
            },
            group: ['device_device'],
            order: [
                [Sequelize.literal('deviceCount DESC')],
            ],
        });

        const deviceData = clicksByDevice.map(entry => ({
            device: entry.get('device'),
            count: entry.get('deviceCount'),
        }));


        const refererData = clicksByReferer.map(entry => ({
            referer: entry.get('referrer') === '' ? 'direct' : entry.get('referrer'),
            count: entry.get('refererCount')
        }));

        const countryData = clicksByCountry.map(entry => ({
            country: entry.get('country'),
            count: entry.get('countryCount'),
        }));

        

        return {clicksData, countryData, totalClicks, refererData, deviceData};

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

        const clicksByDevice = await linkTraffic.findAll({
            attributes: [
                ['device_device', 'device'],
                [sequelize.fn('COUNT', '*'), 'deviceCount'],
            ],
            where: {
                linkKey: linkKey,
            },
            group: ['device_device'],
            order:[
                [sequelize.literal('deviceCount DESC')],
            ],
        });

        const clicksByReferer = await linkTraffic.findAll({
            attributes:[
                [sequelize.fn('COALESCE', sequelize.col('referrer'), 'null_placeholder'), 'referrer'], // Replace null with 'null_placeholder'
                [sequelize.fn('COUNT', '*'), 'refererCount'],
            ],
            where: {
                linkKey: linkKey,
            },
            group: [sequelize.fn('COALESCE', sequelize.col('referrer'), 'null_placeholder')], // Group by the replaced value
            order: [
                [Sequelize.literal('refererCount DESC')],
            ],
        })        

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

        const refererData = clicksByReferer.map(entry => ({
            referer: entry.get('referrer') === '' ? 'direct' : entry.get('referrer'),
            count: entry.get('refererCount')
        }));


        const countryData = clicksByCountry.map(entry => ({
            country: entry.get('country'),
            count: entry.get('countryCount'),
        }));

        const deviceData = clicksByDevice.map(entry => ({
            device: entry.get('device'),
            count: entry.get('deviceCount'),
        }));
        

        return {clicksData, countryData, totalClicks, refererData, deviceData};


    } catch (error) {
        console.log(error);
    }
}


async function last30Days(linkKey, timezone) {
    const linkId = linkKey;
    const now = DateTime.now().setZone(timezone);

    try {
        startTime = now.minus({ days: 30 });
        const endTime = now;

        const maxTimestampResult = await linkTraffic.findOne({
            attributes: [
                [Sequelize.fn('MAX', Sequelize.col('createdAt')), 'maxTimestamp'],
            ],
            where: {
                linkKey: linkId,
                createdAt: {
                    [Op.gte]: startTime.toJSDate(),
                },
            },
            raw: true,
        });

        if (!maxTimestampResult.maxTimestamp) {
            return [];
        }

        
        const intervalCount = 15; 
        const intervalDuration = 2 * 24 * 60 * 60 * 1000;

        const intervals = [];
        for (let i = 0; i < intervalCount; i++) { 
            const intervalStart = startTime.plus({ milliseconds: i * intervalDuration });
            const intervalEnd = startTime.plus({ milliseconds: (i + 1) * intervalDuration });
            const intervalName = `${intervalStart.toFormat('MMM d, yyyy')} - ${intervalEnd.toFormat('MMM d, yyyy')}`;
            intervals.push({ start: intervalStart.toJSDate(), end: intervalEnd.toJSDate(), name: intervalName });
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
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
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
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
                },
            },
            raw: true,
        });

        const clicksByReferer = await linkTraffic.findAll({
            attributes:[
                [sequelize.fn('COALESCE', sequelize.col('referrer'), 'null_placeholder'), 'referrer'], // Replace null with 'null_placeholder'
                [sequelize.fn('COUNT', '*'), 'refererCount'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
                },
            },
            group: [sequelize.fn('COALESCE', sequelize.col('referrer'), 'null_placeholder')], // Group by the replaced value
            order: [
                [Sequelize.literal('refererCount DESC')],
            ],
        })

        const clicksByDevice = await linkTraffic.findAll({
            attributes: [
                ['device_device', 'device'],
                [sequelize.fn('COUNT', '*'), 'deviceCount'],
            ],
            where: {
                linkKey: linkKey,
                createdAt: {
                    [Op.gte]: startTime.toJSDate(),
                    [Op.lt]: endTime.toJSDate(),
                },
            },
            group: ['device_device'],
            order: [
                [Sequelize.literal('deviceCount DESC')],
            ],
        });

        const deviceData = clicksByDevice.map(entry => ({
            device: entry.get('device'),
            count: entry.get('deviceCount'),
        }));

        const refererData = clicksByReferer.map(entry => ({
            referer: entry.get('referrer') === '' ? 'direct' : entry.get('referrer'),
            count: entry.get('refererCount')
        }));


        const countryData = clicksByCountry.map(entry => ({
            country: entry.get('country'),
            count: entry.get('countryCount'),
        }));

        return { clicksData, countryData, totalClicks, refererData, deviceData };

    } catch (error) {
        console.error(error);
    }
}

module.exports = { lastHourData, last24hours, allTimeData, last30Days };
