/* 
   Search.vue

   10/20/23
   Newest champ: Briar
   0: Champion id, 1: For code, 2: For humans 
*/
const names = [
   [266, "Aatrox", "Aatrox"],
   [103, "Ahri", "Ahri"],
   [84, "Akali", "Akali"],
   [166, "Akshan", "Akshan"],
   [12, "Alistar", "Alistar"],
   [32, "Amumu", "Amumu"],
   [34, "Anivia", "Anivia"],
   [1, "Annie", "Annie"],
   [523, "Aphelios", "Aphelios"],
   [22, "Ashe", "Ashe"],
   [136, "AurelionSol", "Aurelion Sol"],
   [268, "Azir", "Azir"],
   [432, "Bard", "Bard"],
   [200, "Belveth", "Bel'Veth"],
   [53, "Blitzcrank", "Blitzcrank"],
   [63, "Brand", "Brand"],
   [201, "Braum", "Braum"],
   [233, "Briar", "Briar"],
   [51, "Caitlyn", "Caitlyn"],
   [164, "Camille", "Camille"],
   [69, "Cassiopeia", "Cassiopeia"],
   [31, "Chogath", "Cho'Gath"],
   [42, "Corki", "Corki"],
   [122, "Darius", "Darius"],
   [131, "Diana", "Diana"],
   [119, "Draven", "Draven"],
   [36, "DrMundo", "Dr. Mundo"],
   [245, "Ekko", "Ekko"],
   [60, "Elise", "Elise"],
   [28, "Evelynn", "Evelynn"],
   [81, "Ezreal", "Ezreal"],
   [9, "Fiddlesticks", "Fiddlesticks"],
   [114, "Fiora", "Fiora"],
   [105, "Fizz", "Fizz"],
   [3, "Galio", "Galio"],
   [41, "Gangplank", "Gangplank"],
   [86, "Garen", "Garen"],
   [150, "Gnar", "Gnar"],
   [79, "Gragas", "Gragas"],
   [104, "Graves", "Graves"],
   [887, "Gwen", "Gwen"],
   [120, "Hecarim", "Hecarim"],
   [74, "Heimerdinger", "Heimerdinger"],
   [420, "Illaoi", "Illaoi"],
   [39, "Irelia", "Irelia"],
   [427, "Ivern", "Ivern"],
   [40, "Janna", "Janna"],
   [59, "JarvanIV", "Jarvan IV"],
   [24, "Jax", "Jax"],
   [126, "Jayce", "Jayce"],
   [202, "Jhin", "Jhin"],
   [222, "Jinx", "Jinx"],
   [145, "Kaisa", "Kai'Sa"],
   [429, "Kalista", "Kalista"],
   [43, "Karma", "Karma"],
   [30, "Karthus", "Karthus"],
   [38, "Kassadin", "Kassadin"],
   [55, "Katarina", "Katarina"],
   [10, "Kayle", "Kayle"],
   [141, "Kayn", "Kayn"],
   [85, "Kennen", "Kennen"],
   [121, "Khazix", "Kha'Zix"],
   [203, "Kindred", "Kindred"],
   [240, "Kled", "Kled"],
   [96, "KogMaw", "Kog'Maw"],
   [897, "KSante", "K'Sante"],
   [7, "Leblanc", "LeBlanc"],
   [64, "LeeSin", "Lee Sin"],
   [89, "Leona", "Leona"],
   [876, "Lillia", "Lillia"],
   [127, "Lissandra", "Lissandra"],
   [236, "Lucian", "Lucian"],
   [117, "Lulu", "Lulu"],
   [99, "Lux", "Lux"],
   [54, "Malphite", "Malphite"],
   [90, "Malzahar", "Malzahar"],
   [57, "Maokai", "Maokai"],
   [11, "MasterYi", "Master Yi"],
   [902, "Milio", "Milio"],
   [21, "MissFortune", "Miss Fortune"],
   [62, "MonkeyKing", "Wukong"],
   [82, "Mordekaiser", "Mordekaiser"],
   [25, "Morgana", "Morgana"],
   [950, "Naafiri", "Naafiri"],
   [267, "Nami", "Nami"],
   [75, "Nasus", "Nasus"],
   [111, "Nautilus", "Nautilus"],
   [518, "Neeko", "Neeko"],
   [76, "Nidalee", "Nidalee"],
   [895, "Nilah", "Nilah"],
   [56, "Nocturne", "Nocturne"],
   [20, "Nunu", "Nunu & Willump"],
   [2, "Olaf", "Olaf"],
   [61, "Orianna", "Orianna"],
   [516, "Ornn", "Ornn"],
   [80, "Pantheon", "Pantheon"],
   [78, "Poppy", "Poppy"],
   [555, "Pyke", "Pyke"],
   [246, "Qiyana", "Qiyana"],
   [133, "Quinn", "Quinn"],
   [497, "Rakan", "Rakan"],
   [33, "Rammus", "Rammus"],
   [421, "RekSai", "Rek'Sai"],
   [526, "Rell", "Rell"],
   [888, "Renata", "Renata Glasc"],
   [58, "Renekton", "Renekton"],
   [107, "Rengar", "Rengar"],
   [92, "Riven", "Riven"],
   [68, "Rumble", "Rumble"],
   [13, "Ryze", "Ryze"],
   [360, "Samira", "Samira"],
   [113, "Sejuani", "Sejuani"],
   [235, "Senna", "Senna"],
   [147, "Seraphine", "Seraphine"],
   [875, "Sett", "Sett"],
   [35, "Shaco", "Shaco"],
   [98, "Shen", "Shen"],
   [102, "Shyvana", "Shyvana"],
   [27, "Singed", "Singed"],
   [14, "Sion", "Sion"],
   [15, "Sivir", "Sivir"],
   [72, "Skarner", "Skarner"],
   [37, "Sona", "Sona"],
   [16, "Soraka", "Soraka"],
   [50, "Swain", "Swain"],
   [517, "Sylas", "Sylas"],
   [134, "Syndra", "Syndra"],
   [223, "TahmKench", "Tahm Kench"],
   [163, "Taliyah", "Taliyah"],
   [91, "Talon", "Talon"],
   [44, "Taric", "Taric"],
   [17, "Teemo", "Teemo"],
   [412, "Thresh", "Thresh"],
   [18, "Tristana", "Tristana"],
   [48, "Trundle", "Trundle"],
   [23, "Tryndamere", "Tryndamere"],
   [4, "TwistedFate", "Twisted Fate"],
   [29, "Twitch", "Twitch"],
   [77, "Udyr", "Udyr"],
   [6, "Urgot", "Urgot"],
   [110, "Varus", "Varus"],
   [67, "Vayne", "Vayne"],
   [45, "Veigar", "Veigar"],
   [161, "Velkoz", "Vel'Koz"],
   [711, "Vex", "Vex"],
   [254, "Vi", "Vi"],
   [234, "Viego", "Viego"],
   [112, "Viktor", "Viktor"],
   [8, "Vladimir", "Vladimir"],
   [106, "Volibear", "Volibear"],
   [19, "Warwick", "Warwick"],
   [498, "Xayah", "Xayah"],
   [101, "Xerath", "Xerath"],
   [5, "XinZhao", "Xin Zhao"],
   [157, "Yasuo", "Yasuo"],
   [777, "Yone", "Yone"],
   [83, "Yorick", "Yorick"],
   [350, "Yuumi", "Yuumi"],
   [154, "Zac", "Zac"],
   [238, "Zed", "Zed"],
   [221, "Zeri", "Zeri"],
   [115, "Ziggs", "Ziggs"],
   [26, "Zilean", "Zilean"],
   [142, "Zoe", "Zoe"],
   [143, "Zyra", "Zyra"]
]

