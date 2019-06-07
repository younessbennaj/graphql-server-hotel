const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    getAvailabilities: [RoomCategory]!
    getRooms: [Room]!
    getRoom(id: ID!): Room
    getWeather: [Weather]
}

type RoomCategory {
    id: ID!
}

type Room {
    id: ID!
    name(lang: LangParam): String
    description(lang: LangParam): String
    image: String
}

type Weather {
    id: ID!
    name: String
}

enum LangParam {
    US
    FR
}

`;

module.exports = typeDefs;