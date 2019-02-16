"use strict";

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

https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=Colorado
wikipedia endpoint 

great, <= 25, no overall health risk
good, 25 < x <= 50, minimal health risk, some risk areas (factories, etc)
fair, 50 < x <= 100, low risk, some pollutants might affect vulnerable groups
poor, 100 < x <= 125,  vulnerable groups more likely to be affected, some warnings 
low, 125 < x <= 150,  vulnerable groups more likely to be affected + long term concerns increase, some warnings 
unhealthy 150 < x <= 200,  health effects likely for everyone, sensitive groups more likely to need hospitalization
very unhealthy 200 < x <= 300,  Many jurisdictions will issue a health alert, hospitalizations more common for general population
hazardous  300 < x, avoid city, if possible. Emergency conditions might be declared.
                  Entire population is likely to be affected

News Key: 13b5bb62016543439061414e0e3274bf
News Endpoint: 

   mymap.flyTo([latitude, longitude], 10);
   let marker = L.marker([latitude, longitude])
   marker.addTo(mymap);
   const popup = marker.bindPopup(`<b>${city}, ${country}: ${aqi}</b>`);
   let circle = L.circle([latitude, longitude], {
       color: 'red',
       fillColor: '#f03',
       fillOpacity: 0.5,
       radius: 2000 
   })
   setTimeout( () => {
       circle.addTo(mymap);
       popup.openPopup(); 
    }, 2800);  
*/

/* ////////////////////////////////// Input //////////////////////////////// */

function updateRegion(responseJson) {
  const country = $("#country option:selected").val();
  $("#region").append(`<option value="">Regions of ${country}</option>`);

  for (let i = 0; i < responseJson.data.length; i++) {
    let opt = responseJson.data[i].state;

    $("#region").append(`<option value="${opt}">${opt}</option>`);
    $("#city").empty();
    $("#city").append(`<option value="">Select Region</option>`);
  }
}

function updateCity(responseJson2) {
  const region = $("#region option:selected").val();

  $("#city").append(`<option value="">Cities of ${region}</option>`);

  for (let i = 0; i < responseJson2.data.length; i++) {
    let opt = responseJson2.data[i].city;

    $("#city").append(`<option value="${opt}">${opt}</option>`);
  }

  $("#city").change(function () {
    $(".searchBtn").prop("disabled", false);
  });
}

function watchSelect() {
  $(document).ready(function () {
    $(".searchBtn").prop("disabled", true);
  });

  $("#country").change(event => {
    const country = $("#country option:selected").val();
    const country2 = encodeURI(country);

    $("#region").empty();

    const url = `https://api.airvisual.com/v2/states?country=${country2}&key=CpizzCTn5NTozBHEW`;

    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        alert(`Too many requests or city data unavailable! Please wait 30 seconds or try a different.`);
      })
      .then(responseJson => {
        updateRegion(responseJson);
      });
  });

  $("#region").change(event => {
    const country = $("#country option:selected").val();
    const country2 = encodeURI(country);
    const region = $("#region option:selected").val();
    const region2 = encodeURI(region);

    $("#city").empty();

    const url = `https://api.airvisual.com/v2/cities?state=${region2}&country=${country2}&key=CpizzCTn5NTozBHEW`;

    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        alert(`Too many requests or city data unavailable! Please wait 30 seconds or try a different.`);
      })
      .then(responseJson2 => {
        updateCity(responseJson2);
      });
  });
}

/* ///////////////// Results /////////////////// */

const apiKey1 = "CpizzCTn5NTozBHEW"; // air quality
const apiKey2 = "pk.eyJ1Ijoic3plbGVua28iLCJhIjoiY2pyeTFua3B5MDkweDQ5b2FkN2Zjd2J3MyJ9.0bRcWdywT6p9iANZuDw-0Q"; // maps
const apiKey3 = "13b5bb62016543439061414e0e3274bf"; // news
let mymap;

console.log("Script Loaded! Waiting for Input...");

