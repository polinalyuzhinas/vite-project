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

// cоздание и добавление объектов
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
polygonFeature_toilet2.set('description', 'туалет мужской'); // надпись при наведении на выделении курсора

const polygonFeature_toiletgym = new Feature({ // туалеты у раздевалок
    geometry: new Polygon([
        [
            [1823, 1426],
            [1899, 1426],
            [1899, 1374],
            [1823, 1374],
            [1823, 1426]
        ]
    ])
    });
polygonFeature_toiletgym.set('description', 'туалет у раздевалки'); // надпись при наведении на выделении курсора

// лестницы
polygonFeature_centralstairs1.setStyle(defaultStyle);
polygonFeature_centralstairs2.setStyle(defaultStyle);
polygonFeature_centralstairs3.setStyle(defaultStyle);
polygonFeature_rightstairs.setStyle(defaultStyle);
polygonFeature_farrightstairs.setStyle(defaultStyle);
polygonFeature_leftstairs.setStyle(defaultStyle);
polygonFeature_farleftstairs1.setStyle(defaultStyle);
polygonFeature_farleftstairs2.setStyle(defaultStyle);
polygonFeature_farleftstairs3.setStyle(defaultStyle);
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
vectorSource.addFeature(polygonFeature_gymstairs);

// лифты
polygonFeature_elevator1.setStyle(defaultStyle);
polygonFeature_elevator2.setStyle(defaultStyle);
polygonFeature_elevator3.setStyle(defaultStyle);
polygonFeature_elevator4.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_elevator1);
vectorSource.addFeature(polygonFeature_elevator2);
vectorSource.addFeature(polygonFeature_elevator3);
vectorSource.addFeature(polygonFeature_elevator4);

// туалеты
polygonFeature_toilet1.setStyle(defaultStyle);
polygonFeature_toilet2.setStyle(defaultStyle);
polygonFeature_toiletgym.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_toilet1);
vectorSource.addFeature(polygonFeature_toilet2);
vectorSource.addFeature(polygonFeature_toiletgym);


// аудитории левого крыла

const polygonFeature_411 = new Feature({ // 411 (наверное)
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
polygonFeature_411.set('description', 'конференц-зал экономического факультета'); // надпись при наведении на выделении курсора
polygonFeature_411.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_411);

const polygonFeature_410 = new Feature({ // 410
    geometry: new Polygon([
        [
            [318, 1546],
            [492, 1546],
            [492, 1429],
            [318, 1429],
            [318, 1546]
        ]
    ])
});
polygonFeature_410.set('description', '410 (архив экономического факультета)'); // надпись при наведении на выделении курсора
polygonFeature_410.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_410);

const polygonFeature_300 = new Feature({ // 300
    geometry: new Polygon([
        [
            [239, 1409],
            [306, 1409],
            [306, 1325],
            [239, 1325],
            [239, 1409]
        ]
    ])
});
polygonFeature_300.set('description', '300 (находится между 3 и 4 этажами)'); // надпись при наведении на выделении курсора
polygonFeature_300.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_300);

const polygonFeature_409 = new Feature({ // 409
    geometry: new Polygon([
        [
            [178, 1320],
            [475, 1320],
            [475, 987],
            [178, 987],
            [178, 1320]
        ]
    ])
});
polygonFeature_409.set('description', '409 (деканат экономического факультета, заочное отделение)'); // надпись при наведении на выделении курсора
polygonFeature_409.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_409);

const polygonFeature_408 = new Feature({ // 408
    geometry: new Polygon([
        [
            [178, 983],
            [475, 983],
            [475, 785],
            [178, 785],
            [178, 983]
        ]
    ])
});
polygonFeature_408.set('description', '408 (деканат экономического факультета, дневное отделение)'); // надпись при наведении на выделении курсора
polygonFeature_408.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_408);

const polygonFeature_407 = new Feature({ // 407
    geometry: new Polygon([
        [
            [178, 782],
            [475, 782],
            [475, 685],
            [178, 685],
            [178, 782]
        ]
    ])
});
polygonFeature_407.set('description', '407 (серверная)'); // надпись при наведении на выделении курсора
polygonFeature_407.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_407);

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