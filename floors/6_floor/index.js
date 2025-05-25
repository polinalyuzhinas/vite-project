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

const polygonFeatures = new Map(); // cловарь для хранения полигонов

function template_PolygonFeature(coordinates, description, featureID, schedule=[]) { // создает объект OpenLayers Feature по координатам, описанию и ID и сохраняет его в словаре
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
template_PolygonFeature([[[2494, 1088],[2637, 1088],[2637, 950],[2494, 950],[2494, 1088]]], 'лестница', 'rightstairs');
template_PolygonFeature([[[2587, 1916],[2730, 1916],[2730, 1844],[2587, 1844],[2587, 1916]]], 'лестница', 'farrightstairs');
template_PolygonFeature([[[737, 1079],[876, 1079],[876, 940],[737, 940],[737, 1079]]], 'лестница', 'leftstairs');
template_PolygonFeature([[[133, 1548],[201, 1548],[201, 1468],[133, 1468],[133, 1548]]], 'лестница', 'farleftstairs1');
template_PolygonFeature([[[62, 1466],[132, 1466],[132, 1398],[62, 1398],[62, 1466]]], 'лестница', 'farleftstairs2');
template_PolygonFeature([[[131, 1396],[201, 1396],[201, 1320],[131, 1320],[131, 1396]]], 'лестница', 'farleftstairs3');

// лифты
template_PolygonFeature([[[643, 1122],[730, 1122],[730, 1024],[643, 1024],[643, 1122]]], 'лифт', 'elevator1');
template_PolygonFeature([[[645, 887],[735, 887],[735, 790],[645, 790],[645, 887]]], 'лифт', 'elevator2');
template_PolygonFeature([[[2642, 1123],[2729, 1123],[2729, 1027],[2642, 1027],[2642, 1123]]], 'лифт', 'elevator3');
template_PolygonFeature([[[2638, 889],[2727, 889],[2727, 792],[2638, 792],[2638, 889]]], 'лифт', 'elevator4');

// туалеты
template_PolygonFeature([[[637, 1320],[801, 1320],[801, 1136],[637, 1136],[637, 1320]]], '611', 'toilet1');
template_PolygonFeature([[[2575, 1639],[2740, 1639],[2740, 1525],[2575, 1525],[2575, 1639]]], 'туалет для сотрудников', 'toilet2');
template_PolygonFeature([[[2581, 1726],[2581, 1639],[2740, 1639],[2740, 1726],[2581, 1726]]], '621', 'toiletgym');

// аудитории левого крыла
template_PolygonFeature([[[178, 1949],[686, 1949],[686, 1551],[178, 1551],[178, 1949]]], '610 (вход через 5 этаж)', '610');
template_PolygonFeature([[[314, 1546],[507, 1546],[507, 1438],[314, 1438],[314, 1546]]], '609 (учебная лаборатория судебной фотографии и судебной видеозаписи)', '609');
template_PolygonFeature([[[177, 1317],[474, 1317],[474, 1121],[177, 1121],[177, 1317]]], '608 (учебная аудитория)', '608');
template_PolygonFeature([[[177, 1118],[474, 1118],[474, 955],[177, 955],[177, 1118]]], '607 (учебный и научный раздел ИДПО)', '607');
template_PolygonFeature([[[178, 602],[475, 602],[475, 950],[178, 950],[178, 602]]], '606', '606');
template_PolygonFeature([[[178, 600],[632, 600],[632, 373],[510, 373],[510, 250],[178, 250], [178, 600]]], '605 (директор ИДПО)', '605');
template_PolygonFeature([[[886, 1097],[1071, 1097],[1071, 778],[886, 778],[886, 1097]]], '612 (центр профессионального развития и бизнес-стратегий)', '612');
template_PolygonFeature([[[1075, 1097],[1292, 1097],[1292, 778],[1075, 778],[1075, 1097]]], '613 (учебная аудитория)', '613');

template_PolygonFeature([[[1295, 1097],[1458, 1097],[1458, 778],[1295, 778],[1295, 1097]]], '614 (учебная лаборатория)', '614', 
    [{ day: 'Вторник', number: '5', department: ['Экономический'], group: ['101'], teacher: 'Митяева Н.В.', lesson: 'Научно-исследовательская деятельность и подготовка научно-квалификационной работы', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '6', department: ['Экономический'], group: ['101'], teacher: 'Митяева Н.В.', lesson: 'Научно-исследовательская деятельность и подготовка научно-квалификационной работы', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '6', department: ['Экономический'], group: ['201'], teacher: 'Митяева Н.В.', lesson: 'Методология экономической науки', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '6', department: ['Экономический'], group: ['201'], teacher: 'Митяева Н.В.', lesson: 'Методология экономической науки', type: 'лек.', parity: 'знам.'},
    { day: 'Пятница', number: '6', department: ['Экономический'], group: ['301'], teacher: 'Митяева Н.В.', lesson: 'Методология экономической науки', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '7', department: ['Экономический'], group: ['301'], teacher: 'Митяева Н.В.', lesson: 'Методология экономической науки', type: 'пр.', parity: '-'},]);

template_PolygonFeature([[[632, 631],[918, 631],[918, 373],[632, 373],[632, 631]]], '604 (компьютерный класс)', '604');
template_PolygonFeature([[[921, 631],[1163, 631],[1163, 373],[921, 373],[921, 631]]], '603 (учебная аудитория)', '603');
template_PolygonFeature([[[1166, 631],[1361, 631],[1361, 373],[1166, 373],[1166, 631]]], '602 (кафедра педагогики и психологии профессионального образования, <br> центр профессиональной переподготовки)', '602');
template_PolygonFeature([[[1364, 635],[1564, 635],[1564, 373],[1364, 373],[1364, 635]]], '601 (кафедра менеджмента в образовании, <br> центр повышения квалификации)', '601');
template_PolygonFeature([[[1567, 635],[1899, 635],[1899, 373],[1567, 373],[1567, 635]]], '639 (учебная аудитория)', '639');

// аудитории правого крыла
template_PolygonFeature([[[1901, 635],[2051, 635],[2051, 373],[1901, 373],[1901, 635]]], '637 (диссертационный совет по педагогическим наукам)', '637');
template_PolygonFeature([[[2055, 635],[2160, 635],[2160, 373],[2055, 373],[2055, 635]]], '636 (кафедра методологии образования)', '636');
template_PolygonFeature([[[2163, 635],[2267, 635],[2267, 373],[2163, 373],[2163, 635]]], '635 (кафедра логопедии и психолингвистики)', '635');
template_PolygonFeature([[[2270, 635],[2400, 635],[2400, 373],[2270, 373],[2270, 635]]], '634', '634');
template_PolygonFeature([[[2403, 635],[2751, 635],[2751, 373],[2403, 373],[2403, 635]]], '633 (дирекция педагогического института)', '633');

template_PolygonFeature([[[1914, 1098],[1991, 1098],[1991, 777],[1914, 777],[1914, 1098]]], '615 (кабинет английского языка)', '615',
    [{ day: 'Четверг', number: '5', department: ['Философский'], group: ['142', '152', '242', '252'], teacher: 'Бартель В.В.', lesson: 'Английский язык в сфере профессиональной коммуникации', type: 'пр.', parity: '-'},]);

template_PolygonFeature([[[1994, 1098],[2152, 1098],[2152, 777],[1994, 777],[1994, 1098]]], '616 (кафедра английского языка для гуманитарных <br> направлений и специальностей)', '616');
template_PolygonFeature([[[2156, 927],[2271, 927],[2271, 777],[2156, 777],[2156, 927]]], '617 (архив факультета физической культуры и спорта)', '617');
template_PolygonFeature([[[2159, 1098],[2355, 1098],[2355, 777],[2274, 777],[2274, 927],[2152, 927],[2159, 1098]]], '618 (деканат факультета физической культуры и спорта)', '618');
template_PolygonFeature([[[2358, 1098],[2485, 1098],[2485, 777],[2358, 777],[2358, 1098]]], '619 (декан факультета физической культуры и спорта)', '619');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '632 (профсоюзный комитет <br> работников СГУ)', '632');
template_PolygonFeature([[[2894, 568],[3193, 568],[3193, 824],[2894, 824],[2894, 568]]], '631 (аудитория им. <br> К.Ф. Седова)', '631');
template_PolygonFeature([[[2894, 932],[3193, 932],[3193, 827],[2894, 827],[2894, 932]]], '630 (заместитель по <br> социально-воспитательной <br> работе факультета ППиСО и <br> профбюро ППиСО)', '630');
template_PolygonFeature([[[2894, 1223],[3193, 1223],[3193, 934],[2894, 934],[2894, 1223]]], '629 (деканат ППиСО)', '629');
template_PolygonFeature([[[2894, 1320],[3193, 1320],[3193, 1227],[2894, 1227],[2894, 1320]]], '628 (заместитель по <br> учебной работе ППиСО)', '628');
template_PolygonFeature([[[2894, 1440],[3310, 1440],[3310, 1324],[2894, 1324],[2894, 1440]]], '627 (архив ППиСО)', '627');
template_PolygonFeature([[[2894, 1552],[3310, 1552],[3310, 1444],[2894, 1444],[2894, 1552]]], '626 (деканат ППиСО <br> учебная часть)', '626');
template_PolygonFeature([[[2894, 1628],[3193, 1628],[3193, 1552],[2894, 1552],[2894, 1628]]], '625 (председатель <br> профкома студентов)', '625');
template_PolygonFeature([[[2894, 1717],[3193, 1717],[3193, 1637],[2894, 1637],[2894, 1717]]], '624 (профком студентов)', '624');
template_PolygonFeature([[[2894, 1832],[3087, 1832],[3087, 1948],[3315, 1948],[3315, 1724],[2894, 1724],[2894, 1832]]], '623 (отдел по техническому <br> учёту объектов <br> недвижимости)', '623');
template_PolygonFeature([[[2894, 1948],[3084, 1948],[3084, 1834],[2894, 1834],[2894, 1948]]], '622', '622');

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
        minZoom: 0.98, // минимальный зум
        maxZoom: 4, // максимальный зум
    }),
});

