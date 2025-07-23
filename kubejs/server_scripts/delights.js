/**
 * "@tconstruct"
 */
ServerEvents.recipes(event => {
    const tic = global.tconstructLib(event);

    // 各种刀的匠魂熔炼

    // farmersdelight(小刀)
    tic.melting("farmersdelight:iron_knife", "90mb tconstruct:molten_iron", 800, 100).id("kubejs:tconstruct/melting/iron_knife");
    tic.melting("farmersdelight:diamond_knife", "100mb tconstruct:molten_diamond", 1450, 100).id("kubejs:tconstruct/melting/diamond_knife");
    tic.melting("farmersdelight:golden_knife", "90mb tconstruct:molten_gold", 700, 100).id("kubejs:tconstruct/melting/golden_knife");
    tic.melting("farmersdelight:netherite_knife", "90mb tconstruct:molten_netherite", 1250, 100, ["100mb tconstruct:molten_diamond"]).id("kubejs:tconstruct/melting/netherite_knife");
    // nethersdelight(砍刀)
    tic.melting("nethersdelight:iron_machete", "180mb tconstruct:molten_iron", 800, 100).id("kubejs:tconstruct/melting/iron_machete");
    tic.melting("nethersdelight:golden_machete", "180mb tconstruct:molten_gold", 700, 100).id("kubejs:tconstruct/melting/golden_machete");
    tic.melting("nethersdelight:diamond_machete", "200mb tconstruct:molten_diamond", 1450, 100).id("kubejs:tconstruct/melting/diamond_machete");
    tic.melting("nethersdelight:netherite_machete", "90mb tconstruct:molten_netherite", 1250, 100, ["200mb tconstruct:molten_diamond"]).id("kubejs:tconstruct/melting/etherite_machete");
    // butchercraft(屠宰的四种刀)
    tic.melting("butchercraft:butcher_knife", "360mb tconstruct:molten_iron", 800, 100).id("kubejs:tconstruct/melting/butcher_knife");
    tic.melting("butchercraft:skinning_knife", "180mb tconstruct:molten_iron", 800, 100).id("kubejs:tconstruct/melting/skinning_knife");
    tic.melting("butchercraft:gut_knife", "180mb tconstruct:molten_iron", 800, 100).id("kubejs:tconstruct/melting/gut_knife");
    tic.melting("butchercraft:bone_saw", "360mb tconstruct:molten_iron", 800, 100).id("kubejs:tconstruct/melting/bone_saw");

    // aquaculture(鱼刀)
    tic.melting("aquaculture:iron_fillet_knife", "180mb tconstruct:molten_iron", 800, 100).id("kubejs:tconstruct/melting/iron_fillet_knife");
    tic.melting("aquaculture:gold_fillet_knife", "180mb tconstruct:molten_gold", 700, 100).id("kubejs:tconstruct/melting/gold_fillet_knife");
    tic.melting("aquaculture:diamond_fillet_knife", "200mb tconstruct:molten_diamond", 1450, 100).id("kubejs:tconstruct/melting/diamond_fillet_knife");
})