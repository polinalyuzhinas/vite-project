import Map from 'ol/Map.js';
import View from 'ol/View.js';
import ImageLayer from 'ol/layer/Image.js';
import StaticImage from 'ol/source/ImageStatic.js';
import { Projection, get, fromLonLat } from 'ol/proj.js';
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

const polygonFeatures = new Map(); // cловарь для хранения полигонов

function template_PolygonFeature(coordinates, description, featureID, schedule = []) { // создает объект OpenLayers Feature по координатам, описанию и ID и сохраняет его в словаре
    const feature = new Feature({
        geometry: new Polygon(coordinates)
    });
    feature.set('description', description); // надпись при наведении на выделении курсора
    feature.set('schedule', schedule); // расписание (если есть)
    feature.setStyle(defaultStyle); // стиль по умолчанию
    vectorSource.addFeature(feature); // добавляем в векторный слой
    polygonFeatures.set(featureID, feature); // добавляем полигон в словарь, чтобы потом к нему обращаться
}

// лестницы
template_PolygonFeature([[[1500, 1085],[1626, 1085],[1626, 1004],[1500, 1004],[1500, 1085]]], 'центральная лестница', 'centralstairs1');
template_PolygonFeature([[[1628, 1002],[1743, 1002],[1743, 873],[1628, 873],[1628, 1002]]], 'центральная лестница', 'centralstairs2');
template_PolygonFeature([[[1743, 1085],[1869, 1085],[1869, 1002],[1743, 1002],[1743, 1085]]], 'центральная лестница', 'centralstairs3');
template_PolygonFeature([[[2494, 1063],[2637, 1063],[2637, 994],[2494, 994],[2494, 1063]]], 'лестница', 'rightstairs');
template_PolygonFeature([[[2587, 1916],[2730, 1916],[2730, 1844],[2587, 1844],[2587, 1916]]], 'лестница', 'farrightstairs');
template_PolygonFeature([[[737, 1060],[876, 1060],[876, 992],[737, 992],[737, 1060]]], 'лестница', 'leftstairs');
template_PolygonFeature([[[133, 1548],[201, 1548],[201, 1468],[133, 1468],[133, 1548]]], 'лестница', 'farleftstairs1');
template_PolygonFeature([[[62, 1466],[134, 1466],[134, 1398],[62, 1398],[62, 1466]]], 'лестница', 'farleftstairs2');
template_PolygonFeature([[[131, 1396],[201, 1396],[201, 1320],[131, 1320],[131, 1396]]], 'лестница', 'farleftstairs3');
template_PolygonFeature([[[1928, 1382],[2043, 1382],[2043, 1292],[1928, 1292],[1928, 1382]]], 'лестница к спортзалу', 'gymstairs');
template_PolygonFeature([[[549, 496],[620, 496],[620, 221],[549, 221],[549, 496]]], 'лестница к гардеробу', 'closetstairs1');
template_PolygonFeature([[[2760, 499],[2831, 499],[2831, 223],[2760, 223],[2760, 499]]], 'лестница к гардеробу', 'closetstairs2');
template_PolygonFeature([[[343, 1070],[382, 1070],[382, 931],[343, 931],[343, 1070]]], 'лестница', 'emergencyexitstairs');
template_PolygonFeature([[[1481, 104],[1887, 104],[1887, 4],[1481, 4],[1481, 104]]], 'лестница ко входу в корпус', 'entrancestairs');
template_PolygonFeature([[[1457, 617],[1914, 617],[1914, 578],[1457, 578],[1457, 617]]], 'лестница', 'precentralstairs1');
template_PolygonFeature([[[1464, 799],[1907, 799],[1907, 739],[1464, 739],[1464, 799]]], 'лестница', 'precentralstairs2');
template_PolygonFeature([[[1458, 1397],[1595, 1397],[1595, 1352],[1458, 1352],[1458, 1397]]], 'лестница к актовому залу', 'assemblyhallstairs1');
template_PolygonFeature([[[1780, 1397],[1915, 1397],[1915, 1350],[1780, 1350],[1780, 1397]]], 'лестница к актовому залу', 'assemblyhallstairs2');

