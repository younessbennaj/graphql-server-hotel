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

    async getAllAvailabilities(bookingData) {
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