const mountain = [
   0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,38,39,39,40,40,41,41,42,42,43,43,44,44,45,45,46,46,47,47,48,48,49,49,50,50,51,51,52,52,53,53,54,54,55,55,56,57,58,58,59,59,60,60,61,61,62,62,63,63,64,64,65,65,66,66,67,67,68,68,69,69,70,70,71,71,72,72,73,73,74,74,75,76,77,77,78,78,79,79,80,80,81,81,82,82,83,83,84,84,85,85,86,86,87,87,88,88,89,89,90,90,91,91,92,92,93,93,94,95,96,96,97,97,98,98,99,99,100,100,101,101,102,102,103,103,104,104,105,105,106,106,107,107,108,108,109,109,110,110,111,111,112,112,113,114,115,115,116,116,117,117,118,118,119,119,120,120,121,121,122,122,123,123,124,124,125,125,126,126,127,127,128,128,129,129,130,130,131,131,132,133,134,134,135,135,136,136,137,137,138,138,139,139,140,140,141,141,142,142,143,143,144,144,145,145,146,146,147,147,148,148,149,149,150,150,151,152,153,153,154,154,155,155,156,156,157,157,158,158,159,159,160,160,161,161,162,162,163,163,164,164,165,165,166,166,167,167,168,168,169,169,170,171,172,172,173,173,174,174,175,175,176,176,177,177,178,178,179,179,180,180,181,181,182,182,183,183,184,184,185,185,186,186,187,187,188,188,189,190,191,191,192,192,193,193,194,194,195,195,196,196,197,197,198,198,199,199,200,200,201,201,202,202,203,203,204,204,205,205,206,206,207,207,208,209,210,210,211,211,212,212,213,213,214,214,215,215,216,216,217,217,218,218,219,219,220,220,221,221,222,222,223,223,224,224,225,225,226,226,227,228,229,229,230,230,231,231,232,232,233,233,234,234,235,235,236,236,237,237,238,238,239,239,240,240,241,241,242,242,243,243,244,244,245,245,246,247,248,248,249,249,250,250,251,251,252,252,253,253,254,254,255,255,256,256,257,257,258,258,259,259,260,260,261,261,262,262,263,263,264,264,265,266,267,267,268,268,269,269,270,270,271,271,272,272,273,273,274,274,275,275,276,276,277,277,278,278,279,279,280,280,281,281,282,282,283,283,284,285,286,286,287,287,288,288,289,289,290,290,291,291,292,292,293,293,294,294,295,295,296,296,297,297,298,298,299,299,300,300,301,301,302,302,303,304,305,305,306,306,307,307,308,308,309,309,310,310,311,311,312,312,313,313,314,314,315,315,316,316,317,317,318,318,319,319,320,320,321,321,322,323,324,324,325,325,326,326,327,327,328,328,329,329,330,330,331,331,332,332,333,333,334,334,335,335,336,336,337,337,338,338,339,339,340,340,341,342,343,343,344,344,345,345,346,346,347,347,348,348,349,349,350,350,351,351,352,352,353,353,354,354,355,355,356,356,357,357,358,358,359,359,360,0,19,19,38,38,57,57,76,76,95,95,114,114,133,133,152,152,171,171,190,190,209,209,228,228,247,247,266,266,285,285,304,304,323,323,342,1,20,20,39,39,58,58,77,77,96,96,115,115,134,134,153,153,172,172,191,191,210,210,229,229,248,248,267,267,286,286,305,305,324,324,343,2,21,21,40,40,59,59,78,78,97,97,116,116,135,135,154,154,173,173,192,192,211,211,230,230,249,249,268,268,287,287,306,306,325,325,344,3,22,22,41,41,60,60,79,79,98,98,117,117,136,136,155,155,174,174,193,193,212,212,231,231,250,250,269,269,288,288,307,307,326,326,345,4,23,23,42,42,61,61,80,80,99,99,118,118,137,137,156,156,175,175,194,194,213,213,232,232,251,251,270,270,289,289,308,308,327,327,346,5,24,24,43,43,62,62,81,81,100,100,119,119,138,138,157,157,176,176,195,195,214,214,233,233,252,252,271,271,290,290,309,309,328,328,347,6,25,25,44,44,63,63,82,82,101,101,120,120,139,139,158,158,177,177,196,196,215,215,234,234,253,253,272,272,291,291,310,310,329,329,348,7,26,26,45,45,64,64,83,83,102,102,121,121,140,140,159,159,178,178,197,197,216,216,235,235,254,254,273,273,292,292,311,311,330,330,349,8,27,27,46,46,65,65,84,84,103,103,122,122,141,141,160,160,179,179,198,198,217,217,236,236,255,255,274,274,293,293,312,312,331,331,350,9,28,28,47,47,66,66,85,85,104,104,123,123,142,142,161,161,180,180,199,199,218,218,237,237,256,256,275,275,294,294,313,313,332,332,351,10,29,29,48,48,67,67,86,86,105,105,124,124,143,143,162,162,181,181,200,200,219,219,238,238,257,257,276,276,295,295,314,314,333,333,352,11,30,30,49,49,68,68,87,87,106,106,125,125,144,144,163,163,182,182,201,201,220,220,239,239,258,258,277,277,296,296,315,315,334,334,353,12,31,31,50,50,69,69,88,88,107,107,126,126,145,145,164,164,183,183,202,202,221,221,240,240,259,259,278,278,297,297,316,316,335,335,354,13,32,32,51,51,70,70,89,89,108,108,127,127,146,146,165,165,184,184,203,203,222,222,241,241,260,260,279,279,298,298,317,317,336,336,355,14,33,33,52,52,71,71,90,90,109,109,128,128,147,147,166,166,185,185,204,204,223,223,242,242,261,261,280,280,299,299,318,318,337,337,356,15,34,34,53,53,72,72,91,91,110,110,129,129,148,148,167,167,186,186,205,205,224,224,243,243,262,262,281,281,300,300,319,319,338,338,357,16,35,35,54,54,73,73,92,92,111,111,130,130,149,149,168,168,187,187,206,206,225,225,244,244,263,263,282,282,301,301,320,320,339,339,358,17,36,36,55,55,74,74,93,93,112,112,131,131,150,150,169,169,188,188,207,207,226,226,245,245,264,264,283,283,302,302,321,321,340,340,359,18,37,37,56,56,75,75,94,94,113,113,132,132,151,151,170,170,189,189,208,208,227,227,246,246,265,265,284,284,303,303,322,322,341,341,360
]

