// app/api/admin/generate-full-data/route.ts
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";

// --- Генерация названий для серий ---
const generateSeriesTitles = (count: number) => {
  const titles: string[] = [];
  
  // Оставляем первые 68 реальных названий
  const realTitles = [
    "Риббоны",
    "Значки с лентами",
    "Рядные розетки",
    "Серия Трилистник",
    "Ринговая серия",
    "Овальные рядные",
    "Розетки с органзой",
    "Розетки с капроном и кружевом",
    "Двухрядные розетки",
    "Трёхрядные розетки",
    "Ринговая серия ЁЖИК",
    "Титульная розетка PR101/1",
    "Ринговая серия 304",
    "Ринговая серия 305",
    "Ринговая серия 1402",
    "Ринговая серия 301/302",
    "Ринговая серия 1601/1602",
    "Ринговая пара 406/1701",
    "Ринговая серия 1602",
    "Ринговая серия 2101",
    "Ринговая серия 1801",
    "Ринговая серия 1802",
    "Ринговая серия 1702",
    "Ринговая серия 403/402/401",
    "Ринговая серия 201",
    "Ринговая пара 202",
    "Ринговая пара 1502/1501",
    "Ринговая пара 501/502/503",
    "Ринговая серия 2001",
    "Ринговая серия 2402",
    "Ринговая серия 2401",
    "Ринговая серия 901",
    "Ринговая серия 1002",
    "Ринговая серия 1003/1001",
    "Серия ЛЕНА",
    "Cерия ЕНИСЕЙ",
    "Серия ИГАРКА",
    "Серия ДВИНА",
    "Серия КУРЬЯ",
    "Серия ПИНЕГА",
    "Серия ПИНЕГА I",
    "Серия ПИНЕГА II",
    "Серия ГЕОРГИНЫ",
    "Серия ТАЙМЫР",
    "Серия ВОЛГА",
    "Серия ЛАДОГА / ИЛЬМЕНЬ",
    "Серия ВОЛХОВ / НЕВА",
    "Серия ПЕЧОРА",
    "Серия МЕЗЕНЬ",
    "Серия НЕРО",
    "Серия ЛОДЬМА",
    "Серия ВЫЧЕГДА",
    "Серия ВАЙМУГА",
    "Ваймуга II",
    "Серия АНГАРА",
    "Серия ИЛЕКСА",
    "Серия СУХОНА",
    "Серия СУХОНА II",
    "Серия КАМА",
    "Серия ОНЕГА",
    "Серия ИРТЫШ",
    "Серия ИРТЫШ II",
    "Серия ХРИЗАНТЕМА",
    "Овальные розетки",
    "Серия КОТИК",
    "Серия NEST / BASKET",
    "Серия Ст. ЛОДЬМА",
    "Серия ОКА"
  ];
  
  // Добавляем реальные названия
  for (let i = 0; i < Math.min(realTitles.length, count); i++) {
    titles.push(realTitles[i]);
  }
  
  // Если нужно больше, генерируем тестовые названия
  for (let i = realTitles.length; i < count; i++) {
    titles.push(`Тестовая серия ${i + 1}`);
  }
  
  return titles;
};

// --- Проверенные рабочие изображения (основные) ---
const mainImages = [
  "https://sun9-21.userapi.com/s/v1/ig2/GdbJCGArz3DoDBqi9wZ6kWcmZLg-3ZSIaSgFKw_jMtmhoSCdJzoz7lhOTe7JxqRCjH5CEe2zUD2FfDjoiIZR84uV.jpg?quality=95&crop=0,17,941,1411&as=32x48,48x72,72x108,108x162,160x240,240x360,360x540,480x720,540x810,640x960,720x1080,941x1411&from=bu&u=UsUDD9GmXTGY0ccPKlBbxos0fPH_MvgH-NiFJl3ncS8&cs=941x0",
  "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
  "https://sun9-51.userapi.com/s/v1/ig2/ch-RUKG1QnY4rKaAPQvG0nW0uw4N-nxKgx7BB9ZG3u5NbynoblT3vKiwPGUMzIfyQI29ojEL0eeHcIyizooFlAAB.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&u=O7gYSnYfCgs8_S2KtgwiVVXRqPWpDKh8GF3x94XP_u0&cs=640x0",
];

