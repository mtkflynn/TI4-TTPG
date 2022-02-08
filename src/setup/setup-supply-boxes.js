const { Layout } = require("../lib/layout");
const { Spawn } = require("./spawn/spawn");
const { ObjectType, world } = require("../wrapper/api");
const assert = require("../wrapper/assert-wrapper");
const { AbstractSetup } = require("./abstract-setup");

const SUPPLY_BOXES_LEFT = {
    shelfCenter: { x: 2.485, y: -46.844, z: 5 },
    arcOrigin: { x: -8.845, y: -15.017, z: 5 },
    tokenNsids: [
        "token:base/infantry_1", // "bottom"
        "token:base/infantry_3",
        "token:base/fighter_1",
        "token:base/fighter_3",
    ],
};

const SUPPLY_BOXES_RIGHT = {
    shelfCenter: { x: -3.878, y: 35, z: 5 },
    arcOrigin: { x: -9.003, y: 3.958, z: 5 },
    tokenNsids: [
        "token:base/tradegood_commodity_3",
        "token:base/tradegood_commodity_1", // "bottom"
    ],
};

const DISTANCE_BETWEEN_SUPPLY_BOXES = 12;

class SetupSupplyBoxes extends AbstractSetup {
    constructor(playerDesk) {
        super();
        this.setPlayerDesk(playerDesk);
    }

    setup() {
        this._setupBoxes(SUPPLY_BOXES_LEFT);
        this._setupBoxes(SUPPLY_BOXES_RIGHT);
    }

    _setupBoxes(boxesData) {
        // Use layout to find positions and rotations along an arc.
        const shelfCenter = this.playerDesk.localPositionToWorld(
            boxesData.shelfCenter
        );
        const arcOrigin = this.playerDesk.localPositionToWorld(
            boxesData.arcOrigin
        );
        const pointPosRots = new Layout()
            .setCount(boxesData.tokenNsids.length)
            .setDistanceBetween(DISTANCE_BETWEEN_SUPPLY_BOXES)
            .setCenter(shelfCenter)
            .layoutArc(arcOrigin)
            .getPoints();

        assert(boxesData.tokenNsids.length == pointPosRots.length);
        for (let i = 0; i < boxesData.tokenNsids.length; i++) {
            this._setupBox(boxesData.tokenNsids[i], pointPosRots[i]);
        }
    }

    _setupBox(tokenNsid, pointPosRot) {
        // Find unit and bag.
        const bagNsid = "bag." + tokenNsid;

        let bag = Spawn.spawn(bagNsid, pointPosRot.pos, pointPosRot.rot);
        bag.clear(); // paranoia
        bag.setObjectType(ObjectType.Ground);

        // Bag needs to have the correct type at create time.  If not infinite, fix and respawn.
        if (bag.getType() !== 1) {
            bag.setType(1);
            const json = bag.toJSONString();
            bag.destroy();
            bag = world.createObjectFromJSON(json, pointPosRot.pos);
            bag.setRotation(pointPosRot.rot);
        }

        const aboveBag = pointPosRot.pos.add([0, 0, 10]);
        const token = Spawn.spawn(tokenNsid, aboveBag, pointPosRot.rot);
        assert(token);
        bag.addObjects([token]);
    }
}

module.exports = { SetupSupplyBoxes };