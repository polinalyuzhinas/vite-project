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
        url: 'second_floor.png',
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

function template_PolygonFeature(coordinates, description, schedule=[], featureID) { // создает объект OpenLayers Feature по координатам, описанию и ID и сохраняет его в словаре 
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
template_PolygonFeature([[[1479, 1027],[1600, 1027],[1600, 944],[1479, 944],[1479, 1027]]], 'центральная лестница', 'centralstairs1');
template_PolygonFeature([[[1604, 1001],[1769, 1001],[1769, 873],[1604, 873],[1604, 1001]]], 'центральная лестница', 'centralstairs2');
template_PolygonFeature([[[1772, 1027],[1892, 1027],[1892, 944],[1772, 944],[1772, 1027]]], 'центральная лестница', 'centralstairs3');
template_PolygonFeature([[[2494, 1088],[2637, 1088],[2637, 947],[2494, 947],[2494, 1088]]], 'лестница', 'rightstairs');
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
template_PolygonFeature([[[637, 1320],[801, 1320],[801, 1136],[637, 1136],[637, 1320]]], '208 (ремонт)', 'toilet1');
template_PolygonFeature([[[2581, 1726],[2740, 1726],[2740, 1525],[2581, 1525],[2581, 1726]]], 'туалет мужской', 'toilet2');

// аудитории левого крыла
template_PolygonFeature([[[178, 1320],[475, 1320],[475, 950],[178, 950],[178, 1320]]], '207 (кафедра философии культуры и культорологии, центр Артефакт)', '207');
template_PolygonFeature([[[178, 947],[475, 947],[475, 830],[178, 830],[178, 947]]], '206 (совет студентов философского факультета)', '206');
template_PolygonFeature([[[178, 828],[475, 828],[475, 602],[178, 602],[178, 828]]], '205 (кафедра теоретической и социальной философии, учебно-научная лаборатория ЦИФРА)', '205');

template_PolygonFeature([[[178, 600],[632, 600],[632, 373],[510, 373],[510, 250],[178, 250], [178, 600]]], '204 (деканат философского факультета)',
    [{ day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '241', teacher: 'Коротковская Е.И.', lesson: 'Основы экономики и финансовой грамотности', type: 'пр.', parity: 'знам.'}], '204');

template_PolygonFeature([[[886, 1097],[1073, 1097],[1073, 778],[886, 778],[886, 1097]]], '209', '209');
template_PolygonFeature([[[1076, 1097],[1244, 1097],[1244, 778],[1076, 778],[1076, 1097]]], '210', '210');
template_PolygonFeature([[[1247, 1097],[1348, 1097],[1348, 778],[1247, 778],[1247, 1097]]], '211 (кафедра теологии и религиоведения)', '211');
template_PolygonFeature([[[1351, 1097],[1458, 1097],[1458, 778],[1351, 778],[1351, 1097]]], '212 (заведующий кафедрой теологии и религиоведения)', '212');
template_PolygonFeature([[[632, 631],[918, 631],[918, 373],[632, 373],[632, 631]]], '203 (аудитория им. А.Ф. Аскина)', '203');
template_PolygonFeature([[[921, 631],[1163, 631],[1163, 373],[921, 373],[921, 631]]], '202 (аудитория им. С.Л. Франка)', '202');
template_PolygonFeature([[[1166, 631],[1361, 631],[1361, 373],[1166, 373],[1166, 631]]], '201', '201');

// аудитории правого крыла
template_PolygonFeature([[[1998, 635],[2230, 635],[2230, 373],[1998, 373],[1998, 635]]], '230 (лаборатория аудиовизуальных средств обучения)',
    [{ day: 'Понедельник', number: '1', department: 'фКНиИТ', group: '131, 132, 111, 151', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '211, 231, 251', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '331, 311', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр. ', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: 'фКНиИТ', group: '211, 231, 251', teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: 'фКНиИТ', group: '131, 132, 111, 151', teacher: 'Крючкова О.Ю.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '4', department: 'фКНиИТ', group: '331, 311', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр. ', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'фКНиИТ', group: '331', teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений 2 гр.', type: 'пр.', parity: '-'}], '230');

template_PolygonFeature([[[2233, 635],[2504, 635],[2504, 373],[2233, 373],[2233, 635]]], '229 (лаборатория информационных технологий 2)', '229');
template_PolygonFeature([[[2507, 635],[2749, 635],[2749, 373],[2507, 373],[2507, 635]]], '228 (лаборатория информационных <br> технологий 1)', '228');

template_PolygonFeature([[[1915, 1097],[2148, 1097],[2148, 778],[1915, 778],[1915, 1097]]], '215 (лаборатория информационных технологий 3)',
    [{ day: 'Понедельник', number: '1', department: 'фКНиИТ', group: '131, 132, 111, 151', teacher: 'Крючкова О.Ю.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'фКНиИТ', group: '211, 231, 251', teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '211', teacher: 'Кондратова Ю.Н.', lesson: 'Структуры данных и алгоритмы', type: 'пр.', parity: 'чис.'}, 
    { day: 'Среда', number: '1', department: 'фКНиИТ', group: '211, 231, 251', teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: 'фКНиИТ', group: '331, 311', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр. ', type: 'пр.', parity: '-'}],'215');

template_PolygonFeature([[[2151, 1097],[2300, 1097],[2300, 778],[2151, 778],[2151, 1097]]], '216 (лаборатория технической диагностики)', '216');
template_PolygonFeature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '217 (центр олимпиадной подготовки программистов <br> им. Н.Л. Андреевой)', '217');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '227 (деканат <br> факультета физико- <br> математических и <br> естественно-научных <br> дисциплин, базовая кафедра <br> ГАОУ СО "ФТЛ лицей №1")', '227');
template_PolygonFeature([[[2894, 568],[3193, 568],[3193, 929],[2894, 929],[2894, 568]]], '226 (базовые кафедры <br> Мирантис ИТ, филиала № 2 <br> ООО "РНТ")', '226');
template_PolygonFeature([[[2894, 1318],[3193, 1318],[3193, 932],[2894, 932],[2894, 1318]]], '225 (кафедра системного <br> анализа и автоматического <br> управления)', '225');

template_PolygonFeature([[[2894, 1550],[3310, 1550],[3310, 1320],[2894, 1320],[2894, 1550]]], '224',
    [{ day: 'Четверг', number: '1', department: 'фКНиИТ', group: '231', teacher: 'Луньков А.Д.', lesson: 'Теория вероятностей и математическая статистика', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '2', department: 'фКНиИТ', group: '231', teacher: 'Луньков А.Д.', lesson: 'Теория вероятностей и математическая статистика', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: 'фКНиИТ', group: '231', teacher: 'Сагаева И.Д.', lesson: 'Дискретная математика', type: 'лек.', parity: '-'}], '224');

template_PolygonFeature([[[2894, 1628],[3193, 1628],[3193, 1552],[2894, 1552],[2894, 1628]]], '222', '222');
template_PolygonFeature([[[2894, 1717],[3193, 1717],[3193, 1630],[2894, 1630],[2894, 1717]]], '221', '221');
template_PolygonFeature([[[2894, 1948],[3315, 1948],[3315, 1719],[2894, 1719],[2894, 1948]]], '220',
    [{ day: 'Понедельник', number: '3', department: 'фКНиИТ', group: '141', teacher: 'Огнева М.В.', lesson: 'Информационные технологии и программирование', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'фКНиИТ', group: '121', teacher: 'Ушаков И.В.', lesson: 'Алгебра и геометрия', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'фКНиИТ', group: '131, 132', teacher: 'Шунаев В.В.', lesson: 'Физика', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '1', department: 'фКНиИТ', group: '231', teacher: 'Жаркова А.В.', lesson: 'Ознакомительная практика', type: 'пр.', parity: 'знам.'}], '220');

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
        // получаем координаты объекта
        const coordinate = evt.coordinate; // координаты курсора
        popup.getElement().innerHTML = featureToShowPopup.get('description'); // устанавливаем текст для Popup
        popup.setPosition(coordinate); // позиционируем Popup рядом с курсором
    } else {
        // если курсор не на объекте, скрываем Popup
        popup.setPosition(undefined);
    }
});

map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) { return feature; });

    if (feature && feature.get('schedule') && feature.get('schedule').length > 0) {
        const schedule = feature.get('schedule');
        if (schedule && schedule.length > 0) {
            showScheduleModal(feature.get('description'), schedule); // Вызов функции для отображения модального окна
        }
    }
    else {

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


    modal.innerHTML = `
        <div class="modal-content">
            <h1>Расписание аудитории <br> ${description}</h1>
            ${tablesHTML}
            <button class="close-modal">Закрыть</button>
        </div>
    `;

    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.body.appendChild(modal);
}