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
        url: 'first_floor.png',
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
            [1500, 1085],
            [1626, 1085],
            [1626, 1004],
            [1500, 1004],
            [1500, 1085]
        ]
    ])
});
polygonFeature_centralstairs1.set('description', 'центральная лестница'); // надпись при наведении на выделении курсора

const polygonFeature_centralstairs2 = new Feature({ // центральная лестница в центре
    geometry: new Polygon([
        [
            [1628, 1002],
            [1743, 1002],
            [1743, 873],
            [1628, 873],
            [1628, 1002]
        ]
    ])
});
polygonFeature_centralstairs2.set('description', 'центральная лестница'); // надпись при наведении на выделении курсора

const polygonFeature_centralstairs3 = new Feature({ // центральная лестница справа
    geometry: new Polygon([
        [
            [1743, 1085],
            [1869, 1085],
            [1869, 1002],
            [1743, 1002],
            [1743, 1085]
        ]
    ])
});
polygonFeature_centralstairs3.set('description', 'центральная лестница'); // надпись при наведении на выделении курсора

const polygonFeature_rightstairs = new Feature({ // лестница в правом крыле (у лифта)
    geometry: new Polygon([
        [
            [2494, 1063],
            [2637, 1063],
            [2637, 994],
            [2494, 994],
            [2494, 1063]
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
            [737, 1060],
            [876, 1060],
            [876, 992],
            [737, 992],
            [737, 1060]
        ]
    ])
});
polygonFeature_leftstairs.set('description', 'лестница'); // надпись при наведении на выделении курсора\

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
            [134, 1466],
            [134, 1398],
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

const polygonFeature_emergencyexitstairs = new Feature({ // лестница в левом крыле у запасного выхода
    geometry: new Polygon([
        [
            [343, 1070],
            [382, 1070],
            [382, 931],
            [343, 931],
            [343, 1070]
        ]
    ])
});
polygonFeature_emergencyexitstairs.set('description', 'лестница'); // надпись при наведении на выделении курсора

const polygonFeature_closetstairs1 = new Feature({ // лестница к гардеробу в левом крыле
    geometry: new Polygon([
        [
            [549, 496],
            [620, 496],
            [620, 221],
            [549, 221],
            [549, 496]
        ]
    ])
});
polygonFeature_closetstairs1.set('description', 'лестница к гардеробу'); // надпись при наведении на выделении курсора

const polygonFeature_closetstairs2 = new Feature({ // лестница к гардеробу в правом крыле (не используется, но мало ли)
    geometry: new Polygon([
        [
            [2760, 499],
            [2831, 499],
            [2831, 223],
            [2760, 223],
            [2760, 499]
        ]
    ])
});
polygonFeature_closetstairs2.set('description', 'лестница к гардеробу'); // надпись при наведении на выделении курсора

const polygonFeature_entrancestairs = new Feature({ // лестница у входа
    geometry: new Polygon([
        [
            [1481, 104],
            [1887, 104],
            [1887, 4],
            [1481, 4],
            [1481, 104]
        ]
    ])
});
polygonFeature_entrancestairs.set('description', 'лестница ко входу в корпус'); // надпись при наведении на выделении курсора

const polygonFeature_precentralstairs1 = new Feature({ // лестница в основном коридоре ближе ко входу
    geometry: new Polygon([
        [
            [1457, 617],
            [1914, 617],
            [1914, 578],
            [1457, 578],
            [1457, 617]
        ]
    ])
});
polygonFeature_precentralstairs1.set('description', 'лестница'); // надпись при наведении на выделении курсора

const polygonFeature_precentralstairs2 = new Feature({ // лестница в основном коридоре дальше от входа
    geometry: new Polygon([
        [
            [1464, 799],
            [1907, 799],
            [1907, 739],
            [1464, 739],
            [1464, 799]
        ]
    ])
});
polygonFeature_precentralstairs2.set('description', 'лестница'); // надпись при наведении на выделении курсора

const polygonFeature_assemblyhallstairs1 = new Feature({ // лестница к актовому залу слева
    geometry: new Polygon([
        [
            [1458, 1399],
            [1595, 1399],
            [1595, 1352],
            [1458, 1352],
            [1458, 1399]
        ]
    ])
});
polygonFeature_assemblyhallstairs1.set('description', 'лестница к актовому залу'); // надпись при наведении на выделении курсора

