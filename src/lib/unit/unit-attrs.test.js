const assert = require('assert')
const locale = require('../locale')
const { UnitAttrsSchema } = require('./unit-attrs-schema')
const { UnitAttrs } = require('./unit-attrs')
const UNIT_ATTRS = require('./unit-attrs.data')
const {
    world,
    MockCard,
    MockCardDetails,
    MockPlayer,
} = require('../../mock/mock-api')

function _getUnitUpgrade(unitName) {
    for (const rawAttrs of UNIT_ATTRS) {
        if ((rawAttrs.upgradeLevel || 1) > 1) {
            return new UnitAttrs(rawAttrs)
        }
    }
    throw new Error('unknown ' + unitName)
}

it('UNIT_ATTRS schema', () => {
    for (const rawAttrs of UNIT_ATTRS) {
        if (!UnitAttrsSchema.validate(rawAttrs)) {
            console.log(rawAttrs)
            assert (false)
        }
    }
})

it('UNIT_ATTRS locale', () => {
    for (const rawAttrs of UNIT_ATTRS) {
        const assertLocaleKey = (localKey) => {
            const s = locale(localKey)
            if (s === localKey) {
                console.error(rawAttrs)
            }
            assert(s !== localKey) // yarn dev to (re)build lang
        }
        assertLocaleKey(rawAttrs.localeName)
        const unitModifier = rawAttrs.unitModifier
        if (unitModifier) {
            assertLocaleKey(unitModifier.localeName)
            assertLocaleKey(unitModifier.localeDescription)
        }
    }
})

it('static getDefaultUnitAttrs', () => {
    const fighter = UnitAttrs.getDefaultUnitAttrs('fighter')
    assert(fighter instanceof UnitAttrs)
    assert.equal(fighter.raw.unit, 'fighter')
})

it('static getAllUnitTypes', () => {
    const all = UnitAttrs.getAllUnitTypes()
    assert(all.includes('fighter'))
})

it('static sortUpgradeLevelOrder', () => {
    const carrier2 = _getUnitUpgrade('carrier')
    const carrier3 = _getUnitUpgrade('carrier')
    carrier3.raw.upgradeLevel = 3

    let upgrades = [ carrier2, carrier3 ]
    UnitAttrs.sortUpgradeLevelOrder(upgrades)
    assert.deepEqual(upgrades, [ carrier2, carrier3 ])

    upgrades = [ carrier3, carrier2 ]
    UnitAttrs.sortUpgradeLevelOrder(upgrades)
    assert.deepEqual(upgrades, [ carrier2, carrier3 ])
})

it('static getPlayerUnitUpgrades', () => {
    const myPlayerSlot = 7
    const player = new MockPlayer({
        slot : myPlayerSlot
    })
    const cardObjCarrier2 = new MockCard({
        cardDetails : new MockCardDetails({
            metadata : 'card.technology.unit_upgrade:base/carrier_2'
        }),
        owningPlayerSlot : myPlayerSlot
    })
    const cardObjCruiser2FaceDown = new MockCard({
        cardDetails : new MockCardDetails({
            metadata : 'card.technology.unit_upgrade:base/carrier_2',
            faceUp : false
        }),
        owningPlayerSlot : myPlayerSlot
    })
    let result
    try {
        world.__addObject(cardObjCarrier2)
        world.__addObject(cardObjCruiser2FaceDown)
        result = UnitAttrs.getPlayerUnitUpgrades(player)
    } finally {
        world.__removeObject(cardObjCarrier2)
        world.__removeObject(cardObjCruiser2FaceDown)
    }
    assert.equal(result.length, 1)
    assert.equal(result[0].raw.unit, 'carrier')
    assert.equal(result[0].raw.upgradeLevel, 2)
})

it('name', () => {
    const carrier = UnitAttrs.getDefaultUnitAttrs('carrier')
    assert(carrier instanceof UnitAttrs)
    assert.equal(typeof carrier.name, 'string')
})

it('validate', () => {
    const carrier = UnitAttrs.getDefaultUnitAttrs('carrier')
    assert(carrier instanceof UnitAttrs)
    carrier.validate()

    carrier.raw.unit = false

    // Fail by returning a bool, empty error handler to suppress console log.
    assert(!carrier.validate(err => {}))

    // Fail using custom error handler.
    assert.throws(() => {
        carrier.validate(err => { throw new Error(err) })
    })
})

it('upgrade', () => {
    const carrier = UnitAttrs.getDefaultUnitAttrs('carrier')
    const carrier2 = _getUnitUpgrade('carrier')
    assert.equal(carrier.raw.unit, 'carrier')
    assert.equal(carrier.raw.upgradeLevel, undefined)
    assert.equal(carrier.raw.move, 1)
    assert.equal(carrier2.raw.unit, 'carrier')
    assert.equal(carrier2.raw.upgradeLevel, 2)
    assert.equal(carrier2.raw.move, 2)
    carrier.upgrade(carrier2)
    assert.equal(carrier.raw.unit, 'carrier')
    assert.equal(carrier.raw.upgradeLevel, 2)
    assert.equal(carrier.raw.move, 2)
})

it('reject upgrade mismatch', () => {
    const carrier = UnitAttrs.getDefaultUnitAttrs('carrier')
    const cruiser2 = _getUnitUpgrade('cruiser')
    assert.throws(() => {
        UnitAttrs.upgrade(carrier, cruiser2)
    })
})
