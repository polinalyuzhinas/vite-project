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
        url: 'sixth_floor.png',
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

// лестницы
const polygonFeature_centralstairs1 = new Feature({ // центральная лестница слева
    geometry: new Polygon([
        [
            [1479, 1027],
            [1600, 1027],
            [1600, 944],
            [1479, 944],
            [1479, 1027]
        ]
    ])
});
polygonFeature_centralstairs1.set('description', 'центральная лестница'); // надпись при наведении на выделении курсора

const polygonFeature_centralstairs2 = new Feature({ // центральная лестница в центре
    geometry: new Polygon([
        [
            [1604, 1001],
            [1769, 1001],
            [1769, 873],
            [1604, 873],
            [1604, 1001]
        ]
    ])
});
polygonFeature_centralstairs2.set('description', 'центральная лестница'); // надпись при наведении на выделении курсора

const polygonFeature_centralstairs3 = new Feature({ // центральная лестница справа
    geometry: new Polygon([
        [
            [1772, 1027],
            [1892, 1027],
            [1892, 944],
            [1772, 944],
            [1772, 1027]
        ]
    ])
});
polygonFeature_centralstairs3.set('description', 'центральная лестница'); // надпись при наведении на выделении курсора

const polygonFeature_rightstairs = new Feature({ // лестница в правом крыле (у лифта)
    geometry: new Polygon([
        [
            [2494, 1088],
            [2637, 1088],
            [2637, 950],
            [2494, 950],
            [2494, 1088]
        ]
    ])
});
polygonFeature_rightstairs.set('description', 'лестница'); // надпись при наведении на выделении курсора

const polygonFeature_farrightstairs = new Feature({ // лестница в правом крыле
    geometry: new Polygon([
        [
            [2587, 1916],
            [2730, 1916],
            [2730, 1844],
            [2587, 1844],
            [2587, 1916]
        ]
    ])
});
polygonFeature_farrightstairs.set('description', 'лестница'); // надпись при наведении на выделении курсора

const polygonFeature_leftstairs = new Feature({ // лестница в левом крыле (у лифта)
    geometry: new Polygon([
        [
            [737, 1079],
            [876, 1079],
            [876, 940],
            [737, 940],
            [737, 1079]
        ]
    ])
});
polygonFeature_leftstairs.set('description', 'лестница'); // надпись при наведении на выделении курсора

const polygonFeature_farleftstairs1 = new Feature({ // лестница в левом крыле сверху
    geometry: new Polygon([
        [
            [133, 1548],
            [201, 1548],
            [201, 1468],
            [133, 1468],
            [133, 1548]
        ]
    ])
});
polygonFeature_farleftstairs1.set('description', 'лестница'); // надпись при наведении на выделении курсора

const polygonFeature_farleftstairs2 = new Feature({ // лестница в левом крыле слева
    geometry: new Polygon([
        [
            [62, 1466],
            [132, 1466],
            [132, 1398],
            [62, 1398],
            [62, 1466]
        ]
    ])
});
polygonFeature_farleftstairs2.set('description', 'лестница'); // надпись при наведении на выделении курсора

const polygonFeature_farleftstairs3 = new Feature({ // лестница в левом крыле снизу
    geometry: new Polygon([
        [
            [131, 1396],
            [201, 1396],
            [201, 1320],
            [131, 1320],
            [131, 1396]
        ]
    ])
});
polygonFeature_farleftstairs3.set('description', 'лестница'); // надпись при наведении на выделении курсора

polygonFeature_centralstairs1.setStyle(defaultStyle);
polygonFeature_centralstairs2.setStyle(defaultStyle);
polygonFeature_centralstairs3.setStyle(defaultStyle);
polygonFeature_rightstairs.setStyle(defaultStyle);
polygonFeature_farrightstairs.setStyle(defaultStyle);
polygonFeature_leftstairs.setStyle(defaultStyle);
polygonFeature_farleftstairs1.setStyle(defaultStyle);
polygonFeature_farleftstairs2.setStyle(defaultStyle);
polygonFeature_farleftstairs3.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_centralstairs1);
vectorSource.addFeature(polygonFeature_centralstairs2);
vectorSource.addFeature(polygonFeature_centralstairs3);
vectorSource.addFeature(polygonFeature_rightstairs);
vectorSource.addFeature(polygonFeature_farrightstairs);
vectorSource.addFeature(polygonFeature_leftstairs);
vectorSource.addFeature(polygonFeature_farleftstairs1);
vectorSource.addFeature(polygonFeature_farleftstairs2);
vectorSource.addFeature(polygonFeature_farleftstairs3);

