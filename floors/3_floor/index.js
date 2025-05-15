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
template_PolygonFeature([[[178, 1949], [686, 1949], [686, 1551], [178, 1551], [178, 1949]]], '310 (аудитория им. А. М. Богомолова)', '310',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '331, 311', teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '221, 241', teacher: 'Кудрина Е.В.', lesson: 'Структуры данных и алгоритмы', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '111, 151', teacher: 'Грецова А.П.', lesson: 'Введение в специальность', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '111, 151', teacher: 'Грецова А.П.', lesson: 'Введение в специальность', type: 'лек.', parity: 'знам.'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '131, 132', teacher: 'Иванова А.С.', lesson: 'Информационные технологии и программирование', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '531', teacher: 'Бондарев Н.Н.', lesson: 'Техническая защита информации', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '321', teacher: 'Тимофеева Н.Е.', lesson: 'Огранизация ЭВМ и систем', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '311, 351, 341', teacher: 'Голубева С.С.', lesson: 'Бюджетирование и финансовое планирование ИТ-проектов (цифровая кафедра)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '311, 351', teacher: 'Голубева С.С.', lesson: 'Бюджетирование и финансовое планирование ИТ-проектов (цифровая кафедра)', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '341', teacher: 'Голубева С.С.', lesson: 'Бюджетирование и финансовое планирование ИТ-проектов (цифровая кафедра)', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '221, 241', teacher: 'Сергеева Н.В.', lesson: 'Теория вероятностей, математическая статистика и случайные процессы', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '221', teacher: 'Федорова А.Г.', lesson: 'Машинно-зависимые языки программирования', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '111, 151', teacher: 'Крючкова А.А.', lesson: 'Современные информационные технологии', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '111, 151', teacher: 'Иванова А.С.', lesson: 'Информационные технологии и программирование', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Исайкина М.А.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '111, 151, 181', teacher: 'Бредихин Д.А.', lesson: 'Алгебра и геометрия', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '481', teacher: 'Петров Д.Ю.', lesson: 'Имитационное моделирование систем', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '531', teacher: 'Новиков В.Е.', lesson: 'Введение в криптоанализ', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '321, 341, 381', teacher: 'Батраева И.А.', lesson: 'Базы данных', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '171, 173', teacher: 'Кудрина Е.В.', lesson: 'Методика преподавания компьютерных наук', type: 'лек.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '341', teacher: 'Фрумина С.М.', lesson: 'Технология разработки программного обеспечения', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '421, 441', teacher: 'Синельников Е.А.', lesson: 'Системы реального времени', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[318, 1546],[492, 1546],[492, 1429],[318, 1429],[318, 1546]]], '309', '309');

