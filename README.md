<h1 align="center"> Aeropolis: How's the Air in Your City? </h1>

<img src="https://github.com/zempo/Aeropolis/blob/master/docs/media/City.svg" alt="picture of city" height="200" width="898" />
<h1 align="center" href="https://zempo.github.io/Aeropolis/">
<a align="center" href="https://zempo.github.io/Aeropolis/">
See it Live
</a> 
</h1>

## How does it work?

1. Type the name of your city into the search bar.

2. Make sure you typed the name correctly.

3. Click 'Search'.

4. Get the relative health of your city -- visualized.

5. Be sure to checkout any news & general information about your city!

## Project Sources

1. [Information on Air Quality Index Values](https://airnow.gov/index.cfm?action=aqibasics.aqi): The main reference for determining city health values.

2. [AirVisual:](https://api-docs.airvisual.com/) The Air Quality API used to determine cities with monitoring stations AND their air quality.

3. [Leaflet.js:](https://leafletjs.com/examples/quick-start/) For mapping each city

4. [Mapbox.com](https://www.mapbox.com/) for access to leaflet api. 

5. [News API:](https://newsapi.org/) For any news articles pertaining to each city searched & its environmental health.

6. [Media Wiki Api:](https://www.mediawiki.org/wiki/API:Main_page) For wikipedia articles pertaining to each city.

## Sources for onload example

1. [wave image](http://3.bp.blogspot.com/-K-hWaquRMIA/UXsRrLBshJI/AAAAAAAAASg/BmLEdogAZDw/s1600/GW-0022.jpg)

## Disclaimer About Air Quality Calculations

### [AQI Controversy](https://www.researchgate.net/publication/282222215_A_Review_on_Air_Quality_Indexing_System)

There is an ongoing debate regarding the determination of a location's Air Quality Index. For example, the transition between air quality hazard levels is considered somewhat "abrupt" by a number of atmospheric chemists, geologists, and meterologists. There are also inconsistencies regarding the differing impacts of each pollutant on human health.

In an attempt to mitigate this issue, more levels have been added to the city health scale in this project. This api also calculates AQI based on multiple detected pollutants.
The most common pollutant will also be displayd -- to aid in any further research into a given city. That said, until more standardized measurement of air-quality emerges, this project will use the United States Air Quality Index.

#### Please consider this Information when using this site for academic purposes.