// лифты
template_PolygonFeature([[[643, 1122],[730, 1122],[730, 1024],[643, 1024],[643, 1122]]], 'лифт', 'elevator1');
template_PolygonFeature([[[645, 887],[735, 887],[735, 790],[645, 790],[645, 887]]], 'лифт', 'elevator2');
template_PolygonFeature([[[2642, 1123],[2729, 1123],[2729, 1027],[2642, 1027],[2642, 1123]]], 'лифт', 'elevator3');
template_PolygonFeature([[[2638, 889],[2727, 889],[2727, 792],[2638, 792],[2638, 889]]], 'лифт', 'elevator4');

// туалеты
template_PolygonFeature([[[637, 1320],[801, 1320],[801, 1136],[637, 1136],[637, 1320]]], 'туалет мужской', 'toilet1');
template_PolygonFeature([[[2581, 1726],[2740, 1726],[2740, 1525],[2581, 1525],[2581, 1726]]], 'туалет женский', 'toilet2');

// аудитории левого крыла
template_PolygonFeature([[[178, 1949], [686, 1949], [686, 1551], [178, 1551], [178, 1949]]], '110 (аудитория им. Р. Х. Тугушева)', '110');

template_PolygonFeature([[[318, 1546],[505, 1546],[505, 1419],[318, 1419],[318, 1546]]], '109 (полиграфическая лаборатория)', '109');
template_PolygonFeature([[[183, 1316],[478, 1316],[478, 1194],[183, 1194],[183, 1316]]], '108 (кафедра психологии личности)', '108');
template_PolygonFeature([[[183, 1190],[478, 1190],[478, 1073],[183, 1073],[183, 1190]]], '107 (кафедра социальной психологии)', '107');
template_PolygonFeature([[[180, 931],[478, 931],[478, 630],[180, 630],[180, 931]]], '105/106 (деканат факультета психологии)', '105');
template_PolygonFeature([[[180, 627],[478, 627],[478, 374],[511, 374],[511, 249],[180, 249],[180, 627]]], '104 (деканат факультета психологии, заместители декана, секретарь)', '104');
template_PolygonFeature([[[886, 1097],[1062, 1097],[1062, 778],[886, 778],[886, 1097]]], '112 (совет студентов факультета психологии)', '112');
template_PolygonFeature([[[1067, 1097],[1241, 1097],[1241, 778],[1067, 778],[1067, 1097]]], '113 (аудитория им. А.А. Понукалина, тренинг-зал)', '113');
template_PolygonFeature([[[1245, 1097],[1458, 1097],[1458, 778],[1245, 778],[1245, 1097]]], '114 (кафедра философии и методологии науки)', '114');
template_PolygonFeature([[[632, 631],[882, 631],[882, 373],[632, 373],[632, 631]]], '103 (аудитория им. Л.П. Доблаева, комната истории психологии)', '103');
template_PolygonFeature([[[885, 631],[1135, 631],[1135, 373],[885, 373],[885, 631]]], '102 (аудитория им. А.А. Крогиуса)', '102');
template_PolygonFeature([[[1139, 631],[1353, 631],[1353, 373],[1139, 373],[1139, 631]]], '101', '101');