template_PolygonFeature([[[239, 1409], [306, 1409], [306, 1325], [239, 1325], [239, 1409]]], '300 (находится между 3 и 4 этажами)', '300',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр. ', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '132', teacher: 'Грищенко А.А.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '173', teacher: 'Андрейченко Д.К.', lesson: 'НИР', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '6', department: 'КНиИТ', group: '531', teacher: 'Ионов К.И.', lesson: 'Java программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Уколова М.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '331', teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '531', teacher: 'Бондарев Н.Н.', lesson: 'Техническая защита информации 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '381', teacher: 'Сафрончик М.И.', lesson: 'Базы данных', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '6', department: 'КНиИТ', group: '531', teacher: 'Ионов К.И.', lesson: 'Java программирование 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '7', department: 'КНиИТ', group: '171', teacher: 'Тананко И.Е.', lesson: 'Методы оптимизации 1 гр. Сети ЭВМ', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '331', teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '7', department: 'КНиИТ', group: '171', teacher: 'Вешнева И.В.', lesson: 'Технологии построения микропроцессорной техники 2 гр. Анализ и синтез', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '311', teacher: 'Соловьёв В.М.', lesson: 'НИР', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '351', teacher: 'Соловьёв В.М.', lesson: 'НИР', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '531', teacher: 'Иванов А.С.', lesson: 'Математические основы искусственного интеллекта 2 гр.', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '421', teacher: 'Станкевич Е.П.', lesson: 'Моделирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '441', teacher: 'Соловьёв В.М.', lesson: 'Администрирование информационных систем 1 гр.', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '531', teacher: 'Иванов А.С.', lesson: 'Математические основы искусственного интеллекта 1 гр.', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '351', teacher: 'Черноусова Е.М.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '121', teacher: 'Черноусова Е.М.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '311', teacher: 'Портенко М.С.', lesson: 'Параллельное и распределенное программирование 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '481', teacher: 'Портенко М.С.', lesson: 'Технологии программирования', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '481', teacher: 'Портенко М.С.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '6', department: 'КНиИТ', group: '171', teacher: 'Кирьяшкин В.В.', lesson: 'Современные операционные системы', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '411', teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '411', teacher: 'Филиппов Б.А.', lesson: 'Программные решения математических задач', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '451', teacher: 'Филиппов Б.А.', lesson: 'Программные решения математических задач', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '191, 192, 291, 292, 392, 393, 394, 492, 494', teacher: '-', lesson: 'Самостоятельная работа аспирантов', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '5', department: 'КНиИТ', group: '451', teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[178, 1320], [475, 1320], [475, 950], [178, 950], [178, 1320]]], '308 (кафедры информатики и программирования, математической <br> кибернетики и компьютерных наук)', '308',
    [{ day: 'Вторник', number: '6', department: 'КНиИТ', group: '192', teacher: 'Романов В.А.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' },
     { day: 'Четверг', number: '5', department: 'КНиИТ', group: '392', teacher: 'Богомолов А.С.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[178, 947], [475, 947], [475, 830], [178, 830], [178, 947]]], '307 (заместитель по заочному отделению факультет КНиИТ)', '307');

template_PolygonFeature([[[178, 828], [475, 828], [475, 602], [178, 602], [178, 828]]], '306 (кафедра дискретной математики и информационных технологий)', '306',
    [{ day: 'Четверг', number: '5', department: 'КНиИТ', group: '392', teacher: 'Тяпаев Л.Б.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[178, 600], [632, 600], [632, 373], [510, 373], [510, 250], [178, 250], [178, 600]]], '305 (деканат факультета КНиИТ)', '305',
    [{ day: 'Четверг', number: '5', department: 'КНиИТ', group: '392', teacher: 'Миронов С.В.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[886, 1097], [1073, 1097], [1073, 778], [886, 778], [886, 1097]]], '312', '312',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Чумакова А.Ю.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '132', teacher: 'Ушаков И.В.', lesson: 'Алгебра', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '131', teacher: 'Ушаков И.В.', lesson: 'Алгебра', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '273', teacher: '-', lesson: 'НИР', type: 'пр.', parity: 'чис.' },
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '381', teacher: 'Сергеева Н.В.', lesson: 'Исследование операций', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '381', teacher: 'Сергеева Н.В.', lesson: 'Исследование операций', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '481', teacher: 'Тананко И.Е.', lesson: 'Методы и средства измерения систем', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '273', teacher: 'Власов А.А.', lesson: 'Технология распределенной обработки данных', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '6', department: 'КНиИТ', group: '273', teacher: 'Власов А.А.', lesson: 'Технология распределенной обработки данных', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '7', department: 'КНиИТ', group: '273', teacher: 'Власов А.А.', lesson: 'Технология распределенной обработки данных', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Кузьмина С.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Кузьмина С.В.', lesson: 'Английский язык 7 гр.', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '431', teacher: 'Богомолов А.С.', lesson: 'Теория автоматов 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '431', teacher: 'Богомолов А.С.', lesson: 'Теория автоматов 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '6', department: 'КНиИТ', group: '441', teacher: 'Власов А.А.', lesson: 'Разработка web-приложений', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '221, 241', teacher: 'Уколова М.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Карпец Е.В.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '251', teacher: 'Папшев С.В.', lesson: 'Формальные языки и грамматики', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '341', teacher: 'Огнева М.В.', lesson: 'НИР', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '211', teacher: 'Чернышова Г.Ю.', lesson: 'Дифференциальные уравнения', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '381', teacher: 'Постнова О.С.', lesson: 'Математические методы теории управления', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[1076, 1097], [1244, 1097], [1244, 778], [1076, 778], [1076, 1097]]], '313', '313',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Кузьмина С.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Кузьмина С.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '421', teacher: 'Белоконь М.В.', lesson: 'Распределение базы данных', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Карпец Е.В.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '221, 241', teacher: 'Уколова М.В.', lesson: 'Английский язык 7 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '211', teacher: 'Агафонова Н.Ю.', lesson: 'Теория вероятностей и математичсекая статистика', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '251', teacher: 'Агафонова Н.Ю.', lesson: 'Теория вероятностей и математичсекая статистика', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '481', teacher: 'Иванов А.С.', lesson: 'Интеллектуальные технологии и представление знаний', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '6', department: 'КНиИТ', group: '171', teacher: 'Тананко И.Е.', lesson: 'Методы оптимизации1 гр. Сети ЭВМ', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '431', teacher: 'Богомолов А.С.', lesson: 'Теория автоматов', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '381', teacher: 'Рогачко Е.С.', lesson: 'Анализ стохастических систем', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '173', teacher: 'Уколова М.В.', lesson: 'Деловой иностранный язык', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '173', teacher: 'Кальянов Л.В.', lesson: 'Инновационный менеджмент', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '173', teacher: 'Уколова М.В.', lesson: 'Деловой иностранный язык', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '173', teacher: 'Кальянов Л.В.', lesson: 'Инновационный менеджмент', type: 'пр.', parity: 'знам.' },
    { day: 'Среда', number: '6', department: 'КНиИТ', group: '293', teacher: 'Молчанов В.А.', lesson: 'Теоретическая информатика, кибернетика', type: 'лек.', parity: 'чис.' },
    { day: 'Среда', number: '6', department: 'КНиИТ', group: '171', teacher: 'Вешнева И.В.', lesson: 'Технологии построения микропроцессорной техники 2 гр. Анализ и синтез', type: 'лек.', parity: 'знам.'},
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '431', teacher: 'Жаркова А.В.', lesson: 'Методы и средства криптографической защиты информации', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '531', teacher: 'Иванов А.С.', lesson: 'Математические основы искусственного интеллекта', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '421', teacher: 'Дмитриев П.О.', lesson: 'Системы и сети передачи информации', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '431', teacher: 'Гераськин А.С.', lesson: 'Основы построения защищенных баз данных', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '421', teacher: 'Жаркова А.В.', lesson: 'Введение в криптографию', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '241', teacher: 'Рогачко Е.С.', lesson: 'Методы оптимизации в анализе данных', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[1247, 1097], [1458, 1097], [1458, 778], [1247, 778], [1247, 1097]]], '314 (лаборатория компьютерной безопасности)', '314',
    [{ day: 'Понедельник', number: '3', department: 'КНиИТ', group: '331', teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '331', teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '481', teacher: 'Гортинский А.В.', lesson: 'Программно-аппаратные средства обеспечения информационной безопасности 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '531', teacher: 'Бондарев Н.Н.', lesson: 'Техническая защита информации 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '331', teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '431', teacher: 'Кондратова Ю.Н.', lesson: 'Технологии программирования 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '431', teacher: 'Гортинский А.В.', lesson: 'Защита программ и данных 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '6', department: 'КНиИТ', group: '431', teacher: 'Гортинский А.В.', lesson: 'Защита программ и данных 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '241', teacher: 'Рогачко Е.С.', lesson: 'Методы оптимизации в анализе данных 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '431', teacher: 'Жаркова А.В.', lesson: 'Методы и средства криптографической защиты информации 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '331', teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '531', teacher: 'Гортинский А.В.', lesson: 'Программно-аппаратные средства обеспечения информационной безопасности 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '431', teacher: 'Гераськин А.С.', lesson: 'Основы построения защищенных баз данных 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '331', teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '311', teacher: 'Молчанов В.А.', lesson: 'Прикладная универсальная алгебра 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '421', teacher: 'Жаркова А.В.', lesson: 'Введение в криптографию 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '421', teacher: 'Жаркова А.В.', lesson: 'Введение в криптографию 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '1', department: 'КНиИТ', group: '431', teacher: 'Никитина А.С.', lesson: 'Теория псевдослучайных генераторов 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '431', teacher: 'Никитина А.С.', lesson: 'Основы построения защищенных баз данных 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '431', teacher: 'Никитина А.С.', lesson: 'Теория псевдослучайных генераторов 1 гр.', type: 'пр.', parity: '-'}]);

template_PolygonFeature([[[632, 631], [918, 631], [918, 373], [632, 373], [632, 631]]], '304', '304',
    [{ day: 'Понедельник', number: '2', department: 'КНиИТ', group: '151', teacher: 'Молчанов В.А.', lesson: 'Математическая логика и теория алгоритмов', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '111, 181', teacher: 'Молчанов В.А.', lesson: 'Математическая логика и теория алгоритмов', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '211, 251', teacher: 'Миронов С.В.', lesson: 'Компьютерная графика', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '231', teacher: 'Стрыгина С.В.', lesson: 'Основы права и антикоррупционного поведения', type: 'лек.', parity: 'чис.'},
    { day: 'Понедельник', number: '6', department: 'КНиИТ', group: '411, 421, 451, 441, 481', teacher: 'Сокиркина Л.И.', lesson: 'Межкультурная коммуникация (переводчики)', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '211, 251', teacher: 'Сафрончик М.И.', lesson: 'Структуры данных и алгоритмы', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '231', teacher: 'Чернышова Г.Ю.', lesson: 'Дискретная математика', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '331', teacher: 'Гортинский А.В.', lesson: 'Организационное и правовое обеспечение информационной безопасности', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '321', teacher: 'Лытикова Н.П.', lesson: 'Философия', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '131, 132', teacher: 'Разумовская Е.В.', lesson: 'Математический анализ', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '231', teacher: 'Разумовская Е.В.', lesson: 'Математический анализ', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '121, 181', teacher: 'Черноусова Е.М.', lesson: 'Информационные технологии и программирование', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '231', teacher: 'Разумовская Е.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '131, 132', teacher: 'Соломонов В.А.', lesson: 'История России', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '131', teacher: 'Хамутова М.В.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '131, 132', teacher: 'Соломонов В.А.', lesson: 'История России', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '211', teacher: 'Сафрончик М.И.', lesson: 'НИР', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '121', teacher: 'Лобов А.А.', lesson: 'Математическая логика и теория алгоритмов', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '6', department: 'КНиИТ', group: '341', teacher: 'Соломина Ю.Ю.', lesson: 'Технология разработки программного обеспечения', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '311, 351', teacher: 'Купцов П.В.', lesson: 'Параллельное и распределенное программирование', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '131, 132', teacher: 'Мещерякова О.В.', lesson: 'Аппаратные средства вычислительной техники', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[921, 631], [1163, 631], [1163, 373], [921, 373], [921, 631]]], '303', '303',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '251', teacher: 'Сафрончик М.И.', lesson: 'НИР', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '1', department: 'КНиИТ', group: '221', teacher: 'Станкевич Е.П.', lesson: 'НИР гр. САУ', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '311, 351', teacher: 'Иванова А.С.', lesson: 'Технологии программирования', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '221', teacher: 'Селифонова Е.И.', lesson: 'Безопасность жизнедеятельности', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '221', teacher: 'Селифонова Е.И.', lesson: 'Безопасность жизнедеятельности', type: 'пр.', parity: 'чис.'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '221', teacher: 'Кудрина Е.В.', lesson: 'Структуры данных и алгоритмы', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '221', teacher: 'Селифонова Е.И.', lesson: 'Безопасность жизнедеятельности', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '431', teacher: 'Кондратова Ю.Н.', lesson: 'Технологии программирования', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '331', teacher: 'Соловьёв В.М.', lesson: 'Операционные системы', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '131, 132', teacher: 'Кривобок В.В.', lesson: 'Алгебра', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '271', teacher: 'Тимофеева Н.Е.', lesson: 'Системное прикладное программное обеспечение', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '311, 351', teacher: 'Богомолов А.С.', lesson: 'Стандартизация программного обеспечения', type: 'лек.', parity: 'чис.' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '311, 351', teacher: 'Лытикова Н.П.', lesson: 'Философия', type: 'пр.', parity: 'знам.' },
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '141', teacher: 'Кабанова Л.В.', lesson: 'Разработка пользовательского интерфейса', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '341', teacher: 'Огнева М.В.', lesson: 'Машинное обучение и анализ данных', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '241', teacher: 'Огнева М.В.', lesson: 'Структуры и алгоритмы компьютерной обработки данных', type: 'лек.', parity: 'чис.' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '131, 132', teacher: 'Абросимов М.Б.', lesson: 'Введение в специальность', type: 'лек.', parity: 'знам.' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '211, 251', teacher: 'Папшев С.В.', lesson: 'Формальные языки и грамматики', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '321', teacher: 'Сагаева И.Д.', lesson: 'Формальные языки и грамматики', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '311, 351', teacher: 'Миронов С.В.', lesson: 'Языки программирования', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '241', teacher: 'Ефремова Н.В.', lesson: 'Основы медицинских знаний', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '241', teacher: 'Ефремова Н.В.', lesson: 'Основы медицинских знаний', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '231', teacher: 'Лысикова Н.П.', lesson: 'Философия', type: 'пр.', parity: 'чис.' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '341, 381', teacher: 'Лысикова Н.П.', lesson: 'Философия', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '231', teacher: 'Дмитриев П.О.', lesson: 'Компьютерные сети', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '221', teacher: 'Чернышова Г.Ю.', lesson: 'Дискретная математика', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '241', teacher: 'Кудрина Е.В.', lesson: 'Программирование на языке Java', type: 'лек.', parity: '-' },
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '351', teacher: 'Папшев С.В.', lesson: 'Проектирование архитектуры операционных систем', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[1166, 631], [1361, 631], [1361, 373], [1166, 373], [1166, 631]]], '302', '302',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '321', teacher: 'Портенко М.С.', lesson: 'Технологии программирования', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '531', teacher: 'Лобов А.А.', lesson: 'Программно-аппаратные средства обеспечения информационной безопасности', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '431', teacher: 'Лобов А.А.', lesson: 'Защита программ и данных', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '531', teacher: 'Ионов К.И.', lesson: 'Java программирование', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '6', department: 'КНиИТ', group: '271', teacher: '-', lesson: 'НИР', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '132', teacher: 'Тимофеев В.Г.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '221, 241', teacher: 'Исайкина М.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '481', teacher: 'Станкевич Е.П.', lesson: 'Моделирование телекоммуникационных систем и компьютерных сетей', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '441', teacher: 'Соловьёв В.М.', lesson: 'Администрирование информационных систем', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Исайкина М.А.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Чумакова А.Ю.', lesson: 'Английский язык 6 гр.', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '131', teacher: 'Разумовская Е.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '481', teacher: 'Матов О.Р.', lesson: 'Метрология, стандартизация и сертификация', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '531', teacher: 'Жижина М.В.', lesson: 'Психология и педагогика (2025.03.05 - 2025.03.31)', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '221, 241', teacher: 'Исайкина М.А.', lesson: 'Английский язык 6 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '211', teacher: 'Папшев С.В.', lesson: 'Формальные языки и грамматики', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '321', teacher: 'Сагаева И.Д.', lesson: 'Формальные языки и грамматики', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '273', teacher: 'Крючкова А.А.', lesson: 'Автоматизированное тестирование', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '6', department: 'КНиИТ', group: '531', teacher: 'Абросимов М.Б.', lesson: 'Методы оптимизации графовых систем', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '6', department: 'КНиИТ', group: '171', teacher: 'Андрейченко Д.К.', lesson: 'Программирование рапределенных систем 2 гр. Анализ и синтез', type: 'лек.', parity: 'знам.'},
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '132', teacher: 'Хамутова М.В.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '231', teacher: 'Жаркова А.В.', lesson: 'Ознакомительная практика', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '251', teacher: 'Сагаева И.Д.', lesson: 'Дискретная математика', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '7', department: 'КНиИТ', group: '171', teacher: 'Кирьяшкин В.В.', lesson: 'Современные операционные системы', type: 'лек.', parity: 'чис.' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '431', teacher: 'Слеповичев И.И.', lesson: 'Теория псевдослучайных генераторов', type: 'лек.', parity: '-'}]);

