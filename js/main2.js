mapboxgl.accessToken = 'pk.eyJ1IjoiZGlhemE2IiwiYSI6ImNrcDV2Y3p1MTIxY3Ayd3Rhb283bHhzNmEifQ.cer1uigaGzrwAjG32uN37Q';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/diaza6/cl2pdtu7q002214o7q1cvnlyi'
});

map.on('load', () => {
map.getCanvas().style.cursor = 'default';

map.fitBounds([
[-133.2421875, 16.972741],
[-47.63671875, 52.696361]
]);

const layers = [
    '4-40',
    '40-90',
    '90-140',
    '140-190',
    '190-240',
    '240+'
];
const colors = [
    '#FFEDA0',
    '#FEB24C',
    '#FD8D3C',
    '#FC4E2A',
    '#E31A1C',
    '#BD0026'
];

const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
const color = colors[i];
const item = document.createElement('div');
const key = document.createElement('span');
key.className = 'legend-key';
key.style.backgroundColor = color;

const value = document.createElement('span');
value.innerHTML = `${layer}`;
item.appendChild(key);
item.appendChild(value);
legend.appendChild(item);
});

map.on('mousemove', (event) => {
const rates = map.queryRenderedFeatures(event.point, {
layers: ['us-covid-2020-rates']
});
document.getElementById('pd').innerHTML = rates.length
? `<h3>${rates[0].properties.county}</h3><p><strong><em>${rates[0].properties.rates}</strong> per 1,000 people</em></p>`
: `<p>Hover over a county!</p>`;
});
});