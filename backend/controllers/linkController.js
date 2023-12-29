const axios = require('axios');
const cheerio = require('cheerio');
const urlLib = require('url');

const Links = require('../db/models/Links');
const User = require('../db/models/User');
const ErrorLog = require( "../db/models/ErrorLog" );

const {generateLinkKey, findFavicon} = require('../helpers/linkHelpers')
const predefinedLinkKeys = require('../helpers/predefinedLinkKeys')

const {lastHourData, last24hours, last30Days, allTimeData} = require('../helpers/trafficAnalytics');
const {deleteLinkHelper} = require('../helpers/deleteLink');


const { jwtDecode } = require('jwt-decode')


async function fetchLink(req, res){
    try {
        const { url } = req.body;
        
        if(url){
            const response = await axios.get(url);
            const html = response.data;

            if (html.includes('Object not found!')) {
                const errorMessage = 'Page not found';
                console.log(`Page not found: ${errorMessage}`);
                res.status(404).json({ error: errorMessage });
                return;
            }

            const $ = cheerio.load(html);
            const parsedUrl = urlLib.parse(url);
            const domainName = parsedUrl.hostname;

            const metaTags = {
                domainName,
                title: $('title').text(),
                description: $('meta[name="description"]').attr('content') || '',
                image: $('meta[property="og:image"]').attr('content') || '',
                favicon: findFavicon($, url),
            };
           
            res.json(metaTags);
        }

    } catch (error) {
        if (error.response && error.response.status === 404 || error.code === 'ENOTFOUND') {
            const errorMessage = 'Page not found';
            console.log(error)
            res.status(404).json({ error: errorMessage });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

async function linkKey(req, res){
    try{
        const newLinkKey = generateLinkKey();
        res.status(200).json(newLinkKey);
    } catch(error){
        res.status(500).json(error);
    }

}

async function saveLink(req, res){

    try{
        const {link_key, destinationURL, utm_source, utm_medium, utm_campaign, utm_id, utm_term, utm_content,page_favicon, page_title,
            page_description, page_image, token
        } = req.body;

        if (predefinedLinkKeys.includes(link_key)) {
            res.status(200).json({message: "key exists"});
            return;
        }

        const linkExists = await Links.findOne({where: {link_key: link_key}});
        if(linkExists){
            res.status(200).json({message: "key exists"});
        } else {
            const domain = "gum.lk";
            const decodedToken = jwtDecode(token, '123');
            const user = await User.findOne({where: { id: decodedToken.userId}});
            if(user){
                await Links.create({
                    link_key,
                    userId: user.id,
                    destinationURL,
                    domain,
                    utm_source,
                    utm_medium,
                    utm_campaign,
                    utm_id,
                    utm_term,
                    utm_content,
                    page_favicon,
                    page_title,
                    page_description,
                    page_image
                });

                res.status(200).json({ message: "link saved"});
            } else {
                res.status(401).json({ message: "something went wrong"});
            }
        }




    } catch (error) {
        await ErrorLog.create({
            errorMessage: error,
        });
        res.status(500).json({ error: 'Internal Server Error', message: error });
    }
}



async function getAllLinks(req, res){
    try{
        const links = await Links.findAll({
            where: {userId: req.user.userId},
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json(links);
    } catch(error){
        await ErrorLog.create({
            errorMessage: error.message,
        });
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function getLink(req, res){
    try{

        const link = await Links.findOne({
            where: {link_key: req.query.key}
        })
        res.status(200).json(link);
    } catch(error){
        await ErrorLog.create({
            errorMessage: error.message,
        });
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function saveLinkHome(req, res){
    try{
        const { destinationURL } = req.body;
        const link_key = generateLinkKey();
        const domain = "gum.lk";
        const link = await Links.create({
            link_key,
            destinationURL,
            domain,
        });
        res.status(200).json({ 
            message: "link saved",
            link
        });
 
    } catch (error) {
        await ErrorLog.create({
            errorMessage: error,
        });
        res.status(500).json({ error: 'Internal Server Error', message: error });
    }
}

async function getAnalytics(req, res){
    const linkKey = req.params.linkkey;
    const range = req.params.range;

    const timezone = req.headers.usertimezone;
    
    
    try{
        if(range === "lasthour"){
            const data = await lastHourData(linkKey, timezone);
            console.log(timezone);
            console.log(data);
            res.status(200).json({data});
        } else if( range === "past24hours"){
            const data = await last24hours(linkKey, timezone);
            res.status(200).json({data});
        } else if( range === "last30Days"){
            const data = await last30Days(linkKey, timezone);
            res.status(200).json({data});
        } else {
            const data = await allTimeData(linkKey, timezone);
            res.status(200).json({data});
        }
        
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error', message: error });
    }

    
}


async function deleteLink(req, res){
    const linkKey = req.params.linkkey;
    deleteLinkHelper(linkKey).then((result) => {
        console.log(result);
        res.status(200).json({ message: result});
    }).catch((error) => {
        console.error('error in deleting link', error);
    })
}



module.exports = {fetchLink, linkKey, saveLink, getAllLinks, getLink, saveLinkHome, getAnalytics, deleteLink}