function displayAQ(responseJson3) {
  const aqi = responseJson3.data.current.pollution.aqius;
  const [longitude, latitude] = responseJson3.data.location.coordinates;
  const city = $("#city").val();
  const country = $("#country").val();
  $(".results1").empty();
  if (aqi <= 25) {
    $(".results1").append(
      `<h2>The Air Quality Index for ${city}, ${country} is ${aqi}</h2>
           <h3>This city has excellent health. 8.0/8.0</h3>
           <p>There is negligible overall risk to the entire population. This city is among the healthiest, in terms of air quality.</p></br></br>
        <a href="#results2" role="tab">City Wiki</a>
        <a href="#results3" role="tab">City News</a>`
    );
    // 1 small white cloud w/ common pollutant
    // dark-green bar below city vector, 100%
    mymap.flyTo([latitude, longitude], 10);
    let marker = L.marker([latitude, longitude]);
    marker.addTo(mymap);
    const popup = marker.bindPopup(`<b>${city}, ${country}: ${aqi}</b>`);
    let circle = L.circle([latitude, longitude], {
      color: "#259146",
      fillColor: "#70e092",
      fillOpacity: 0.5,
      radius: 3000
    });
    setTimeout(() => {
      circle.addTo(mymap);
      popup.openPopup();
    }, 2000);
    // ^_^ excited sun!
  } else if (aqi > 25 && aqi <= 50) {
    $(".results1").append(
      `<h2>The Air Quality for ${city}, ${country} is ${aqi}</h2>
            <h3>This city has good health! 7.0/8.0</h3>
            <p>There might be some risky areas, such as factories. Pollution is rarely an issue.</p></br></br>
        <a href="#results2" role="tab">City Wiki</a>
        <a href="#results3" role="tab">City News</a>`
    );
    // 2 small gray clouds w/ common pollutant
    // medium-green bar below city vector, 87.5%
    mymap.flyTo([latitude, longitude], 10);
    let marker = L.marker([latitude, longitude]);
    marker.addTo(mymap);
    const popup = marker.bindPopup(`<b>${city}, ${country}: ${aqi}</b>`);
    let circle = L.circle([latitude, longitude], {
      color: "#5b9300",
      fillColor: "#9cf709",
      fillOpacity: 0.5,
      radius: 3000
    });
    setTimeout(() => {
      circle.addTo(mymap);
      popup.openPopup();
    }, 2000);
    // :) happy sun
  } else if (aqi > 50 && aqi <= 100) {
    $(".results1").append(
      `<h2>The Air Quality for ${city}, ${country} is ${aqi}</h2>
            <h3>This city has fair health. 6.0/8.0</h3>
            <p>There is low risk overall. However, certain pollutants will affect vulnerable groups.</p></br></br>
        <a href="#results2" role="tab">City Wiki</a>
        <a href="#results3" role="tab">City News</a>`
    );
    // 2 clouds, 1 small gray, 1 medium gray
    // light-green below city vector, 75%
    mymap.flyTo([latitude, longitude], 10);
    let marker = L.marker([latitude, longitude]);
    marker.addTo(mymap);
    const popup = marker.bindPopup(`<b>${city}, ${country}: ${aqi}</b>`);
    let circle = L.circle([latitude, longitude], {
      color: "#89aa11",
      fillColor: "#cfe018",
      fillOpacity: 0.6,
      radius: 3000
    });
    setTimeout(() => {
      circle.addTo(mymap);
      popup.openPopup();
    }, 2000);
    // smirking sun
  } else if (aqi > 100 && aqi <= 125) {
    $(".results1").append(
      `<h2>The Air Quality for ${city}, ${country} is ${aqi}</h2>
        <h3>This city is vulnerable. 5.0/8.0</h3>
        <p>Vulnerable groups are more likely to be affected. Warnings might be issued.</p></br></br>
        <a href="#results2" role="tab">City Wiki</a>
        <a href="#results3" role="tab">City News</a>`
    );
    // 3 clouds, 2 small gray, 1 medium gray
    // bright yellow, 62.5%
    mymap.flyTo([latitude, longitude], 10);
    let marker = L.marker([latitude, longitude]);
    marker.addTo(mymap);
    const popup = marker.bindPopup(`<b>${city}, ${country}: ${aqi}</b>`);
    let circle = L.circle([latitude, longitude], {
      color: "#bcbc1e",
      fillColor: "#eaea12",
      fillOpacity: 0.5,
      radius: 3000
    });
    setTimeout(() => {
      circle.addTo(mymap);
      popup.openPopup();
    }, 2000);
    // -_- concerned sun, 1 sweat drop, meh-face
  } else if (aqi > 125 && aqi <= 150) {
    $(".results1").append(
      `<h2>The Air Quality for ${city}, ${country} is ${aqi}</h2>
        <h3>This city has declining health! 4.0/8.0</h3>
        <p>Vulnerable groups are more likely to be affected -- with some hospitalizations taking place. Warnings aren't uncommon.</p></br></br>
        <a href="#results2" role="tab">City Wiki</a>
        <a href="#results3" role="tab">City News</a>`
    );
    // 4 clouds, 3 small gray, 1 medium gray
    // orange, 50%
    mymap.flyTo([latitude, longitude], 10);
    let marker = L.marker([latitude, longitude]);
    marker.addTo(mymap);
    const popup = marker.bindPopup(`<b>${city}, ${country}: ${aqi}</b>`);
    let circle = L.circle([latitude, longitude], {
      color: "#db9200",
      fillColor: "#ffb523",
      fillOpacity: 0.6,
      radius: 3000
    });
    setTimeout(() => {
      circle.addTo(mymap);
      popup.openPopup();
    }, 2000);
    // :/ ...sweating sun, grimacing, 2 drops
  } else if (aqi > 150 && aqi <= 200) {
    $(".results1").append(
      `<h2>The Air Quality for ${city}, ${country} is ${aqi}</h2>
        <h3>This city has poor health! 3.0/8.0</h3>
        <p>Everyone is likely to experience some effects. Vulnerable groups have limited mobility.</p></br></br>
        <a href="#results2" role="tab">City Wiki</a>
        <a href="#results3" role="tab">City News</a>`
    );
    // 5 clouds, 3 small gray, 2 medium gray
    // red, 37.5%
    mymap.flyTo([latitude, longitude], 10);
    let marker = L.marker([latitude, longitude]);
    marker.addTo(mymap);
    const popup = marker.bindPopup(`<b>${city}, ${country}: ${aqi}</b>`);
    let circle = L.circle([latitude, longitude], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 3000
    });
    setTimeout(() => {
      circle.addTo(mymap);
      popup.openPopup();
    }, 2000);
    // :D, sun wearing surgical mask
  } else if (aqi > 200 && aqi <= 300) {
    $(".results1").append(
      `<h2>The Air Quality for ${city}, ${country} is ${aqi}</h2>
        <h3>This city is unhealthy! 2.0/8.0</h3>
        <p>Health Alerts are common. Pollution directly impacts all members of the population. Serious effects are seen.</p></br></br>
        <a href="#results2" role="tab">City Wiki</a>
        <a href="#results3" role="tab">City News</a>`
    );
    // 6 clouds, 3 small gray, 3 medium gray
    // purple, 25%
    mymap.flyTo([latitude, longitude], 10);
    let marker = L.marker([latitude, longitude]);
    marker.addTo(mymap);
    const popup = marker.bindPopup(`<b>${city}, ${country}: ${aqi}</b>`);
    let circle = L.circle([latitude, longitude], {
      color: "#590293",
      fillColor: "#b402d3",
      fillOpacity: 0.5,
      radius: 3000
    });
    setTimeout(() => {
      circle.addTo(mymap);
      popup.openPopup();
    }, 2000);
    // : D, sun wearing WWI gas-mask
  } else if (aqi > 300) {
    $(".results1").append(
      `<h2>The Air Quality for ${city}, ${country} is ${aqi}</h2>
        <h3>This city is hazardous! 1.0/8.0</h3>
        <p>Emergency Conditions are met. Serious health effects are common. This city is among the most unhealthy in the world.</p></br></br>
        <a href="#results2" role="tab">City Wiki</a>
        <a href="#results3" role="tab">City News</a>`
    );
    // 6 clouds, 2 small gray, 4 medium gray
    // maroon, 12.5%
    mymap.flyTo([latitude, longitude], 10);
    let marker = L.marker([latitude, longitude]);
    marker.addTo(mymap);
    const popup = marker.bindPopup(`<b>${city}, ${country}: ${aqi}</b>`);
    let circle = L.circle([latitude, longitude], {
      color: "#600021",
      fillColor: "#420d1f",
      fillOpacity: 0.7,
      radius: 3000
    });
    setTimeout(() => {
      circle.addTo(mymap);
      popup.openPopup();
    }, 2000);
    // : O, sun wearing hazmat suit
  } else {
    $(".results1").append(`<h2>Error 404: Air Quality Index data is absent from this city.</h2>`);
    // funny error message
  }
}

