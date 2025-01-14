const assert = require("../../wrapper/assert-wrapper");
const { SimpleDie } = require("./simple-die");

class RollGroup {
    static roll(dice, callback) {
        assert(Array.isArray(dice));
        for (const die of dice) {
            assert(die instanceof SimpleDie);
        }
        assert(typeof callback === "function");

        const perDieCallback = (simpleDie) => {
            assert(simpleDie instanceof SimpleDie);
            for (const die of dice) {
                if (die.isRolling()) {
                    return;
                }
            }
            // All dice finished rolling!
            callback(dice);
        };

        for (const die of dice) {
            die.roll(perDieCallback);
        }
    }
}

module.exports = { RollGroup };