// --- Проверенные рабочие изображения (дополнительные) ---
const additionalImagesList = [
  "https://sun9-40.userapi.com/s/v1/ig2/o6aF7JqAuaRNtmyGOldHGixirIg7sevj0KeeBhvvtH-Q5Iwm-8Sfptf7p2rOUHpIkokpgfOuckBbiwUPO2GO5LBv.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&u=RsHFwYwWGuq23f2O3iuVebXkeSVPqgYBX4jriN30R0Q&cs=960x0",
  "https://sun9-14.userapi.com/s/v1/ig2/qwarfSYXtoxlrsK4nyhwQazM7QEnpE5ERZjwxllKye16NL6-GaERBg-zT4pGmCTmNbZ_3pS9PlNf1HdXPwW84TnG.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&u=Cc0xrHBFKJGza5LuX4za8Y6psr8WH7dOee13xT4d2Jg&cs=1080x0",
  "https://sun9-16.userapi.com/s/v1/ig2/S5AbswrmKMfZ0Lz4TE63YC4aBlKRxeD99LNuzM3AdFYXDG6SMPiXAKDC33Kuzdjx2c1kKmlQowybHstN_8lQDP5-.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1439,1280x1706&from=bu&u=5ZBb7odtHIVKUQ4p0eKKMqWycDHjlZ2OWFz2ujEGXBU&cs=1080x0",
];

// --- Список возможных комментариев для розеток ---
const commentsList = [
  "Классическая наградная розетка",
  "Подходит для любых мероприятий",
  "Премиум качество",
  "Эксклюзивный дизайн",
  "С ручной сборкой",
  "Используются лучшие материалы",
  "Яркая и запоминающаяся",
  "Для особых побед",
  "Лаконичный и строгий дизайн",
  "С блестящими элементами декора",
  "Нежный и изящный вариант",
  "Мощная и статусная награда",
];

// --- Функция для генерации случайного числа ---
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Функция для выбора случайного элемента ---
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST() {
  try {
    const seriesCollection = await getCollection("series");
    const productsCollection = await getCollection("products");
    
    // 1. Очищаем старые данные
    await seriesCollection.deleteMany({});
    await productsCollection.deleteMany({});
    console.log("Старые данные удалены");
    
    const TOTAL_SERIES = 150;
    const PRODUCTS_PER_SERIES = 10;
    
    // 2. Генерируем названия серий
    const seriesTitles = generateSeriesTitles(TOTAL_SERIES);
    
    let totalSeriesGenerated = 0;
    let totalProductsGenerated = 0;
    
    // 3. Для каждой серии создаём запись и розетки
    for (let i = 0; i < TOTAL_SERIES; i++) {
      const seriesId = String(i + 1);
      const seriesTitle = seriesTitles[i];
      
      // Создаём серию
      const newSeries = {
        seriesId,
        seriesTitle,
        image: getRandomItem(mainImages),
        createdAt: new Date(),
      };
      
      await seriesCollection.insertOne(newSeries);
      totalSeriesGenerated++;
      
      // Создаём 10 розеток для этой серии
      for (let j = 1; j <= PRODUCTS_PER_SERIES; j++) {
        const randomPrice = getRandomInt(50, 500);
        const randomDiameter = getRandomInt(8, 25);
        const randomTails = getRandomInt(1, 7);
        const randomTailLength = getRandomInt(15, 60);
        const randomNumber = getRandomInt(1, 30);
        
        // Генерируем 0-3 дополнительных изображения
        const additionalCount = getRandomInt(0, 3);
        const additionalImages = [];
        for (let a = 0; a < additionalCount; a++) {
          additionalImages.push(getRandomItem(additionalImagesList));
        }
        
        const product = {
          image: getRandomItem(mainImages),
          additionalImages: additionalImages,
          seriesId: seriesId,
          seriesNumber: `${seriesTitle.replace(/[^A-Za-zА-Яа-я0-9]/g, '').substring(0, 10)}-${j}`,
          rossetSeries: seriesTitle,
          rossetNumber: randomNumber,
          rossetDiameter: randomDiameter,
          numberOfTails: randomTails,
          tailLength: randomTailLength,
          comment: getRandomItem(commentsList),
          price: randomPrice,
          createdAt: new Date(),
        };
        
        await productsCollection.insertOne(product);
        totalProductsGenerated++;
      }
      
      // Лог прогресса каждые 10 серий
      if ((i + 1) % 10 === 0) {
        console.log(`Создано ${i + 1} серий и ${totalProductsGenerated} розеток`);
      }
    }
    
    return NextResponse.json({
      message: `✅ Успешно! Создано ${totalSeriesGenerated} серий и ${totalProductsGenerated} розеток (по ${PRODUCTS_PER_SERIES} на серию).`,
      series: totalSeriesGenerated,
      products: totalProductsGenerated,
    });
    
  } catch (error) {
    console.error("Ошибка при генерации:", error);
    return NextResponse.json(
      { error: "Ошибка сервера при генерации данных" },
      { status: 500 }
    );
  }
}