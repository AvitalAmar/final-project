const FB = require('fb');
const createFBPosting = (req, res) => {
    const { message } = req.body;
    
    FB.setAccessToken(process.env.FB_ACCESS_TOKEN);
    FB.api(
        '/' + process.env.FB_PAGE_ID + '/feed',
        'POST',
        { "message": message },
        function (response) {
            if (response.error) {
                console.log('error occurred: ' + response.error.message)
                return;
            }
            console.log('successfully posted to page!');
            res.json(response);      
        }
    );
}

module.exports = {
    createFBPosting,
};
