const bookingData = {
    "HotelId": "db1e2e9a-58cf-483a-af1f-e163fb9a04f5",
    "LanguageCode": "en-GB",
    "EndUtc": "2019-09-30T22:00:00.000Z",
    "StartUtc": "2019-09-20T22:00:00.000Z",
    "AdultCount": 2,
    "ChildCount": 0,
    "ProductIds": [],
    "CategoryIds": [
        "78da0a81-0760-4239-a1ec-16e0669bfd18",
        "992c5e9d-9969-4caa-8f7a-ae7c1f03d7f0",
        "bc0098a4-5f4d-42ad-a5d2-00c65b45c396",
        "9a6015f8-06a9-488a-acdc-5614b92365d2",
        "f242c06f-3c22-45a4-bff6-af8d6c7a41ff",
        "7257eb2c-cd0e-430d-967c-da2b6bb5c148"
    ],
    "Client": "Mews Distributor 3.79.6",
    "Session": "100050102054052101098052050048049057045048052045049053084049055058050051058052055090"
};

const hotelData = {
    HotelId: 'db1e2e9a-58cf-483a-af1f-e163fb9a04f5',
    Client: 'Mews Distributor 3.79.6'
};

const weatherData = {
    lat: 48.856614,
    lon: 2.3522219,
    appid: 'd8226f44f17257daa0c78241180a1474'
}

module.exports = {
    Query: {
        getAvailabilities: async (_, __, { dataSources }) => {
            return dataSources.availabilityAPI.getAllAvailabilities(bookingData);
        },
        getRooms: async (_, __, { dataSources }) => {
            return dataSources.availabilityAPI.getRoomsInformations(hotelData);
        },
        getRoom: async (_, { id }, { dataSources }) => {
            return dataSources.availabilityAPI.getRoomInformationsById({ roomId: id, hotelData });
        },
        getWeather: async (_, __, { dataSources }) => {
            return dataSources.weatherAPI.getCurrentWeather(weatherData);
        }
    },
    Room: {
        name: (room, { lang } = { lang: 'US' }) => {
            return lang === 'FR'
                ? room.nameFR
                : room.nameUS;
        },
        description: (room, { lang } = { lang: 'US' }) => {
            return lang === 'FR'
                ? room.descriptionFR
                : room.descriptionUS;
        }
    }
};