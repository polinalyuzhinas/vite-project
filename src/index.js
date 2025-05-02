import Map from 'ol/Map.js';
import View from 'ol/View.js';
import ImageLayer from 'ol/layer/Image.js';
import StaticImage from 'ol/source/ImageStatic.js';
import 'ol/ol.css';


const imageExtent = [0, 0, 0.00212, 0.0011];

const imageLayer = new ImageLayer({
    source: new StaticImage({
        url: 'first_floor.png',
        projection: 'EPSG:4326',
        imageExtent: imageExtent,
    })
});

const map = new Map({
    target: "map",
    layers: [imageLayer],
    view: new View({
        projection: 'EPSG:4326',
        center: [3322/2, 2014/2], // Центр, близкий к нулю
        zoom: 0,   // Большой зум, чтобы увидеть изображение
        extent: imageExtent,
    }),
});
