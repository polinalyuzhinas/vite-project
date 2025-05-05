import Map from 'ol/Map.js';
import View from 'ol/View.js';
import ImageLayer from 'ol/layer/Image.js';
import StaticImage from 'ol/source/ImageStatic.js';
import { Projection, get } from 'ol/proj.js';
import 'ol/ol.css';
import proj4 from 'proj4';

// инструменты для векторных слоёв
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';

import Overlay from 'ol/Overlay'; // нужно для всплывающей надписи
import { coordinateRelationship } from 'ol/extent';

const imageWidth = 3322;
const imageHeight = 2014;
const imageExtent = [0, 0, imageWidth, imageHeight];

// определяем проекции с помощью proj4.defs
proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

// определяем pixel-image, также увеличивая extent
proj4.defs("pixel-image", "+proj=identity +units=pixels +extent=0,0," + imageWidth + "," + imageHeight);

// получаем пользовательскую проекцию OpenLayers
const proj = new Projection({
    code: 'pixel-image',
    units: 'pixels',
    extent: imageExtent
});

get('pixel-image', proj);

const imageLayer = new ImageLayer({ // слой с изображением (статичным)
    source: new StaticImage({
        url: 'seventh_floor.png',
        projection: proj,
        imageExtent: imageExtent,
    })
});

const vectorSource = new VectorSource(); // векторный источник

// cоздание векторного слоя
const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: function (feature) {
    return feature.getStyle();
  }
});

// cоздание стилей
const defaultStyle = new Style({ // стиль по умолчанию
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.01)'
      }), // заливка
    });
  
const highlightStyle = new Style({ // стиль при наведении курсора
fill: new Fill({
    color: 'rgba(98, 87, 255, 0.3)'
})
});

// cоздание и добавление объектов
const polygonFeature_701 = new Feature({ // 701
geometry: new Polygon([
    [
    [1558, 1203],
    [1815, 1203],
    [1815, 1435],
    [1558, 1435],
    [1558, 1203]
    ]
])
});
polygonFeature_701.set('description', '701'); // надпись при наведении на выделении курсора

const polygonFeature_stairs1 = new Feature({ // лестница слева
    geometry: new Polygon([
        [
        [1480, 1061],
        [1600, 1061],
        [1600, 979],
        [1480, 979],
        [1480, 1061]
        ]
    ])
    });
polygonFeature_stairs1.set('description', 'центральная лестница'); // надпись при наведении на выделении курсора

const polygonFeature_stairs2 = new Feature({ // лестница в центре
    geometry: new Polygon([
        [
        [1604, 958],
        [1769, 958],
        [1769, 1088],
        [1604, 1088],
        [1604, 958]
        ]
    ])
    });
polygonFeature_stairs2.set('description', 'центральная лестница'); // надпись при наведении на выделении курсора
    
const polygonFeature_stairs3 = new Feature({ // лестница справа
    geometry: new Polygon([
        [
        [1773, 979],
        [1895, 979],
        [1895, 1061],
        [1773, 1061],
        [1773, 979]
        ]
    ])
    });
polygonFeature_stairs3.set('description', 'центральная лестница'); // надпись при наведении на выделении курсора

polygonFeature_701.setStyle(defaultStyle);
polygonFeature_stairs1.setStyle(defaultStyle);
polygonFeature_stairs2.setStyle(defaultStyle);
polygonFeature_stairs3.setStyle(defaultStyle);

vectorSource.addFeature(polygonFeature_701);
vectorSource.addFeature(polygonFeature_stairs1);
vectorSource.addFeature(polygonFeature_stairs2);
vectorSource.addFeature(polygonFeature_stairs3);

const popup = new Overlay({ // всплывающая надпись
    element: document.createElement('div'),  // создаем div-элемент для Popup
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  popup.getElement().className = 'ol-popup'; // добавляем класс для стилизации (в CSS)

const map = new Map({
target: "map",
layers: [imageLayer, vectorLayer], 
view: new View({
    projection: proj,
    center: [imageWidth / 2, imageHeight / 2], // центр карты в центре изображения
    zoom: 0,
    extent: imageExtent,
}),
});

map.addOverlay(popup);

// состояние для хранения текущего выделенного объекта
let highlightedFeature = null;

// обработчик события наведения курсора мыши
map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }

    const pixel = map.getEventPixel(evt.originalEvent);
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(pixel) ? 'pointer' : '';

    // получаем все объекты под курсором в массив
    const features = [];
    map.forEachFeatureAtPixel(pixel, function (feature) {
        features.push(feature);
    });

    // сбрасываем стиль с предыдущего выделенного объекта (если есть)
    if (highlightedFeature && !features.includes(highlightedFeature)) {
        highlightedFeature.setStyle(defaultStyle);
        highlightedFeature = null;
    }

    // выделяем все объекты, на которые наведен курсор
    let featureToShowPopup = null; // объект, для которого нужно показать Popup
    features.forEach(feature => {
        if (feature) {
            feature.setStyle(highlightStyle); // применяем стиль выделения
            highlightedFeature = feature; //  запоминаем последний выделенный объект
            featureToShowPopup = feature; // запоминаем объект для отображения Popup
        }
    });

    // отображаем Popup (если есть объект под курсором)
    if (featureToShowPopup) {
        // получаем координаты объекта
        const coordinate = evt.coordinate; // координаты курсора
        popup.getElement().innerHTML = featureToShowPopup.get('description'); // устанавливаем текст для Popup
        popup.setPosition(coordinate); // позиционируем Popup рядом с курсором
    } else {
        // если курсор не на объекте, скрываем Popup
        popup.setPosition(undefined);
    }
});