function initializeMap() {
  // display any relevant data
  mymap = L.map("mapid");
  mymap.setView([0, 0], 1);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3plbGVua28iLCJhIjoiY2pyeTFua3B5MDkweDQ5b2FkN2Zjd2J3MyJ9.0bRcWdywT6p9iANZuDw-0Q", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: "pk.eyJ1Ijoic3plbGVua28iLCJhIjoiY2pyeTFua3B5MDkweDQ5b2FkN2Zjd2J3MyJ9.0bRcWdywT6p9iANZuDw-0Q"
    }
  ).addTo(mymap);
}

function displayWiki(responseJson4) {
  // console.log(responseJson4);

  $("#results2").empty();
  //  <iframe src="https://en.wikipedia.org/wiki/Atlantis" frameborder="0" class="wikiFrame"></iframe>
  if (responseJson4.query.search.length === 0) {
    $("#results2").append(`<h2>Sorry, no wikipedia article here</h2>`);
  } else {
    const {
      title,
      snippet
    } = responseJson4.query.search[0];

    let S = snippet;

    while (S.includes("(")) {
      let end = null;
      let start = S.indexOf("(");

      end = S.indexOf(")");
      let startS = S.substr(0, start);
      // console.log(startS);
      let endS = S.substr(end + 2);
      // console.log(endS);
      S = startS + endS;
    }

    while (S.includes(":")) {
      let end = null;
      let start = S.indexOf(":");

      end = S.lastIndexOf(":");
      let startS = S.substr(0, start);
      let endS = S.substr(end + 2);
      S = startS + endS;
    }

    S.replace(/     /g, "   ");
    S.replace(/    /g, "   ");
    S.replace(/   /g, "  ");
    S.replace(/  /g, " ");
    $("#results2").append(`<h2>${title}</h2>
      <blockquote>"${S}..."</blockquote> 
      <button class="showFullWiki" role="toggle">&lt;See Full Article&gt;</button>
      <iframe src="https://en.wikipedia.org/wiki/${title}" frameborder="0" id="wikiFrame"></iframe>`);
  }
}

