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
template_PolygonFeature([[[178, 1320],[475, 1320],[475, 950],[178, 950],[178, 1320]]], '207 (кафедра философии культуры и культорологии, центр Артефакт)', '207');
template_PolygonFeature([[[178, 947],[475, 947],[475, 830],[178, 830],[178, 947]]], '206 (совет студентов философского факультета)', '206');
template_PolygonFeature([[[178, 828],[475, 828],[475, 602],[178, 602],[178, 828]]], '205 (кафедра теоретической и социальной философии, учебно-научная лаборатория ЦИФРА)', '205');

template_PolygonFeature([[[178, 600], [632, 600], [632, 373], [510, 373], [510, 250], [178, 250], [178, 600]]], '204 (деканат философского факультета)', '204',
    [{ day: 'Понедельник', number: '4', department: 'КНиИТ', group: '241', teacher: 'Коротковская Е.И.', lesson: 'Основы экономики и финансовой грамотности', type: 'пр.', parity: 'знам.'}]);

template_PolygonFeature([[[886, 1097],[1073, 1097],[1073, 778],[886, 778],[886, 1097]]], '209', '209');
template_PolygonFeature([[[1076, 1097],[1244, 1097],[1244, 778],[1076, 778],[1076, 1097]]], '210', '210');
template_PolygonFeature([[[1247, 1097],[1348, 1097],[1348, 778],[1247, 778],[1247, 1097]]], '211 (кафедра теологии и религиоведения)', '211');
template_PolygonFeature([[[1351, 1097],[1458, 1097],[1458, 778],[1351, 778],[1351, 1097]]], '212 (заведующий кафедрой теологии и религиоведения)', '212');
template_PolygonFeature([[[632, 631],[918, 631],[918, 373],[632, 373],[632, 631]]], '203 (аудитория им. А.Ф. Аскина)', '203');
template_PolygonFeature([[[921, 631],[1163, 631],[1163, 373],[921, 373],[921, 631]]], '202 (аудитория им. С.Л. Франка)', '202');
template_PolygonFeature([[[1166, 631],[1361, 631],[1361, 373],[1166, 373],[1166, 631]]], '201', '201');

// аудитории правого крыла
template_PolygonFeature([[[1998, 635], [2230, 635], [2230, 373], [1998, 373], [1998, 635]]], '230 (лаборатория аудиовизуальных средств обучения)', '230',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр. ', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Косарева C.А.', lesson: 'Английский язык (переводчики) 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '221, 241', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '321', teacher: 'Портенко М.С.', lesson: 'Технологии программирования 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '311', teacher: 'Черноусова Е.М.', lesson: 'Параллельное и распределенное программирование 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '2', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Крючкова О.Ю.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'лек.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 5 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр. ', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '381', teacher: 'Рогачко Е.С.', lesson: 'Анализ стохастических систем', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '6', department: 'КНиИТ', group: '381', teacher: 'Рогачко Е.С.', lesson: 'НИР', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '221, 241', teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Уколова М.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '481', teacher: 'Рогачко Е.С.', lesson: 'Модели и методы теории массового обслуживания', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '7', department: 'КНиИТ', group: '271', teacher: 'Тананко И.Е.', lesson: 'Моделирование информационно-вычислительных сетей 3 гр. Комп.модел.систем', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '331', teacher: 'Гамова А.Н.', lesson: 'Сложность вычислений 2 гр.', type: 'пр.', parity: '-'}]);

template_PolygonFeature([[[2233, 635], [2504, 635], [2504, 373], [2233, 373], [2233, 635]]], '229 (лаборатория информационных технологий 2)', '229',
    [{ day: 'Пятница', number: '2', department: 'КНиИТ', group: '241', teacher: 'Рогачко Е.С.', lesson: 'Методы оптимизации в анализе данных 1 гр.', type: 'пр.', parity: '-' },]);

template_PolygonFeature([[[2507, 635],[2749, 635],[2749, 373],[2507, 373],[2507, 635]]], '228 (лаборатория информационных <br> технологий 1)', '228');

template_PolygonFeature([[[1915, 1097], [2148, 1097], [2148, 778], [1915, 778], [1915, 1097]]], '215 (лаборатория информационных технологий 3)', '215',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '131, 132, 111, 151', teacher: 'Крючкова О.Ю.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Богатенко Т.Р.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '451', teacher: 'Кабанова Л.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных системах', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '211', teacher: 'Кондратова Ю.Н.', lesson: 'Структуры данных и алгоритмы', type: 'пр.', parity: 'чис.'}, 
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Уколова М.А.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Понедельник', number: '6', department: 'КНиИТ', group: '341', teacher: 'Щуров Д.И.', lesson: 'Java-программирование 1 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '221, 241', teacher: 'Повлова О.В.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '221', teacher: 'Черноусова Е.М.', lesson: 'Машинно-зависимые языки программирования 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '411, 451', teacher: 'Кабанова Л.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных системах 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Среда', number: '1', department: 'КНиИТ', group: '211, 231, 251', teacher: 'Карпец Е.В.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '3', department: 'КНиИТ', group: '431, 441, 421, 411, 451, 481', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр.', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '4', department: 'КНиИТ', group: '331, 311, 321, 341, 351, 381', teacher: 'Косарева С.А.', lesson: 'Английский язык (переводчики) 4 гр. ', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '5', department: 'КНиИТ', group: '171', teacher: 'Крючкова А.А.', lesson: 'Управление проектами 1 гр. Сети ЭВМ', type: 'пр.', parity: '-'},
    { day: 'Среда', number: '7', department: 'КНиИТ', group: '173', teacher: 'Крючкова А.А.', lesson: 'Управление проектами', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '221, 241', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 2 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Павлова О.В.', lesson: 'Английский язык (переводчики) 3 гр.', type: 'пр.', parity: '-'},
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '441', teacher: 'Кабанова Л.В.', lesson: 'Программирование и конфигурирование в корпоративных информационных системах 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '5', department: 'КНиИТ', group: '271', teacher: 'Тананко И.Е.', lesson: 'Моделирование информационно-вычислительных сетей 3 гр. Комп.модел.систем', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '7', department: 'КНиИТ', group: '171', teacher: 'Андрейченко Д.К.', lesson: 'Программирование распределенных систем 2 гр. Анализ и синтез', type: 'пр.', parity: '-'},
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '431', teacher: 'Кондратова Ю.Н.', lesson: 'Технологии программирования 1 гр.', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '2', department: 'КНиИТ', group: '492', teacher: '-', lesson: 'Научно-исследовательская деятельность и подготовка научно-квалификационной работы', type: 'пр.', parity: '-' },
    { day: 'Суббота', number: '3', department: 'КНиИТ', group: '321', teacher: 'Трунов А.А.', lesson: 'Сети и телекоммуникации 2 гр.', type: 'пр.', parity: '-' }]);

