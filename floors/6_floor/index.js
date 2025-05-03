import Map from 'ol/Map.js';
import View from 'ol/View.js';
import ImageLayer from 'ol/layer/Image.js';
import StaticImage from 'ol/source/ImageStatic.js';
import { Projection, get } from 'ol/proj.js';
import 'ol/ol.css';
import proj4 from 'proj4';

const imageWidth = 3322;
const imageHeight = 2014;
const imageExtent = [0, 0, imageWidth, imageHeight];

// Определяем проекции с помощью proj4.defs
proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

// Определяем pixel-image, также увеличивая extent
proj4.defs("pixel-image", "+proj=identity +units=pixels +extent=0,0," + imageWidth + "," + imageHeight);

// Получаем проекцию OpenLayers
const proj = new Projection({
    code: 'pixel-image',
    units: 'pixels',
    extent: imageExtent
});

get('pixel-image', proj);

const imageLayer = new ImageLayer({
    source: new StaticImage({
        url: 'sixth_floor.png',
        projection: proj,
        imageExtent: imageExtent,
    })
});

const map = new Map({
    target: "map",
    layers: [imageLayer],
    view: new View({
        projection: proj,
        center: [imageWidth / 2, imageHeight / 2], // центр карты в центре изображения
        zoom: 0,
        extent: imageExtent,
    }),
});