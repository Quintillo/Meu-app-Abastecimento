import { GasStation, UserProfile, HistoryItem } from './types';
import palmasRealMap from './assets/images/palmas_real_raster_map_updated_1781794788121.jpg';

export const MAP_IMAGE_URL = palmasRealMap;
export const MINIMAP_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmdqWLmYgDctuuYvghAJSgTgqLlvo9ODb0C8935i60ERbrmaBR8r5-Uw-BHq3VyVP4kCoBr4Te7kY5NHHBd4NsiOYDLZ4YQ3Pc2WAczq_Ghu6vFgJ4Ckv4MO2eMPzUENC11a3Vh4Pybpm2hYP7yYI_O5VRWMJknI0Ectqm8ATPIbmSNbfRg9pvWfHFkcutZ2-1FKtW6IBTe75A-6muE6fCPrXgfQ9S5nD9AlKg7fFQrT_skfsNOpSJq9ANRxOf499vfVubTvJakqk';
export const HERO_COVER_URL = 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=600&auto=format&fit=crop';

export const DEFAULT_STATIONS: GasStation[] = [
  {
    "id": "posto-1-petrolider-75",
    "name": "Petrolíder 75",
    "address": "712 Sul - TO 050 (99284-7467) - Palmas, TO",
    "distance": 0.6,
    "status": "OPEN",
    "closeTime": "23:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYrjvIlTK3GCkJ84E_Ymh2R_cUV3l3_mmWpg&s",
    "coverUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=Wt6e1dfk0IqVDRtG1IBfsw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=270.72617&pitch=0&thumbfov=100",
    "prices": {
      "Gasoline": 7.23,
      "GasolineAdit": 7.23,
      "Ethanol": 5.16,
      "Diesel": 6.61,
      "DieselS10": 6.91
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781715268952,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.226030208157,
    "longitude": -48.31231977914781,
    "region": "SUL"
  },
  {
    "id": "posto-2-auto-posto-eldorado-4",
    "name": "Auto Posto Eldorado 4",
    "address": "Saida P/ Aparecida do Rio Negro (3225-4849) - Palmas, TO",
    "distance": 0.7,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4sSK2ZlSlUToU66YXth7psqZI3PTTknZFaQ&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHx5LpsrgAH1r9soebD0VO0unySh2hP35BRcje9zoFQkCmpxG-K7XEA8B02GUw7GGvC36LeXTSim2hBzZRDxNM9jgqi0KAwHgiTSUNp5RlIGq64AUgCe1qGHPealoOOqvrHatXq=w426-h240-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.29,
      "Ethanol": 5.49,
      "Diesel": 7.17,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781711668952,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.23054069742288,
    "longitude": -48.31029231302542,
    "region": "SUL"
  },
  {
    "id": "posto-3-auto-posto-cantao",
    "name": "Auto Posto Cantão",
    "address": "Próximo Rodoviária - 112 Sul (3217-4010) - Palmas, TO",
    "distance": 0.9,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGm5aH-o2m0UUJssg4O7wku_aOdGbE4z6GkB63218pHUBdghvKPpCnnncZGJVEcoKfjAPvebU4vCeyDeMFftknomVeDsGZ5TQLYrItQHX8SWmSMDG8C_ODGQ8Jet26wBwpuJHU=w408-h307-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGm5aH-o2m0UUJssg4O7wku_aOdGbE4z6GkB63218pHUBdghvKPpCnnncZGJVEcoKfjAPvebU4vCeyDeMFftknomVeDsGZ5TQLYrItQHX8SWmSMDG8C_ODGQ8Jet26wBwpuJHU=w408-h307-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.59,
      "Ethanol": 5.69,
      "Diesel": 7.19,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781708068952,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.251708231058936,
    "longitude": -48.31485199567801,
    "region": "SUL"
  },
  {
    "id": "posto-4-super-posto-lider",
    "name": "Super Posto Líder",
    "address": "1006 Sul, Av. NS 10, Lote 01 (3322-6722/ 99281-7737) - Palmas, TO",
    "distance": 1.1,
    "status": "OPEN",
    "closeTime": "23:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS247apyLGGpBE1L2E-ayJUXnoNbN_Fi9R38Q&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAF0m9mRf11aKl1WnYInET9xnPGInWZDChJM-163J2k3CFCQdoJ3XqW6KYTv3D0hI2sSZCXsL_bf8xXbfkgsAs3cU8HaPxVr-f72lUBn9skKn-ESjPNCMVTCfgPeugcj7b43wo2GnX7MVEhG=w408-h544-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.29,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781704468952,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.247448723420263,
    "longitude": -48.318203685056154,
    "region": "SUL"
  },
  {
    "id": "posto-5-rodoposto",
    "name": "Rodoposto",
    "address": "TO 050 - Próximo viaduto Rodoviária (3228-9090) - Palmas, TO",
    "distance": 1.3,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://instagram.fpmw4-1.fna.fbcdn.net/v/t51.2885-19/44256999_315568332598934_1817460684552667136_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby43NTQuYzIifQ&_nc_ht=instagram.fpmw4-1.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2gEPWwYYgOpFymio1hiWFMxwAP0ILQoGmL_4z5cXBgL-rSpXU_tMrwi3kn33wxu-VWs&_nc_ohc=vAohla4nAf4Q7kNvwFtcCfO&_nc_gid=4Usa6NuXq8XIyevveE44_g&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Af8csviNlEsbHEKhJ3y7u1IThGOaoHwBBJto6Ng6Cq567w&oe=6A389D64&_nc_sid=8b3546",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEEgpeJW3oo2-pnWUOiolVstRSLGCwbyC142v2YXmde2Yl91kHyzeQxs9weYZLZxrtb9n9jj_vw7Ylb7NVs2AsciteMqGFQtdg7mpMACJbI7F6a0kxU4hV7xqFAp5o2WgJ5oxWtDQ=w408-h306-k-no",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 6.99,
      "Ethanol": 5.49,
      "Diesel": 6.69,
      "DieselS10": 6.95
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781700868952,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.24802178062156,
    "longitude": -48.31142192123177,
    "region": "SUL"
  },
  {
    "id": "posto-6-posto-san-marino",
    "name": "Posto San Marino",
    "address": "806 Sul - NS 10 - ARSE 82 (Matriz) (63 98443-2054/ 63 99215-8880) - Palmas, TO",
    "distance": 1.4,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWeomAb_1O5BnpnVslYFhgDakrShUwAU23zA&s",
    "coverUrl": "https://www.google.com/maps/place/Posto+San+Marino/@-10.2352506,-48.3180525,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIC4tO_8eQ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAHOGrBGYwAVled2lOY3w3B7VSS10PJ4QDcFecpZVWAA0O6HdzfwVShCdt2XHkHjrz7LmTnTa0q88pJfV345SEwnlpAd7uO3dn8De8iLUg-q5FrE4D4zv1VVORFhSLWuRzs8TjHU%3Dw203-h152-k-no!7i3264!8i2448!4m13!1m5!3m4!2zMTDCsDE0JzA4LjAiUyA0OMKwMTknMDUuNSJX!8m2!3d-10.2355597!4d-48.318199!3m6!1s0x933b33806d3beb37:0x764d2afb83f12508!8m2!3d-10.235697!4d-48.318258!10e5!16s%2Fg%2F11c6f6k8hq?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.29,
      "Ethanol": 4.99,
      "Diesel": 6.61,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781697268952,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.235707537750207,
    "longitude": -48.31824315145088,
    "region": "SUL"
  },
  {
    "id": "posto-7-posto-sagres",
    "name": "Posto Sagres",
    "address": "Conj. 02 - Qd. 1401 Sul Av. Lo 33, Lt 01 (98445-1376) - Palmas, TO",
    "distance": 1.6,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1SsJSmlvBl2Smu3pcTGdcX0sfSf-p8WhxKA&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHddNzrK9gLbWbD1wFy5GGmDxsAlyQ5ag6ek9OTrrgYxs7YYrRUxTfdEbxVOukuvNnFLwlqX1sALt2LG4Kli74F65NBpBdcfPA0pYUcpWWCOJWQXQzpbW-ZmxGjWKq1z601Js_xyIMfGR8X=w408-h544-k-no",
    "prices": {
      "Gasoline": 6.84,
      "GasolineAdit": 6.84,
      "Ethanol": 5.1,
      "Diesel": 6.89,
      "DieselS10": 7
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781693668952,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.272504572541724,
    "longitude": -48.33530409098246,
    "region": "SUL"
  },
  {
    "id": "posto-8-posto-rodopetro",
    "name": "Posto Rodopetro",
    "address": "Q.1112 Sul AV.  LO 27 (98425-1436) - Palmas, TO",
    "distance": 1.8,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZ33uTxGQPiO80DbDDVdUNYGLCP6gHpEn2w&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH5oUIwpmxRe_YBS7psgiLnzpeQdCfqjJLtRLnhVRC5jYEmnimOPQ0r0LSIp1G7JISUmLHTLMjdTHmSMLA6VohWjAaSYWDnNknfYe8EGscneh3OmOj64kHH0nw6Mnf9BnXUHS4=w408-h307-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.19,
      "Ethanol": 5.69,
      "Diesel": 6.99,
      "DieselS10": 6.99
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781690068952,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.255587101165547,
    "longitude": -48.314281948345126,
    "region": "SUL"
  },
  {
    "id": "posto-9-petrolider-112",
    "name": "Petrolíder 112",
    "address": "1106 Sul - NS 4 (99284-7467) - Palmas, TO",
    "distance": 1.9,
    "status": "OPEN",
    "closeTime": "23:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYrjvIlTK3GCkJ84E_Ymh2R_cUV3l3_mmWpg&s",
    "coverUrl": "https://www.google.com/maps/place/Petrolider/@-10.2505398,-48.3238512,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDk5taBtwE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAEgpdrrvso3iO1yO_5tFZsuUM5YG0Btkluu4cRUPu35Qv-PUu5z6O8azJkAymizYT7vI0razdUrQSpSPd4S89nUVvxh-GyIueWf2-mcAWem8B6KQbS6Mf_DNN-ZwZ58EA9L1DFu%3Dw203-h152-k-no!7i4032!8i3024!4m13!1m5!3m4!2zMTDCsDE1JzAxLjQiUyA0OMKwMTknMjYuMiJX!8m2!3d-10.250392!4d-48.3239531!3m6!1s0x933b347380811d91:0x25330fd10f07d100!8m2!3d-10.2505398!4d-48.3238512!10e5!16s%2Fg%2F1pt_gsgbl?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 7.23,
      "GasolineAdit": 7.23,
      "Ethanol": 5.16,
      "Diesel": 6.61,
      "DieselS10": 7.12
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781686468952,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.25052097717555,
    "longitude": -48.32398003477299,
    "region": "SUL"
  },
  {
    "id": "posto-10-petrolider-posto-71",
    "name": "Petrolíder Posto 71",
    "address": "704 Sul - NS 4 (99284-7467) - Palmas, TO",
    "distance": 2.1,
    "status": "OPEN",
    "closeTime": "23:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYrjvIlTK3GCkJ84E_Ymh2R_cUV3l3_mmWpg&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFBN6MfE_KYaroxiu4i-of4wi_B8opYcxsMCf6ERVhLVj6xMB0cCXg_sA-0pZ07H_GAm4tjtQXyHNN_NlHYqlJc2DqfTJWnWVm4MM_PQsULUACQkZH8F4Ricdz5ZRE7Gi9xyGxx=w426-h240-k-no",
    "prices": {
      "Gasoline": 7.23,
      "GasolineAdit": 7.23,
      "Ethanol": 5.16,
      "Diesel": 6.82,
      "DieselS10": 7.12
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781682868952,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.228778589494476,
    "longitude": -48.324803486615245,
    "region": "SUL"
  },
  {
    "id": "posto-11-posto-autovia",
    "name": "Posto Autovia",
    "address": "Av. Palmas Brasil (3224-5196/5699/984012740) - Palmas, TO",
    "distance": 2.3,
    "status": "OPEN",
    "closeTime": "23:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQToyWKkAIh3mysmIX4GYpdfdVcdfeBGErBuw&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGIzR3uq1mV00lI627eiexbDNbNZeaq8qF8DiJZVH_liqFRwhMJXd__pdKhz912isT6Ar3rRxB-BxqihMwwLaFmWoI_-HL4E1Jx7IvR7moAP2ptvyhsfMNmWpV8reH49qGtvIYm=w426-h240-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.28,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781679268952,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.22439945010681,
    "longitude": -48.33536184196815,
    "region": "SUL"
  },
  {
    "id": "posto-12-posto-star",
    "name": "Posto Star",
    "address": "604 Sul - NS 2 (3214-5352) - Palmas, TO",
    "distance": 2.4,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOhqsNb_oM4i70l3JjQwU4MZRPiy5I2OPFLQ&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEmHPnVsiuZsabYcbAtQklOfD2T-0IfWUYVU1lNpJvHe6eQuivOOc8Wnb77JHVbnZxZRAoflxVAMV3DTvx9J0EOj9akAG2HeGw92kmXwcXSeGRpa7QN8ZAhJ35ACUsNs8kGqYlAwg=w408-h306-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.19,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781675668952,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.221965473503193,
    "longitude": -48.32974448302634,
    "region": "SUL"
  },
  {
    "id": "posto-13-petrolider",
    "name": "Petrolíder",
    "address": "404 Sul - NS 2 - (ao lado do extra) (99284-1376) - Palmas, TO",
    "distance": 2.6,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYrjvIlTK3GCkJ84E_Ymh2R_cUV3l3_mmWpg&s",
    "coverUrl": "https://www.google.com/maps/place/Petrol%C3%ADder+41+%7C+404+sul/@-10.2095,-48.3297739,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICExt-MyAE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAEv-7RtAEpA1qLSWFGP96A5qOvpIQL39WGxy3R-07zofuMHj0D2MSZVxCpEs8dF_XOcgz2-J9k_65L5JtBqcpLqElxnnFnDMGjnxnUZf9TaQFeM7oc3nfu_1JwxOU7vXhqtayWl0w%3Dw203-h114-k-no!7i2592!8i1456!4m13!1m5!3m4!2zMTDCsDEyJzMzLjQiUyA0OMKwMTknNDcuMyJX!8m2!3d-10.2092724!4d-48.3298025!3m6!1s0x933b34baa79ec93f:0xed2505856bc67e05!8m2!3d-10.2096736!4d-48.3297918!10e5!16s%2Fg%2F1hc4cjkpn?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 7.23,
      "GasolineAdit": 7.23,
      "Ethanol": 5.16,
      "Diesel": 6.61,
      "DieselS10": 7.12
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781672068952,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.20966562739656,
    "longitude": -48.32978816105946,
    "region": "SUL"
  },
  {
    "id": "posto-14-posto-verao",
    "name": "Posto Verão",
    "address": "402 Sul - Avenida LO 9 - Plano Diretor (3219-6600) - Palmas, TO",
    "distance": 2.8,
    "status": "OPEN",
    "closeTime": "23:00",
    "logoUrl": "https://storage.googleapis.com/ecdt-logos/97486534000101/posto_verao_97486534.webp",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGw2aKEk2iFvyynIkR7MpzEWxfEBd3Jmr9iMzO2wEctr3BuwNAWqGCxbPbSKK8Q9FXhCP_K9fANl3dBeIroNS-oCnE9KT756uYM-Z8lw0YNfyZKdbTVy8AwYFdCTcqYFEZAI6Htww=w426-h240-k-no",
    "prices": {
      "Gasoline": 7.17,
      "GasolineAdit": 7.27,
      "Ethanol": 5.37,
      "Diesel": 7.45,
      "DieselS10": 8.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781668468952,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.204992241824538,
    "longitude": -48.33132121818214,
    "region": "SUL"
  },
  {
    "id": "posto-15-auto-posto-61",
    "name": "Auto Posto 61",
    "address": "Qd. 603 Sul, Av NS 01 (3026-2599) - Palmas, TO",
    "distance": 3,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://instagram.fpmw4-1.fna.fbcdn.net/v/t51.2885-19/271232545_984397609159653_6901883212108379527_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby42NDguYzIifQ&_nc_ht=instagram.fpmw4-1.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2gHVcmGtRkBggb2cr_vc1rb3nKOKTYpdTVh5uSm34DQBlI2ltcP6KPBYeTQ6NN1vTSw&_nc_ohc=Fa8sm_iAAC8Q7kNvwGZTeH2&_nc_gid=fjpZ_OEb352EkohhKL7etw&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Af8kDfqtDB-T_Bix5XJ1-o68ijCA57gCWz3-n7E7HjBaZA&oe=6A38B423&_nc_sid=8b3546",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHTy83Eb8axgHCdoPSb5jOca9TlUPn0LvwNwaEGwRlad653X9lWLyMMKMa5lfwK82YIGowBXW2Yb7GOps_zC35WqJrQRZyepNK29-L5n4f1A3E-4zgeAhoqBL8QsFb3L2-eKw9E=w408-h544-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.19,
      "Ethanol": 5.29,
      "Diesel": 6.61,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781664868952,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.219193809867873,
    "longitude": -48.33694839523762,
    "region": "SUL"
  },
  {
    "id": "posto-16-auto-posto-perequete",
    "name": "Auto Posto Perequeté",
    "address": "Q. 712 Sul Alameda 1, 3 - Palmas, TO",
    "distance": 3.1,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEfqIBliZox2LdIt1cjxWpww-hWA4i-XgVSTbL-8B-x0AvTqMljE-G05afPmYsaFbS0GlHUQR9DdfwpxxETDHxPfftgMfvEDvspfwII3B48q5DcwmCfa01SwRnKTXhWYexbmuxrStZmP7Yz=w426-h240-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEfqIBliZox2LdIt1cjxWpww-hWA4i-XgVSTbL-8B-x0AvTqMljE-G05afPmYsaFbS0GlHUQR9DdfwpxxETDHxPfftgMfvEDvspfwII3B48q5DcwmCfa01SwRnKTXhWYexbmuxrStZmP7Yz=w426-h240-k-no",
    "prices": {
      "Gasoline": 7.18,
      "GasolineAdit": 7.18,
      "Ethanol": 5.29,
      "Diesel": 6.61,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781661268952,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.226687761058942,
    "longitude": -48.31510704705979,
    "region": "SUL"
  },
  {
    "id": "posto-17-auto-posto-araguaia",
    "name": "Auto Posto Araguaia",
    "address": "712 Sul Alameda 04 lote 61 QI- 03 (3216-1202/9 9973-0245) - Palmas, TO",
    "distance": 3.3,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8FIlIwn6CrJ1tEOaxUhjp2ZHFmd843GOnw&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHwr5R-vEauDk3BLJq7jaMIA1qvcmiGk5YKtWKy7KGCeyAadW4-74bOIizTSP53vwiUyvngAw8hTtUc1UaEn5WI_fHXCVZHfCHTEkJlN1jP_4lfGiB1mLHgUl7l8V-eWRg1Ae2WUA=w408-h306-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.59,
      "Ethanol": 5.69,
      "Diesel": 7.19,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781657668953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.227199729599059,
    "longitude": -48.31771036427575,
    "region": "SUL"
  },
  {
    "id": "posto-18-posto-central",
    "name": "Posto Central",
    "address": "602 Sul - lo 13 -lado Defensoria Pública (3217-2356) - Palmas, TO",
    "distance": 3.5,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEOPA-INeYTUKCEJm6CHSj8PcUxTnUHy3J7IjZhvucgv0k-N66GD9FaXzW5NK_uBg3L2rsYJ5mcUPgQl4L6EgjmqR3ZrhQlpt2sZtveWVMqvn1WWcCG1HZsV9U6U4zsNbni-2m9=w408-h306-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEOPA-INeYTUKCEJm6CHSj8PcUxTnUHy3J7IjZhvucgv0k-N66GD9FaXzW5NK_uBg3L2rsYJ5mcUPgQl4L6EgjmqR3ZrhQlpt2sZtveWVMqvn1WWcCG1HZsV9U6U4zsNbni-2m9=w408-h306-k-no",
    "prices": {
      "Gasoline": 7.23,
      "GasolineAdit": 7.4,
      "Ethanol": 5.78,
      "Diesel": 6.61,
      "DieselS10": 8.35
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781654068953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.21792622527859,
    "longitude": -48.3314226314576,
    "region": "SUL"
  },
  {
    "id": "posto-19-posto-j-ferro",
    "name": "Posto J Ferro",
    "address": "LO - 27 (ao lado da Eadcon) (98435-4821/ 3216-1700) - Palmas, TO",
    "distance": 3.6,
    "status": "OPEN",
    "closeTime": "23:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPRDCG_RApkdtt7TUlcvglY9DSugDkWabt8g&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAENlvNqNuu6jwgvn0j3IgCfaoYAbgxVta5YOrwAnkSAk95Ucb0NkP-pHxx4Rx_WaFk02pAa-rB0H3KcAj0_TOSVJ7ZXxRGgQAl6-OR3Ceig0mB3B2vPvF1VdCOaAmk-lVS03PgM5CDV9pC1=w408-h306-k-no",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 6.99,
      "Ethanol": 4.99,
      "Diesel": 6.61,
      "DieselS10": 7.69
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781650468953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.255771244030214,
    "longitude": -48.331007111224324,
    "region": "SUL"
  },
  {
    "id": "posto-20-auto-posto-elite",
    "name": "Auto Posto Elite",
    "address": "804 sul, NS 04 (98124-8871/ 98418-6226/ 3217-) - Palmas, TO",
    "distance": 3.8,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEz_6UZ6MLhzsOOGMtw0W14YepIUVbbSCsTBwfg2enlNrqz2IrXayVaEg_pvrjlnYoUayqL2oausOaUXKMh7F-kncuZcOIszwvVfWLjbu0Tkfe_6JgLqwNKrTEktap2SZSQIyutHQ=w426-h240-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEz_6UZ6MLhzsOOGMtw0W14YepIUVbbSCsTBwfg2enlNrqz2IrXayVaEg_pvrjlnYoUayqL2oausOaUXKMh7F-kncuZcOIszwvVfWLjbu0Tkfe_6JgLqwNKrTEktap2SZSQIyutHQ=w426-h240-k-no",
    "prices": {
      "Gasoline": 7.09,
      "GasolineAdit": 7.09,
      "Ethanol": 5.16,
      "Diesel": 7.09,
      "DieselS10": 7.09
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781646868953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.231527062350292,
    "longitude": -48.32464638333399,
    "region": "SUL"
  },
  {
    "id": "posto-21-auto-posto-lago-sul",
    "name": "Auto Posto Lago Sul",
    "address": "501 Sul, Av. LO 11, conj. 02 11.24 (99118-6996) - Palmas, TO",
    "distance": 4,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1t6ehlBUBARxkpXmBmmVGoUNKts_rogpaXQ&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGKdORMVL6mbIXDEA7jPLP6gAExGiiwenNynLkFlQWSGiHhrzZMNXx-49HPGyi29KaTMH2K2M2aXpEv1PmfCjjP7yK8gxlN0Bl10fJ_99LMQn9KmsoNhmXtWhUg4hx56tBMgZmOCQ=w408-h305-k-no",
    "prices": {
      "Gasoline": 7.23,
      "GasolineAdit": 7.33,
      "Ethanol": 5.54,
      "Diesel": 6.61,
      "DieselS10": 7.89
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781643268953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.211145792549534,
    "longitude": -48.33535923810268,
    "region": "SUL"
  },
  {
    "id": "posto-22-posto-gelo-sul",
    "name": "Posto Gelo Sul",
    "address": "1103s, av NS ((99) 99970-0262) - Palmas, TO",
    "distance": 4.1,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://instagram.fpmw4-1.fna.fbcdn.net/v/t51.2885-19/464792893_523474057268555_5373247797017154383_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby40NzEuYzIifQ&_nc_ht=instagram.fpmw4-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gFaxz3mjMCgcLp7o8UJaXixzIAZfjVvkJ7LCVFLAmErI95GhXTVdS5GxGPwYYANglg&_nc_ohc=9yn1_SuYTawQ7kNvwG869KO&_nc_gid=1VnzF2y9_-LlPmC6vMfXiQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Af-mHYT_v701LPrwmQiezdf5oYJwm373SRXxlp-KqojK4Q&oe=6A38AC2F&_nc_sid=8b3546",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFrAtEbz4pcyQsn-0805IKyduEwLVUWaTXZJfDUc1LbOGanK4xtCuPQzTsn3YVDPxRZ4WlBVexVJdVdj_gR-TMIClPrRN670Dr96rMYflUTG3OVUVmNQjOO01SXI-uVFI5I2cfJdA=w426-h240-k-no",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 7.09,
      "Ethanol": 5.19,
      "Diesel": 6.61,
      "DieselS10": 6.99
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781639668953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.250258031956765,
    "longitude": -48.343111029328206,
    "region": "SUL"
  },
  {
    "id": "posto-23-auto-posto-barbosao",
    "name": "Auto Posto Barbosão",
    "address": "Qd arso 122, av NS 5, Pac s/n Lt 01 ((63) 98478 1400) - Palmas, TO",
    "distance": 4.3,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://drive.google.com/file/d/1pPRwCnkQihLcHAuyu-jRaN6Qt83MguTU/view?usp=sharing",
    "coverUrl": "https://drive.google.com/file/d/1pPRwCnkQihLcHAuyu-jRaN6Qt83MguTU/view?usp=sharing",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 6.99,
      "Ethanol": 4.99,
      "Diesel": 6.99,
      "DieselS10": 6.99
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781636068953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.256757330945442,
    "longitude": -48.34353785960418,
    "region": "SUL"
  },
  {
    "id": "posto-24-posto-san-marino-ii",
    "name": "Posto San Marino II",
    "address": "Qd 906 sul, av Ns 4, 281. (63 99995-6800) - Palmas, TO",
    "distance": 4.5,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWeomAb_1O5BnpnVslYFhgDakrShUwAU23zA&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFEIARqOxpMOBwtGVoxZvpktDkw1egcOM0tvfsm1JHV6ZJx8mZycoqSDMu4q9Ipggr01RPoHNrq9oild7p8H6M49hwdibRwIIyXdTJ9egVsxWy5oIGA2Ak2PHjUVFq_DU4hpXBr6VwAZH0=w408-h725-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.29,
      "Ethanol": 5.19,
      "Diesel": 6.79,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781718868953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.239032413863827,
    "longitude": -48.32398151557038,
    "region": "SUL"
  },
  {
    "id": "posto-25-posto-primavera",
    "name": "Posto Primavera",
    "address": "204 sul , Av. NS2 Lote 1 (3215-1199/3219-6600) - Palmas, TO",
    "distance": 4.7,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://storage.googleapis.com/ecdt-logos/97486534000101/posto_verao_97486534.webp",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFVzlC4loUqnwBWsBZIri2o5dL2eEdTIsRUbYtpdqojAQZ1cwTbIO__8usxcIwiQgekqQlQEADF1XQ7KCO7Vzd7dElbUyC_ZMc8OwbngohtssXE9kV7iIyd3TinaQ-U3ysutv6uW_dDdk8=w428-h240-k-no",
    "prices": {
      "Gasoline": 7.17,
      "GasolineAdit": 7.27,
      "Ethanol": 5.37,
      "Diesel": 6.61,
      "DieselS10": 8.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781715268953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.19283643252379,
    "longitude": -48.329999235516155,
    "region": "CENTRAL"
  },
  {
    "id": "posto-26-posto-casa-tua",
    "name": "Posto Casa Tua",
    "address": "212 Sul - Av LO 3 c/TO 050 (99245-9229/3213-3534) - Palmas, TO",
    "distance": 4.8,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC3JiO_-49eqriRLofVh0wJY5SA30fAME7sQ&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGNiTUdXk-_1aJYE6pK5Z5nbX4r7pvH5_cl5-uMXucmY8s8HRUA5RfwQ-6W1SIDIzOP__JkzGchObLq5VLxD_iIvsdSO4EY6bmFkLrjHrXHH-lauJXQ7CqCRtvz8TNkVy1fGD_UAIZshvst=w408-h272-k-no",
    "prices": {
      "Gasoline": 7.18,
      "GasolineAdit": 7.18,
      "Ethanol": 5.17,
      "Diesel": 6.79,
      "DieselS10": 7.08
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781711668953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.194157456555269,
    "longitude": -48.30272718169036,
    "region": "CENTRAL"
  },
  {
    "id": "posto-27-posto-jk",
    "name": "Posto JK",
    "address": "110 Norte Av NS10 (Em frente ao (3215 0037/ 63 98139-7794) - Palmas, TO",
    "distance": 0.5,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFSGrHX81wcbON8c_Oz6CG5jBzWyDTsZDhc5OgrG_J9TaPq0XzF3elTyXMQVgcgVxY2Tl6unMeBgNynYKZ_IX5qzWf3prya4GdHOfeo5oiI4-RFDzAeeRnY--2KQOb_wzLhAwlFUs8uK3Gr=w408-h544-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFSGrHX81wcbON8c_Oz6CG5jBzWyDTsZDhc5OgrG_J9TaPq0XzF3elTyXMQVgcgVxY2Tl6unMeBgNynYKZ_IX5qzWf3prya4GdHOfeo5oiI4-RFDzAeeRnY--2KQOb_wzLhAwlFUs8uK3Gr=w408-h544-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.29,
      "Ethanol": 5.49,
      "Diesel": 6.61,
      "DieselS10": 7.99
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781708068953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.182861232831506,
    "longitude": -48.30751153677792,
    "region": "CENTRAL"
  },
  {
    "id": "posto-28-auto-posto-eldorado",
    "name": "Auto Posto Eldorado",
    "address": "206 sul (Arse 22) (3215-2224/ 3215-3211) - Palmas, TO",
    "distance": 0.7,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4sSK2ZlSlUToU66YXth7psqZI3PTTknZFaQ&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHkGqrYzKhmpk29_-aDAoxzNzo6lJ8q0qPbiJ0Yu2hfs6qTxDj6sIetsVswKjJEYfdh3JXCZ1s5ZJU3f2KwVL4RS4EDefZa62xk2eVfd78WD0c9pHonl-ECQ8ET043eIGEzR72D=w426-h240-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.29,
      "Ethanol": 5.49,
      "Diesel": 7.17,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781704468953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.193080147003194,
    "longitude": -48.32434134525434,
    "region": "CENTRAL"
  },
  {
    "id": "posto-29-posto-milena",
    "name": "Posto Milena",
    "address": "207 Sul - acima BPM - HGP (3215-5163/63 9997-00278) - Palmas, TO",
    "distance": 0.8,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://instagram.fpmw4-1.fna.fbcdn.net/v/t51.82787-19/624328027_17848778097669901_7628986427963889381_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDAwLmMyIn0&_nc_ht=instagram.fpmw4-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2gFNhAgI8dXI6bB4yMq60tZGUEI_5IQqFDJDDd9H6v2_iAAeBXaplwkVdO_-40aOsR0&_nc_ohc=1c5laNedTfgQ7kNvwFzOq5k&_nc_gid=_QGv5-f36BsAfs4LtvqdXA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Af_OD8CVfU8-B6P9uskqZ62a1s5Hfkq63yqaVByn3gIZAw&oe=6A388FB5&_nc_sid=8b3546",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGARlsaixRoCCQ9i5dcDAUEEIL_172sNQG4OSa4iRIG2bUv7iQIIq8irJ_-uC6N-Leri0Jhi5ktvEpXncY-iiihGU64bGsQExi138a8QKU7nIWjTmKVb87ZXP0mYADMWItK89mHa-NQDx0=w408-h510-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.24,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.29
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781700868953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.196057681159761,
    "longitude": -48.3499136679995,
    "region": "CENTRAL"
  },
  {
    "id": "posto-30-petroshop-beach",
    "name": "Petroshop Beach",
    "address": "Av. JK, 36, QD 16,LT 02 Graciosa Orla (63 99985-2512) - Palmas, TO",
    "distance": 1,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRajoBrN1TzJ68im7LUaWfyB9ciJ8jIIuIxWg&s",
    "coverUrl": "https://www.google.com/maps/place/PetroShop+-+Com%C3%A9rcio+de+Combust%C3%ADveis/@-10.1850164,-48.3611497,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhBN6Q-LU2JJ5JQEUnspnpzR!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAFVWgzivD4W68N87Dpu829-Uay6ZQwvAr6kq7LECqVDS0F9Nt31F3FuhqzxRfDIHzTk8G2DJWsAo_HzXgrMzOYGBRghL1BYUK6ZdjVJKmD6eB41ZvV4J2MA_-Gp38wdRHnIiiZ6uIz7Skkf%3Dw86-h113-k-no!7i720!8i949!4m7!3m6!1s0x9324cbbea3167e0d:0xdf5108291794f441!8m2!3d-10.1850937!4d-48.3611521!10e5!16s%2Fg%2F11zhy209__?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 6.98,
      "GasolineAdit": 7.08,
      "Ethanol": 5.19,
      "Diesel": 7.19,
      "DieselS10": 7.25
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781697268953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.185085879721688,
    "longitude": -48.361156606873166,
    "region": "CENTRAL"
  },
  {
    "id": "posto-31-posto-luar",
    "name": "Posto Luar",
    "address": "Qd. Arso 32 AV NS 7, QC 01,10 pc Sn (63 98495-0265) - Palmas, TO",
    "distance": 1.2,
    "status": "OPEN",
    "closeTime": "23:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUYyXBtYXYViuCJByvYAdPAHL3DzPp6pB8gQ&s",
    "coverUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=b_ZnBOj_0rSmSn6Sos-NbQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=103.73813&pitch=0&thumbfov=100",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.29,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.29
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781693668953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.202212914852645,
    "longitude": -48.34929524009597,
    "region": "CENTRAL"
  },
  {
    "id": "posto-32-petro",
    "name": "Petro",
    "address": "NS - 01 - Em frente INSS (99287-6507/99238-0423) - Palmas, TO",
    "distance": 1.3,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO3wd92rtCeAHZ3HamxluWAY3_rcgj7tuWKg&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFV-OW2kwycLmP1C-A3D3QuK0xsEPePzasq9Ceh7SJ3Sd0jjQ9QC4Ix2gQ2iFpDETJBgCdBc1SMZUVFEPjCCNS9QXXvexhQBhKDWPbVkJaK7EbN1Ypy6OzjsXswXbr8rfpNcv0Fxx8qSAZf=w408-h408-k-no",
    "prices": {
      "Gasoline": 7.23,
      "GasolineAdit": 7.23,
      "Ethanol": 5.16,
      "Diesel": 6.82,
      "DieselS10": 7.12
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781690068953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.193206524397866,
    "longitude": -48.33735283249269,
    "region": "CENTRAL"
  },
  {
    "id": "posto-33-posto-advento",
    "name": "Posto Advento",
    "address": "308 Sul - Fundos IFTO (3225-2064) - Palmas, TO",
    "distance": 1.5,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ53WTANF0yXkUL74M4Twzip7fNADGlxYuDHA&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE2Ue2RcliPTsGawwIoS-bPPFBPQJA0ILcz6olUvqzUPJLMvLYT1TkZy5X31AogXWlDjwA3WqAR32OicPIuTgUnV98JRzWp8pIwseSOi063sTObtyONyaAPQoCcV73zYtmBR13p=w426-h240-k-no",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 7.19,
      "Ethanol": 5.29,
      "Diesel": 7.59,
      "DieselS10": 7.69
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781686468953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.202488750974751,
    "longitude": -48.31846493097471,
    "region": "CENTRAL"
  },
  {
    "id": "posto-34-posto-tucunare",
    "name": "Posto Tucunaré",
    "address": "Av. Ns 08, Q. 110 Sul (99283-5852 / 99283-5869) - Palmas, TO",
    "distance": 1.7,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQqc4D8cft8ZvXIBP1xEkcIEp_sB52AhEW5g&s",
    "coverUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=8uvvGE4sEjUUsyHvjC_j8Q&cb_client=search.gws-prod.gps&w=408&h=240&yaw=106.341125&pitch=0&thumbfov=100",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.19,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.29
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781682868953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.186768015626747,
    "longitude": -48.31365602115833,
    "region": "CENTRAL"
  },
  {
    "id": "posto-35-petrolider-12",
    "name": "Petrolíder 12",
    "address": "105 Norte Av NS-03 (Igreja São Judas) (99284-7467) - Palmas, TO",
    "distance": 1.9,
    "status": "OPEN",
    "closeTime": "23:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYrjvIlTK3GCkJ84E_Ymh2R_cUV3l3_mmWpg&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGpDzce2aXmRSWGjFENwLmUtfmE6G6jbEDrBj5zSE64vrv2eEgfVGemwTneM2_faX2TUKO9JZKCvbDCo6uVpp-jRlc-7XtekXzq-ZJ51x-hU-pG5gy1B3ywrnmajlVVXvK4RNiKkA=w408-h306-k-no",
    "prices": {
      "Gasoline": 7.23,
      "GasolineAdit": 7.23,
      "Ethanol": 5.16,
      "Diesel": 6.82,
      "DieselS10": 7.12
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781679268953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.182694254888272,
    "longitude": -48.34290677645361,
    "region": "CENTRAL"
  },
  {
    "id": "posto-36-super-petro",
    "name": "Super Petro",
    "address": "Av. Tocantins - Santa Fé (63 98445-1376) - Palmas, TO",
    "distance": 2,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS247apyLGGpBE1L2E-ayJUXnoNbN_Fi9R38Q&s",
    "coverUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=hokRV_9Kz8WRgz0mMgj2XA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=83.257195&pitch=0&thumbfov=100",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 6.99,
      "Ethanol": 5.1,
      "Diesel": 6.61,
      "DieselS10": 6.98
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781675668953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.32558979818388,
    "longitude": -48.29706002362587,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-37-posto-modelo",
    "name": "Posto Modelo",
    "address": "Aureny III - Proximo entrada Aeroporto (3571-5216/5205) - Palmas, TO",
    "distance": 2.2,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyyHQa5zrDEXSQdjuWgSZhbFRaDIY851Yuw&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHBPEmIY9mWfZlzDGwtO5iCxjvIvDO5Y_G0DBZMYC4dOvw0k8W1f0hTfwncusmHvWEM-e-ZWOwhS-yAmQsMTrX6nAmuGEqrWpVSpPQkl9ypKVEcLUqOJlkr0jllGk6m2e8eIexqrcOx_g1S=w408-h340-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.39,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.49
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781672068953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.315408631836796,
    "longitude": -48.319997996805995,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-38-auto-posto-serra-do-carmo",
    "name": "Auto Posto Serra do Carmo",
    "address": "Aureny I - Av. TO, QNE 14 (63 98445-1257) - Palmas, TO",
    "distance": 2.4,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://instagram.fpmw4-1.fna.fbcdn.net/v/t51.2885-19/488624477_1057585032879304_2514825801429797965_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby41MDAuYzIifQ&_nc_ht=instagram.fpmw4-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2gHsBW3kDbXAtI5eUkvg3BcFCObRzOJwKUufjPtAVJ5xvwZBxAVcnTaqbUZdtuRQ4To&_nc_ohc=Recn2tzFiCkQ7kNvwHSqFt5&_nc_gid=5YPyHRaEfhcUg0rA1BSIeg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Af-w9U90hs-1cfFZ3TyPxzfv7s4IPyWGl_LXIFwvJdUJLg&oe=6A38A272&_nc_sid=8b3546",
    "coverUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=0sA5uvWKaKyKvZqZJQQ02g&cb_client=search.gws-prod.gps&w=408&h=240&yaw=353.086&pitch=0&thumbfov=100",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 6.99,
      "Ethanol": 5.09,
      "Diesel": 7.2,
      "DieselS10": 7.35
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781668468953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.315820882237986,
    "longitude": -48.2981316333918,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-39-posto-serra-do-carmo-iii",
    "name": "Posto Serra do Carmo III",
    "address": "jardim Aureny III. AV. H,QD 7, Lt 15 - Palmas, TO",
    "distance": 2.5,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://instagram.fpmw4-1.fna.fbcdn.net/v/t51.2885-19/488624477_1057585032879304_2514825801429797965_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby41MDAuYzIifQ&_nc_ht=instagram.fpmw4-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2gHsBW3kDbXAtI5eUkvg3BcFCObRzOJwKUufjPtAVJ5xvwZBxAVcnTaqbUZdtuRQ4To&_nc_ohc=Recn2tzFiCkQ7kNvwHSqFt5&_nc_gid=5YPyHRaEfhcUg0rA1BSIeg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Af-w9U90hs-1cfFZ3TyPxzfv7s4IPyWGl_LXIFwvJdUJLg&oe=6A38A272&_nc_sid=8b3546",
    "coverUrl": "https://www.google.com/maps/place/Rede+Tucunar%C3%A9+Aureny+3/@-10.3210833,-48.3176369,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhA1QF84zQY2po5ctx5jmbuo!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAGrttH9CI5Yq5sto5lOecxz3AMYKTlAOa4ZyFV903eflwPpZ-0TJlFkrrOY8OzgtfG4AmHjHNLgU5vhSSCnbU85qhoLbNQzEKimfBxWooMN_qg-Zs4cfAMsZyMTl4Siq84_GZeFQtU7HSQ%3Dw86-h114-k-no!7i3072!8i4096!4m7!3m6!1s0x933b31006d6658cf:0x8e17e41cea59cd67!8m2!3d-10.3210859!4d-48.3173678!10e5!16s%2Fg%2F11z2hknmv0?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 6.99,
      "Ethanol": 4.85,
      "Diesel": 6.61,
      "DieselS10": 7.15
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781664868953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.321074064169718,
    "longitude": -48.31736834383575,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-40-auto-posto-vitoria",
    "name": "Auto Posto Vitória",
    "address": "Santa Fé - II Etapa - saída Taquaruçu (99981-1599) - Palmas, TO",
    "distance": 2.7,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEV_WfAGlJnmF4VNCRekAiDWeibjLAte0zorHEuFqfHPWL1c_1arf9dMujTrONEjqRZ7LET2uTeM4msI4-bs4nm9nF3-8jZxCPHoK7XknA1S-p-FpNM_uss7jeCR8Oui4BXyudX=w408-h306-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEV_WfAGlJnmF4VNCRekAiDWeibjLAte0zorHEuFqfHPWL1c_1arf9dMujTrONEjqRZ7LET2uTeM4msI4-bs4nm9nF3-8jZxCPHoK7XknA1S-p-FpNM_uss7jeCR8Oui4BXyudX=w408-h306-k-no",
    "prices": {
      "Gasoline": 6.98,
      "GasolineAdit": 6.98,
      "Ethanol": 5.14,
      "Diesel": 7.49,
      "DieselS10": 7.49
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781661268953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.33364613265929,
    "longitude": -48.282151464679295,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-41-auto-posto-araguaia",
    "name": "Auto Posto Araguaia",
    "address": "Av. B QD 40 Lt 14 - Jardim Aureny IV (3571-4600/ 63 98431-7801) - Palmas, TO",
    "distance": 2.9,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8FIlIwn6CrJ1tEOaxUhjp2ZHFmd843GOnw&s",
    "coverUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=T8j8XSU8bA0MPV6a5BROPw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=1.788228&pitch=0&thumbfov=100",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 6.99,
      "Ethanol": 5.49,
      "Diesel": 6.61,
      "DieselS10": 6.99
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781657668953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.303922757180857,
    "longitude": -48.302687814220214,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-42-auto-posto-vitoria-modelo",
    "name": "Auto Posto Vitória Modelo",
    "address": "Av. I , Jardim Aureny III, s/n (99251-7776) - Palmas, TO",
    "distance": 3,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHBPEmIY9mWfZlzDGwtO5iCxjvIvDO5Y_G0DBZMYC4dOvw0k8W1f0hTfwncusmHvWEM-e-ZWOwhS-yAmQsMTrX6nAmuGEqrWpVSpPQkl9ypKVEcLUqOJlkr0jllGk6m2e8eIexqrcOx_g1S=w408-h340-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHBPEmIY9mWfZlzDGwtO5iCxjvIvDO5Y_G0DBZMYC4dOvw0k8W1f0hTfwncusmHvWEM-e-ZWOwhS-yAmQsMTrX6nAmuGEqrWpVSpPQkl9ypKVEcLUqOJlkr0jllGk6m2e8eIexqrcOx_g1S=w408-h340-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.19,
      "Ethanol": 5.59,
      "Diesel": 6.61,
      "DieselS10": 7.49
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781654068953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.315409732057658,
    "longitude": -48.32000286447566,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-43-posto-disbrava-campeao",
    "name": "Posto Disbrava Campeão",
    "address": "Rua Pernambuco Aureny I (3571-4621/ 99227-5800/) - Palmas, TO",
    "distance": 3.2,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VB6DOXWNPmgzLuH-9VbKIlmltU1OKWeUJg&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHoxJpz8RUyg6NroJCzwR2vKggMPys7LlaBkshwwAJfGqeY2PgGqECTwDm8JtSflMtlYk0JjtAUpOzvdRNgCdGKC2qpdxOVK0zSJAnglUZtPI0BEBTEI8QBzTDWSKLplOW4O9ZA=w556-h240-k-no",
    "prices": {
      "Gasoline": 7.29,
      "GasolineAdit": 7.49,
      "Ethanol": 5.49,
      "Diesel": 7.49,
      "DieselS10": 7.39
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781650468953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.313299698717532,
    "longitude": -48.29771075045888,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-44-posto-tocantins",
    "name": "Posto Tocantins",
    "address": "Av. Tocantins (3571-9147 / 3571-2575) - Palmas, TO",
    "distance": 3.4,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGyI3oqn8fD-YihJqzbFfiFwvT9mHEkVLYmObxGjc4555zon4Yw9h5JaOKC10YTpEhoLlaM-G7tA8c527vfSwznNe_lLVzjf5lGfnBq0Zjma29EePojXfcfo_FXIkbPp6IibiE=w408-h281-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGyI3oqn8fD-YihJqzbFfiFwvT9mHEkVLYmObxGjc4555zon4Yw9h5JaOKC10YTpEhoLlaM-G7tA8c527vfSwznNe_lLVzjf5lGfnBq0Zjma29EePojXfcfo_FXIkbPp6IibiE=w408-h281-k-no",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 7.05,
      "Ethanol": 5.16,
      "Diesel": 7.2,
      "DieselS10": 7.35
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781646868953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.340352003443089,
    "longitude": -48.29306090568315,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-45-posto-modelo",
    "name": "Posto Modelo",
    "address": "Rod. TO 50 km 18 Qd 25 PAC LTs 5 e (3571-1049/1047 / 98488-5807) - Palmas, TO",
    "distance": 3.6,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyyHQa5zrDEXSQdjuWgSZhbFRaDIY851Yuw&s",
    "coverUrl": "https://www.google.com/maps/place/Posto+Modelo/@-10.3396087,-48.2996261,3a,75y,308.1h,90t/data=!3m5!1e1!3m3!1saxGLhdnbJ01YvpZfRf2c1Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DaxGLhdnbJ01YvpZfRf2c1Q%26yaw%3D308.10034!4m13!1m5!3m4!2zMTDCsDIwJzIxLjgiUyA0OMKwMTcnNTkuNSJX!8m2!3d-10.3393892!4d-48.2998622!3m6!1s0x933b3a0ac85740d7:0x459025a39dd1990a!8m2!3d-10.3394077!4d-48.2998866!10e5!16s%2Fg%2F11g015msjl?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.19,
      "Ethanol": 5.69,
      "Diesel": 7.19,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781643268953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.339403489661862,
    "longitude": -48.29988940645739,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-46-auto-posto-capital",
    "name": "Auto Posto capital",
    "address": "AV.Taquarassú, Qd. 40, lt 11 s/nº - - Palmas, TO",
    "distance": 3.7,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7OUbRLDB2ZzXDqhFlagxEyJu2cvDYyzNskg&s",
    "coverUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=fZOkjBrejeI1EoCBP7rwPw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=145.53053&pitch=0&thumbfov=100",
    "prices": {
      "Gasoline": 7.18,
      "GasolineAdit": 7.18,
      "Ethanol": 5.39,
      "Diesel": 7.49,
      "DieselS10": 7.69
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781639668953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.338577970953287,
    "longitude": -48.29320772658545,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-47-auto-posto-ipanema",
    "name": "Auto Posto Ipanema",
    "address": "AV. Ipanema s/n QD 23 LT 04, ST (99222-8446) - Palmas, TO",
    "distance": 3.9,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKwAp9n57zld0pUixEEGPS9Oexjo3cMwI_Kw&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE9jS6SZ994rhIIfYBk5yyIJgSTpd-R4fj4IpymuSmYXEqqEEXrujNQAnKbCUqPPsH6tzoNEU2ctfiRSQRmtLnB7sD2t4cLbt4i5e1-RAYGo_sd66MZmNcuNsLMHEI-hixNhrhCiw=w408-h306-k-no",
    "prices": {
      "Gasoline": 6.98,
      "GasolineAdit": 6.98,
      "Ethanol": 5.15,
      "Diesel": 7.19,
      "DieselS10": 7.29
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781636068953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.35059627042887,
    "longitude": -48.29014172483222,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-48-posto-aerotrevo",
    "name": "Posto Aerotrevo",
    "address": "Av. T. Segurado, Trevo Aeroporto (63 3224-1559) - Palmas, TO",
    "distance": 4.1,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcoTy6_waD7gkqh1AUtLl6HTiFC7w161BjEA&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFN4PUZ5iMBTv-B9LFT8Kmm8zFc_1sd9PzNg6HuJXKM-iUUGMQLWLoe5FMr91g2wtUfN8Orw-f1aPY3-3iP-RrTraURdBnkJjsMj4dU3ahmHkjArICt6DCaVoN_CwwoizK5lLE-RM7Ufal4=w408-h258-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.59,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.39
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781718868953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.314865451156333,
    "longitude": -48.32442968525164,
    "region": "TAQUARALTO"
  },
  {
    "id": "posto-49-auto-posto-vitoria-iii",
    "name": "Auto Posto Vitória III",
    "address": "Taquaruçu (3554-1407/98498-9662/ 99981) - Palmas, TO",
    "distance": 4.2,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEM8qVvGU5e-m_ysE7ZP-HZ43vp9L_kwClOiJNNIDk4pBZ1y0_yZS5ymXjYW0Un1aQf6rzUD6hTifut0odLhv-cgyVHugkepT8rZUJFedWKNeWGVfec1_ldzVTt5wf5P1IVpNFn=w408-h306-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEM8qVvGU5e-m_ysE7ZP-HZ43vp9L_kwClOiJNNIDk4pBZ1y0_yZS5ymXjYW0Un1aQf6rzUD6hTifut0odLhv-cgyVHugkepT8rZUJFedWKNeWGVfec1_ldzVTt5wf5P1IVpNFn=w408-h306-k-no",
    "prices": {
      "Gasoline": 6.96,
      "GasolineAdit": 6.96,
      "Ethanol": 5.14,
      "Diesel": 7.39,
      "DieselS10": 7.39
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781715268953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.311587990857904,
    "longitude": -48.16320364890225,
    "region": "TAQUARUÇU"
  },
  {
    "id": "posto-50-auto-posto-quatro-rodas",
    "name": "Auto Posto Quatro Rodas",
    "address": "Taquari (98414-9262/ 98418-9697) - Palmas, TO",
    "distance": 4.4,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFkxDdi4Bk-rRHfE-6qajzxkrVkZZoB36Ew78wDzyoDzrgzS_tywgOi4ZdDmULzXb146d-XRtw6NaRQAL7PU_t9RY1yr7mkV_zOJ3e9kzEijQVJawOzOVBx7NH3fcgmOxKl1Qancg=w426-h240-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFkxDdi4Bk-rRHfE-6qajzxkrVkZZoB36Ew78wDzyoDzrgzS_tywgOi4ZdDmULzXb146d-XRtw6NaRQAL7PU_t9RY1yr7mkV_zOJ3e9kzEijQVJawOzOVBx7NH3fcgmOxKl1Qancg=w426-h240-k-no",
    "prices": {
      "Gasoline": 6.94,
      "GasolineAdit": 6.94,
      "Ethanol": 5.16,
      "Diesel": 6.61,
      "DieselS10": 6.91
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781711668953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.345461461902119,
    "longitude": -48.32587841424673,
    "region": "TAQUARI"
  },
  {
    "id": "posto-51-auto-posto-taquari",
    "name": "Auto Posto Taquari",
    "address": "Quadra T31, TLO 05, conj. 01, L-2, lote (63 99100- 8188) - Palmas, TO",
    "distance": 4.6,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRohdclgFb4-g7KP4daHWOGpXORQKnhvMozUw&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFEkoROsT-kjq8UE4iQXoMWpY4JEeHai_7EfHm6AbGFeQJ6gpjxW3I4vatZgsYEgf0zTYn4AgarzXO_GbVXzADVi5scRBWiqUry9b3VMrGU5oguLaEhqo9SE9OnsM3AsoULpWIT=w426-h240-k-no",
    "prices": {
      "Gasoline": 6.99,
      "GasolineAdit": 6.99,
      "Ethanol": 5.49,
      "Diesel": 6.99,
      "DieselS10": 7.06
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781708068953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.346136374811659,
    "longitude": -48.33694433900896,
    "region": "TAQUARI"
  },
  {
    "id": "posto-52-auto-posto-shalom",
    "name": "Auto Posto Shalom",
    "address": "Quadra Arne 51, Av. NS 02 (98122-5566/3216-0441) - Palmas, TO",
    "distance": 4.7,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHzwbq5aITvLVNyqP5l73zL9SAIEkc9OVkjw&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFyO4hDDpGRCC_v47NgPhXcnG7j3DtumLKyXIpjBVY9oRePydO_5yNUsufwgH0Q08-EdG3Of2Psw4m7mITY8EGAbHCVZ-cnwX53lCILu5jKF8CZd58hbH89Yp8sja2T6Mx0c4A=w408-h510-k-no",
    "prices": {
      "Gasoline": 7.18,
      "GasolineAdit": 7.18,
      "Ethanol": 5.17,
      "Diesel": 6.99,
      "DieselS10": 6.99
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781704468953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.167869596895422,
    "longitude": -48.325775315251924,
    "region": "NORTE"
  },
  {
    "id": "posto-53-posto-avanth-ipiranga-iii",
    "name": "Posto Avanth (Ipiranga III)",
    "address": "406 N Av. NS 6 s/n (98138-6699/3026-) - Palmas, TO",
    "distance": 0.4,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://instagram.fpmw4-1.fna.fbcdn.net/v/t51.2885-19/449710656_330755063304032_2452823590193531709_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4zOTYuYzIifQ&_nc_ht=instagram.fpmw4-1.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2gHsM24sG659NYbZYMzq4zGZav9bI2zqexsABopzP0r2glF1EgpAaiLrBPaYBDXHXbM&_nc_ohc=kV7kDB2uCbIQ7kNvwGqYd_l&_nc_gid=FYCEvSp_snJ9c0FBcElI7g&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Af_kQtv9mwOztGAuuZhVx3jsYnuVavVBIeW9nXJeNpc-sw&oe=6A38BCC9&_nc_sid=8b3546",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAECdfgajh3uAX6vmtXPxzYUoWgTnLFCDHMsnmL5R3GDVg4qj0LIpO4NJnatc4-VdblIaTQRKPI75sbD4UzTtj0dule3pN6HUkMi4l3gWUD3mrM_GowyI5oy074wQr5ShhaL_Zb7=w408-h544-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.39,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.39
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781700868953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.168691721003572,
    "longitude": -48.317786588982905,
    "region": "NORTE"
  },
  {
    "id": "posto-54-auto-posto-palacinho",
    "name": "Auto Posto Palacinho",
    "address": "408 Norte NS-10 (Prox ao Posto JK) (99991-0301/ 3215-7898/3215) - Palmas, TO",
    "distance": 0.6,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://www.google.com/maps/place/Posto+Petrobras/@-10.1714364,-48.3076592,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgID9rKLzWQ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAFTG69fIsS1YFkg8u67AyKEtypcpQ7mxf0Yd_A_ZDHIeI_7WMHhsM7wbUwq0k2KvMpKGq4CKgI2bdaXu-uuE1JWgJY_-YphPNMKAzRywwxqep29JVX1JzcIsMvNdB6OcYMnHd3K%3Dw203-h135-k-no!7i1600!8i1066!4m13!1m5!3m4!2zMTDCsDEwJzE3LjUiUyA0OMKwMTgnMjcuNSJX!8m2!3d-10.1715379!4d-48.3076282!3m6!1s0x933b33f5e9ad1d2d:0xeb7ffbc95d937db8!8m2!3d-10.1714363!4d-48.3076576!10e5!16s%2Fg%2F11bttnxyds?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "coverUrl": "https://www.google.com/maps/place/Posto+Petrobras/@-10.1714364,-48.3076592,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgID9rKLzWQ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAFTG69fIsS1YFkg8u67AyKEtypcpQ7mxf0Yd_A_ZDHIeI_7WMHhsM7wbUwq0k2KvMpKGq4CKgI2bdaXu-uuE1JWgJY_-YphPNMKAzRywwxqep29JVX1JzcIsMvNdB6OcYMnHd3K%3Dw203-h135-k-no!7i1600!8i1066!4m13!1m5!3m4!2zMTDCsDEwJzE3LjUiUyA0OMKwMTgnMjcuNSJX!8m2!3d-10.1715379!4d-48.3076282!3m6!1s0x933b33f5e9ad1d2d:0xeb7ffbc95d937db8!8m2!3d-10.1714363!4d-48.3076576!10e5!16s%2Fg%2F11bttnxyds?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 7.18,
      "GasolineAdit": 7.18,
      "Ethanol": 5.14,
      "Diesel": 7.15,
      "DieselS10": 7.4
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781697268953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.171424985762542,
    "longitude": -48.30764780060592,
    "region": "NORTE"
  },
  {
    "id": "posto-55-posto-serra-geral-iii",
    "name": "Posto Serra Geral III",
    "address": "501 Norte - Av NS 01 ((63) 99196792) - Palmas, TO",
    "distance": 0.8,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tcjo7Uh3awQq8Mg9TQofr7drEjKrFL7nzQ&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGlHU24qlnC6Rha796_50EZhaaBQd6KYY51bb7Qq5qDxcYCJzvWCeVzgbZH-YkzjjQgPNIAwVLMyFGpogBospWWU8RVo86XdgiSqwRqWBq6JGeCoJeyQtPTD_79oInxLM4sgQPt1Q=w493-h240-k-no",
    "prices": {
      "Gasoline": 6.98,
      "GasolineAdit": 6.98,
      "Ethanol": 5.25,
      "Diesel": 6.61,
      "DieselS10": 7.05
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781693668953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.157839659774451,
    "longitude": -48.32580023811367,
    "region": "NORTE"
  },
  {
    "id": "posto-56-posto-disbrava",
    "name": "Posto Disbrava",
    "address": "QD 106 N AL 17 LT 24 AV NS 06 (98132-0266/ 98442-0281/3215-7222) - Palmas, TO",
    "distance": 0.9,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VB6DOXWNPmgzLuH-9VbKIlmltU1OKWeUJg&s",
    "coverUrl": "https://www.google.com/maps/place/Posto+Disbrava+-+Matriz/@-10.1837481,-48.319619,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDD16_kLQ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAEhEoMHcHL1HsQ3FxcAg1XzSm0FRcI83c1Rf1NjxD8rn3yCE5_nknpQIo4wuoulPyjOlm33CSJDzl9Vab1WeIvm5Oa7V_W7z5Ap5XKOAXiUXOHtAx_J2X8LqwxoE8fzm41eFAE%3Dw86-h114-k-no!7i3024!8i4032!4m13!1m5!3m4!2zMTDCsDExJzAwLjUiUyA0OMKwMTknMTAuMyJX!8m2!3d-10.1834664!4d-48.3195249!3m6!1s0x9324cb5f790f5983:0xf0dc61f3d5bd062!8m2!3d-10.1835826!4d-48.3195625!10e5!16s%2Fg%2F11cm3y_v05?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 7.29,
      "GasolineAdit": 7.49,
      "Ethanol": 5.49,
      "Diesel": 6.61,
      "DieselS10": 7.29
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781690068953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.183573060411172,
    "longitude": -48.319555705801804,
    "region": "NORTE"
  },
  {
    "id": "posto-57-auto-posto-leal",
    "name": "Auto Posto Leal",
    "address": "506 Norte Av 508- s/n (3322-1803/3322-1805) - Palmas, TO",
    "distance": 1.1,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHwdpF3XKacTzJ1zlzQbqcHxz5PjVtZXdNWuZ0WXinzTiq3SnCBqr6xRIX2ezA56DNpMqNvK92lvCdJlh4ow-f-Z_W_Fwm0FePQcRRImbVgOf1t28_fspvf_howQZTHjIyswnNZrQ=w408-h306-k-no",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHwdpF3XKacTzJ1zlzQbqcHxz5PjVtZXdNWuZ0WXinzTiq3SnCBqr6xRIX2ezA56DNpMqNvK92lvCdJlh4ow-f-Z_W_Fwm0FePQcRRImbVgOf1t28_fspvf_howQZTHjIyswnNZrQ=w408-h306-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.19,
      "Ethanol": 5.25,
      "Diesel": 7.15,
      "DieselS10": 7.3
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781686468953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.167059416654066,
    "longitude": -48.31235693494699,
    "region": "NORTE"
  },
  {
    "id": "posto-58-posto-petroshop",
    "name": "Posto Petroshop",
    "address": "412 N Rod. TO Pac 01 lt 01 (3571-1658) - Palmas, TO",
    "distance": 1.3,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8SoPLMN4pPfMgRtd2ZBuzU465JiUWci5Tg&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAENbPvUZybvFP7rX_nPVxeTcrjsR5uybCxavJa1-50FpdlqVOa9gNqbZAeNR1-ffUHL9sDlxsLFKwhwlQu6BOSUux1cYXebLY9Vcnz379fjCy26RYqOgp7YeQJWGlaHj4UeBQCSuJh1OzD0=w533-h240-k-no",
    "prices": {
      "Gasoline": 6.98,
      "GasolineAdit": 7.08,
      "Ethanol": 5.19,
      "Diesel": 7.19,
      "DieselS10": 7.29
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781682868953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.170228503212122,
    "longitude": -48.30116616251151,
    "region": "NORTE"
  },
  {
    "id": "posto-59-auto-posto-eldorado-da-32",
    "name": "Auto Posto Eldorado da 32",
    "address": "305 Norte Av NS-05 (3224-1060) - Palmas, TO",
    "distance": 1.4,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4sSK2ZlSlUToU66YXth7psqZI3PTTknZFaQ&s",
    "coverUrl": "https://www.google.com/maps/place/Posto+Eldorado+2/@-10.1656074,-48.347055,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICu-q7CTA!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAF4Xh3JKiIePKSGn0jfd7RYm8Awz3LVIVBycwjLYbrZmAuqbFd0j2vCu7GpDQqnM9dXAPYMFlG2qn_kOdY6_Kb2gjyxirtPTnl-uoxWX4nnCSni_xfr3aPnbFMEhd2o0Hb32yk%3Dw86-h114-k-no!7i3468!8i4624!4m13!1m5!3m4!2zMTDCsDA5JzU1LjYiUyA0OMKwMjAnNDkuNSJX!8m2!3d-10.1654481!4d-48.3470899!3m6!1s0x9324cba652cc896f:0x3cf9b727ade4bc46!8m2!3d-10.1656065!4d-48.346988!10e5!16s%2Fg%2F1hc63zlnl?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.29,
      "Ethanol": 5.49,
      "Diesel": 7.17,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781679268953,
    "verified": true,
    "services": [
      "store",
      "car-wash",
      "ev-charging"
    ],
    "latitude": -10.165598137020625,
    "longitude": -48.34703163667289,
    "region": "NORTE"
  },
  {
    "id": "posto-60-auto-posto-disbrava",
    "name": "Auto Posto Disbrava",
    "address": "405 Norte AL 07 (3571-4390) - Palmas, TO",
    "distance": 1.6,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VB6DOXWNPmgzLuH-9VbKIlmltU1OKWeUJg&s",
    "coverUrl": "https://www.google.com/maps/place/Posto+Disbrava+%E2%80%93+Filial/@-10.1610685,-48.3466694,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICu7In48AE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAHiUuUEmPbWeHIXkFgHcDy5biVsBLzArmLQIr4ntIRcRwGaUU06RfXIF388_wRcQZQZ5zxj_QYoTNfBnzJZtNVEo-d0XRFRjdfImdacS14VgjJ_ISvpBle7d-COgyOAw3y-dKLUSQ%3Dw203-h152-k-no!7i1280!8i960!4m13!1m5!3m4!2zMTDCsDA5JzM4LjIiUyA0OMKwMjAnNDcuNiJX!8m2!3d-10.1606161!4d-48.3465508!3m6!1s0x9324cba14a0a2b5b:0xd13f29dafc517b81!8m2!3d-10.1609118!4d-48.3464328!10e5!16s%2Fg%2F11b6hytbx7?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 7.29,
      "GasolineAdit": 7.49,
      "Ethanol": 5.49,
      "Diesel": 7.29,
      "DieselS10": 7.29
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781675668953,
    "verified": true,
    "services": [
      "store"
    ],
    "latitude": -10.160896110854859,
    "longitude": -48.34643126676954,
    "region": "NORTE"
  },
  {
    "id": "posto-61-postos-araguaia",
    "name": "Postos Araguaia",
    "address": "106 N , AL 02, PAC 02 ((63) 3216-0182) - Palmas, TO",
    "distance": 1.8,
    "status": "OPEN",
    "closeTime": "22:00",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8FIlIwn6CrJ1tEOaxUhjp2ZHFmd843GOnw&s",
    "coverUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFR-seyI2GzG1MNL3PRpL_V6XGYlLggHDdqLVbQoJaiwzr3KlzMXBpxC4oU6g-Asy7kUK6JRjyGMWqWillCkTt2pJc9lXwjPIHl_9A_9nA5iRJHfoSOMX9F2kGQi5vJwRBkkIVb1w=w431-h240-k-no",
    "prices": {
      "Gasoline": 7.19,
      "GasolineAdit": 7.59,
      "Ethanol": 5.69,
      "Diesel": 6.61,
      "DieselS10": 7.19
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781672068953,
    "verified": true,
    "services": [
      "store",
      "car-wash"
    ],
    "latitude": -10.180037825318314,
    "longitude": -48.3246131164059,
    "region": "NORTE"
  },
  {
    "id": "posto-62-posto-disbrava",
    "name": "Posto Disbrava",
    "address": "101 Norte Av NS 1 nº 1 (3225-6777/63 98104-2727) - Palmas, TO",
    "distance": 1.9,
    "status": "OPEN",
    "closeTime": "24h",
    "logoUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VB6DOXWNPmgzLuH-9VbKIlmltU1OKWeUJg&s",
    "coverUrl": "https://www.google.com/maps/place/Posto+Disbrava+%E2%80%93+G2/@-10.1773829,-48.3360921,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhDMTGpu762OXD224NC5JyAW!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAENFJfKOv94X9oSTXjPCDG9e6obv1z3DfIv82vKzswqX0WOA59zd1OV_cyuLDJhJhOs_oe8oGjteAE6Fm9BTsmEdz_Fi_qXZGUZYrauMzBQ9pnPp1hkGrMih_9eZXKNRfWNRfscbbnbmKAr%3Dw86-h114-k-no!7i3060!8i4080!4m13!1m5!3m4!2zMTDCsDEwJzM4LjMiUyA0OMKwMjAnMTEuMSJX!8m2!3d-10.1772916!4d-48.3364104!3m6!1s0x9324cb6c544a1797:0xcdbe3ed0dee2e72d!8m2!3d-10.1774922!4d-48.3363514!10e5!16s%2Fg%2F11g6bjjgd5?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D#",
    "prices": {
      "Gasoline": 7.29,
      "GasolineAdit": 7.49,
      "Ethanol": 5.49,
      "Diesel": 7.49,
      "DieselS10": 7.49
    },
    "updatedAt": "Hoje cedo",
    "updatedTimestamp": 1781668468953,
    "verified": true,
    "services": [
      "store",
      "restaurant"
    ],
    "latitude": -10.1774729216322,
    "longitude": -48.336348388423794,
    "region": "NORTE"
  }
];

export const DEFAULT_USER: UserProfile = {
  name: 'Alef Quintillo',
  email: 'quintilloalef@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  points: 420,
  contributionsCount: 14,
  tier: 'Informante de Elite ✪',
  savedStations: ['posto-1-petrolider-75', 'posto-2-auto-posto-eldorado-4']
};

export const DEFAULT_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    stationId: 'posto-1-petrolider-75',
    stationName: 'Petrolíder 75',
    fuelType: 'Gasolina Comum',
    oldPrice: 7.29,
    newPrice: 7.23,
    timestamp: '12m atrás',
    userName: 'Alef Quintillo',
    userPoints: 30
  }
];
