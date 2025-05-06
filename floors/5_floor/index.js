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
        url: 'fifth_floor.png',
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
polygonFeature_toilet1.set('description', 'туалет женский'); // надпись при наведении на выделении курсора

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

const polygonFeature_508 = new Feature({ // 508
    geometry: new Polygon([
        [
            [178, 1320],
            [475, 1320],
            [475, 1084],
            [178, 1084],
            [178, 1320]
        ]
    ])
});
polygonFeature_508.set('description', '508 (кафедры теории государства и права, социальных коммуникаций)'); // надпись при наведении на выделении курсора
polygonFeature_508.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_508);

const polygonFeature_507 = new Feature({ // 507
    geometry: new Polygon([
        [
            [178, 1081],
            [475, 1081],
            [475, 954],
            [178, 954],
            [178, 1081]
        ]
    ])
});
polygonFeature_507.set('description', '507 (совет студентов и аспирантов юридического факультета)'); // надпись при наведении на выделении курсора
polygonFeature_507.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_507);

const polygonFeature_506 = new Feature({ // 506
    geometry: new Polygon([
        [
            [178, 950],
            [475, 950],
            [475, 604],
            [178, 604],
            [178, 950]
        ]
    ])
});
polygonFeature_506.set('description', '506 (кафедра конституционного и муниципального права)'); // надпись при наведении на выделении курсора
polygonFeature_506.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_506);

const polygonFeature_505 = new Feature({ // 505
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
polygonFeature_505.set('description', '505 (деканат юридического факультета)'); // надпись при наведении на выделении курсора
polygonFeature_505.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_505);

const polygonFeature_510 = new Feature({ // 510
    geometry: new Polygon([
        [
            [886, 1097],
            [1073, 1097],
            [1073, 778],
            [886, 778],
            [886, 1097]
        ]
    ])
});
polygonFeature_510.set('description', '510 (зал заседаний советов)'); // надпись при наведении на выделении курсора
polygonFeature_510.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_510);

const polygonFeature_511 = new Feature({ // 511
    geometry: new Polygon([
        [
            [1076, 1097],
            [1244, 1097],
            [1244, 778],
            [1076, 778],
            [1076, 1097]
        ]
    ])
});
polygonFeature_511.set('description', '511 (учебная лаборатория криминалистического исследования документов)'); // надпись при наведении на выделении курсора
polygonFeature_511.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_511);

const polygonFeature_512 = new Feature({ // 512
    geometry: new Polygon([
        [
            [1247, 1097],
            [1458, 1097],
            [1458, 778],
            [1247, 778],
            [1247, 1097]
        ]
    ])
});
polygonFeature_512.set('description', '512 (учебная лаборатория ЛИССА)'); // надпись при наведении на выделении курсора
polygonFeature_512.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_512);

const polygonFeature_504 = new Feature({ // 504
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
polygonFeature_504.set('description', '504 (компьютерный класс юридического факультета)'); // надпись при наведении на выделении курсора
polygonFeature_504.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_504);

const polygonFeature_503 = new Feature({ // 503
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
polygonFeature_503.set('description', '503 (компьютерный класс юридического факультета)'); // надпись при наведении на выделении курсора
polygonFeature_503.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_503);

const polygonFeature_502 = new Feature({ // 502
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
polygonFeature_502.set('description', '502'); // надпись при наведении на выделении курсора
polygonFeature_502.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_502);

const polygonFeature_501 = new Feature({ // 501
    geometry: new Polygon([
        [
            [1364, 635],
            [1518, 635],
            [1518, 373],
            [1364, 373],
            [1364, 635]
        ]
    ])
});
polygonFeature_501.set('description', '501'); // надпись при наведении на выделении курсора
polygonFeature_501.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_501);

const polygonFeature_530 = new Feature({ // 530/531
    geometry: new Polygon([
        [
            [1521, 635],
            [1824, 635],
            [1824, 373],
            [1521, 373],
            [1521, 635]
        ]
    ])
});
polygonFeature_530.set('description', '530/531'); // надпись при наведении на выделении курсора
polygonFeature_530.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_530);

// аудитории правого крыла

const polygonFeature_529 = new Feature({ // 529
    geometry: new Polygon([
        [
            [1827, 635],
            [1995, 635],
            [1995, 373],
            [1827, 373],
            [1827, 635]
        ]
    ])
});
polygonFeature_529.set('description', '529'); // надпись при наведении на выделении курсора
polygonFeature_529.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_529);

const polygonFeature_528 = new Feature({ // 528
    geometry: new Polygon([
        [
            [1998, 635],
            [2230, 635],
            [2230, 373],
            [1998, 373],
            [1998, 635]
        ]
    ])
});
polygonFeature_528.set('description', '528 (зал судебных заседаний)'); // надпись при наведении на выделении курсора
polygonFeature_528.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_528);

