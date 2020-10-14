# travel-log
React App using the ReactMapGL component to use mapbox to display a map theme. This project is a small app used to display a map and pinpoint places visited through the use of some added code.

ReactMapGL then incorporates the design scheme of mapbox. ReactMapGL takes in both mapbox access key and mapbox style code as props.
As shown within the react-map-GL API reference: https://visgl.github.io/react-map-gl/docs/api-reference/static-map

ReactMapGl component props that take from MAPBOX are:
mapboxApiAccessToken and mapStyle.

Access key and mapStyle can be found once a MapBox account has been created where the access token will be visible at the bottom of the page. Mapstyle token can be found on
Mapbox under Tools & resources, where Design in mapbox studio is selected to select a visual design theme and a code is then generated.

<h1>.ENV FILE:</h1>

<h4>REACT_APP_MAPBOX_MAPSTYLE=</h4> Mapbox mapstyle token<br />
<h4>REACT_APP_MAPBOX_ACCESS_TOKEN=</h4> Mapbox access token


<h1>SERVER SIDE ENV FILE</h1>
Used mongodb to store the map location latitude and longitude points, this is a local mongodb url instead of the atlas cloud link.