template_PolygonFeature([[[1364, 635], [1525, 635], [1525, 373], [1364, 373], [1364, 635]]], '301 (кафедра теоретических основ компьютерной <br> безопасности и криптографии)', '301',
    [{ day: 'Среда', number: '7', department: 'КНиИТ', group: '294', teacher: 'Молчанов В.А.', lesson: 'Математическая логика, алгебра и дискретная математика', type: 'лек.', parity: '-' },
     { day: 'Суббота', number: '2', department: 'КНиИТ', group: '292, 294, 494', teacher: 'Абросимов М.Б.', lesson: 'Научно-исследовательская деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[1528, 635], [1815, 635], [1815, 373], [1528, 373], [1528, 635]]], '333', '333',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '121', teacher: 'Крусс Ю.С.', lesson: 'Алгебра и геометрия', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '121', teacher: 'Лобов А.А.', lesson: 'Математическая логика и теория алгоритмов', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '231', teacher: 'Стрыгина С.В.', lesson: 'Основы права и антикоррупционного поведения', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '411, 451, 441', teacher: 'Кабанова Л.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных системах', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '241', teacher: 'Кондратова Ю.Н.', lesson: 'Использование методов машинного обучения в УПД (цифровая кафедра)', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '211, 251', teacher: 'Агафонова Н.Ю.', lesson: 'Теория вероятностей и математическая статистика', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '121', teacher: 'Матвеева Ю.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '141', teacher: 'Матвеева Ю.В.', lesson: 'Математический анализ', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '321, 381', teacher: 'Кондратова Ю.Н.', lesson: 'Использование методов машинного обучения в УПД (цифровая кафедра)', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '331', teacher: 'Сафрончик М.И.', lesson: 'Системы управления базами данных', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '221', teacher: 'Сергеева Н.В.', lesson: 'Теория вероятностей, математическая статистика и случайные процессы', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '411, 451', teacher: 'Савинов А.О.', lesson: 'Интеллектуальные системы и технологии', type: 'лек.', parity: '-' },
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '481', teacher: 'Матов О.Р.', lesson: 'Метрология, стандартизация и сертификация', type: 'пр.', parity: 'чис.' },
    { day: 'Среда', number: '6', department: 'КНиИТ', group: '171, 173', teacher: 'Крючкова А.А.', lesson: 'Управление проектами 1 гр. Сети ЭВМ', type: 'лек.', parity: 'знам.' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '121', teacher: 'Барков П.В.', lesson: 'Физика', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '151', teacher: 'Бредихин Д.А.', lesson: 'Алгебра и геометрия', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '241', teacher: 'Батраева И.А.', lesson: 'Реляционные базы данных', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '341', teacher: 'Чистопольская Е.В.', lesson: 'Управление ИТ-проектами (цифровая кафедра)', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '311, 351', teacher: 'Чистопольская Е.В.', lesson: 'Управление ИТ-проектами (цифровая кафедра)', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '341', teacher: 'Андрейченко Д.К.', lesson: 'Параллельное и распределенное программирование', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '6', department: 'КНиИТ', group: '321', teacher: 'Кальянов Л.В.', lesson: 'НИР', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '341', teacher: 'Щуров Д.И.', lesson: 'Java-программирование', type: 'лек.', parity: 'чис.' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '151', teacher: 'Хамутова М.В.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'чис.' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '111', teacher: 'Хамутова М.В.', lesson: 'Информационные технологии и программирование', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '211, 251', teacher: 'Сагаева И.Д.', lesson: 'Дискретная математика', type: 'лек.', parity: '-' },
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '221', teacher: 'Трунов А.А.', lesson: 'НИР', type: 'пр.', parity: 'знам.' }]);

