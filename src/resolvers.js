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
        getAvailabilities: async (_, { adult, child, start, end }, { dataSources }) => {
            return dataSources.availabilityAPI.getAllAvailabilities({
                adultCount: adult,
                childCount: child,
                startDate: start,
                endDate: end
            });
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