const polygonFeature_assemblyhallstairs2 = new Feature({ // лестница к актовому залу справа
    geometry: new Polygon([
        [
            [1780, 1399],
            [1915, 1399],
            [1915, 1350],
            [1780, 1350],
            [1780, 1399]
        ]
    ])
});
polygonFeature_assemblyhallstairs2.set('description', 'лестница к актовому залу'); // надпись при наведении на выделении курсора

const polygonFeature_gymstairs = new Feature({ // лестница к спортзалу
    geometry: new Polygon([
        [
            [1928, 1382],
            [2043, 1382],
            [2043, 1292],
            [1928, 1292],
            [1928, 1382]
        ]
    ])
});
polygonFeature_gymstairs.set('description', 'лестница к спортзалу'); // надпись при наведении на выделении курсора

polygonFeature_centralstairs1.setStyle(defaultStyle);
polygonFeature_centralstairs2.setStyle(defaultStyle);
polygonFeature_centralstairs3.setStyle(defaultStyle);
polygonFeature_rightstairs.setStyle(defaultStyle);
polygonFeature_farrightstairs.setStyle(defaultStyle);
polygonFeature_leftstairs.setStyle(defaultStyle);
polygonFeature_farleftstairs1.setStyle(defaultStyle);
polygonFeature_farleftstairs2.setStyle(defaultStyle);
polygonFeature_farleftstairs3.setStyle(defaultStyle);
polygonFeature_emergencyexitstairs.setStyle(defaultStyle);
polygonFeature_closetstairs1.setStyle(defaultStyle);
polygonFeature_closetstairs2.setStyle(defaultStyle);
polygonFeature_entrancestairs.setStyle(defaultStyle);
polygonFeature_precentralstairs1.setStyle(defaultStyle);
polygonFeature_precentralstairs2.setStyle(defaultStyle);
polygonFeature_assemblyhallstairs1.setStyle(defaultStyle);
polygonFeature_assemblyhallstairs2.setStyle(defaultStyle);
polygonFeature_gymstairs.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_centralstairs1);
vectorSource.addFeature(polygonFeature_centralstairs2);
vectorSource.addFeature(polygonFeature_centralstairs3);
vectorSource.addFeature(polygonFeature_rightstairs);
vectorSource.addFeature(polygonFeature_farrightstairs);
vectorSource.addFeature(polygonFeature_leftstairs);
vectorSource.addFeature(polygonFeature_farleftstairs1);
vectorSource.addFeature(polygonFeature_farleftstairs2);
vectorSource.addFeature(polygonFeature_farleftstairs3);
vectorSource.addFeature(polygonFeature_emergencyexitstairs);
vectorSource.addFeature(polygonFeature_closetstairs1);
vectorSource.addFeature(polygonFeature_closetstairs2);
vectorSource.addFeature(polygonFeature_entrancestairs);
vectorSource.addFeature(polygonFeature_precentralstairs1);
vectorSource.addFeature(polygonFeature_precentralstairs2);
vectorSource.addFeature(polygonFeature_assemblyhallstairs1);
vectorSource.addFeature(polygonFeature_assemblyhallstairs2);
vectorSource.addFeature(polygonFeature_gymstairs);

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
polygonFeature_toilet1.set('description', 'туалет мужской'); // надпись при наведении на выделении курсора

const polygonFeature_toilet2 = new Feature({ // туалет справа
    geometry: new Polygon([
        [
            [2581, 1726],
            [2740, 1726],
            [2740, 1525],
            [2581, 1525],
            [2581, 1726]
        ]
    ])
});
polygonFeature_toilet2.set('description', 'туалет женский'); // надпись при наведении на выделении курсора

polygonFeature_toilet1.setStyle(defaultStyle);
polygonFeature_toilet2.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_toilet1);
vectorSource.addFeature(polygonFeature_toilet2);

// аудитории левого крыла

const polygonFeature_110 = new Feature({ // 110 (наверное)
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
polygonFeature_110.set('description', 'аудитория им. Р. Х. Тугушева'); // надпись при наведении на выделении курсора
polygonFeature_110.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_110);

const polygonFeature_109 = new Feature({ // 109
    geometry: new Polygon([
        [
            [318, 1546],
            [505, 1546],
            [505, 1419],
            [318, 1419],
            [318, 1546]
        ]
    ])
});
polygonFeature_109.set('description', '109 (полиграфическая лаборатория)'); // надпись при наведении на выделении курсора
polygonFeature_109.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_109);