// лифты

const polygonFeature_elevator1 = new Feature({ // лифт слева сверху
    geometry: new Polygon([
        [
            [643, 1122],
            [730, 1122],
            [730, 1024],
            [643, 1024],
            [643, 1122]
        ]
    ])
});
polygonFeature_elevator1.set('description', 'лифт'); // надпись при наведении на выделении курсора

const polygonFeature_elevator2 = new Feature({ // лифт слева снизу
    geometry: new Polygon([
        [
            [645, 887],
            [735, 887],
            [735, 790],
            [645, 790],
            [645, 887]
        ]
    ])
});
polygonFeature_elevator2.set('description', 'лифт'); // надпись при наведении на выделении курсора

const polygonFeature_elevator3 = new Feature({ // лифт справа сверху
    geometry: new Polygon([
        [
            [2642, 1123],
            [2729, 1123],
            [2729, 1027],
            [2642, 1027],
            [2642, 1123]
        ]
    ])
});
polygonFeature_elevator3.set('description', 'лифт'); // надпись при наведении на выделении курсора

const polygonFeature_elevator4 = new Feature({ // лифт справа снизу
    geometry: new Polygon([
        [
            [2638, 889],
            [2727, 889],
            [2727, 792],
            [2638, 792],
            [2638, 889]
        ]
    ])
});
polygonFeature_elevator4.set('description', 'лифт'); // надпись при наведении на выделении курсора

polygonFeature_elevator1.setStyle(defaultStyle);
polygonFeature_elevator2.setStyle(defaultStyle);
polygonFeature_elevator3.setStyle(defaultStyle);
polygonFeature_elevator4.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_elevator1);
vectorSource.addFeature(polygonFeature_elevator2);
vectorSource.addFeature(polygonFeature_elevator3);
vectorSource.addFeature(polygonFeature_elevator4);

// туалеты
const polygonFeature_toilet1 = new Feature({ // туалет слева
    geometry: new Polygon([
        [
            [637, 1320],
            [801, 1320],
            [801, 1136],
            [637, 1136],
            [637, 1320]
        ]
    ])
});
polygonFeature_toilet1.set('description', '611'); // надпись при наведении на выделении курсора

const polygonFeature_toilet2 = new Feature({ // туалет справа
    geometry: new Polygon([
        [
            [2575, 1639],
            [2740, 1639],
            [2740, 1525],
            [2575, 1525],
            [2575, 1639]
        ]
    ])
});
polygonFeature_toilet2.set('description', 'туалет для сотрудников'); // надпись при наведении на выделении курсора

const polygonFeature_621 = new Feature({ // туалет справа
    geometry: new Polygon([
        [
            [2581, 1726],
            [2581, 1639],
            [2740, 1639],
            [2740, 1726],
            [2581, 1726]
        ]
    ])
});
polygonFeature_621.set('description', '621'); // надпись при наведении на выделении курсора

polygonFeature_toilet1.setStyle(defaultStyle);
polygonFeature_toilet2.setStyle(defaultStyle);
polygonFeature_621.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_toilet1);
vectorSource.addFeature(polygonFeature_toilet2);
vectorSource.addFeature(polygonFeature_621);

// аудитории левого крыла 

const polygonFeature_610 = new Feature({ // 610
    geometry: new Polygon([
        [
            [178, 1949],
            [686, 1949],
            [686, 1551],
            [178, 1551],
            [178, 1949]
        ]
    ])
});
polygonFeature_610.set('description', '610 (вход через 5 этаж)'); // надпись при наведении на выделении курсора
polygonFeature_610.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_610);

const polygonFeature_609 = new Feature({ // 609
    geometry: new Polygon([
        [
            [314, 1546],
            [507, 1546],
            [507, 1438],
            [314, 1438],
            [314, 1546]
        ]
    ])
});
polygonFeature_609.set('description', '609 (учебная лаборатория судебной фотографии и судебной видеозаписи)'); // надпись при наведении на выделении курсора
polygonFeature_609.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_609);

const polygonFeature_608 = new Feature({ // 608
    geometry: new Polygon([
        [
            [177, 1317],
            [474, 1317],
            [474, 1121],
            [177, 1121],
            [177, 1317]
        ]
    ])
});
polygonFeature_608.set('description', '608 (учебная аудитория)'); // надпись при наведении на выделении курсора
polygonFeature_608.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_608);

