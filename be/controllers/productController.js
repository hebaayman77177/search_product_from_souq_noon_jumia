const { souqScraper , noonScraper , jumiaScraper } = require("../shared/scrapers");

exports.getProducts = async (req, res, next) => {

    try{
        const { searchString } = req.query;
        const souqitems = await souqScraper(searchString);
        console.log("finished souq");
        const noonitems = await noonScraper(searchString);
        console.log("finished noon");
        const jumiaitems = await jumiaScraper(searchString);
        console.log("finished jumia");

        res.status(200).json({souqitems,noonitems,jumiaitems});
    }catch(err){
        next(err)
    }
};