// аудитории правого крыла
template_PolygonFeature([[[2022, 635],[2243, 635],[2243, 373],[2022, 373],[2022, 635]]], '135 (кафедра общей и консультативной психологии)', '135');
template_PolygonFeature([[[2246, 635],[2495, 635],[2495, 373],[2246, 373],[2246, 635]]], '134 (аудитория им. С.Л. Франка)', '134');
template_PolygonFeature([[[2498, 635],[2749, 635],[2749, 373],[2498, 373],[2498, 635]]], '133 (аудитория им. Л.Г. Вяткина)', '133');
template_PolygonFeature([[[2897, 1321],[3193, 1321],[3193, 1003],[2897, 1003],[2897, 1321]]], '127 (кафедра уголовного <br> процесса и судебных <br> экспертиз)', '127');
template_PolygonFeature([[[2859, 374],[3193, 374],[3193, 253],[2859, 253],[2859, 374]]], '132 (кафедра педагогики <br> и образовательных <br> технологий)', '132');
template_PolygonFeature([[[2897, 630],[3193, 630],[3193, 379],[2897, 379],[2897, 630]]], '131 (юридическая <br> клиника)', '131');
template_PolygonFeature([[[2897, 771],[3193, 771],[3193, 635],[2897, 635],[2897, 771]]], '130', '130');
template_PolygonFeature([[[2897, 886],[3193, 886],[3193, 774],[2897, 774],[2897, 886]]], '129', '129');
template_PolygonFeature([[[2897, 998],[3193, 998],[3193, 890],[2897, 890],[2897, 998]]], '128 (комната матери <br> и ребёнка)', '128');

template_PolygonFeature([[[2894, 1550], [3310, 1550], [3310, 1324], [2894, 1324], [2894, 1550]]], '126 (кафедра английского <br> языка и мекультурной <br> коммуникации)', '126',
    [{ day: 'Среда', number: '2', department: 'фКНиИТ', group: '131, 132, 111, 151', teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'лек.', parity: '-'}]);

template_PolygonFeature([[[2894, 1717], [3193, 1717], [3193, 1552], [2894, 1552], [2894, 1717]]], '125 (вход через 126)', '125',
    [{ day: 'Понедельник', number: '1', department: 'фКНиИТ', group: '131, 132, 111, 151', teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '231, 211, 251', teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 1 гр. ', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '5', department: 'фКНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '1', department: 'фКНиИТ', group: '121, 141, 181', teacher: 'Китляр А.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '2', department: 'фКНиИТ', group: '221, 241', teacher: 'Китляр А.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: 'фКНиИТ', group: '231, 211, 251', teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '2', department: 'фКНиИТ', group: '131, 132, 111, 151', teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '3', department: 'фКНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Шилова С.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '4', department: 'фКНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 2 гр. ', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '1', department: 'фКНиИТ', group: '221, 241', teacher: 'Китляр А.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: 'фКНиИТ', group: '121, 141, 181', teacher: 'Китляр А.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'фКНиИТ', group: '171', teacher: 'Кузьмина С.В.', lesson: 'Деловой иностранный язык', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[2740, 1948],[3315, 1948],[3315, 1719],[2894, 1719],[2894, 1795],[2740, 1795],[2740, 1948]]], '123/124', '123');

// аудитории в служебном коридоре 
template_PolygonFeature([[[1916, 1095],[2067, 1095],[2067, 883],[1916, 883],[1916, 1095]]], '115', '115');
template_PolygonFeature([[[2070, 1095],[2170, 1095],[2170, 883],[2070, 883],[2070, 1095]]], '116', '116');
template_PolygonFeature([[[2173, 1095],[2270, 1095],[2270, 883],[2173, 883],[2173, 1095]]], '117', '117');
template_PolygonFeature([[[2273, 1095],[2347, 1095],[2347, 883],[2273, 883],[2273, 1095]]], '118', '118');
template_PolygonFeature([[[2350, 1095],[2415, 1095],[2415, 883],[2350, 883],[2350, 1095]]], '119', '119');
template_PolygonFeature([[[2418, 1095],[2488, 1095],[2488, 883],[2418, 883],[2418, 1095]]], '120', '120');
template_PolygonFeature([[[1916, 880],[2488, 880],[2488, 779],[1916, 779],[1916, 880]]], 'служебный коридор', 'hallway');

// специальные помещения 
template_PolygonFeature([[[1356, 613],[1455, 613],[1455, 373],[1356, 373],[1356, 613]]], 'охрана (тут можно попросить ключи)', 'secutity');
template_PolygonFeature([[[1598, 1396],[1777, 1396],[1777, 1294],[1598, 1294],[1598, 1396]]], 'буфет (закрыт)', 'cafeteria');
template_PolygonFeature([[[1458, 1350],[1595, 1350],[1595, 1293],[1780, 1293],[1780, 1348],[1915, 1348],[1915, 1096],[1458, 1096],[1458, 1350]]], '"точка кипения"', 'cafeteriahall');
template_PolygonFeature([[[633, 368],[1455, 368],[1455, 208],[633, 208],[633, 368]]], 'гардероб', 'closet1');
template_PolygonFeature([[[1917, 372],[2740, 372],[2740, 210],[1917, 210],[1917, 372]]], 'гардероб (не работает)', 'closet2');
template_PolygonFeature([[[1218, 1959],[2161, 1959],[2161, 1399],[1218, 1399],[1218, 1959]]], 'актовый зал', 'assemblyhall');

const popup = new Overlay({ // всплывающая надпись
    element: document.createElement('div'),  // создаем div-элемент для Popup
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  popup.getElement().className = 'ol-popup'; // добавляем класс для стилизации (в CSS)

const initialCenter = fromLonLat([imageWidth / 2, imageHeight / 2]);

const map = new Map({
target: "map",
    layers: [imageLayer, vectorLayer],
    view: new View({
        projection: proj,
        center: initialCenter,
        zoom: 0, // начальный зум
    }),
});

map.getView().fit(imageExtent); // автоматический подбор масштаба карты

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
        const coordinate = evt.coordinate;
        popup.getElement().innerHTML = `${featureToShowPopup.get('description')}`; // Используем featureToShowPopup;
        popup.setPosition(coordinate);
    } else {
        popup.setPosition(undefined);
    }
});

let openModal = null; // глобальная переменная для отслеживания открытого расписания

map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) { return feature; });

    const description = feature.get('description');
    const schedule = feature.get('schedule');
    // Закрываем текущее открытое модальное окно, если оно есть
    if (openModal) {
        document.body.removeChild(openModal);
        openModal = null; // Сбрасываем openModal после закрытия
    }

    if (schedule && schedule.length > 0) {
        openModal = showScheduleModal(description, schedule); // запоминаем открытое модальное окно
    } else {
        openModal = showScheduleModal(description, []); // Вызываем функцию с пустым расписанием
    }
});