template_PolygonFeature([[[2151, 1097],[2300, 1097],[2300, 778],[2151, 778],[2151, 1097]]], '216 (лаборатория технической диагностики)', '216');
template_PolygonFeature([[[2303, 1097],[2488, 1097],[2488, 778],[2303, 778],[2303, 1097]]], '217 (центр олимпиадной подготовки программистов <br> им. Н.Л. Андреевой)', '217');
template_PolygonFeature([[[2894, 565],[3193, 565],[3193, 251],[2863, 251],[2863, 373],[2894, 373],[2894, 565]]], '227 (деканат <br> факультета физико- <br> математических и <br> естественно-научных <br> дисциплин, базовая кафедра <br> ГАОУ СО "ФТЛ лицей №1")', '227');

template_PolygonFeature([[[2894, 568], [3193, 568], [3193, 929], [2894, 929], [2894, 568]]], '226 (базовые кафедры <br> Мирантис ИТ, филиала № 2 <br> ООО "РНТ")', '226',
    [{ day: 'Понедельник', number: '7', department: 'КНиИТ', group: '291', teacher: 'Андрейченко Д.К.', lesson: 'Математическое моделирование, численные методы и комплексы программ', type: 'лек.', parity: '-' },
     { day: 'Понедельник', number: '7', department: 'КНиИТ', group: '292', teacher: 'Андрейченко Д.К.', lesson: 'Системный анализ, управление и обработка информации', type: 'лек.', parity: '-' },
     { day: 'Четверг', number: '5', department: 'КНиИТ', group: '392', teacher: 'Батраева И.А.', lesson: 'Научная деятельность, направленная на подготовку диссертации к защите', type: 'пр.', parity: '-' }]);