// аудитории правого крыла
template_PolygonFeature([[[1818, 635],[1995, 635],[1995, 373],[1818, 373],[1818, 635]]], '331', '331');
template_PolygonFeature([[[1998, 635],[2230, 635],[2230, 373],[1998, 373],[1998, 635]]], '330', '330');

template_PolygonFeature([[[2233, 635], [2504, 635], [2504, 373], [2233, 373], [2233, 635]]], '329', '329',
    [{ day: 'Вторник', number: '4', department: 'КНиИТ', group: '241', teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД 3 гр. (цифровая кафедра)', type: 'пр.', parity: '-'},    
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '431', teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД (цифровая кафедра)', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '5', department: 'КНиИТ', group: '171', teacher: 'Булавина Е.В.', lesson: 'Методика преподавания компьютерных наук', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '321', teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД 1 гр. (цифровая кафедра)', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '321', teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД 2 гр. (цифровая кафедра)', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '4', department: 'КНиИТ', group: '381', teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД (цифровая кафедра)', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[2507, 635],[2749, 635],[2749, 373],[2507, 373],[2507, 635]]], '328', '328', 
    [{ day: 'Вторник', number: '4', department: 'КНиИТ', group: '241', teacher: 'Лапшева Е.Е.', lesson: 'Библиотеки машинного и глубокого обучения в ПД 1,2 гр. (цифоровая кафедра)', type: 'пр.', parity: '-'},
]);

