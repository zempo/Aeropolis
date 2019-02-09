'use strict';

/*
Notes

Air Quality Key: 
Air Quality Endpoints:

https://api.airvisual.com/v2/countries?key=CpizzCTn5NTozBHEW
supported countries 

https://api.airvisual.com/v2/states?country=Canada&key=CpizzCTn5NTozBHEW
supported states 

https://api.airvisual.com/v2/cities?state=Colorado&country=USA&key=CpizzCTn5NTozBHEW
supported cities 

http://api.airvisual.com/v2/city?city=Los%20Angeles&state=California&country=USA&key=CpizzCTn5NTozBHEW
city data 

Wikipedia Key:
Wikipedia Endpoint:

News Key:
News Endpoint: 
*/

/* ///////////////// Input /////////////////// */
// encode selector value uri data 
// disable submit button before selections are made 
// select country --> loop in regions of country, select region
// select region --> loop in cities
// select cities --> enable submit button! 
function watchSelect() {
    $('#country').change(event => {

        $('#region').empty();
        $('#city').empty();
    });
}

$(watchSelect);

/* ///////////////// Results /////////////////// */

const apiKey1 = 'CpizzCTn5NTozBHEW';
const baseURL1 = 'url1';

const apiKey2 = 'key2';
const baseURL2 = 'url2';

const apiKey3 = 'key3';
const baseURL3 = 'url3';

console.log('Script Loaded! Waiting for Input...');

function formatParams(params) {
    // use object keys method 
    // encode + join
}

function displayAQ() {
    // log airquality data to console

    // update results1 text 
    // affect other elements on page 
}

function displayWiki() {
    // display any relevant data 
}

function displayNews() {
    // display any relevant data 
}

function displayAll() {
    displayAQ();
    displayWiki();
    displayNews();
}

function fetchAQ() {
    // fetch aq, update display if there's an error or lack of results 
    // 'Unfortunately, there's no air quality data for this city yet...'
    // can request data, here (link to air quality measurement request form)
}

function fetchWiki() {
    // fetch wiki data 
    // log info or error message (exclamation point in div)
    // 'Error: Wikipedia Doesn't have info about this city...yet...
    // link to creating wikipedia articles 
}

function fetchNews() {
    // grab news data
    // log info or error message (exclamation point in div)
    // 'Error: There is no news about your city among English results 
}


function fetchAll() {
    fetchAQ();
    fetchWiki();
    fetchNews();
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();

        const city = $('#city').val();
        console.log(`Getting results for ${city}`);
    });
}

$(watchForm);
