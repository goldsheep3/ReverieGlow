/**
 * "@tconstruct"
 */
ServerEvents.recipes(event => {
    const tic = global.tconstructLib(event);

    // minecolonies 砍刀的匠魂熔炼
    tic.melting("minecolonies:iron_scimitar", "180mb tconstruct:molten_iron", 800, 100).id("kubejs:tconstruct/melting/iron_scimitar");
})