const imageName = {
   266: "Aatrox",
   103: "Ahri",
   84: "Akali",
   166: "Akshan",
   12: "Alistar",
   32: "Amumu",
   34: "Anivia",
   1: "Annie",
   523: "Aphelios",
   22: "Ashe",
   136: "AurelionSol",
   268: "Azir",
   432: "Bard",
   200: "Belveth",
   53: "Blitzcrank",
   63: "Brand",
   201: "Braum",
   233: "Briar",
   51: "Caitlyn",
   164: "Camille",
   69: "Cassiopeia",
   31: "Chogath",
   42: "Corki",
   122: "Darius",
   131: "Diana",
   119: "Draven",
   36: "DrMundo",
   245: "Ekko",
   60: "Elise",
   28: "Evelynn",
   81: "Ezreal",
   9: "Fiddlesticks",
   114: "Fiora",
   105: "Fizz",
   3: "Galio",
   41: "Gangplank",
   86: "Garen",
   150: "Gnar",
   79: "Gragas",
   104: "Graves",
   887: "Gwen",
   120: "Hecarim",
   74: "Heimerdinger",
   420: "Illaoi",
   39: "Irelia",
   427: "Ivern",
   40: "Janna",
   59: "JarvanIV",
   24: "Jax",
   126: "Jayce",
   202: "Jhin",
   222: "Jinx",
   145: "Kaisa",
   429: "Kalista",
   43: "Karma",
   30: "Karthus",
   38: "Kassadin",
   55: "Katarina",
   10: "Kayle",
   141: "Kayn",
   85: "Kennen",
   121: "Khazix",
   203: "Kindred",
   240: "Kled",
   96: "KogMaw",
   897: "KSante",
   7: "Leblanc",
   64: "LeeSin",
   89: "Leona",
   876: "Lillia",
   127: "Lissandra",
   236: "Lucian",
   117: "Lulu",
   99: "Lux",
   54: "Malphite",
   90: "Malzahar",
   57: "Maokai",
   11: "MasterYi",
   902: "Milio",
   21: "MissFortune",
   62: "MonkeyKing",
   82: "Mordekaiser",
   25: "Morgana",
   950: "Naafiri",
   267: "Nami",
   75: "Nasus",
   111: "Nautilus",
   518: "Neeko",
   76: "Nidalee",
   895: "Nilah",
   56: "Nocturne",
   20: "Nunu",
   2: "Olaf",
   61: "Orianna",
   516: "Ornn",
   80: "Pantheon",
   78: "Poppy",
   555: "Pyke",
   246: "Qiyana",
   133: "Quinn",
   497: "Rakan",
   33: "Rammus",
   421: "RekSai",
   526: "Rell",
   888: "Renata",
   58: "Renekton",
   107: "Rengar",
   92: "Riven",
   68: "Rumble",
   13: "Ryze",
   360: "Samira",
   113: "Sejuani",
   235: "Senna",
   147: "Seraphine",
   875: "Sett",
   35: "Shaco",
   98: "Shen",
   102: "Shyvana",
   27: "Singed",
   14: "Sion",
   15: "Sivir",
   72: "Skarner",
   37: "Sona",
   16: "Soraka",
   50: "Swain",
   517: "Sylas",
   134: "Syndra",
   223: "TahmKench",
   163: "Taliyah",
   91: "Talon",
   44: "Taric",
   17: "Teemo",
   412: "Thresh",
   18: "Tristana",
   48: "Trundle",
   23: "Tryndamere",
   4: "TwistedFate",
   29: "Twitch",
   77: "Udyr",
   6: "Urgot",
   110: "Varus",
   67: "Vayne",
   45: "Veigar",
   161: "Velkoz",
   711: "Vex",
   254: "Vi",
   234: "Viego",
   112: "Viktor",
   8: "Vladimir",
   106: "Volibear",
   19: "Warwick",
   498: "Xayah",
   101: "Xerath",
   5: "XinZhao",
   157: "Yasuo",
   777: "Yone",
   83: "Yorick",
   350: "Yuumi",
   154: "Zac",
   238: "Zed",
   221: "Zeri",
   115: "Ziggs",
   26: "Zilean",
   142: "Zoe",
   143: "Zyra",
}

