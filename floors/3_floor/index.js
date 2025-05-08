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
        url: 'third_floor.png',
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
template_PolygonFeature([[[2494, 1088],[2637, 1088],[2637, 947],[2494, 947],[2494, 1088]]], 'лестница', 'rightstairs');
template_PolygonFeature([[[2587, 1916],[2730, 1916],[2730, 1844],[2587, 1844],[2587, 1916]]], 'лестница', 'farrightstairs');
template_PolygonFeature([[[737, 1079],[876, 1079],[876, 940],[737, 940],[737, 1079]]], 'лестница', 'leftstairs');
template_PolygonFeature([[[133, 1548],[201, 1548],[201, 1468],[133, 1468],[133, 1548]]], 'лестница', 'farleftstairs1');
template_PolygonFeature([[[62, 1466],[134, 1466],[134, 1395],[62, 1395],[62, 1466]]], 'лестница', 'farleftstairs2');
template_PolygonFeature([[[131, 1396],[201, 1396],[201, 1320],[131, 1320],[131, 1396]]], 'лестница', 'farleftstairs3');
template_PolygonFeature([[[1928, 1382],[2043, 1382],[2043, 1292],[1928, 1292],[1928, 1382]]], 'лестница к спортзалу', 'gymstairs');

// лифты
template_PolygonFeature([[[643, 1122],[730, 1122],[730, 1024],[643, 1024],[643, 1122]]], 'лифт', 'elevator1');
template_PolygonFeature([[[645, 887],[735, 887],[735, 790],[645, 790],[645, 887]]], 'лифт', 'elevator2');
template_PolygonFeature([[[2642, 1123],[2729, 1123],[2729, 1027],[2642, 1027],[2642, 1123]]], 'лифт', 'elevator3');
template_PolygonFeature([[[2638, 889],[2727, 889],[2727, 792],[2638, 792],[2638, 889]]], 'лифт', 'elevator4');

// туалеты
template_PolygonFeature([[[637, 1320],[801, 1320],[801, 1136],[637, 1136],[637, 1320]]], 'туалет мужской', 'toilet1');
template_PolygonFeature([[[2581, 1726],[2740, 1726],[2740, 1525],[2581, 1525],[2581, 1726]]], 'туалет женский', 'toilet2');

// аудитории левого крыла
template_PolygonFeature([[ [178, 1949],[686, 1949],[686, 1551],[178, 1551],[178, 1949]]], '310 (аудитория им. А. М. Богомолова)', '310');
template_PolygonFeature([[[318, 1546],[492, 1546],[492, 1429],[318, 1429],[318, 1546]]], '309', '309');
template_PolygonFeature([[[239, 1409],[306, 1409],[306, 1325],[239, 1325],[239, 1409]]], '300 (находится между 3 и 4 этажами)', '300');
template_PolygonFeature([[[178, 1320],[475, 1320],[475, 950],[178, 950],[178, 1320]]], '308 (кафедры информатики и программирования, математической кибернетики и компьютерных наук)', '308');
template_PolygonFeature([[[178, 947],[475, 947],[475, 830],[178, 830],[178, 947]]], '307 (заместитель по заочному отделению факультет КНиИТ)', '307');
template_PolygonFeature([[[178, 828],[475, 828],[475, 602],[178, 602],[178, 828]]], '306 (кафедра дискретной математики и информационных технологий)', '306');
template_PolygonFeature([[[178, 600],[632, 600],[632, 373],[510, 373],[510, 250],[178, 250], [178, 600]]], '305 (деканат факультета КНиИТ)', '305');
template_PolygonFeature([[[886, 1097],[1073, 1097],[1073, 778],[886, 778],[886, 1097]]], '312', '312');
template_PolygonFeature([[[1076, 1097],[1244, 1097],[1244, 778],[1076, 778],[1076, 1097]]], '313', '313');
template_PolygonFeature([[[1247, 1097],[1458, 1097],[1458, 778],[1247, 778],[1247, 1097]]], '314 (лаборатория компьютерной безопасности)', '314');
template_PolygonFeature([[[632, 631],[918, 631],[918, 373],[632, 373],[632, 631]]], '304', '304');
template_PolygonFeature([[[921, 631],[1163, 631],[1163, 373],[921, 373],[921, 631]]], '303', '303');
template_PolygonFeature([[[1166, 631],[1361, 631],[1361, 373],[1166, 373],[1166, 631]]], '302', '302');
template_PolygonFeature([[[1364, 635],[1525, 635],[1525, 373],[1364, 373],[1364, 635]]], '301 (кафедра теоретических основ компьютерной безопасности и криптографии)', '301');
template_PolygonFeature([[[1528, 635],[1815, 635],[1815, 373],[1528, 373],[1528, 635]]], '333');

// аудитории правого крыла
template_PolygonFeature([[[1818, 635],[1995, 635],[1995, 373],[1818, 373],[1818, 635]]], '331', '331');
template_PolygonFeature([[[1998, 635],[2230, 635],[2230, 373],[1998, 373],[1998, 635]]], '330', '330');
template_PolygonFeature([[[2233, 635],[2504, 635],[2504, 373],[2233, 373],[2233, 635]]], '329', '329');
template_PolygonFeature([[[2507, 635],[2749, 635],[2749, 373],[2507, 373],[2507, 635]]], '328', '328');
template_PolygonFeature([[[1915, 1097],[2163, 1097],[2163, 778],[1915, 778],[1915, 1097]]], '315', '315');
template_PolygonFeature([[[2166, 1097],[2300, 1097],[2300, 778],[2166, 778],[2166, 1097]]], '316 (учебная лаборатория прикладной психологии образования)', '316');
template_PolygonFeature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '317', '317');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '327 (кафедры <br> коррекционной педагогики, <br> технологического <br> образования)', '327');
template_PolygonFeature([[[2894, 568],[3193, 568],[3193, 929],[2894, 929],[2894, 568]]], '326 (кафедра социальной <br> психологии образования <br> и развития)', '326');
template_PolygonFeature([[[2894, 1318],[3193, 1318],[3193, 932],[2894, 932],[2894, 1318]]], '325 (кафедры начального <br> языкового и литературного, <br> естественно-математтического <br> образований)', '325');
template_PolygonFeature([[[2894, 1550],[3310, 1550],[3310, 1320],[2894, 1320],[2894, 1550]]], '323/324', '324');
template_PolygonFeature([[[2894, 1628],[3193, 1628],[3193, 1552],[2894, 1552],[2894, 1628]]], '322', '322');
template_PolygonFeature([[[2894, 1717],[3193, 1717],[3193, 1630],[2894, 1630],[2894, 1717]]], '321', '321');
template_PolygonFeature([[[2894, 1948],[3315, 1948],[3315, 1719],[2894, 1719],[2894, 1948]]], '319/320', '320');

// специальные помещения 
template_PolygonFeature([[[1510, 1295],[1688, 1295],[1688, 1193],[1510, 1193],[1510, 1295]]], 'преподавательская', 'teacherroom1');
template_PolygonFeature([[[1691, 1295],[1865, 1295],[1865, 1193],[1691, 1193],[1691, 1295]]], 'преподавательская', 'teacherroom2');
template_PolygonFeature([[[1424, 1676],[1897, 1676],[1897, 1370],[1424, 1370],[1424, 1676]]], 'спортзал', 'gym');

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