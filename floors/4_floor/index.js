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
        url: 'fourth_floor.png',
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

const polygonFeatures = new Map(); // cловарь для хранения полигонов

function template_PolygonFeature(coordinates, description, featureID) { // создает объект OpenLayers Feature по коррдинатам, описанию и ID и сохраняет его в словаре 
    const feature = new Feature({
        geometry: new Polygon(coordinates)
    });
    feature.set('description', description); // надпись при наведении на выделении курсора
    feature.setStyle(defaultStyle); // стиль по умолчанию
    vectorSource.addFeature(feature); // добавляем в векторный слой
    polygonFeatures.set(featureID, feature); // добавляем полигон в словарь, чтобы потом к нему обращаться
}

// лестницы
template_PolygonFeature([[[1479, 1027],[1600, 1027],[1600, 944],[1479, 944],[1479, 1027]]], 'центральная лестница', 'centralstairs1');
template_PolygonFeature([[[1604, 1001],[1769, 1001],[1769, 873],[1604, 873],[1604, 1001]]], 'центральная лестница', 'centralstairs2');
template_PolygonFeature([[[1772, 1027],[1892, 1027],[1892, 944],[1772, 944],[1772, 1027]]], 'центральная лестница', 'centralstairs3');
template_PolygonFeature([[[2494, 1088],[2637, 1088],[2637, 950],[2494, 950],[2494, 1088]]], 'лестница', 'rightstairs');
template_PolygonFeature([[[2587, 1916],[2730, 1916],[2730, 1844],[2587, 1844],[2587, 1916]]], 'лестница', 'farrightstairs');
template_PolygonFeature([[[737, 1079],[876, 1079],[876, 940],[737, 940],[737, 1079]]], 'лестница', 'leftstairs');
template_PolygonFeature([[[133, 1548],[201, 1548],[201, 1468],[133, 1468],[133, 1548]]], 'лестница', 'farleftstairs1');
template_PolygonFeature([[[62, 1466],[134, 1466],[134, 1398],[62, 1398],[62, 1466]]], 'лестница', 'farleftstairs2');
template_PolygonFeature([[[131, 1396],[201, 1396],[201, 1320],[131, 1320],[131, 1396]]], 'лестница', 'farleftstairs3');
template_PolygonFeature([[[1928, 1382],[2043, 1382],[2043, 1292],[1928, 1292],[1928, 1382]]], 'лестница к спортзалу', 'gymstairs');

// лифты
template_PolygonFeature([[[643, 1122],[730, 1122],[730, 1024],[643, 1024],[643, 1122]]], 'лифт', 'elevator1');
template_PolygonFeature([[[645, 887],[735, 887],[735, 790],[645, 790],[645, 887]]], 'лифт', 'elevator2');
template_PolygonFeature([[[2642, 1123],[2729, 1123],[2729, 1027],[2642, 1027],[2642, 1123]]], 'лифт', 'elevator3');
template_PolygonFeature([[[2638, 889],[2727, 889],[2727, 792],[2638, 792],[2638, 889]]], 'лифт', 'elevator4');

// туалеты
template_PolygonFeature([[[637, 1320],[801, 1320],[801, 1136],[637, 1136],[637, 1320]]], 'туалет мужской', 'toilet1');
template_PolygonFeature([[[2581, 1726],[2740, 1726],[2740, 1525],[2581, 1525],[2581, 1726]]], 'туалет мужской', 'toilet2');
template_PolygonFeature([[[1823, 1426],[1899, 1426],[1899, 1374],[1823, 1374],[1823, 1426]]], 'туалет у раздевалки', 'toiletgym');