const frontName = {
   266: "Aatrox",
   103: "Ahri",
   84: "Akali",
   166: "Akshan",
   12: "Alistar",
   32: "Amumu",
   34: "Anivia",
   1: "Annie",
   523: "Aphelios",
   22: "Ashe",
   136: "Aurelion Sol",
   268: "Azir",
   432: "Bard",
   200: "Bel'Veth",
   53: "Blitzcrank",
   63: "Brand",
   201: "Braum",
   233: "Briar",
   51: "Caitlyn",
   164: "Camille",
   69: "Cassiopeia",
   31: "Cho'Gath",
   42: "Corki",
   122: "Darius",
   131: "Diana",
   119: "Draven",
   36: "Dr. Mundo",
   245: "Ekko",
   60: "Elise",
   28: "Evelynn",
   81: "Ezreal",
   9: "Fiddlesticks",
   114: "Fiora",
   105: "Fizz",
   3: "Galio",
   41: "Gangplank",
   86: "Garen",
   150: "Gnar",
   79: "Gragas",
   104: "Graves",
   887: "Gwen",
   120: "Hecarim",
   74: "Heimerdinger",
   420: "Illaoi",
   39: "Irelia",
   427: "Ivern",
   40: "Janna",
   59: "Jarvan IV",
   24: "Jax",
   126: "Jayce",
   202: "Jhin",
   222: "Jinx",
   145: "Kai'Sa",
   429: "Kalista",
   43: "Karma",
   30: "Karthus",
   38: "Kassadin",
   55: "Katarina",
   10: "Kayle",
   141: "Kayn",
   85: "Kennen",
   121: "Kha'Zix",
   203: "Kindred",
   240: "Kled",
   96: "Kog'Maw",
   897: "K'Sante",
   7: "LeBlanc",
   64: "Lee Sin",
   89: "Leona",
   876: "Lillia",
   127: "Lissandra",
   236: "Lucian",
   117: "Lulu",
   99: "Lux",
   54: "Malphite",
   90: "Malzahar",
   57: "Maokai",
   11: "Master Yi",
   902: "Milio",
   21: "Miss Fortune",
   62: "Wukong",
   82: "Mordekaiser",
   25: "Morgana",
   950: "Naafiri",
   267: "Nami",
   75: "Nasus",
   111: "Nautilus",
   518: "Neeko",
   76: "Nidalee",
   895: "Nilah",
   56: "Nocturne",
   20: "Nunu & Willump",
   2: "Olaf",
   61: "Orianna",
   516: "Ornn",
   80: "Pantheon",
   78: "Poppy",
   555: "Pyke",
   246: "Qiyana",
   133: "Quinn",
   497: "Rakan",
   33: "Rammus",
   421: "Rek'Sai",
   526: "Rell",
   888: "Renata Glasc",
   58: "Renekton",
   107: "Rengar",
   92: "Riven",
   68: "Rumble",
   13: "Ryze",
   360: "Samira",
   113: "Sejuani",
   235: "Senna",
   147: "Seraphine",
   875: "Sett",
   35: "Shaco",
   98: "Shen",
   102: "Shyvana",
   27: "Singed",
   14: "Sion",
   15: "Sivir",
   72: "Skarner",
   37: "Sona",
   16: "Soraka",
   50: "Swain",
   517: "Sylas",
   134: "Syndra",
   223: "Tahm Kench",
   163: "Taliyah",
   91: "Talon",
   44: "Taric",
   17: "Teemo",
   412: "Thresh",
   18: "Tristana",
   48: "Trundle",
   23: "Tryndamere",
   4: "Twisted Fate",
   29: "Twitch",
   77: "Udyr",
   6: "Urgot",
   110: "Varus",
   67: "Vayne",
   45: "Veigar",
   161: "Vel'Koz",
   711: "Vex",
   254: "Vi",
   234: "Viego",
   112: "Viktor",
   8: "Vladimir",
   106: "Volibear",
   19: "Warwick",
   498: "Xayah",
   101: "Xerath",
   5: "Xin Zhao",
   157: "Yasuo",
   777: "Yone",
   83: "Yorick",
   350: "Yuumi",
   154: "Zac",
   238: "Zed",
   221: "Zeri",
   115: "Ziggs",
   26: "Zilean",
   142: "Zoe",
   143: "Zyra"
}

// Ref
const table = {
   'AurelionSol': 'Aurelion Sol',
   'Belveth': "Bel'Veth",
   'Chogath': "Cho'Gath",
   'DrMundo': 'Dr. Mundo',
   'Fiddlestiks': 'FiddleSticks',
   'JarvanIV': 'Jarvan IV',
   "KSante": "K'Sante",
   "Kaisa": "Kai'Sa",
   'Khazix': "Kha'Zix",
   'KogMaw': "Kog'Maw",
   'Leblanc': 'LeBlanc',
   'LeeSin': 'Lee Sin',
   'MasterYi': 'Master Yi',
   'MissFortune': 'Miss Fortune',
   'MonkeyKng': 'Wukong',
   'Nunu': 'Nunu & Willump',
   'RekSai': "Rek'Sai",
   'Renata': 'Renata Glasc',
   'TahmKench': 'Tahm Kench',
   'TwistedFate': 'Twisted Fate',
   'Velkoz': "Vel'Koz",
   'XinZhao': 'Xin Zhao',
}

export default {
   names,
   table,
   imageName
}