function showScheduleModal(description, schedule) {
    const modal = document.createElement('div');
    modal.id = `schedule-modal-${description}`;
    modal.className = 'schedule-menu';
    const scheduleByDay = schedule.reduce((acc, item) => {
        const day = item.day;
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(item);
        return acc;
    }, {});

    let tablesHTML = '';

    // Создаем таблицу для каждого дня
    for (const day in scheduleByDay) {
        tablesHTML += `
            <div class="schedule-day">
                <h1>${day}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Номер <br> пары</th>
                            <th>Факультет</th>
                            <th>Группа</th>
                            <th>Преподаватель</th>
                            <th>Пара</th>
                            <th>Тип</th>
                            <th>Чётность</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${scheduleByDay[day].map(item => `<tr><td>${item.number}</td><td>${item.department}</td><td>${item.group}</td><td>${item.teacher}</td><td>${item.lesson}</td><td>${item.type}</td><td>${item.parity}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    let modalContent = '';
    if (schedule && schedule.length > 0) {
        // ... (ваш существующий код для генерации таблицы) ...
        modalContent = `
            <div class="modal-content">
                <h1>Расписание аудитории <br> ${description}</h1>
                ${tablesHTML}
            </div>
        `;
    } else {
        modalContent = `
            <div class="modal-content">
                <h1>Расписание аудитории <br> ${description}</h1>
                <p>Для этого объекта расписание отсутствует.</p>
            </div>
        `;
    }

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    return modal;
}