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
        url: 'seventh_floor.png',
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
template_PolygonFeature([[[1480, 1061],[1600, 1061],[1600, 979],[1480, 979],[1480, 1061]]], 'центральная лестница', 'centralstairs1');
template_PolygonFeature([[[1604, 958],[1769, 958],[1769, 1088],[1604, 1088],[1604, 958]]], 'центральная лестница', 'centralstairs2');
template_PolygonFeature([[[1773, 979],[1895, 979],[1895, 1061],[1773, 1061],[1773, 979]]], 'центральная лестница', 'centralstairs3');

template_PolygonFeature([[[1558, 1203],[1815, 1203],[1815, 1435],[1558, 1435],[1558, 1203]]], '701 (лекционная аудитория)', '701',
    [{ day: 'Понедельник', number: '2', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Огурцова Е.В.', lesson: 'Введение в экономическую теорию: Часть 2', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Экономический'], group: ['121', '122', '141'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Экономический'], group: ['121', '122'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '4', department: ['Экономический'], group: ['141'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '2', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Черемисинов Г.А.', lesson: 'Экономическая теория', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Гребенюк Л.В.', lesson: 'Безопасность жизнедеятельности', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Гребенюк Л.В.', lesson: 'Безопасность жизнедеятельности', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Экономический'], group: ['111', '112', '113'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Экономический'], group: ['111'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '4', department: ['Экономический'], group: ['112', '113'], teacher: 'Лёвин С.В.', lesson: 'История России', type: 'пр.', parity: 'знам.'},]);

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