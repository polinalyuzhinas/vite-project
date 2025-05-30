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
template_PolygonFeature([[[62, 1466],[134, 1466],[134, 1398],[62, 1398],[62, 1466]]], 'лестница', 'farleftstairs2');
template_PolygonFeature([[[131, 1396],[201, 1396],[201, 1320],[131, 1320],[131, 1396]]], 'лестница', 'farleftstairs3');

// лифты
template_PolygonFeature([[[643, 1122],[730, 1122],[730, 1024],[643, 1024],[643, 1122]]], 'лифт', 'elevator1');
template_PolygonFeature([[[645, 887],[735, 887],[735, 790],[645, 790],[645, 887]]], 'лифт', 'elevator2');
template_PolygonFeature([[[2642, 1123],[2729, 1123],[2729, 1027],[2642, 1027],[2642, 1123]]], 'лифт', 'elevator3');
template_PolygonFeature([[[2638, 889],[2727, 889],[2727, 792],[2638, 792],[2638, 889]]], 'лифт', 'elevator4');

// туалеты
template_PolygonFeature([[[637, 1320],[801, 1320],[801, 1136],[637, 1136],[637, 1320]]], 'туалет женский', 'toilet1');
template_PolygonFeature([[[2581, 1726],[2740, 1726],[2740, 1525],[2581, 1525],[2581, 1726]]], 'туалет женский', 'toilet2');

// аудитории левого крыла
template_PolygonFeature([[[178, 1320],[475, 1320],[475, 1084],[178, 1084],[178, 1320]]], '508 (кафедры теории государства и права, социальных коммуникаций)', '508');
template_PolygonFeature([[[178, 1081],[475, 1081],[475, 954],[178, 954],[178, 1081]]], '507 (совет студентов и аспирантов юридического факультета)', '507');

template_PolygonFeature([[[178, 950],[475, 950],[475, 604],[178, 604],[178, 950]]], '506 (кафедра конституционного и муниципального права)', '506',
    [{ day: 'Среда', number: '5', department: ['ФМиЕНД'], group: ['220'], teacher: 'Деманова С.В.', lesson: 'Право в сфере образования', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '6', department: ['ФМиЕНД'], group: ['220'], teacher: 'Деманова С.В.', lesson: 'Право в сфере образования', type: 'пр.', parity: '-'},]);

template_PolygonFeature([[[178, 600],[632, 600],[632, 373],[510, 373],[510, 250],[178, 250], [178, 600]]], '505 (деканат юридического факультета)', '505');
template_PolygonFeature([[[886, 1097],[1073, 1097],[1073, 778],[886, 778],[886, 1097]]], '510 (зал заседаний советов)', '510');
template_PolygonFeature([[[1076, 1097],[1244, 1097],[1244, 778],[1076, 778],[1076, 1097]]], '511 (учебная лаборатория криминалистического исследования документов)', '511');
template_PolygonFeature([[[1247, 1097],[1458, 1097],[1458, 778],[1247, 778],[1247, 1097]]], '512 (учебная лаборатория ЛИССА)', '512');
template_PolygonFeature([[[632, 631],[918, 631],[918, 373],[632, 373],[632, 631]]], '504 (компьютерный класс юридического факультета)', '504');
template_PolygonFeature([[[921, 631],[1163, 631],[1163, 373],[921, 373],[921, 631]]], '503 (компьютерный класс юридического факультета)', '503');
template_PolygonFeature([[[1166, 631],[1361, 631],[1361, 373],[1166, 373],[1166, 631]]], '502', '502');
template_PolygonFeature([[[1364, 635],[1518, 635],[1518, 373],[1364, 373],[1364, 635]]], '501', '501');
template_PolygonFeature([[[1521, 635],[1824, 635],[1824, 373],[1521, 373],[1521, 635]]], '530/531', '530');

// аудитории правого крыла
template_PolygonFeature([[[1827, 635],[1995, 635],[1995, 373],[1827, 373],[1827, 635]]], '529', '529');
template_PolygonFeature([[[1998, 635],[2230, 635],[2230, 373],[1998, 373],[1998, 635]]], '528 (зал судебных заседаний)', '528');
template_PolygonFeature([[[2233, 635],[2504, 635],[2504, 373],[2233, 373],[2233, 635]]], '527', '527');
template_PolygonFeature([[[2507, 635],[2749, 635],[2749, 373],[2507, 373],[2507, 635]]], '526 (компьютерный класс юридического <br> факультета)', '526');
template_PolygonFeature([[[1915, 1097],[2163, 1097],[2163, 778],[1915, 778],[1915, 1097]]], '513', '513');
template_PolygonFeature([[[2166, 1097],[2300, 1097],[2300, 778],[2166, 778],[2166, 1097]]], '514', '514');
template_PolygonFeature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '515 (учебная лаборатория криминалистики и <br> судебных экспертиз)', '515');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '525 (кафедры таможенного, <br> административного и <br> финансового права и <br> уголовного, экологического <br> права и криминологии)', '525');
template_PolygonFeature([[[2894, 568],[3193, 568],[3193, 929],[2894, 929],[2894, 568]]], '524 (кафедра гражданского <br> права и процесса)', '524');
template_PolygonFeature([[[2894, 1318],[3193, 1318],[3193, 932],[2894, 932],[2894, 1318]]], '523 (кафедра политических <br> наук)', '523');
template_PolygonFeature([[[2894, 1550],[3310, 1550],[3310, 1320],[2894, 1320],[2894, 1550]]], '521/522', '521');
template_PolygonFeature([[[2894, 1628],[3193, 1628],[3193, 1552],[2894, 1552],[2894, 1628]]], '520', '520');
template_PolygonFeature([[[2894, 1717],[3193, 1717],[3193, 1630],[2894, 1630],[2894, 1717]]], '519', '519');

