const ATTACHMENTS = [
    {
        localeName: "token.attachment.biotic_facility",
        cardNsid: "card.exploration.industrial:pok/biotic_research_facility",
        tokenNsid: "token.attachment.exploration:pok/biotic_facility",
        faceUp: {
            resources: 1,
            influence: 1,
        },
        faceDown: { tech: ["green"] },
    },
    {
        localeName: "token.attachment.cybernetic_facility",
        cardNsid:
            "card.exploration.industrial:pok/cybernetic_research_facility",
        tokenNsid: "token.attachment.exploration:pok/cybernetic_facility",
        faceUp: { resources: 1, influence: 1 },
        faceDown: { tech: ["yellow"] },
    },
    {
        localeName: "token.attachment.dmz",
        cardNsid: "card.exploration.cultural:pok/demilitarized_zone",
        tokenNsid: "token.attachment.exploration:pok/dmz",
    },
    {
        localeName: "token.attachment.dyson_sphere",
        cardNsid: "card.exploration.cultural:pok/dyson_sphere",
        tokenNsid: "token.attachment.exploration:pok/dyson_sphere",
        faceUp: { resources: 2, influence: 1 },
    },
    {
        localeName: "token.wormhole.gamma",
        cardNsid: "card.exploration.frontier:pok/gamma_relay",
        tokenNsid: "token.wormhole.exploration:pok/gamma",
        spawn: true, // do not move one on map!
    },
    {
        localeName: "token.wormhole.gamma",
        cardNsid: "card.exploration.cultural:pok/gamma_wormhole",
        tokenNsid: "token.wormhole.exploration:pok/gamma",
        spawn: true, // do not move one on map!
    },
    {
        // Unit modifier handles space cannon.
        localeName: "token.attachment.geoform",
        cardNsid: "card.leader.hero.ul:pok/ul_the_progenitor", // LEADER/HERO!
        tokenNsid: "token.attachment.ul:pok/geoform",
        faceUp: {
            resources: 3,
            influence: 3,
        },
    },
    {
        localeName: "token.exploration.ion_storm",
        cardNsid: "card.exploration.frontier:pok/ion_storm",
        tokenNsid: "token.exploration:pok/ion_storm",
    },
    {
        localeName: "token.attachment.lazax_survivors",
        cardNsid: "card.exploration.hazardous:pok/lazax_survivors",
        tokenNsid: "token.attachment.exploration:pok/lazax_survivors",
        faceUp: { resources: 1, influence: 2 },
    },
    {
        localeName: "token.attachment.mining_world",
        cardNsid: "card.exploration.hazardous:pok/mining_world",
        tokenNsid: "token.attachment.exploration:pok/mining_world",
        faceUp: { resources: 2 },
    },
    {
        localeName: "token.exploration.mirage",
        cardNsid: "card.exploration.frontier:pok/mirage",
        tokenNsid: "token.exploration:pok/mirage",
        extraCardNsids: [
            "card.planet:pok/mirage",
            "card.legendary_planet:pok/mirage_flight_academy",
        ],
    },
    {
        localeName: "token.attachment.nano_forge",
        cardNsid: "card.relic:codex.affinity/nanoforge", // RELIC!
        tokenNsid: "token.attachment.exploration:pok/nano_forge",
        faceUp: { resources: 2, influence: 2, legendary: true },
    },
    {
        localeName: "token.attachment.paradise_world",
        cardNsid: "card.exploration.cultural:pok/paradise_world",
        tokenNsid: "token.attachment.exploration:pok/paradise_world",
        faceUp: { influence: 2 },
    },
    {
        localeName: "token.attachment.propulsion_facility",
        cardNsid:
            "card.exploration.industrial:pok/propulsion_research_facility",
        tokenNsid: "token.attachment.exploration:pok/propulsion_facility",
        faceUp: { resources: 1, influence: 1 },
        faceDown: { tech: ["blue"] },
    },
    {
        localeName: "token.attachment.rich_world",
        cardNsid: "card.exploration.hazardous:pok/rich_world",
        tokenNsid: "token.attachment.exploration:pok/rich_world",
        faceUp: { resources: 1 },
    },
    {
        localeName: "token.exploration.stellar_converter",
        cardNsid: "card.relic:pok/stellar_converter", // RELIC!
        tokenNsid: "token.exploration:pok/stellar_converter",
    },
    {
        localeName: "token.attachment.terraform",
        cardNsid: "card.promissory.ul:pok/terraform", // PROMISSORY!
        tokenNsid: "token.attachment.ul:pok/terraform",
        faceUp: {
            resources: 1,
            influence: 1,
            traits: ["industrial", "hazardous", "cultural"],
        },
    },
    {
        localeName: "token.attachment.tomb_of_emphidia",
        cardNsid: "card.exploration.cultural:pok/tomb_of_emphidia",
        tokenNsid: "token.attachment.exploration:pok/tomb_of_emphidia",
        faceUp: {
            influence: 1,
            //image: "global/tokens/pok/exploration/exploration_1-1_c.png",
        },
    },

    {
        localeName: "token.attachment.warfare_facility",
        cardNsid: "card.exploration.hazardous:pok/warfare_research_facility",
        tokenNsid: "token.attachment.exploration:pok/warfare_facility",
        faceUp: { resources: 1, influence: 1 },
        faceDown: { tech: ["red"] },
    },
];

module.exports = { ATTACHMENTS };