const wallOne = [
   8,26,26,43,43,68,68,89,89,100,100,123,123,133,133,153,153,171,171,195,195,193,193,207,207,216,216,223,223,241,241,258,258,283,283,301,301,330,330,341,
   4,22,22,39,39,57,57,85,85,102,102,110,110,129,129,149,149,167,167,185,185,189,189,203,203,212,212,243,243,260,260,275,275,293,293,316,316,339,
   2,17,17,35,35,53,53,77,77,91,91,106,106,125,125,145,145,163,163,182,199,208,208,247,247,264,264,279,279,297,297,322,322,334,
   17,63,63,81,81,95,95,118,118,139,139,159,159,177,177,199,337,326,326,311,311,285,
   303,290,290,272,272,255,255,231,231,225,225,173,173,155,155,135,135,114,114,70,70,45,45,28,28,6,48,13,13,0,
   8,4,4,2,2,0,0,9,9,6,
   9,31,31,48,
   26,22,22,17,17,13,13,31,31,28,
   68,57,57,53,53,63,63,48,
   89,85,85,77,77,81,81,74,74,70,70,11,
   133,129,129,125,125,118,118,114,
   153,149,149,145,145,139,139,135,
   171,167,167,163,163,159,159,155,155,143,
   193,189,189,177,
   195,185,185,182,182,177,177,173,173,197,
   216,203,203,199,199,225,225,235,235,218,
   223,212,212,208,208,220,220,231,231,238,238,229,
   241,243,243,247,247,251,251,255,
   258,260,260,264,264,268,268,272,
   283,275,275,279,279,285,285,290,290,303,303,314,
   301,293,293,297,297,311,306,320,306,303,
   330,316,316,322,322,326,
   341,339,339,334,334,337,337,332,332,336,
   332,306,306,285
]

const wallTwo = [
   8,24,24,42,42,81,81,101,101,134,134,155,155,175,175,196,196,226,226,247,247,238,
   6,20,20,38,38,75,75,97,97,130,130,150,150,163,163,191,191,217,217,223,223,243,243,236,
   205,183,183,171,171,136,136,124,
   231,239,239,220,220,205,205,187,187,167,167,142,142,124,124,111,111,93,93,67,67,52,52,34,34,16,16,4,
   2,12,12,30,30,47,47,62,62,90,90,106,106,121,106,86,86,83,86,73,83,71,
   83,103,103,117,117,146,146,159,159,179,179,202,202,210,210,205,205,217,217,226,202,198,
   229,233,233,213,213,210,
   0,9,9,27,27,44,
   8,6,6,4,4,2,2,0,0,26,
   24,20,20,16,16,12,
   42,38,38,34,34,30,44,56,44,47,47,58,
   81,75,75,67,67,62,
   101,97,97,93,93,90,
   130,134,134,130,130,124,124,121,121,117,117,115,
   155,150,150,136,136,142,142,146,146,140,
   175,163,163,171,171,167,167,159,159,157,
   196,191,191,183,183,187,187,179,179,177,
   226,223,223,220,220,213,213,200,
   247,243,243,239,239,233,
   238,236,236,231,231,229
]

export default {
   mountain,
   wallOne,
   wallTwo
}