template_PolygonFeature([[[1915, 1097],[2163, 1097],[2163, 778],[1915, 778],[1915, 1097]]], '315', '315');
template_PolygonFeature([[[2166, 1097],[2300, 1097],[2300, 778],[2166, 778],[2166, 1097]]], '316 (учебная лаборатория прикладной психологии образования)', '316');
template_PolygonFeature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '317', '317');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '327 (кафедры <br> коррекционной педагогики, <br> технологического <br> образования)', '327');

template_PolygonFeature([[[2894, 568],[3193, 568],[3193, 929],[2894, 929],[2894, 568]]], '326 (кафедра социальной <br> психологии образования <br> и развития)', '326');

template_PolygonFeature([[[2894, 1318],[3193, 1318],[3193, 932],[2894, 932],[2894, 1318]]], '325 (кафедры начального <br> языкового и литературного, <br> естественно-математтического <br> образований)', '325');
template_PolygonFeature([[[2894, 1550], [3310, 1550], [3310, 1320], [2894, 1320], [2894, 1550]]], '323/324', '324');

template_PolygonFeature([[[2894, 1628], [3193, 1628], [3193, 1552], [2894, 1552], [2894, 1628]]], '322', '322',
    [{ day: 'Четверг', number: '5', department: 'КНиИТ', group: '393', teacher: 'Сидоров С.П.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' },]);

