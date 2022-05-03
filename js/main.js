mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 3,
center: [-100, 40]
});

const grades = [2000, 13000, 28000],
colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
radii = [5, 15, 20];

map.on('load', () => {

map.addSource('counts', {
    type: 'geojson',
    data: 'assets/us-covid-2020-counts.json'
});

map.addLayer({
        'id': 'counts-point',
        'type': 'circle',
        'source': 'counts',
        'minzoom': 3,
        'paint': {
            'circle-radius': {
                'property': 'cases',
                'stops': [
                    [{
                        zoom: 3,
                        value: grades[0]
                    }, radii[0]],
                    [{
                        zoom: 3,
                        value: grades[1]
                    }, radii[1]],
                    [{
                        zoom: 3,
                        value: grades[2]
                    }, radii[2]]
                ]
            },
            'circle-color': {
                'property': 'cases',
                'stops': [
                    [grades[0], colors[0]],
                    [grades[1], colors[1]],
                    [grades[2], colors[2]]
                ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.6
        }
    },
    'waterway-label'
);

map.on('click', 'counts-point', (event) => {
    new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates)
        .setHTML(`<strong>Total Cases:</strong> ${event.features[0].properties.cases}`)
        .addTo(map);
});

});

const legend = document.getElementById('legend');

var labels = ['<strong>Cases</strong>'], vbreak;
for (var i = 0; i < grades.length; i++) {
vbreak = grades[i];
dot_radii = 2 * radii[i];
labels.push(
    '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
    'px; height: ' +
    dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
    '</span></p>');

}
const source =
'<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">The New York Times</a></p>';

legend.innerHTML = labels.join('') + source;