template_PolygonFeature([[[2894, 1318], [3193, 1318], [3193, 932], [2894, 932], [2894, 1318]]], '225 (кафедра системного <br> анализа и автоматического <br> управления)', '225',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '321', teacher: 'Тананко И.Е.', lesson: 'НИР гр. САУ', type: 'пр.', parity: '-'},
     { day: 'Четверг', number: '4', department: 'КНиИТ', group: '171', teacher: 'Тананко И.Е.', lesson: 'НИР 2 гр. Анализ и синтез', type: 'пр.', parity: 'чис.' },
     { day: 'Четверг', number: '4', department: 'КНиИТ', group: '392', teacher: 'Тананко И.Е.', lesson: 'Системный анализ, управление и обработка информации, статистика', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[2894, 1550], [3310, 1550], [3310, 1320], [2894, 1320], [2894, 1550]]], '224', '224',
    [{ day: 'Понедельник', number: '2', department: 'КНиИТ', group: '411, 451', teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '411, 451', teacher: 'Филиппов Б.А.', lesson: 'Технологии программирования', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '1', department: 'КНиИТ', group: '231', teacher: 'Луньков А.Д.', lesson: 'Теория вероятностей и математическая статистика', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '2', department: 'КНиИТ', group: '231', teacher: 'Луньков А.Д.', lesson: 'Теория вероятностей и математическая статистика', type: 'пр.', parity: '-' },
    { day: 'Четверг', number: '3', department: 'КНиИТ', group: '231, 221', teacher: 'Сагаева И.Д.', lesson: 'Дискретная математика', type: 'лек.', parity: '-' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '311', teacher: 'Мусаева Д.Н.', lesson: 'Основы экономики и финансовой грамотности', type: 'пр.', parity: 'чис.' },
    { day: 'Четверг', number: '4', department: 'КНиИТ', group: '251', teacher: 'Сафрончик М.И.', lesson: 'Структуры данных и алгоритмы', type: 'пр.', parity: 'знам.' },
    { day: 'Четверг', number: '6', department: 'КНиИТ', group: '271', teacher: 'Тананко И.Е.', lesson: 'Моделирование информационно-вычислительных сетей 3 гр. Комп.модел.систем', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '211', teacher: 'Корнев В.В.', lesson: 'Дифференциальные уравнения', type: 'пр.', parity: 'чис.' },
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '251', teacher: 'Корнев В.В.', lesson: 'Дифференциальные уравнения', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '211, 251', teacher: 'Корнев В.В.', lesson: 'Дифференциальные уравнения', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '2', department: 'КНиИТ', group: '121', teacher: 'Черноусова Е.М.', lesson: 'Информационные технологии и программирование 2 гр.', type: 'пр.', parity: '-' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '111, 181', teacher: 'Зайцев М.В.', lesson: 'История России', type: 'пр.', parity: 'чис.' },
    { day: 'Пятница', number: '3', department: 'КНиИТ', group: '151', teacher: 'Зайцев М.В.', lesson: 'История России', type: 'пр.', parity: 'знам.' },
    { day: 'Пятница', number: '4', department: 'КНиИТ', group: '321', teacher: 'Дмитриев П.О.', lesson: 'Сети и телекоммуникации', type: 'лек.', parity: '-' },
    { day: 'Пятница', number: '6', department: 'КНиИТ', group: '481', teacher: 'Рогачко Е.С.', lesson: 'Модели и методы теории массового обслуживания', type: 'лек.', parity: '-' }]);

template_PolygonFeature([[[2894, 1628],[3193, 1628],[3193, 1552],[2894, 1552],[2894, 1628]]], '222', '222');
template_PolygonFeature([[[2894, 1717],[3193, 1717],[3193, 1630],[2894, 1630],[2894, 1717]]], '221', '221');

template_PolygonFeature([[[2894, 1948], [3315, 1948], [3315, 1719], [2894, 1719], [2894, 1948]]], '220', '220',
    [{ day: 'Понедельник', number: '1', department: 'КНиИТ', group: '381', teacher: 'Рогачко Е.С.', lesson: 'Системный анализ и принятие решений', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '2', department: 'КНиИТ', group: '381', teacher: 'Рогачко Е.С.', lesson: 'Системный анализ и принятие решений', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '3', department: 'КНиИТ', group: '141', teacher: 'Огнева М.В.', lesson: 'Информационные технологии и программирование', type: 'лек.', parity: '-' },
    { day: 'Понедельник', number: '4', department: 'КНиИТ', group: '121', teacher: 'Ушаков И.В.', lesson: 'Алгебра и геометрия', type: 'пр.', parity: '-' },
    { day: 'Понедельник', number: '5', department: 'КНиИТ', group: '271, 273', teacher: 'Иванов А.С.', lesson: 'Интеллектуальные системы', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '1', department: 'КНиИТ', group: '121, 141, 181', teacher: 'Кузьмина С.В.', lesson: 'Английский язык 8 гр.', type: 'пр.', parity: '-' },
    { day: 'Вторник', number: '2', department: 'КНиИТ', group: '131, 132', teacher: 'Шунаев В.В.', lesson: 'Физика', type: 'лек.', parity: '-' },
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '141', teacher: 'Шаповалова Н.Г.', lesson: 'Деловая коммуникация', type: 'лек.', parity: 'чис.' },
    { day: 'Вторник', number: '3', department: 'КНиИТ', group: '141', teacher: 'Шаповалова Н.Г.', lesson: 'Деловая коммуникация', type: 'пр.', parity: 'знам.' },
    { day: 'Вторник', number: '4', department: 'КНиИТ', group: '341', teacher: 'Щуров Д.И.', lesson: 'Java-программирование', type: 'лек.', parity: '-'},
    { day: 'Вторник', number: '5', department: 'КНиИТ', group: '381', teacher: 'Постнова О.С.', lesson: 'Математические методы теории управления', type: 'пр.', parity: 'знам.'},
    { day: 'Пятница', number: '1', department: 'КНиИТ', group: '231', teacher: 'Жаркова А.В.', lesson: 'Ознакомительная практика', type: 'пр.', parity: 'знам.' }]);

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