template_PolygonFeature([[[2894, 1714],[3193, 1714],[3193, 1630],[2894, 1630],[2894, 1714]]], '321', '321');
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

function fill_filter() {
    const filterFields = ['department', 'group', 'teacher', 'lesson', 'type', 'parity'];
    const allSchedules = [];

    vectorSource.getFeatures().forEach(feature => {
        const schedule = feature.get('schedule');
        if (schedule && Array.isArray(schedule)) {
            schedule.forEach(item => allSchedules.push(item));
        }
    });

    filterFields.forEach(field => {
        const selectElement = document.getElementById(`filter-${field}`);
        const uniqueValues = new Set();

        allSchedules.forEach(item => {
            if (item && item[field]) {
                uniqueValues.add(item[field]);
            }
        });

        uniqueValues.forEach(value => {
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

// Обработчик для кнопки "Применить фильтры"
applyFiltersButton.addEventListener('click', function () {
    apply_filter();
});

function apply_filter() {
    // Собираем значения фильтров из формы
    const filters = getFilters();

    // Получаем description и schedule объекта, который сейчас открыт
    if (openModal) {
        const description = openModal.id.replace('schedule-modal-', '');
        const feature = polygonFeatures.get(description);
        const schedule = feature.get('schedule');

        // Закрываем старое окно
        document.body.removeChild(openModal);

        // Открываем новое окно с фильтрами
        openModal = showScheduleModal(description, schedule, filters);
    }
}

function getFilters() {
    const filters = {};

    // Собираем значения фильтров из формы
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
    if (!schedule || schedule.length === 0) {
        return []; // Если расписания нет, возвращаем пустой массив
    }

    return schedule.filter(item => {
        for (const filterName in filters) {
            if (item[filterName] !== filters[filterName]) {
                return false;
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

});