map.getView().fit(imageExtent); // автоматический подбор масштаба карты

fill_filter();

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

let openModal = null; // глобальная переменная для отслеживания открытого расписания

map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) { return feature; });

    if (feature) {
        const description = feature.get('description');
        const schedule = feature.get('schedule');

        // Закрываем текущее открытое модальное окно, если оно есть
        if (openModal) {
            document.body.removeChild(openModal);
            openModal = null; // Сбрасываем openModal после закрытия
        }

        openModal = showScheduleModal(description, schedule, getFilters()); // Передаем все фильтры в функцию
    }
});

function showScheduleModal(description, schedule, filters = {}) {
    const modal = document.createElement('div');
    modal.id = `schedule-modal-${description}`;
    modal.className = 'schedule-menu';

    const filteredSchedule = filterFeatures(description, schedule, filters);

    let modalContent = '';
    if (filteredSchedule && filteredSchedule.length > 0) {
        let tablesHTML = '';

        const scheduleByDay = filteredSchedule.reduce((acc, item) => {
            const day = item.day;
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push(item);
            return acc;
        }, {});

        // Создаем таблицу для каждого дня
        for (const day in scheduleByDay) {
            tablesHTML += `
                <div class="schedule-day">
                    <h1>${day}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Факультет</th>
                                <th>Группа</th>
                                <th>Преподаватель</th>
                                <th>Пара</th>
                                <th>Тип</th>
                                <th>Чётность</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${scheduleByDay[day].map(item => `<tr><td>${item.number}</td><td>${item.department.join('\n')}</td><td>${item.group.join(', ')}</td><td>${item.teacher}</td><td>${item.lesson}</td><td>${item.type}</td><td>${item.parity}</td></tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

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
                <p>Для данного объекта нет расписания</p>
            </div>
        `;
    }

    modal.innerHTML = modalContent;

    document.body.appendChild(modal);
    return modal;
}

function fill_filter() { // заполняем всплывающие списки фильтров
    const filterFields = ['department', 'group', 'teacher', 'lesson', 'type', 'parity'];
    const allSchedules = [];

    vectorSource.getFeatures().forEach(feature => {
        const schedule = feature.get('schedule');
        if (schedule && Array.isArray(schedule)) {
            schedule.forEach(item => allSchedules.push(item)); // добавляем все расписания в список
        }
    });

    filterFields.forEach(field => {
        const selectElement = document.getElementById(`filter-${field}`);
        const uniqueValues = new Set();

        allSchedules.forEach(item => {
            if (item && item[field]) {
                const fieldValue = item[field];

                // проверяем, является ли значение массивом
                if (Array.isArray(fieldValue)) {
                    // если да, то во множество добавляем его каждый элемент
                    fieldValue.forEach(value => uniqueValues.add(value));
                } else {
                    // если нет, то добавляем само значение
                    uniqueValues.add(fieldValue);
                }
            }
        });

       // преобразуем множество в массив и сортируем
        const sortedValues = Array.from(uniqueValues).sort();

        sortedValues.forEach(value => { // добавляем во всплывающие списки элементы из множества
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectElement.appendChild(option);
        });
    });
}

const applyFiltersButton = document.getElementById('apply-filters');
const filterForm = document.getElementById('filter-form');

// включаем/выключаем кнопку применения фильтров при изменении фильтров
filterForm.addEventListener('change', function () {
    const selectedFilters = Array.from(filterForm.querySelectorAll('select'))
        .some(select => select.value !== "");

    applyFiltersButton.disabled = !selectedFilters;
});

// обработчик для кнопки "Применить фильтры"
applyFiltersButton.addEventListener('click', function () {
    apply_filter();
});

function apply_filter() {
    // собираем значения фильтров из формы
    const filters = getFilters();

    if (openModal) {
        // закрываем старое окно
        document.body.removeChild(openModal);
        openModal = null; // cбрасываем переменную openModal
    }
}

function getFilters() {
    const filters = {};

    // собираем значения фильтров из формы
    document.querySelectorAll('#filter-form select').forEach(select => {
        const filterName = select.id.replace('filter-', '');
        const selectedValue = select.value;
        if (selectedValue) {
            filters[filterName] = selectedValue;
        }
    });

    return filters;
}

function filterFeatures(description, schedule, filters) {
    if (!schedule || schedule.length === 0) return [];

    return schedule.filter(item => {
        for (const filterName in filters) {
            const filterValue = filters[filterName];
            const itemValue = item[filterName];

            // для всех фильтров проверяем, является ли значение массивом
            if (Array.isArray(itemValue)) {
                if (!itemValue.includes(filterValue)) return false;
            } else {
                if (itemValue !== filterValue) return false;
            }
        }
        return true;
    });
}

document.getElementById('reset-filters').addEventListener('click', function () { // настройка кнопки сброса фильтров
    document.querySelectorAll('#filter-form select').forEach(select => {
        select.value = "";
    });
    applyFiltersButton.disabled = true; // блокирует кнопку сброса
    filterFeatures({}); // сбрасываем фильтры

    if (openModal) {
        // закрываем старое окно
        document.body.removeChild(openModal);
        openModal = null; // cбрасываем переменную openModal
    }
});