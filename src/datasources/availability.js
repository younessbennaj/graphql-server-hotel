const { RESTDataSource } = require('apollo-datasource-rest');

class AvailabilityAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://www.mews.li/api/distributor/v1/hotels/';
    }

    roomCategoryReducer(roomCategory) {
        return {
            id: roomCategory.RoomCategoryId || 0
        };
    }

    roomReducer(room) {
        return {
            id: room.Id,
            nameUS: room.Name['en-US'],
            nameFR: room.Name['fr-FR'] || room.Name['en-US'],
            descriptionUS: room.Description['en-US'],
            descriptionFR: room.Description['fr-FR'] || room.Description['en-US'],
            image: `https://cdn.mews.li/media/image/${room.ImageIds[0]}?&width=1024&height=576`
        }
    }

    async getAllAvailabilities({ adultCount, childCount, startDate, endDate }) {
        const bookingData = {
            "HotelId": "db1e2e9a-58cf-483a-af1f-e163fb9a04f5",
            "LanguageCode": "en-GB",
            "EndUtc": endDate,
            "StartUtc": startDate,
            "AdultCount": adultCount,
            "ChildCount": childCount,
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

        const response = await this.post('getAvailability', bookingData);
        return response.RoomCategoryAvailabilities.map(roomCategory => this.roomCategoryReducer(roomCategory));
    }

    async getRoomsInformations(data) {
        const response = await this.post('get', data);
        return response.RoomCategories.map(room => this.roomReducer(room));
    }

    async getRoomInformationsById({ roomId, hotelData }) {
        const response = await this.post('get', hotelData);
        const room = response.RoomCategories.find(room => roomId === room.Id);
        return this.roomReducer(room);
    }
}

module.exports = AvailabilityAPI;