function displayNews(responseJson5) {
  $("#results3").empty();
  console.log(responseJson5);
  console.log(responseJson5.totalResults);
  // erase Atlantis data
  let noResults = [
    `Sometimes, no news is good news!`,
    `Error: All journalists in this city use invisible ink.`,
    `Haha, I guess people aren't tweeting about your city that much, huh?`,
    `Well, it seems as if nobody is writing about this city. Would you do the honors?`
  ];
  // length of 4
  let pickResponse = Math.floor(Math.random() * noResults.length);
  const city = $("#city").val();

  $("#results3").append(`<h2>Health-Related News</h2>
  <h3>Near ${city}</h3>
  <button class="showFullNews" role="toggle">&lt;View Articles&gt;</button>`);

  for (let i = 0;
    (i < responseJson5.articles.length) & (i < 10); i++) {
    const {
      url,
      urlToImage,
      description,
      source,
      title,
      author
    } = responseJson5.articles[i];

    if (!description) {
      continue;
    } else if (!author && !urlToImage) {
      $("#results3").append(
        `<h3 title="link to story"><a href="${url}">${title}</a></h3>
                <p><b>From ${source.name}</b></p>
                <p>${description}</p>`
      );
      continue;
      // hide image, figure out null to hide image
    } else if (!author) {
      $("#results3").append(
        `<h3 title="link to story"><a href="${url}">${title}</a></h3>
            <p><b>From ${source.name}</b></p>
            <img src="${urlToImage}" alt="Image for article ${i}"> 
            <p>${description}</p>`
      );
      continue;
    } else if (!urlToImage) {
      $("#results3").append(
        `<h3 title="link to story"><a href="${url}">${title}</a></h3>
            <p><b>From ${source.name}</b></p>
            <p><b>By ${author}</b></p>
            <p>${description}</p>`
      );
      continue;
    } else {
      $("#results3").append(
        `<h3 title="link to story"><a href="${url}">${title}</a></h3>
            <p><b>From ${source.name}</b></p>
            <p><b>By ${author}</b></p>
            <img src="${urlToImage}" alt="Image for article ${i}"> 
            <p>${description}</p>`
      );
    }
  }

  if (responseJson5.totalResults == 0) {
    $("#results3").empty();
    $("#results3").append(`<h3>${noResults[pickResponse]}</h3>`);
  }
}

/*/////////////////////////      FETCH: Search Submitted       ////////////////////////////// */

