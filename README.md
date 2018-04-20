![Article I Section II](https://raw.githubusercontent.com/MashaZorin/article_I_section_II/master/articleisectionii.png "Article I Section II")

Period 8 - Tiffany Chen | Kyle Lin | Alex Taradachuk | Masha Zorin

[Data Spreadsheets](https://docs.google.com/spreadsheets/d/1tKO0HOPJrB6eMvYdAlO1eQQ_SbgyDibK6cmYjUAJ5n4/edit?usp=sharing)

## Description

The Census of the United States of America is a census conducted every 10 years and is mandated by Article I Section II of the United States Constitution. The census data is available from the census.gov website and one dataset that can be accessed are the ten most populous cities of that decade along with their respective populations.

## Data Source

The source of our population data can be found on the [Population of the 100 Largest Cities and Other Urban Places In The United States: 1790 to 1990 page](https://www.census.gov/library/working-papers/1998/demo/POP-twps0027.html) of the census.gov website.

## Bringing the data to life

We plan on displaying the data on a U.S. map. On the map will be x circles that show the x most populous cities, and the sizes of the circles will be based on the population of the city at the time (proportional to the sum of the population of the x cities) (0 <= x < 23). There will also be a list of the x cities under the map that will dynamically change as time continues with the names of the x largest cities and the exact populations (according to the U.S. census). The map and list will transform on its own; however, there will be a pause button, a play button, and a slider to allow the user to examine the data more closely.

## Absence of User Interaction

Without user interaction, the timeline will move along the decades on its own. This will show the data change over the time period of 1790-2010.

## Interaction

When the user clicks on a circle on the map, the automatic animation will pause and statistics about that city at that time will be displayed. Hovering on a circle displays the same data. The user can also slide along the timeline as well as press the pause and start button to stop/resume the automatic animation.

## Questions

This visualization will allow the user to explore how the position of being one of the ten most populous cities in the US has changed since the first census, and perhaps allows the user to see where populations have shifted over the years.

Questions that may arise include where cities that have lost a top ten position rank in the US now and possibly what the ten most populous cities will be in 2020.

## D3

Using d3, all graphical elements related to the map will be displayed. Circles on city locations, their colors, their size, the map of the US itself, and the animations associated with growing/shrinking/appearing/disappearing circles will be done using d3.

## Sample Visualization

![USA Map](https://raw.githubusercontent.com/MashaZorin/article_I_section_II/master/static/images/Demo.png "USA Map")

This sample does not use actual data.