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
polygonFeature_607.set('description', '607 (учебный и научный раздел ИДПО)'); // надпись при наведении на выделении курсора
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
polygonFeature_605.set('description', '605 (директор ИДПО)'); // надпись при наведении на выделении курсора
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
polygonFeature_602.set('description', '602 (кафедра педагогики и психологии профессионального образования, <br> центр проыессиональной переподготовки)'); // надпись при наведении на выделении курсора
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
polygonFeature_601.set('description', '601 (кафедра менеджмента в образовании, <br> центр повышения квалификации )'); // надпись при наведении на выделении курсора
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

const polygonFeature_637 = new Feature({ // 637
    geometry: new Polygon([
        [
            [1901, 635],
            [2051, 635],
            [2051, 373],
            [1901, 373],
            [1901, 635]
        ]
    ])
});
polygonFeature_637.set('description', '637 (диссертационный совет по педагогическим наукам)'); // надпись при наведении на выделении курсора
polygonFeature_637.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_637);

const polygonFeature_636 = new Feature({ // 636
    geometry: new Polygon([
        [
            [2055, 635],
            [2160, 635],
            [2160, 373],
            [2055, 373],
            [2055, 635]
        ]
    ])
});
polygonFeature_636.set('description', '636 (кафедра методологии образования)'); // надпись при наведении на выделении курсора
polygonFeature_636.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_636);

const polygonFeature_635 = new Feature({ // 635
    geometry: new Polygon([
        [
            [2163, 635],
            [2267, 635],
            [2267, 373],
            [2163, 373],
            [2163, 635]
        ]
    ])
});
polygonFeature_635.set('description', '635 (кафедра логопедии и психолингвистики)'); // надпись при наведении на выделении курсора
polygonFeature_635.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_635);

const polygonFeature_634 = new Feature({ // 634
    geometry: new Polygon([
        [
            [2270, 635],
            [2400, 635],
            [2400, 373],
            [2270, 373],
            [2270, 635]
        ]
    ])
});
polygonFeature_634.set('description', '634'); // надпись при наведении на выделении курсора
polygonFeature_634.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_634);

const polygonFeature_633 = new Feature({ // 633
    geometry: new Polygon([
        [
            [2403, 635],
            [2751, 635],
            [2751, 373],
            [2403, 373],
            [2403, 635]
        ]
    ])
});
polygonFeature_633.set('description', '633 (дирекция педагогического института)'); // надпись при наведении на выделении курсора
polygonFeature_633.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_633);

const polygonFeature_615 = new Feature({ // 615
    geometry: new Polygon([
        [
            [1914, 1098],
            [1991, 1098],
            [1991, 777],
            [1914, 777],
            [1914, 1098]
        ]
    ])
});
polygonFeature_615.set('description', '615 (кабинет английского языка)'); // надпись при наведении на выделении курсора
polygonFeature_615.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_615);

const polygonFeature_616 = new Feature({ // 616
    geometry: new Polygon([
        [
            [1994, 1098],
            [2152, 1098],
            [2152, 777],
            [1994, 777],
            [1994, 1098]
        ]
    ])
});
polygonFeature_616.set('description', '616 (кафедра английского языка для гуманитарных <br> направлений и специальностей)'); // надпись при наведении на выделении курсора
polygonFeature_616.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_616);

const polygonFeature_617 = new Feature({ // 617
    geometry: new Polygon([
        [
            [2156, 927],
            [2271, 927],
            [2271, 777],
            [2156, 777],
            [2156, 927]
        ]
    ])
});
polygonFeature_617.set('description', '617 (архив факультета физической культуры и спорта)'); // надпись при наведении на выделении курсора
polygonFeature_617.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_617);

const polygonFeature_618 = new Feature({ // 618
    geometry: new Polygon([
        [
            [2159, 1098],
            [2355, 1098],
            [2355, 777],
            [2274, 777],
            [2274, 927],
            [2152, 927],
            [2159, 1098]
        ]
    ])
});
polygonFeature_618.set('description', '618 (деканат факультета физической культуры и спорта)'); // надпись при наведении на выделении курсора
polygonFeature_618.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_618);

const polygonFeature_619 = new Feature({ // 619
    geometry: new Polygon([
        [
            [2358, 1098],
            [2485, 1098],
            [2485, 777],
            [2358, 777],
            [2358, 1098]
        ]
    ])
});
polygonFeature_619.set('description', '619 (декан факультета физической культуры и спорта)'); // надпись при наведении на выделении курсора
polygonFeature_619.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_619);

