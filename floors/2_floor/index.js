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
template_PolygonFeature([[[178, 1320],[475, 1320],[475, 950],[178, 950],[178, 1320]]], '207 (кафедра философии культуры и культорологии, центр Артефакт)', '207', 
    [{ day: 'Понедельник', number: '2', department: ['Философский'], group: ['331'], teacher: 'Шиндина О.В.', lesson: 'История культуры повседневности', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Философский'], group: ['232'], teacher: 'Листвина Е.В.', lesson: 'Социальная и культурная антропология', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Философский'], group: ['232'], teacher: 'Листвина Е.В.', lesson: 'Социальная и культурная антропология', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['Философский'], group: ['232'], teacher: 'Муштей Н.А.', lesson: 'Педагогическая парадигма культурологии', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '6', department: ['Философский'], group: ['232'], teacher: 'Муштей Н.А.', lesson: 'Педагогическая парадигма культурологии', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['Философский'], group: ['281'], teacher: 'Листвина Е.В.', lesson: 'Теория и история культуры, искусства', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['Философский'], group: ['213'], teacher: 'Листвина Е.В.', lesson: 'Культурные ландшафты цифрового общества', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['Философский'], group: ['331'], teacher: 'Лысикова Н.П.', lesson: 'Проблемы современной культурологии', type: 'лек.', parity: 'знам.'},
    { day: 'Вторник', number: '4', department: ['Философский'], group: ['331'], teacher: 'Лысикова Н.П.', lesson: 'Проблемы современной культорологии', type: 'лек.', parity: 'знам.'},
    { day: 'Вторник', number: '6', department: ['Философский'], group: ['232'], teacher: 'Муштей Н.А.', lesson: 'Социальная и культурная антропология', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '7', department: ['Философский'], group: ['232'], teacher: 'Муштей Н.А.', lesson: 'Социальная и культурная антропология', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['331'], teacher: 'Шиндина О.В.', lesson: 'Мифология и фольклор', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['331'], teacher: 'Шиндина О.В.', lesson: 'Мифология и фольклор', type: 'лек.', parity: 'чис.'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['331'], teacher: 'Шиндина О.В.', lesson: 'История искусств', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '6', department: ['Философский'], group: ['232'], teacher: 'Муштей Н.А.', lesson: 'Инновационные технологии в педагогическом образовании', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '7', department: ['Философский'], group: ['232'], teacher: 'Муштей Н.А.', lesson: 'Инновационные технологии в педагогическом образовании', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['Философский'], group: ['331'], teacher: 'Царёва Т.Б.', lesson: 'Теория культуры', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['431'], teacher: 'Гализдра А.С.', lesson: 'Межкультурные коммуникации', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['331'], teacher: 'Листвина Е.В.', lesson: 'Теория культуры', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['431'], teacher: 'Гализдра А.С.', lesson: 'Межкультурные коммуникации', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '6', department: ['Философский'], group: ['232'], teacher: 'Муштей Н.А.', lesson: 'Инновационные технологии в педагогическом образовании', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '7', department: ['Философский'], group: ['232'], teacher: 'Муштей Н.А.', lesson: 'Инновационные технологии в педагогическом образовании', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Философский'], group: ['431'], teacher: 'Гализдра А.С.', lesson: 'Деловые коммуникации', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Философский'], group: ['431'], teacher: 'Гализдра А.С.', lesson: 'Деловые коммуникации', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '5', department: ['Философский'], group: ['431'], teacher: 'Зеленкина А.С.', lesson: 'Эстетика', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '6', department: ['Философский'], group: ['431'], teacher: 'Зеленкина А.С.', lesson: 'Эстетика', type: 'пр.', parity: '-'}]);

template_PolygonFeature([[[178, 947],[475, 947],[475, 832],[178, 832],[178, 947]]], '206 (совет студентов философского факультета)', '206');
template_PolygonFeature([[[178, 828],[475, 828],[475, 602],[178, 602],[178, 828]]], '205 (кафедра теоретической и социальной философии, <br> учебно-научная лаборатория ЦИФРА)', '205');

template_PolygonFeature([[[178, 600], [632, 600], [632, 373], [510, 373], [510, 250], [178, 250], [178, 600]]], '204 (деканат философского факультета)', '204',
    [{ day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['241'], teacher: 'Коротковская Е.И.', lesson: 'Основы экономики и финансовой грамотности', type: 'пр.', parity: 'знам.'}]);

