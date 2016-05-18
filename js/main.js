var requestify = require('requestify');

requestify.get('http://api.brewerydb.com/v2/beer/Yq3v6n?key=57ac3d20257053737a469c6962fd60be').then(function(response) {
    // Get the response body (JSON parsed or jQuery object for XMLs)
    response.getBody();
    console.log(response);
    });