const polygonFeature_607 = new Feature({ // 607
    geometry: new Polygon([
        [
            [177, 1118],
            [474, 1118],
            [474, 955],
            [177, 955],
            [177, 1118]
        ]
    ])
});
polygonFeature_607.set('description', '607 (учебный и научный раздел института дополнительного профессионального образования)'); // надпись при наведении на выделении курсора
polygonFeature_607.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_607);

const polygonFeature_606 = new Feature({ // 606
    geometry: new Polygon([
        [
            [178, 602],
            [475, 602],
            [475, 950],
            [178, 950],
            [178, 602]
        ]
    ])
});
polygonFeature_606.set('description', '606'); // надпись при наведении на выделении курсора
polygonFeature_606.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_606);

const polygonFeature_605 = new Feature({ // 605 (наверное)
    geometry: new Polygon([
        [
            [178, 600],
            [632, 600],
            [632, 373],
            [510, 373],
            [510, 250],
            [178, 250], 
            [178, 600]
        ]
    ])
});
polygonFeature_605.set('description', 'директор института дополнительного профессионального образования'); // надпись при наведении на выделении курсора
polygonFeature_605.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_605);

const polygonFeature_612 = new Feature({ // 612
    geometry: new Polygon([
        [
            [886, 1097],
            [1071, 1097],
            [1071, 778],
            [886, 778],
            [886, 1097]
        ]
    ])
});
polygonFeature_612.set('description', '612 (центр профессионального развития и бизнес-стратегий)'); // надпись при наведении на выделении курсора
polygonFeature_612.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_612);

const polygonFeature_613 = new Feature({ // 613
    geometry: new Polygon([
        [
            [1075, 1097],
            [1292, 1097],
            [1292, 778],
            [1075, 778],
            [1075, 1097]
        ]
    ])
});
polygonFeature_613.set('description', '613 (учебная аудитория)'); // надпись при наведении на выделении курсора
polygonFeature_613.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_613);

const polygonFeature_614 = new Feature({ // 614
    geometry: new Polygon([
        [
            [1295, 1097],
            [1458, 1097],
            [1458, 778],
            [1295, 778],
            [1295, 1097]
        ]
    ])
});
polygonFeature_614.set('description', '614 (учебная лаборатория)'); // надпись при наведении на выделении курсора
polygonFeature_614.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_614);

const polygonFeature_604 = new Feature({ // 604
    geometry: new Polygon([
        [
            [632, 631],
            [918, 631],
            [918, 373],
            [632, 373],
            [632, 631]
        ]
    ])
});
polygonFeature_604.set('description', '604 (компьютерный класс)'); // надпись при наведении на выделении курсора
polygonFeature_604.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_604);

const polygonFeature_603 = new Feature({ // 603
    geometry: new Polygon([
        [
            [921, 631],
            [1163, 631],
            [1163, 373],
            [921, 373],
            [921, 631]
        ]
    ])
});
polygonFeature_603.set('description', '603 (учебная аудитория)'); // надпись при наведении на выделении курсора
polygonFeature_603.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_603);

const polygonFeature_602 = new Feature({ // 602
    geometry: new Polygon([
        [
            [1166, 631],
            [1361, 631],
            [1361, 373],
            [1166, 373],
            [1166, 631]
        ]
    ])
});
polygonFeature_602.set('description', '602 (кафедра педагогики и психологии профессионального образования, центр профессиональной переподготовки)'); // надпись при наведении на выделении курсора
polygonFeature_602.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_602);

const polygonFeature_601 = new Feature({ // 601
    geometry: new Polygon([
        [
            [1364, 635],
            [1564, 635],
            [1564, 373],
            [1364, 373],
            [1364, 635]
        ]
    ])
});
polygonFeature_601.set('description', '601 (кафедра менеджмента в образовании, центр повышения квалификации)'); // надпись при наведении на выделении курсора
polygonFeature_601.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_601);

const polygonFeature_639 = new Feature({ // 639
    geometry: new Polygon([
        [
            [1567, 635],
            [1899, 635],
            [1899, 373],
            [1567, 373],
            [1567, 635]
        ]
    ])
});
polygonFeature_639.set('description', '639 (учебная аудитория)'); // надпись при наведении на выделении курсора
polygonFeature_639.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_639);

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