template_PolygonFeature([[[886, 1097],[1073, 1097],[1073, 778],[886, 778],[886, 1097]]], '209', '209', 
    [{ day: 'Понедельник', number: '1', department: ['Философский'], group: ['331'], teacher: 'Шиндина О.В.', lesson: 'История культуры повседневности', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['Философский'], group: ['211'], teacher: 'Иванов А.В.', lesson: 'Рискология', type: 'лек.', parity: 'чис.'},
    { day: 'Понедельник', number: '2', department: ['Философский'], group: ['211'], teacher: 'Иванов А.В.', lesson: 'Рискология', type: 'пр.', parity: 'знам.'},
    { day: 'Понедельник', number: '3', department: ['Философский'], group: ['431'], teacher: 'Шиндина О.В.', lesson: 'Охрана культурного наследия', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Философский'], group: ['431'], teacher: 'Шиндина О.В.', lesson: 'Охрана культурного наследия', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['Философский'], group: ['431'], teacher: 'Шиндина О.В.', lesson: 'Охрана культурного наследия', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '6', department: ['Философский'], group: ['431'], teacher: 'Муштей Н.А.', lesson: 'Эстетика', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['Философский'], group: ['111'], teacher: 'Малкина С.М.', lesson: 'История античной философии', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['Философский'], group: ['111'], teacher: 'Малкина С.М.', lesson: 'История античной философии', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['Философский'], group: ['331'], teacher: 'Гализдра А.С.', lesson: 'Методика преподавания истории культуры', type: 'лек.', parity: 'чис.'},
    { day: 'Вторник', number: '3', department: ['Философский'], group: ['341', '351'], teacher: 'Ручин В.А.', lesson: 'Русская патрология', type: 'лек.', parity: 'чис.'},
    { day: 'Вторник', number: '3', department: ['Философский'], group: ['341', '351'], teacher: 'Ручин В.А.', lesson: 'Русская патрология', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '4', department: ['Философский'], group: ['411'], teacher: 'Богатов М.А.', lesson: 'История современной западной философии', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Философский'], group: ['411'], teacher: 'Богатов М.А.', lesson: 'История современной западной философии', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '6', department: ['Философский'], group: ['212'], teacher: 'Понукалин А.А.', lesson: 'Психология делового общения', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '7', department: ['Философский'], group: ['212'], teacher: 'Понукалин А.А.', lesson: 'Психология делового общения', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: ['Философский'], group: ['211'], teacher: 'Мозжилин С.И.', lesson: 'Онтология и теория познания', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['Философский'], group: ['211'], teacher: 'Романовская Е.В.', lesson: 'История философии средних веков и Возрождения', type: 'лек.', parity: 'чис.'},
    { day: 'Среда', number: '2', department: ['Философский'], group: ['211'], teacher: 'Мозжилин С.И.', lesson: 'Онтология и теория познания', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['111'], teacher: 'Богатов М.А.', lesson: 'Логика', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['111'], teacher: 'Богатов М.А.', lesson: 'Логика', type: 'лек.', parity: 'чис.'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['111'], teacher: 'Разумовская Е.А.', lesson: 'Латинский язык', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['111'], teacher: 'Разумовская Е.А.', lesson: 'Латинский язык', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '6', department: ['Философский'], group: ['141'], teacher: 'Разумовская Е.А.', lesson: 'Древнегреческий язык', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '1', department: ['Философский'], group: ['111'], teacher: 'Малкина С.М.', lesson: 'Онтология и теория познания', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['Философский'], group: ['111'], teacher: 'Малкина С.М.', lesson: 'Онтология и теория познания', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['111'], teacher: 'Гоголь С.С.', lesson: 'Социальная психология', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['112'], teacher: 'Данилов С.А.', lesson: 'Научно-методологический семинар по проблемам социальной философии', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['112', '212'], teacher: 'Устьянцев В.Б.', lesson: 'Научно-исследовательская работа', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['441', '451'], teacher: 'Данилов С.А.', lesson: 'Религиозные организации как субъекты федеральной и региональной политики', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '6', department: ['Философский'], group: ['441', '451'], teacher: 'Данилов С.А.', lesson: 'Религиозные организации как субъекты федеральной и региональной политики', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Философский'], group: ['151'], teacher: 'Разумовская Е.А.', lesson: 'Древнегреческий язык', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Философский'], group: ['341'], teacher: 'Разумовская Е.А.', lesson: 'Латинский язык', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '5', department: ['Философский'], group: ['351'], teacher: 'Разумовская Е.А.', lesson: 'Латинский язык', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '2', department: ['Философский'], group: ['331'], teacher: 'Гализдра А.С.', lesson: 'Профессиональная этика', type: 'лек.', parity: '-'},
    { day: 'Суббота', number: '3', department: ['Философский'], group: ['331'], teacher: 'Гализдра А.С.', lesson: 'Профессиональная этика', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '4', department: ['Философский'], group: ['112', '113'], teacher: 'Ломако О.М.', lesson: 'Методика преподавания философских дисциплин', type: 'лек.', parity: '-'},
    { day: 'Суббота', number: '5', department: ['Философский'], group: ['212'], teacher: 'Ломако О.М.', lesson: 'Социальная онтология культуры', type: 'лек.', parity: '-'},]);

template_PolygonFeature([[[1076, 1097],[1244, 1097],[1244, 778],[1076, 778],[1076, 1097]]], '210', '210');

template_PolygonFeature([[[1247, 1097],[1348, 1097],[1348, 778],[1247, 778],[1247, 1097]]], '211 (кафедра теологии и религиоведения)', '211', 
    [{ day: 'Понедельник', number: '3', department: ['Философский'], group: ['411'], teacher: 'Дуплинская Ю.М.', lesson: 'Философия познания', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Философский'], group: ['411'], teacher: 'Дуплинская Ю.М.', lesson: 'Философия познания', type: 'пр.', parity: '-'}]);

template_PolygonFeature([[[1351, 1097],[1458, 1097],[1458, 778],[1351, 778],[1351, 1097]]], '212 (заведующий кафедрой теологии и религиоведения)', '212');

template_PolygonFeature([[[632, 631],[918, 631],[918, 373],[632, 373],[632, 631]]], '203 (лекционная аудитория им. А.Ф. Аскина)', '203', 
    [{ day: 'Понедельник', number: '2', department: ['Философский'], group: ['142', '152'], teacher: 'Кутырева И.В.', lesson: 'Стратегии государственной национальной и религиозной политики', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Философский'], group: ['211', '241', '251'], teacher: 'Чулисова Ю.А.', lesson: 'Основы права и антикоррупционного поведения', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['Философский'], group: ['211', '241', '251'], teacher: 'Чулисова Ю.А.', lesson: 'Основы права и антикоррупционного поведения', type: 'лек.', parity: 'знам.'},
    { day: 'Понедельник', number: '5', department: ['Философский'], group: ['212'], teacher: 'Митрохин В.А.', lesson: 'Политическая социология', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['Философский'], group: ['241', '251'], teacher: 'Галямичев А.Н.', lesson: 'История Византии', type: 'лек.', parity: 'чис.'},
    { day: 'Вторник', number: '2', department: ['Философский'], group: ['241', '251'], teacher: 'Галямичев А.Н.', lesson: 'История Византии', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '3', department: ['Философский'], group: ['241'], teacher: 'Гапоненков А.А.', lesson: 'Право и власть в Новом Завете', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['Философский'], group: ['251'], teacher: 'Гапоненков А.А.', lesson: 'Священное писание в Новом Завете', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['Философский'], group: ['241'], teacher: 'Гапоненков А.А.', lesson: 'Право и власть в Новом Завете', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['Философский'], group: ['251'], teacher: 'Гапоненков А.А.', lesson: 'Священное писание в Новом Завете', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['Философский'], group: ['151'], teacher: 'Лобанова Е.С.', lesson: 'Священное писание Нового Завета', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['141'], teacher: 'Гапоненков А.А.', lesson: 'Право и власть в Новом Завете', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['151'], teacher: 'Гапоненков А.А.', lesson: 'Священное писание Нового Завета', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['331'], teacher: 'Шиндина О.В.', lesson: 'История искусств', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '1', department: ['Философский'], group: ['431'], teacher: 'Гализдра А.С.', lesson: 'Деловые коммуникации', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['Философский'], group: ['431'], teacher: 'Гализдра А.С.', lesson: 'Деловые коммуникации', type: 'лек.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['311', '331', '341', '351'], teacher: 'Забоев М.В.', lesson: 'Введение в ERP-системы', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['311'], teacher: 'Романовская Е.В.', lesson: 'Методика преподавания обществознания', type: 'лек.', parity: 'знам.'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['311'], teacher: 'Романовская Е.В.', lesson: 'Методика преподавания обществознания', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['341', '351'], teacher: 'Гущин Я.Д.', lesson: 'Культурообразующие религии современной России', type: 'пр.', parity: 'чис.'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['341', '351'], teacher: 'Гущин Я.Д.', lesson: 'Культурообразующие религии современной России', type: 'чис.', parity: 'знам.'},
    { day: 'Пятница', number: '2', department: ['Философский'], group: ['311', '331', '341', '351', '411', '431', '441', '451'], teacher: 'Кабанова Л.В.', lesson: '1С Предприятие для решения задач в профессиональной деятельности', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Философский'], group: ['441', '451'], teacher: 'Иванов Е.М.', lesson: 'Новые религиозные движения', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Философский'], group: ['441', '451'], teacher: 'Иванов Е.М.', lesson: 'Новые религиозные движения', type: 'пр.', parity: '-'},
    { day: 'Суббота', number: '4', department: ['Философский'], group: ['331'], teacher: 'Гализдра А.С.', lesson: 'Методика преподавания истории культуры', type: 'лек.', parity: '-'},]);

template_PolygonFeature([[[921, 631],[1163, 631],[1163, 373],[921, 373],[921, 631]]], '202 (лекционная аудитория им. С.Л. Франка)', '202',
    [{ day: 'Понедельник', number: '2', department: ['Философский'], group: ['111', '141', '151'], teacher: 'Мякшев А.П.', lesson: 'История России', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['Философский'], group: ['111', '141', '151'], teacher: 'Мякшев А.П.', lesson: 'История России', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '1', department: ['Философский'], group: ['331'], teacher: 'Шиндина О.В.', lesson: 'История культуры Нового и Новейшего времени', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['Философский'], group: ['331'], teacher: 'Шиндина О.В.', lesson: 'История культуры Нового и Новейшего времени', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['Философский'], group: ['431'], teacher: 'Шиндина О.В.', lesson: 'Визуальная культура в эпоху цифровизации', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['Философский'], group: ['431'], teacher: 'Шиндина О.В.', lesson: 'Визуальная культура в эпоху цифровизации', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Философский'], group: ['431'], teacher: 'Шиндина О.В.', lesson: 'Визуальная культура в эпоху цифровизации', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Философский'], group: ['142', '152'], teacher: 'Гущин Я.Д.', lesson: 'Проектная и организационная деятельность в цифровой среде', type: 'пр.', parity: 'чис.'},
    { day: 'Вторник', number: '5', department: ['Философский'], group: ['142', '152'], teacher: 'Гущин Я.Д.', lesson: 'Проектная и организационная деятельность в цифровой среде', type: 'лек.', parity: 'знам.'},
    { day: 'Вторник', number: '6', department: ['Философский'], group: ['311', '331', '341', '351', '411', '431', '441', '451'], teacher: 'Батраева И.А.', lesson: 'Введение в ERP-системы', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '7', department: ['Философский'], group: ['411', '431', '441', '451'], teacher: 'Батраева И.А.', lesson: 'Введение в ERP-системы', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '1', department: ['Философский'], group: ['431'], teacher: 'Шиндина О.В.', lesson: 'История народного костюма', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '2', department: ['Философский'], group: ['431'], teacher: 'Шиндина О.В.', lesson: 'История народного костюма', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['211'], teacher: 'Романовская Е.В.', lesson: 'История философии средних веков и Возрождения', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['141', '151'], teacher: 'Иванова Д.Н.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['141', '151'], teacher: 'Иванова Д.Н.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '6', department: ['Философский'], group: ['111'], teacher: 'Фенин К.В.', lesson: 'Основы экономики и финансовой грамотности', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '6', department: ['Философский'], group: ['111'], teacher: 'Фенин К.В.', lesson: 'Основы экономики и финансовой грамотности', type: 'лек.', parity: 'знам.'},
    { day: 'Четверг', number: '2', department: ['Философский'], group: ['211', '241', '251'], teacher: 'Кубракова Н.А.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['211', '241', '251'], teacher: 'Кубракова Н.А.', lesson: 'Английский язык', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['Философский'], group: ['341', '351'], teacher: 'Шаткин М.А.', lesson: 'Методика проведения научного исследования', type: 'пр.', parity: 'знам.'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['311'], teacher: 'Пилюгина С.А.', lesson: 'Педагогика', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['311'], teacher: 'Пилюгина С.А.', lesson: 'Педагогика', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '2', department: ['Философский'], group: ['141'], teacher: 'Иванов Е.М.', lesson: 'Государство и общество в Ветхом Завете', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['Философский'], group: ['151'], teacher: 'Иванов Е.М.', lesson: 'Священное писание Ветхого Завета', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Философский'], group: ['141'], teacher: 'Лобанова Е.С.', lesson: 'Государство и общество в Новом Завете', type: 'пр.', parity: '-'}]);

template_PolygonFeature([[[1166, 631],[1361, 631],[1361, 373],[1166, 373],[1166, 631]]], '201', '201',
    [{ day: 'Понедельник', number: '1', department: ['Философский'], group: ['242', '252'], teacher: 'Листвина Е.В.', lesson: 'Традиционные религии в межкультурных коммуникациях', type: 'лек.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['Философский'], group: ['242', '252'], teacher: 'Листвина Е.В.', lesson: 'Традиционные религии в межкультурных коммуникациях', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['Философский'], group: ['241', '251'], teacher: 'Белоконь М.В.', lesson: 'Введение в информационные технологии', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['Философский'], group: ['242', '252'], teacher: 'Данилов С.А.', lesson: 'Риски и перспективы реализации грантовых проектов', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['Философский'], group: ['242', '252'], teacher: 'Данилов С.А.', lesson: 'Риски и перспективы реализации грантовых проектов', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['Философский'], group: ['351'], teacher: 'Каткова М.В.', lesson: 'Теория и история церковного искусства', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['Философский'], group: ['351'], teacher: 'Каткова М.В.', lesson: 'Теория и история церковного искусства', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['Философский'], group: ['241'], teacher: 'Иванов Е.М.', lesson: 'История зарубежного и отечественного религиоведения', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['341', '351'], teacher: 'Мясникова Л.В.', lesson: 'Психолого-педагогические основы образовательной деятельности, включая обучение, воспитание и развитие детей с особыми образовательными потребностями', type: 'лек.', parity: 'чис.'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['341', '351'], teacher: 'Мясникова Л.В.', lesson: 'Психолого-педагогические основы образовательной деятельности, включая обучение, воспитание и развитие детей с особыми образовательными потребностями', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '3', department: ['Философский'], group: ['241'], teacher: 'Иванов Е.М.', lesson: 'История зарубежного и отечественного религиоведения', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '4', department: ['Философский'], group: ['211'], teacher: 'Белоконь М.В.', lesson: 'Введение в информационные технологии ч.2', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['112', '113'], teacher: 'Дуплинская Ю.М.', lesson: 'Современные проблемы философии', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '6', department: ['Философский'], group: ['112', '113'], teacher: 'Дуплинская Ю.М.', lesson: 'Современные проблемы философии', type: 'лек.', parity: 'чис.'},
    { day: 'Среда', number: '5', department: ['Философский'], group: ['242'], teacher: 'Косенко Н.Е.', lesson: 'Религия и политика', type: 'лек.', parity: 'знам.'},
    { day: 'Среда', number: '6', department: ['Философский'], group: ['242'], teacher: 'Косенко Н.Е.', lesson: 'Религия и политика', type: 'пр.', parity: 'знам.'},
    { day: 'Среда', number: '7', department: ['Философский'], group: ['112','113'], teacher: 'Дуплинская Ю.М.', lesson: 'Современные проблемы философии', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '1', department: ['Философский'], group: ['411'], teacher: 'Иванов А.В.', lesson: 'Этика', type: 'лек.', parity: 'чис.'},
    { day: 'Четверг', number: '2', department: ['Философский'], group: ['411'], teacher: 'Иванов А.В.', lesson: 'Этика', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '3', department: ['Философский'], group: ['341', '351'], teacher: 'Шаткин М.А.', lesson: 'Методика проведения научного исследования', type: 'лек.', parity: 'знам.'},
    { day: 'Четверг', number: '5', department: ['Философский'], group: ['232'], teacher: 'Кабанова Л.В.', lesson: 'Новые информационные технологии', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['Философский'], group: ['211', '311', '411'], teacher: 'Данилов С.А.', lesson: 'Теоретико-методологический семинар', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['Философский'], group: ['151'], teacher: 'Лобанова Е.С.', lesson: 'Священное писание Ветхого Завета', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '5', department: ['Философский'], group: ['242', '252'], teacher: 'Орлов М.О.', lesson: 'Основы написания выпускной квалификационной работы (с 16:30)', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '6', department: ['Философский'], group: ['242', '252'], teacher: 'Орлов М.О.', lesson: 'Основы написания выпускной квалификационной работы', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '6', department: ['Философский'], group: ['191'], teacher: 'Орлов М.О.', lesson: 'Практикум по оформлению научных работ', type: 'пр.', parity: '-'},]);

// аудитории правого крыла
template_PolygonFeature([[[1998, 635], [2230, 635], [2230, 373], [1998, 373], [1998, 635]]], '230 (лаборатория аудиовизуальных средств обучения, <br> компьютерный класс)', '230',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['211', '231', '251'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['331', '311', '321', '341', '351', '381', '321', '311', '312', '321', '322', '341'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['431', '441', '421', '411', '451', '421', '411', '412', '421', '422'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['КНиИТ', 'ФМиЕНД', 'Экономическая'], group: ['121', '141', '181', '121', '111', '112', '121', '141'], teacher: 'Косарева C.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['221', '241', '221', '211', '212', '221', '222', '241'], teacher: 'Косарева C.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['321'], teacher: 'Портенко М.С.', lesson: 'Технологии программирования 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['КНиИТ'], group: ['311'], teacher: 'Черноусова Е.М.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['211', '231', '251'], teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Крючкова А.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['431', '441', '421', '411', '451', '421', '411', '412', '421', '422'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['331', '311', '321', '341', '351', '381', '321', '311', '312', '321', '322', '341'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: ['КНиИТ'], group: ['381'], teacher: 'Рогачко Е.С.', lesson: 'Анализ стохастических систем', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '6', department: ['КНиИТ'], group: ['381'], teacher: 'Рогачко Е.С.', lesson: 'НИР', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '1', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['221', '241', '221', '211', '212', '221', '222', '241'], teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['121', '141', '181', '121', '111', '112', '121', '141'], teacher: 'Уколова М.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['481'], teacher: 'Рогачко Е.С.', lesson: 'Модели и методы теории массового обслуживания', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '6', department: ['ФМиЕНД'], group: ['220'], teacher: 'Огнева М.В.', lesson: 'Методика обучения информатике одаренных детей, подростков и молодёжи', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '7', department: ['КНиИТ'], group: ['271'], teacher: 'Тананко И.Е.', lesson: 'Моделирование информационно-вычислительных сетей 3 гр. Комп.модел.систем', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '1', department: ['ФМиЕНД'], group: ['421'], teacher: 'Кондратова Ю.Н.', lesson: 'Преподавание машинного обучения в образовательной организации (с 21.02)', type: 'лаб.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['331'], teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '6', department: ['ФМиЕНД'], group: ['220'], teacher: 'Колесников И.С.', lesson: 'Использование инновационных педагогических технологий в современной образовательной среде', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '6', department: ['ФМиЕНД'], group: ['220'], teacher: 'Колесников И.С.', lesson: 'Использование инновационных педагогических технологий в современной образовательной среде', type: 'лек.', parity: 'знам.'},
    { day: 'Суббота', number: '2', department: ['ФМиЕНД'], group: ['111'], teacher: 'Костович Д.В.', lesson: 'Информационные технологии в педагогическом образовании', type: 'лек.', parity: 'чис.'},
    { day: 'Суббота', number: '2', department: ['ФМиЕНД'], group: ['111'], teacher: 'Костович Д.В.', lesson: 'Информационные технологии в педагогическом образовании', type: 'пр.', parity: '-'}]);

template_PolygonFeature([[[2233, 635], [2504, 635], [2504, 373], [2233, 373], [2233, 635]]], '229 (лаборатория информационных <br> технологий 2, компьютерный класс)', '229',
    [{ day: 'Понедельник', number: '4', department: ['ФМиЕНД'], group: ['120'], teacher: 'Вешнева И.В.', lesson: 'Методические системы обучения информатике', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['ФМиЕНД'], group: ['331'], teacher: 'Векслер В.А.', lesson: 'Интеллектуальный анализ образовательных данных и учебная аналитика (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['ФМиЕНД'], group: ['321'], teacher: 'Векслер В.А.', lesson: 'Теория и методика обучения информатике', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['ФМиЕНД'], group: ['411', '441'], teacher: 'Векслер В.А.', lesson: 'Интеллектуальный анализ образовательных данных и учебная аналитика (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['ФМиЕНД'], group: ['341'], teacher: 'Векслер В.А.', lesson: 'Интеллектуальный анализ образовательных данных и учебная аналитика (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Вторник', number: '6', department: ['ФМиЕНД'], group: ['311'], teacher: 'Векслер В.А.', lesson: 'Интеллектуальный анализ образовательных данных и учебная аналитика (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Среда', number: '1', department: ['ФМиЕНД'], group: ['311'], teacher: 'Литвинова О.А.', lesson: 'Управление цифровой трансформацией образования', type: 'лаб.', parity: '-'},
    { day: 'Среда', number: '2', department: ['ФМиЕНД'], group: ['331'], teacher: 'Литвинова О.А.', lesson: 'Управление цифровой трансформацией образования (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['241'], teacher: 'Рогачко Е.С.', lesson: 'Методы оптимизации в анализе данных 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: ['ФМиЕНД'], group: ['321'], teacher: 'Старко Е.С.', lesson: 'Основы научной и проектной деятельности в организации общего образования', type: 'пр.', parity: '-'},]);

template_PolygonFeature([[[2507, 635],[2749, 635],[2749, 373],[2507, 373],[2507, 635]]], '228 (лаборатория информационных <br> технологий 1, компьютерный класс)', '228', 
    [{ day: 'Понедельник', number: '2', department: ['ФМиЕНД'], group: ['321'], teacher: 'Александрова Н.А.', lesson: 'Управление цифровой трансформацией образования (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['ФМиЕНД'], group: ['321'], teacher: 'Александрова Н.А.', lesson: 'Интеллектуальный анализ образовательных данных и учебная аналитика (цифровая кафедра)', type: 'лаб.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['ФМиЕНД'], group: ['321'], teacher: 'Векслер В.А.', lesson: 'Теория и методика обучения информатике', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '1', department: ['ФМиЕНД'], group: ['221'], teacher: 'Старко Е.С.', lesson: 'Обучение детей и подростков с особыми образовательными потребностями', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: ['ФМиЕНД'], group: ['251'], teacher: 'Старко Е.С.', lesson: 'Информационные технологии в педагогическом образовании', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['ФМиЕНД'], group: ['252'], teacher: 'Векслер В.А.', lesson: 'Информационные технологии в педагогическом образовании', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['ФМиЕНД'], group: ['121'], teacher: 'Векслер В.А.', lesson: 'Компьютерная графика', type: 'лаб.', parity: '-'},
    { day: 'Среда', number: '5', department: ['ФМиЕНД'], group: ['221'], teacher: 'Векслер В.А.', lesson: 'Теория и методика обучения информатике', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '2', department: ['ФМиЕНД'], group: ['321'], teacher: 'Векслер В.А.', lesson: 'Компьютерное моделирование и пакеты прикладных программ', type: 'лаб.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['ФМиЕНД'], group: ['421'], teacher: 'Векслер В.А.', lesson: 'Цифровая образовательная среда (с 21.02)', type: 'лаб.', parity: 'чис.'},
    { day: 'Пятница', number: '3', department: ['ФМиЕНД'], group: ['421'], teacher: 'Векслер В.А.', lesson: 'Цифровая образовательная среда (с 21.02)', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '4', department: ['ФМиЕНД'], group: ['421'], teacher: 'Векслер В.А.', lesson: 'Преподавание робототехники в образовательной организации (с 21.02)', type: 'лаб.', parity: 'чис.'},
    { day: 'Пятница', number: '4', department: ['ФМиЕНД'], group: ['421'], teacher: 'Векслер В.А.', lesson: 'Преподавание робототехники в образовательной организации (с 21.02)', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '5', department: ['ФМиЕНД'], group: ['220'], teacher: 'Векслер В.А.', lesson: 'Непрерывное профессиональное образование в сфере информационных технологий', type: 'пр.', parity: 'чис.'},
    { day: 'Пятница', number: '5', department: ['ФМиЕНД'], group: ['220'], teacher: 'Векслер В.А.', lesson: 'Непрерывное профессиональное образование в сфере информационных технологий', type: 'лек.', parity: 'знам.'},]);

template_PolygonFeature([[[1915, 1097], [2148, 1097], [2148, 778], [1915, 778], [1915, 1097]]], '215 (лаборатория информационных технологий 3, компьютерный класс)', '215',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['131', '132', '111', '151'], teacher: 'Крючкова А.А.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['211', '231', '251'], teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['451'], teacher: 'Кабанова Л.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных системах', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['211'], teacher: 'Кондратова Ю.Н.', lesson: 'Структуры данных и алгоритмы', type: 'пр.', parity: 'чис.'}, 
    { day: 'Понедельник', number: '5', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['431', '441', '421', '411', '451', '421', '411', '412', '421', '422'], teacher: 'Уколова М.А.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '6', department: ['КНиИТ'], group: ['341'], teacher: 'Щуров Д.И.', lesson: 'Java-программирование 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['121', '141', '181', '121', '111', '112', '121', '141'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['221', '241', '221', '211', '212', '221', '222', '241'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['221'], teacher: 'Черноусова Е.М.', lesson: 'Машинно-зависимые языки программирования 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['411', '451'], teacher: 'Кабанова Л.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных системах 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '6', department: ['ФМиЕНД'], group: ['121'], teacher: 'Антонова Е.В.', lesson: 'Программирование', type: 'лаб.', parity: '-'},
    { day: 'Вторник', number: '7', department: ['ФМиЕНД'], group: ['120'], teacher: 'Кабанова Л.В.', lesson: 'Современные проблемы развития информатики как науки', type: 'пр.', parity: 'чис.'},
    { day: 'Среда', number: '1', department: ['КНиИТ'], group: ['211', '231', '251'], teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['431', '441', '421', '411', '451', '421', '411', '412', '421', '422'], teacher: 'Косарева C.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: ['КНиИТ', 'ФМиЕНД', 'Экономический'], group: ['331', '311', '321', '341', '351', '381', '321', '311', '312', '321', '322', '341'], teacher: 'Косарева C.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: ['КНиИТ'], group: ['171'], teacher: 'Крючкова А.А.', lesson: 'Управление проектами 1 гр. Сети ЭВМ', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '7', department: ['КНиИТ'], group: ['173'], teacher: 'Крючкова А.А.', lesson: 'Управление проектами', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '1', department: ['КНиИТ', 'ФМиЕНД'], group: ['221', '241', '221', '211', '212', '221', '222', '241'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: ['КНиИТ', 'ФМиЕНД'], group: ['121', '141', '181', '121', '111', '112', '121', '141'], teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['441'], teacher: 'Кабанова Л.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных системах 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['271'], teacher: 'Тананко И.Е.', lesson: 'Моделирование информационно-вычислительных сетей 3 гр. Комп.модел.систем', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '7', department: ['КНиИТ'], group: ['171'], teacher: 'Андрейченко Д.К.', lesson: 'Программирование распределенных систем 2 гр. Анализ и синтез', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '3', department: ['ФМиЕНД'], group: ['121'], teacher: 'Букушева А.В.', lesson: 'Теоретические основы информатики', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: ['КНиИТ'], group: ['431'], teacher: 'Кондратова Ю.Н.', lesson: 'Технологии программирования 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: ['КНиИТ'], group: ['492'], teacher: '-', lesson: 'Научно-исследовательская деятельность и подготовка научно-квалификационной работы', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: ['КНиИТ'], group: ['321'], teacher: 'Трунов А.А.', lesson: 'Сети и телекоммуникации 2 гр.', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[2151, 1097],[2300, 1097],[2300, 778],[2151, 778],[2151, 1097]]], '216 (лаборатория технической диагностики)', '216');
template_PolygonFeature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '217 (центр олимпиадной подготовки программистов <br> им. Н.Л. Андреевой, компьютерный класс)', '217');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '227 (деканат <br> факультета ФМиЕНД (ПИ), <br> базовая кафедра <br> ГАОУ СО "ФТЛ лицей №1")', '227');

template_PolygonFeature([[[2894, 568], [3193, 568], [3193, 929], [2894, 929], [2894, 568]]], '226 (базовые кафедры <br> Мирантис ИТ, филиала № 2 <br> ООО "РНТ")', '226',
    [{ day: 'Понедельник', number: '7', department: ['КНиИТ'], group: ['291'], teacher: 'Андрейченко Д.К.', lesson: 'Математическое моделирование, численные методы и комплексы программ', type: 'лек.', parity: '-' },
     { day: 'Понедельник', number: '7', department: ['КНиИТ'], group: ['292'], teacher: 'Андрейченко Д.К.', lesson: 'Системный анализ, управление и обработка информации', type: 'лек.', parity: '-' },
     { day: 'Четверг', number: '5', department: ['КНиИТ'], group: ['392'], teacher: 'Батраева И.А.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);


template_PolygonFeature([[[2894, 1318], [3193, 1318], [3193, 932], [2894, 932], [2894, 1318]]], '225 (кафедра системного <br> анализа и автоматического <br> управления)', '225',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['321'], teacher: 'Тананко И.Е.', lesson: 'НИР гр. САУ', type: 'пр.', parity: '-'},
     { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['171'], teacher: 'Тананко И.Е.', lesson: 'НИР 2 гр. Анализ и синтез', type: 'пр.', parity: 'чис.' },
     { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['392'], teacher: 'Тананко И.Е.', lesson: 'Системный анализ, управление и обработка информации, статистика', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[2894, 1550], [3310, 1550], [3310, 1320], [2894, 1320], [2894, 1550]]], '224 (лекционная аудитория)', '224',
    [{ day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['411', '451'], teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '2', department: ['КНиИТ'], group: ['411', '451'], teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '1', department: ['КНиИТ'], group: ['231'], teacher: 'Луньков А.Д.', lesson: 'Теория вероятностей и математическая статистика', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: ['КНиИТ'], group: ['231'], teacher: 'Луньков А.Д.', lesson: 'Теория вероятностей и математическая статистика', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: ['КНиИТ'], group: ['231', '221'], teacher: 'Сагаева И.Д.', lesson: 'Дискретная математика', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['311'], teacher: 'Мусаева Д.Н.', lesson: 'Основы экономики и финансовой грамотности', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: ['КНиИТ'], group: ['251'], teacher: 'Сафрончик М.И.', lesson: 'Структуры данных и алгоритмы', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '6', department: ['КНиИТ'], group: ['271'] , teacher: 'Тананко И.Е.', lesson: 'Моделирование информационно-вычислительных сетей 3 гр. Комп.модел.систем', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '1', department: ['КНиИТ'], group: ['211'], teacher: 'Корнев В.В.', lesson: 'Дифференциальные уравнения', type: 'пр.', parity: 'чис.' },
    { day: 'Пятница', number: '1', department: ['КНиИТ'], group: ['251'], teacher: 'Корнев В.В.', lesson: 'Дифференциальные уравнения', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['211', '251'], teacher: 'Корнев В.В.', lesson: 'Дифференциальные уравнения', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '2', department: ['КНиИТ'], group: ['121'], teacher: 'Черноусова Е.М.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['111', '181'], teacher: 'Зайцев М.В.', lesson: 'История России', type: 'пр.', parity: 'чис.' },
    { day: 'Пятница', number: '3', department: ['КНиИТ'], group: ['151'], teacher: 'Зайцев М.В.', lesson: 'История России', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '4', department: ['КНиИТ'], group: ['321'], teacher: 'Дмитриев П.О.', lesson: 'Сети и телекоммуникации', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '6', department: ['КНиИТ'], group: ['481'], teacher: 'Рогачко Е.С.', lesson: 'Модели и методы теории массового обслуживания', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[2894, 1628],[3193, 1628],[3193, 1552],[2894, 1552],[2894, 1628]]], '222', '222');
template_PolygonFeature([[[2894, 1717],[3193, 1717],[3193, 1630],[2894, 1630],[2894, 1717]]], '221', '221');

template_PolygonFeature([[[2894, 1948], [3315, 1948], [3315, 1719], [2894, 1719], [2894, 1948]]], '220 (лекционная аудитория)', '220',
    [{ day: 'Понедельник', number: '1', department: ['КНиИТ'], group: ['381'], teacher: 'Рогачко Е.С.', lesson: 'Системный анализ и принятие решений', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '2', department: ['КНиИТ'], group: ['381'], teacher: 'Рогачко Е.С.', lesson: 'Системный анализ и принятие решений', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '3', department: ['КНиИТ'], group: ['141'], teacher: 'Огнева М.В.', lesson: 'Информационные технологии и программирование', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '4', department: ['КНиИТ'], group: ['121'], teacher: 'Ушаков И.В.', lesson: 'Алгебра и геометрия', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '5', department: ['КНиИТ'], group: ['271', '273'], teacher: 'Иванов А.С.', lesson: 'Интеллектуальные системы', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: ['КНиИТ'], group: ['121', '141', '181', '121'], teacher: 'Кузьмина С.В.', lesson: 'Английский язык 8 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '2', department: ['КНиИТ'], group: ['131', '132'], teacher: 'Шунаев В.В.', lesson: 'Физика', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['141'], teacher: 'Шаповалова Н.Г.', lesson: 'Деловая коммуникация', type: 'лек.', parity: 'чис.' },
    { day: 'Вторник', number: '3', department: ['КНиИТ'], group: ['141'], teacher: 'Шаповалова Н.Г.', lesson: 'Деловая коммуникация', type: 'пр.', parity: 'знам.' },
    { day: 'Вторник', number: '4', department: ['КНиИТ'], group: ['341'], teacher: 'Щуров Д.И.', lesson: 'Java-программирование', type: 'лек.', parity: 'чис.'},
    { day: 'Вторник', number: '4', department: ['ФМиЕНД'], group: ['321'], teacher: 'Смирнов Д.А.', lesson: 'Языки программирования в школьном курсе информатики', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: ['КНиИТ'], group: ['381'], teacher: 'Постнова О.С.', lesson: 'Математические методы теории управления', type: 'пр.', parity: 'знам.'},
    { day: 'Вторник', number: '5', department: ['ФМиЕНД'], group: ['121'], teacher: 'Антонова Е.В.', lesson: 'Программирование', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '6', department: ['ФМиЕНД'], group: ['120'], teacher: 'Кабанова Л.В.', lesson: 'Современные проблемы развития информатики как науки', type: 'лек.', parity: '-'},
    { day: 'Пятница', number: '1', department: ['КНиИТ'], group: ['231'], teacher: 'Жаркова А.В.', lesson: 'Ознакомительная практика', type: 'пр.', parity: 'знам.' }]);

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