// аудитории левого крыла
template_PolygonFeature([[[178, 1949],[686, 1949],[686, 1551],[178, 1551],[178, 1949]]], '411 (конференц-зал экономического факультета)', '411');
template_PolygonFeature([[[318, 1546],[492, 1546],[492, 1429],[318, 1429],[318, 1546]]], '410', '410');
template_PolygonFeature([[[239, 1409],[306, 1409],[306, 1325],[239, 1325],[239, 1409]]], '300 (находится между 3 и 4 этажами)', '300');
template_PolygonFeature([[[178, 1320],[475, 1320],[475, 987],[178, 987],[178, 1320]]], '409 (деканат экономического факультета, заочное отделение)', '409');
template_PolygonFeature([[[178, 983],[475, 983],[475, 785],[178, 785],[178, 983]]], '408 (деканат экономического факультета, дневное отделение)', '408');
template_PolygonFeature([[[178, 782],[475, 782],[475, 685],[178, 685],[178, 782]]], '407 (серверная)', '407');
template_PolygonFeature([[[178, 682],[475, 682],[475, 481],[178, 481],[178, 682]]], '406 (научно-образовательный центр экономического факультета)', '406');
template_PolygonFeature([[[178, 478],[475, 478],[475, 610],[633, 610],[633, 374],[511, 374],[511, 255],[178, 255],[178, 478]]], '405 (деканат экономического факультета)', '405');
template_PolygonFeature([[[886, 1097],[1073, 1097],[1073, 778],[886, 778],[886, 1097]]], '413 (учебная лаборатория Базальт СПО)', '413');
template_PolygonFeature([[[1076, 1097],[1244, 1097],[1244, 778],[1076, 778],[1076, 1097]]], '414 (учебная лаборатория Совкомбанк)', '414');
template_PolygonFeature([[[1247, 1097],[1458, 1097],[1458, 778],[1247, 778],[1247, 1097]]], '415 (учебная лаборатория искусственного интеллекта, машинного обучения)', '415');
template_PolygonFeature([[[632, 631],[918, 631],[918, 373],[632, 373],[632, 631]]], '404', '404');
template_PolygonFeature([[[921, 631],[1163, 631],[1163, 373],[921, 373],[921, 631]]], '403 (компьютерный класс экономического факультета)', '403');
template_PolygonFeature([[[1166, 631],[1361, 631],[1361, 373],[1166, 373],[1166, 631]]], '402 (компьютерный класс экономического факультета)', '402');
template_PolygonFeature([[[1364, 635],[1518, 635],[1518, 373],[1364, 373],[1364, 635]]], '401 (учебная лаборатория информационных технологий в экономике)', '401');
template_PolygonFeature([[[1521, 635],[1816, 635],[1816, 373],[1521, 373],[1521, 635]]], '433/434', '433');

// аудитории правого крыла
template_PolygonFeature([[[2894, 1948],[3315, 1948],[3315, 1719],[2894, 1719], [2894, 1948]]], '420/421', '420');
template_PolygonFeature([[[2894, 1717],[3193, 1717],[3193, 1630],[2894, 1630],[2894, 1717]]], '422 (образовательный центр <br> непрерывной подготовки <br> IT-специалистов)', '422');
template_PolygonFeature([[[2894, 1628],[3193, 1628],[3193, 1552],[2894, 1552],[2894, 1628]]], '423', '423');
template_PolygonFeature([[[2894, 1550],[3310, 1550],[3310, 1320],[2894, 1320],[2894, 1550]]], '424/425', '424');
template_PolygonFeature([[[2894, 1318],[3193, 1318],[3193, 932],[2894, 932],[2894, 1318]]], '426', '426');
template_PolygonFeature([[[2894, 568],[3193, 568],[3193, 929],[2894, 929],[2894, 568]]], '427 (кафедра финансов <br> и кредита)', '427');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '428 (кафедра <br> экономической теории и <br> национальной экономики)', '428');
template_PolygonFeature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '418 (компьютерный класс факультета КНиИТ)', '418');
template_PolygonFeature([[[2166, 1097],[2300, 1097],[2300, 778],[2166, 778],[2166, 1097]]], '417 (лаборатория системного программирования)', '417');
template_PolygonFeature([[[1915, 1097],[2163, 1097],[2163, 778],[1915, 778],[1915, 1097]]], '416 (компьютерный класс факультета КНиИТ)', '416');
template_PolygonFeature([[[2507, 635],[2749, 635],[2749, 373],[2507, 373],[2507, 635]]], '429', '429');
template_PolygonFeature([[[2233, 635],[2504, 635],[2504, 373],[2233, 373],[2233, 635]]], '430', '430');
template_PolygonFeature([[[1998, 635],[2230, 635],[2230, 373],[1998, 373],[1998, 635]]], '431', '431');
template_PolygonFeature([[[1819, 635],[1995, 635],[1995, 373],[1819, 373],[1819, 635]]], '432', '432');

// специальные помещения 
template_PolygonFeature([[[1680, 1465],[1820, 1465],[1820, 1230],[1680, 1230],[1680, 1465]]], 'раздевалка мужская', 'lockerroommale');
template_PolygonFeature([[[1538, 1465], [1677, 1465], [1677, 1230], [1538, 1230], [1538, 1465]]], 'раздевалка женская', 'lockerroomfemale');

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

map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }

    const pixel = map.getEventPixel(evt.originalEvent);
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(pixel) ? 'pointer' : '';

    const features = [];
    map.forEachFeatureAtPixel(pixel, function (feature) {
        features.push(feature);
    });

    // Сбрасываем стиль с предыдущего выделенного объекта
    if (highlightedFeature && !features.includes(highlightedFeature)) {
        highlightedFeature.setStyle(defaultStyle);
        highlightedFeature = null;
    }

    let featureToShowPopup = null;
    features.forEach(feature => {
        if (feature) {
            feature.setStyle(highlightStyle);
            highlightedFeature = feature;
            featureToShowPopup = feature;
        }
    });


    // Отображаем Popup (если есть объект под курсором)
    if (featureToShowPopup) {
        const coordinate = evt.coordinate;
        popup.getElement().innerHTML = featureToShowPopup.get('description');
        popup.setPosition(coordinate);
    } else {
        popup.setPosition(undefined);
    }
});