const polygonFeature_632 = new Feature({ // 632
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
polygonFeature_632.set('description', '632 (профсоюзный комитет <br> работников СГУ)'); // надпись при наведении на выделении курсора
polygonFeature_632.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_632);

const polygonFeature_631 = new Feature({ // 631
    geometry: new Polygon([
        [
            [2894, 568],
            [3193, 568],
            [3193, 824],
            [2894, 824],
            [2894, 568]
        ]
    ])
});
polygonFeature_631.set('description', '631 (аудитория им. <br> К.Ф. Седова)'); // надпись при наведении на выделении курсора
polygonFeature_631.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_631);

const polygonFeature_630 = new Feature({ // 630
    geometry: new Polygon([
        [
            [2894, 932],
            [3193, 932],
            [3193, 827],
            [2894, 827],
            [2894, 932]
        ]
    ])
});
polygonFeature_630.set('description', '630 (заместитель по <br> социально-воспитательной <br> работе факультета ППиСО и <br> профбюро ППиСО)'); // надпись при наведении на выделении курсора
polygonFeature_630.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_630);

const polygonFeature_629 = new Feature({ // 629
    geometry: new Polygon([
        [
            [2894, 1223],
            [3193, 1223],
            [3193, 934],
            [2894, 934],
            [2894, 1223]
        ]
    ])
});
polygonFeature_629.set('description', '629 (деканат ППиСО)'); // надпись при наведении на выделении курсора
polygonFeature_629.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_629);

const polygonFeature_628 = new Feature({ // 628
    geometry: new Polygon([
        [
            [2894, 1320],
            [3193, 1320],
            [3193, 1227],
            [2894, 1227],
            [2894, 1320]
        ]
    ])
});
polygonFeature_628.set('description', '628 (заместитель по <br> учебной работе ППиСО)'); // надпись при наведении на выделении курсора
polygonFeature_628.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_628);

const polygonFeature_627 = new Feature({ // 627
    geometry: new Polygon([
        [
            [2894, 1440],
            [3310, 1440],
            [3310, 1324],
            [2894, 1324],
            [2894, 1440]
        ]
    ])
});
polygonFeature_627.set('description', '627 (архив ППиСО)'); // надпись при наведении на выделении курсора
polygonFeature_627.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_627);

const polygonFeature_626 = new Feature({ // 626
    geometry: new Polygon([
        [
            [2894, 1552],
            [3310, 1552],
            [3310, 1444],
            [2894, 1444],
            [2894, 1552]
        ]
    ])
});
polygonFeature_626.set('description', '626 (деканат ППиСО <br> учебная часть)'); // надпись при наведении на выделении курсора
polygonFeature_626.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_626);

const polygonFeature_625 = new Feature({ // 625
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
polygonFeature_625.set('description', '625 (председатель <br> профкома студентов)'); // надпись при наведении на выделении курсора
polygonFeature_625.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_625);

const polygonFeature_624 = new Feature({ // 624
    geometry: new Polygon([
        [
            [2894, 1717],
            [3193, 1717],
            [3193, 1637],
            [2894, 1637],
            [2894, 1717]
        ]
    ])
});
polygonFeature_624.set('description', '624 (профком студентов)'); // надпись при наведении на выделении курсора
polygonFeature_624.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_624);

const polygonFeature_623 = new Feature({ // 623
    geometry: new Polygon([
        [
            [2894, 1832],
            [3087, 1832],
            [3087, 1948],
            [3315, 1948],
            [3315, 1724],
            [2894, 1724],
            [2894, 1832]
        ]
    ])
});
polygonFeature_623.set('description', '623 (отдел по техническому <br> учёту объектов <br> недвижимости'); // надпись при наведении на выделении курсора
polygonFeature_623.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_623);

const polygonFeature_622 = new Feature({ // 622
    geometry: new Polygon([
        [
            [2894, 1948],
            [3084, 1948],
            [3084, 1834],
            [2894, 1834],
            [2894, 1948]
        ]
    ])
});
polygonFeature_622.set('description', '622'); // надпись при наведении на выделении курсора
polygonFeature_622.setStyle(defaultStyle);
vectorSource.addFeature(polygonFeature_622);

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