template_PolygonFeature([[[2894, 1832],[3315, 1832],[3315, 1719],[2894, 1719],[2894, 1832]]], '518', '518', 
    [{ day: 'Понедельник', number: '1', department: ['Экономический'], group: ['141'], teacher: 'Алексеева Д.А.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '1', department: ['Экономический'], group: ['241'], teacher: 'Фурсов А.Л.', lesson: 'Управление персоналом организации', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['Экономический'], group: ['241'], teacher: 'Фурсов А.Л.', lesson: 'Управление персоналом организации', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '3', department: ['Экономический'], group: ['112'], teacher: 'Шебалдин В.Р.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Экономический'], group: ['121'], teacher: 'Алавина Е.М.', lesson: 'Кураторский час', type: 'лек.', parity: 'знам.'},
    { day: 'Вторник', number: '3', department: ['Экономический'], group: ['412'], teacher: 'Соловых С.Н.', lesson: 'Правовая среда современного бизнеса', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['Экономический'], group: ['212', '213'], teacher: 'Тугушева Р.Р.', lesson: 'Макроэкономика', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Экономический'], group: ['121'], teacher: 'Исайкина М.А.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: ['Экономический'], group: ['141'], teacher: 'Алексеева Д.А.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: ['Экономический'], group: ['112'], teacher: 'Исайкина М.А.', lesson: 'Английский язык (1 гр.)', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['Экономический'], group: ['212'], teacher: 'Балаш О.С.', lesson: 'Статистика', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '5', department: ['Экономический'], group: ['121'], teacher: 'Исайкина М.А.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '1', department: ['Экономический'], group: ['111'], teacher: 'Исайкина М.А.', lesson: 'Английский язык (1 гр.)', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['Экономический'], group: ['111'], teacher: 'Исайкина М.А.', lesson: 'Английский язык (1 гр.)', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Экономический'], group: ['212'], teacher: 'Исайкина М.А.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Экономический'], group: ['112'], teacher: 'Исайкина М.А.', lesson: 'Английский язык (1 гр.)', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Экономический'], group: ['212'], teacher: 'Исайкина М.А.', lesson: 'Английский язык', type: 'пр.', parity: '-'},]);

template_PolygonFeature([[[2894, 1948],[3315, 1948],[3315, 1832],[2894, 1832],[2894, 1948]]], '517', '517', 
    [{ day: 'Понедельник', number: '2', department: ['Экономический'], group: ['322'], teacher: 'Бгашев М.В.', lesson: 'Производственный менеджмент', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Экономический'], group: ['321'], teacher: 'Бгашев М.В.', lesson: 'Производственный менеджмент', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Экономический'], group: ['111'], teacher: 'Оберт Т.Б.', lesson: 'Кураторский час', type: 'лек.', parity: 'чис.'},
    { day: 'Вторник', number: '4', department: ['Экономический'], group: ['241'], teacher: 'Землянухина Н.С.', lesson: 'Рынок труда', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Экономический'], group: ['241'], teacher: 'Землянухина Н.С.', lesson: 'Рынок труда', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '6', department: ['Экономический'], group: ['341'], teacher: 'Кузнецов П.С.', lesson: 'Оплата труда персонала', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '7', department: ['Экономический'], group: ['341'], teacher: 'Кузнецов П.С.', lesson: 'Оплата труда персонала', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['Экономический'], group: ['341'], teacher: 'Калашникова С.П.', lesson: 'Маркетинг персонала', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '2', department: ['Экономический'], group: ['313'], teacher: 'Коробов Е.А.', lesson: 'Анализ и оценка риска', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Экономический'], group: ['341'], teacher: 'Калашникова С.П.', lesson: 'Маркетинг', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '3', department: ['Экономический'], group: ['341'], teacher: 'Землянухина Н.С.', lesson: 'Спецсеминар', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '4', department: ['Экономический'], group: ['241'], teacher: 'Бгашев М.В.', lesson: 'Экономика управления персоналом', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '6', department: ['Экономический'], group: ['151'], teacher: 'Голубева С.С.', lesson: 'Финансовый и управленческий учёт', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '7', department: ['Экономический'], group: ['151'], teacher: 'Голубева С.С.', lesson: 'Финансовый и управленческий учёт', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['Экономический'], group: ['241'], teacher: 'Милованов Д.И.', lesson: 'Статистика', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Экономический'], group: ['241'], teacher: 'Юсупова С.М.', lesson: 'Организация и нормирование труда', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Экономический'], group: ['241'], teacher: 'Юсупова С.М.', lesson: 'Организация и нормирование труда', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '3', department: ['Экономический'], group: ['341'], teacher: 'Кузнецов П.С.', lesson: 'Основы кадровой политики и кадрового планирования', type: 'лек.', parity: '-'},
    { day: 'Суббота', number: '4', department: ['Экономический'], group: ['341'], teacher: 'Кузнецов П.С.', lesson: 'Основы кадровой политики и кадрового планирования', type: 'пр.', parity: '-'},]);

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