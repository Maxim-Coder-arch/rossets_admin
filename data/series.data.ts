// interface ISeries {
//   _id: string
//   image: string
//   seriesTitle: string
//   seriesId: string
// }

// const seriesData = [
//   {
//     _id: "1", // уникальный id
//     image: "https://sun9-85.userapi.com/s/v1/ig2/NGuWpR_TsLnXtbJkgyJak24kwZkNb63rA1g9rVBV_kkM4wojbh45cK5v2ooTqxPvPn06-QdDlfxSV82V3nDYOxBk.jpg?quality=95&as=32x71,48x107,72x160,108x240,160x356,240x533,360x800,480x1067,540x1200,640x1422,720x1600&from=bu&u=uNcFnP3V6TIQCNfYPXyeZJ7DbhWYcmX7anRV2xkRMJA&cs=640x0", // баннер для серии
//     seriesTitle: "Риббоны", // название серии
//     seriesId: "1", // уникальный идентификатор серии (чтобы можно было соединить с определнными розетками)
//   }
// ]


interface ISeries {
  _id: string
  image: string
  seriesTitle: string
  seriesId: string
}

const seriesData: ISeries[] = [
  {
    _id: "1",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Риббоны",
    seriesId: "1"
  },
  {
    _id: "2",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Значки с лентами",
    seriesId: "2"
  },
  {
    _id: "3",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Рядные розетки",
    seriesId: "3"
  },
  {
    _id: "4",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия Трилистник",
    seriesId: "4"
  },
  {
    _id: "5",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Ринговая серия",
    seriesId: "5"
  },
  {
    _id: "6",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Овальные рядные",
    seriesId: "6"
  },
  {
    _id: "7",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Розетки с органзой",
    seriesId: "7"
  },
  {
    _id: "8",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Розетки с капроном и кружевом",
    seriesId: "8"
  },
  {
    _id: "9",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Двухрядные розетки",
    seriesId: "9"
  },
  {
    _id: "10",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Трёхрядные розетки",
    seriesId: "10"
  },
  {
    _id: "11",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Ринговая серия ЁЖИК",
    seriesId: "11"
  },
  {
    _id: "12",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Титульная розетка PR101/1",
    seriesId: "12"
  },
  {
    _id: "13",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Ринговая серия 304",
    seriesId: "13"
  },
  {
    _id: "14",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Ринговая серия 305",
    seriesId: "14"
  },
  {
    _id: "15",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Ринговая серия 1402",
    seriesId: "15"
  },
  {
    _id: "16",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Ринговая серия 301/302",
    seriesId: "16"
  },
  {
    _id: "17",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Ринговая серия 1601/1602",
    seriesId: "17"
  },
  {
    _id: "18",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Ринговая пара 406/1701",
    seriesId: "18"
  },
  {
    _id: "19",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Ринговая серия 1602",
    seriesId: "19"
  },
  {
    _id: "20",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Ринговая серия 2101",
    seriesId: "20"
  },
  {
    _id: "21",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Ринговая серия 1801",
    seriesId: "21"
  },
  {
    _id: "22",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Ринговая серия 1802",
    seriesId: "22"
  },
  {
    _id: "23",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Ринговая серия 1702",
    seriesId: "23"
  },
  {
    _id: "24",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Ринговая серия 403/402/401",
    seriesId: "24"
  },
  {
    _id: "25",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Ринговая серия 201",
    seriesId: "25"
  },
  {
    _id: "26",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Ринговая пара 202",
    seriesId: "26"
  },
  {
    _id: "27",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Ринговая пара 1502/1501",
    seriesId: "27"
  },
  {
    _id: "28",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Ринговая пара 501/502/503",
    seriesId: "28"
  },
  {
    _id: "29",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Ринговая серия 2001",
    seriesId: "29"
  },
  {
    _id: "30",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Ринговая серия 2402",
    seriesId: "30"
  },
  {
    _id: "31",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Ринговая серия 2401",
    seriesId: "31"
  },
  {
    _id: "32",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Ринговая серия 901",
    seriesId: "32"
  },
  {
    _id: "33",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Ринговая серия 1002",
    seriesId: "33"
  },
  {
    _id: "34",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Ринговая серия 1003/1001",
    seriesId: "34"
  },
  {
    _id: "35",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия ЛЕНА",
    seriesId: "35"
  },
  {
    _id: "36",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Cерия ЕНИСЕЙ",
    seriesId: "36"
  },
  {
    _id: "37",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия ИГАРКА",
    seriesId: "37"
  },
  {
    _id: "38",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия ДВИНА",
    seriesId: "38"
  },
  {
    _id: "39",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Серия КУРЬЯ",
    seriesId: "39"
  },
  {
    _id: "40",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия ПИНЕГА",
    seriesId: "40"
  },
  {
    _id: "41",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия ПИНЕГА I",
    seriesId: "41"
  },
  {
    _id: "42",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Серия ПИНЕГА II",
    seriesId: "42"
  },
  {
    _id: "43",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия ГЕОРГИНЫ",
    seriesId: "43"
  },
  {
    _id: "44",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия ТАЙМЫР",
    seriesId: "44"
  },
  {
    _id: "45",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Серия ВОЛГА",
    seriesId: "45"
  },
  {
    _id: "46",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия ЛАДОГА / ИЛЬМЕНЬ",
    seriesId: "46"
  },
  {
    _id: "47",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия ВОЛХОВ / НЕВА",
    seriesId: "47"
  },
  {
    _id: "48",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Серия ПЕЧОРА",
    seriesId: "48"
  },
  {
    _id: "49",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия МЕЗЕНЬ",
    seriesId: "49"
  },
  {
    _id: "50",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия НЕРО",
    seriesId: "50"
  },
  {
    _id: "51",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Серия ЛОДЬМА",
    seriesId: "51"
  },
  {
    _id: "52",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия ВЫЧЕГДА",
    seriesId: "52"
  },
  {
    _id: "53",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия ВАЙМУГА",
    seriesId: "53"
  },
  {
    _id: "54",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Ваймуга II",
    seriesId: "54"
  },
  {
    _id: "55",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия АНГАРА",
    seriesId: "55"
  },
  {
    _id: "56",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия ИЛЕКСА",
    seriesId: "56"
  },
  {
    _id: "57",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Серия СУХОНА",
    seriesId: "57"
  },
  {
    _id: "58",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия СУХОНА II",
    seriesId: "58"
  },
  {
    _id: "59",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия КАМА",
    seriesId: "59"
  },
  {
    _id: "60",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Серия ОНЕГА",
    seriesId: "60"
  },
  {
    _id: "61",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия ИРТЫШ",
    seriesId: "61"
  },
  {
    _id: "62",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия ИРТЫШ II",
    seriesId: "62"
  },
  {
    _id: "63",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Серия ХРИЗАНТЕМА",
    seriesId: "63"
  },
  {
    _id: "64",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Овальные розетки",
    seriesId: "64"
  },
  {
    _id: "65",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия КОТИК",
    seriesId: "65"
  },
  {
    _id: "66",
    image: "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0",
    seriesTitle: "Серия NEST / BASKET",
    seriesId: "66"
  },
  {
    _id: "67",
    image: "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
    seriesTitle: "Серия Ст. ЛОДЬМА",
    seriesId: "67"
  },
  {
    _id: "68",
    image: "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
    seriesTitle: "Серия ОКА",
    seriesId: "68"
  }
];

export { seriesData };