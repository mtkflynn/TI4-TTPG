const {
    broadcastMessage,
    onUiClosedClicked,
    registerStrategyCard,
} = require("./strategy-card");
const {
    Button,
    CheckBox,
    Color,
    Slider,
    Text,
    VerticalBox,
    refObject,
} = require("../../wrapper/api");
const locale = require("../../lib/locale");

let selections = {};
let activatingPlayer;

function getPlayerSelectionBySlot(player) {
    const slot = player.getSlot();
    selections[slot] = selections[slot] || {
        value: 0,
        primary: false,
    };

    return selections[slot];
}

function createUiWidgetFactory() {
    let headerText = new Text()
        .setFontSize(20)
        .setText(locale("strategy_card.leadership.text"));
    let primaryCheckBox = new CheckBox()
        .setFontSize(10)
        .setText(locale("strategy_card.leadership.text.primary"));
    primaryCheckBox.onCheckStateChanged.add((checkBox, player, isChecked) => {
        getPlayerSelectionBySlot(player).primary = isChecked;
    });
    let slider = new Slider().setStepSize(1).setMaxValue(10);
    slider.onValueChanged.add((slider, player, value) => {
        getPlayerSelectionBySlot(player).value = value;
    });
    let closeButton = new Button()
        .setFontSize(10)
        .setText(locale("strategy_card.close.button"));

    closeButton.onClicked.add(onUiClosedClicked);

    let verticalBox = new VerticalBox();
    verticalBox.addChild(headerText);
    verticalBox.addChild(primaryCheckBox);
    verticalBox.addChild(
        new Text()
            .setFontSize(10)
            .setText(locale("strategy_card.leadership.slider_text"))
    );
    verticalBox.addChild(slider);
    verticalBox.addChild(closeButton);

    return verticalBox;
}

const onStrategyCardAdd = (card, player) => {
    selections = {};
    activatingPlayer = player.getSlot();
};

const onStrategyCardSelectionDone = (card, player) => {
    let commandTokenCount = getPlayerSelectionBySlot(player).value;
    if (getPlayerSelectionBySlot(player).primary) commandTokenCount += 3;

    const message = locale("strategy_card.leadership.message", {
        playerName: player.getName(),
        commandTokenCount: commandTokenCount,
    });
    broadcastMessage(message, {}, player);
};

registerStrategyCard(
    refObject,
    createUiWidgetFactory,
    125,
    new Color(0.925, 0.109, 0.141),
    onStrategyCardAdd,
    onStrategyCardSelectionDone
);