function fetchAQ(city, region, country) {
  // fetch aq, update display if there's an error or lack of results
  const country2 = encodeURI(country);
  const region2 = encodeURI(region);
  const city2 = encodeURI(city);
  const aqURL = `https://api.airvisual.com/v2/city?city=${city2}&state=${region2}&country=${country2}&key=CpizzCTn5NTozBHEW`;

  fetch(aqURL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      alert(`That's odd. It appears this city's data is temporarily unavailable. Try another city =) Our sincere apologies =(`);
      // add funny error message image
    })
    .then(responseJson3 => {
      displayAQ(responseJson3);
    });
}

function fetchNews(region) {
  // grab news data
  // const cityState = `${encodeURI(region)}%20${encodeURI(city)}%20air%20health`;
  const region2 = `${encodeURI(region)}%20air%20health`;
  const apiKey3 = "13b5bb62016543439061414e0e3274bf";
  const newsURL = `https://newsapi.org/v2/everything?q=${region2}&language=en&sortBy=relevancy&apiKey=${apiKey3}`;

  fetch(newsURL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      $("#results3").text(`<h2>Error: Unable to retrieve from News Source</h2>
        <p>!</p>`);
    })
    .then(responseJson5 => {
      displayNews(responseJson5);
    });
}

function fetchWiki(city, region) {
  // fetch from wikipedia api
  const cityState = `${encodeURI(city)}${encodeURI(region)}`;
  const proxyURL = `https://cors-anywhere.herokuapp.com/`;
  const wikiURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${cityState}`;

  fetch(proxyURL + wikiURL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      $("#results2").text(`<h2>Error: Unable to retrieve from Wiki Source</h2>
        <p>!</p>`);
    })
    .then(responseJson4 => {
      displayWiki(responseJson4);
    });
}

function fetchAll(city, region, country) {
  fetchAQ(city, region, country);
  fetchNews(region);
  fetchWiki(city, region);
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();

    const country = $("#country").val();
    const region = $("#region").val();
    const city = $("#city").val();
    console.log(`Getting results for ${city}...`);
    fetchAll(city, region, country);
  });
}

/*//////////////////// Toggle Results Tabs  ///////////////////// */

function showWiki() {
  $(".results1").on("click", "a[href|='#results2']", e => {
    $("a[href|='#results2']").css("border-bottom", "3px solid #010414");

    $("a[href|='#results2']").css("opacity", "1");

    $("a[href|='#results2']")
      .siblings("a[href|='#results3']")
      .css("border-bottom", "2px solid rgba(245, 239, 239, 0.425)");
    $("a[href|='#results2']")
      .siblings("a[href|='#results3']")
      .css("opacity", "0.8");
  });

  $("#results2").on("click", ".showFullWiki", e => {
    $(".showFullWiki")
      .parent()
      .css("height", "auto");

    $(".showFullWiki")
      .siblings("iframe")
      .css("height", "500px");

    $(".showFullWiki").text("> Hide Article <");

    $(".showFullWiki").attr("class", "hideFullWiki");
  });

  $("#results2").on("click", ".hideFullWiki", e => {
    $(".showFullWiki")
      .parent()
      .css("height", "303.5px");

    $(".hideFullWiki")
      .siblings("iframe")
      .css("height", "0px");

    $(".hideFullWiki").text("< Show Article >");

    $(".hideFullWiki").attr("class", "showFullWiki");
  });
}

function showNews() {
  $(".results1").on("click", "a[href|='#results3']", e => {
    $("a[href|='#results3']").css("border-bottom", "3px solid #010414");
    $("a[href|='#results3']").css("opacity", "1");

    $("a[href|='#results3']")
      .siblings("a[href|='#results2']")
      .css("opacity", "0.8");
    $("a[href|='#results3']")
      .siblings("a[href|='#results2']")
      .css("border-bottom", "2px solid rgba(245, 239, 239, 0.425)");
  });

  $("#results3").on("click", ".showFullNews", e => {
    $(".showFullNews")
      .parent()
      .css("height", "auto");
    $(".showFullNews").text("> Hide News <");

    $(".showFullNews").attr("class", "hideFullNews");
  });

  $("#results3").on("click", ".hideFullNews", e => {
    $(".hideFullNews")
      .parent()
      .css("height", "303.5px");
    $(".hideFullNews").text("< Show News >");

    $(".hideFullNews").attr("class", "showFullNews");
  });
}

/*///////////////////// FUNCTION CALLS //////////////////////////// */

$(showWiki);
$(showNews);
$(initializeMap);
$(watchSelect);
$(watchForm);