const polygonFeature_527 = new Feature({ // 527
    geometry: new Polygon([
        [
            [2233, 635],
            [2504, 635],
            [2504, 373],
            [2233, 373],
            [2233, 635]
        ]
    ])
});
polygonFeature_527.set('description', '527'); // надпись при наведении на выделении курсора
polygonFeature_527.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_527);

const polygonFeature_526 = new Feature({ // 526
    geometry: new Polygon([
        [
            [2507, 635],
            [2749, 635],
            [2749, 373],
            [2507, 373],
            [2507, 635]
        ]
    ])
});
polygonFeature_526.set('description', '526 (компьютерный класс юридического <br> факультета)'); // надпись при наведении на выделении курсора
polygonFeature_526.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_526);

const polygonFeature_513 = new Feature({ // 513
    geometry: new Polygon([
        [
            [1915, 1097],
            [2163, 1097],
            [2163, 778],
            [1915, 778],
            [1915, 1097]
        ]
    ])
});
polygonFeature_513.set('description', '513'); // надпись при наведении на выделении курсора
polygonFeature_513.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_513);

const polygonFeature_514 = new Feature({ // 514
    geometry: new Polygon([
        [
            [2166, 1097],
            [2300, 1097],
            [2300, 778],
            [2166, 778],
            [2166, 1097]
        ]
    ])
});
polygonFeature_514.set('description', '514'); // надпись при наведении на выделении курсора
polygonFeature_514.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_514);

const polygonFeature_515 = new Feature({ // 515
    geometry: new Polygon([
        [
            [2303, 1097],
            [2488, 1097],
            [2488, 778],
            [2303, 778],
            [2303, 1097]
        ]
    ])
});
polygonFeature_515.set('description', '515 (учебная лаборатория криминалистики и <br> судебных экспертиз)'); // надпись при наведении на выделении курсора
polygonFeature_515.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_515);

const polygonFeature_525 = new Feature({ // 525
    geometry: new Polygon([
        [
            [2894, 565],
            [3193, 565],
            [3193, 251],
            [2863, 251],
            [2863, 373],
            [2894, 373],
            [2894, 565]
        ]
    ])
});
polygonFeature_525.set('description', '525 (кафедры таможенного, <br> административного и <br> финансового права и <br> уголовного, экологического <br> права и криминологии)'); // надпись при наведении на выделении курсора
polygonFeature_525.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_525);

const polygonFeature_524 = new Feature({ // 524
    geometry: new Polygon([
        [
            [2894, 568],
            [3193, 568],
            [3193, 929],
            [2894, 929],
            [2894, 568]
        ]
    ])
});
polygonFeature_524.set('description', '524 (кафедра гражданского <br> права и процесса)'); // надпись при наведении на выделении курсора
polygonFeature_524.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_524);

const polygonFeature_523 = new Feature({ // 523
    geometry: new Polygon([
        [
            [2894, 1318],
            [3193, 1318],
            [3193, 932],
            [2894, 932],
            [2894, 1318]
        ]
    ])
});
polygonFeature_523.set('description', '523 (кафедра политических <br> наук)'); // надпись при наведении на выделении курсора
polygonFeature_523.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_523);

const polygonFeature_521 = new Feature({ // 521/522
    geometry: new Polygon([
        [
            [2894, 1550],
            [3310, 1550],
            [3310, 1320],
            [2894, 1320],
            [2894, 1550]
        ]
    ])
});
polygonFeature_521.set('description', '521/522'); // надпись при наведении на выделении курсора
polygonFeature_521.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_521);

const polygonFeature_520 = new Feature({ // 520
    geometry: new Polygon([
        [
            [2894, 1628],
            [3193, 1628],
            [3193, 1552],
            [2894, 1552],
            [2894, 1628]
        ]
    ])
});
polygonFeature_520.set('description', '520'); // надпись при наведении на выделении курсора
polygonFeature_520.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_520);

const polygonFeature_519 = new Feature({ // 519
    geometry: new Polygon([
        [
            [2894, 1717],
            [3193, 1717],
            [3193, 1630],
            [2894, 1630],
            [2894, 1717]
        ]
    ])
});
polygonFeature_519.set('description', '519'); // надпись при наведении на выделении курсора
polygonFeature_519.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_519);

const polygonFeature_518 = new Feature({ // 518
    geometry: new Polygon([
        [
            [2894, 1832],
            [3315, 1832],
            [3315, 1719],
            [2894, 1719],
            [2894, 1832]
        ]
    ])
});
polygonFeature_518.set('description', '518'); // надпись при наведении на выделении курсора
polygonFeature_518.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_518);

const polygonFeature_517 = new Feature({ // 517
    geometry: new Polygon([
        [
            [2894, 1948],
            [3315, 1948],
            [3315, 1832],
            [2894, 1832],
            [2894, 1948]
        ]
    ])
});
polygonFeature_517.set('description', '517'); // надпись при наведении на выделении курсора
polygonFeature_517.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_517);

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