const polygonFeature_108 = new Feature({ // 108
    geometry: new Polygon([
        [
            [183, 1316],
            [478, 1316],
            [478, 1194],
            [183, 1194],
            [183, 1316]
        ]
    ])
});
polygonFeature_108.set('description', '108 (кафедра психологии личности)'); // надпись при наведении на выделении курсора
polygonFeature_108.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_108);

const polygonFeature_107 = new Feature({ // 107
    geometry: new Polygon([
        [
            [183, 1190],
            [478, 1190],
            [478, 1073],
            [183, 1073],
            [183, 1190]
        ]
    ])
});
polygonFeature_107.set('description', '107 (кафедра социальной психологии)'); // надпись при наведении на выделении курсора
polygonFeature_107.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_107);

const polygonFeature_105 = new Feature({ // 105/106
    geometry: new Polygon([
        [
            [180, 931],
            [478, 931],
            [478, 630],
            [180, 630],
            [180, 931]
        ]
    ])
});
polygonFeature_105.set('description', '105/106 (деканат факультета психологии)'); // надпись при наведении на выделении курсора
polygonFeature_105.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_105);

const polygonFeature_104 = new Feature({ // 104
    geometry: new Polygon([
        [
            [180, 627],
            [478, 627],
            [478, 374],
            [511, 374],
            [511, 249],
            [180, 249],
            [180, 627]
        ]
    ])
});
polygonFeature_104.set('description', '104 (деканат факультета психологии, заместители декана, секретарь)'); // надпись при наведении на выделении курсора
polygonFeature_104.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_104);

const polygonFeature_112 = new Feature({ // 112
    geometry: new Polygon([
        [
            [886, 1097],
            [1062, 1097],
            [1062, 778],
            [886, 778],
            [886, 1097]
        ]
    ])
});
polygonFeature_112.set('description', '112 (совет студентов факультета психологии'); // надпись при наведении на выделении курсора
polygonFeature_112.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_112);

const polygonFeature_113 = new Feature({ // 113
    geometry: new Polygon([
        [
            [1067, 1097],
            [1241, 1097],
            [1241, 778],
            [1067, 778],
            [1067, 1097]
        ]
    ])
});
polygonFeature_113.set('description', '113 (тренинг-зал)'); // надпись при наведении на выделении курсора
polygonFeature_113.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_113);

const polygonFeature_114 = new Feature({ // 114
    geometry: new Polygon([
        [
            [1244, 1097],
            [1458, 1097],
            [1458, 778],
            [1244, 778],
            [1244, 1097]
        ]
    ])
});
polygonFeature_114.set('description', '114 (кафедра философии и методологии наук)'); // надпись при наведении на выделении курсора
polygonFeature_114.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_114);

const polygonFeature_103 = new Feature({ // 103
    geometry: new Polygon([
        [
            [632, 631],
            [882, 631],
            [882, 373],
            [632, 373],
            [632, 631]
        ]
    ])
});
polygonFeature_103.set('description', '103 (аудитория им. Л.П. Доблаева, комната истории психологии)'); // надпись при наведении на выделении курсора
polygonFeature_103.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_103);

const polygonFeature_102 = new Feature({ // 102
    geometry: new Polygon([
        [
            [885, 631],
            [1135, 631],
            [1135, 373],
            [885, 373],
            [885, 631]
        ]
    ])
});
polygonFeature_102.set('description', '102 (аудитория им. А.А. Крогиуса)'); // надпись при наведении на выделении курсора
polygonFeature_102.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_102);

const polygonFeature_101 = new Feature({ // 101
    geometry: new Polygon([
        [
            [1139, 631],
            [1353, 631],
            [1353, 373],
            [1139, 373],
            [1139, 631]
        ]
    ])
});
polygonFeature_101.set('description', '101'); // надпись при наведении на выделении курсора
polygonFeature_101.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_101);

// специальные помещения
const polygonFeature_security = new Feature({ // охрана
    geometry: new Polygon([
        [
            [1356, 613],
            [1455, 613],
            [1455, 366],
            [1356, 366],
            [1356, 613]
        ]
    ])
});
polygonFeature_security.set('description', 'охрана (тут можно взять ключи)'); // надпись при наведении на выделении курсора
polygonFeature_security.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_security);

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