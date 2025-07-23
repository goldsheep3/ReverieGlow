/**
 * "@tconstruct"
 */
ServerEvents.recipes(event => {
    const tic = global.tconstructLib(event);
    const ticHelper = global.tconstructHelper(event);

    // 磨制紫水晶及其制品回收
    tic.melting('createutilities:polished_amethyst', '100mb tconstruct:molten_amethyst', 950, 65).id("kubejs:tconstruct/melting/polished_amethyst");
    tic.melting('createutilities:amethyst_tiles', '50mb tconstruct:molten_amethyst', 950, 34).id("kubejs:tconstruct/melting/amethyst_tiles");
    tic.melting('createutilities:small_amethyst_tiles', '50mb tconstruct:molten_amethyst', 950, 34).id("kubejs:tconstruct/melting/small_amethyst_tiles");
    
    // 真空管的紫水晶浇筑
    tic.castingTable("100mb tconstruct:molten_amethyst", 'createutilities:graviton_tube', 'createutilities:void_steel_sheet', true, 20).id("kubejs:tconstruct/casting/graviton_tube");
    
    // 虚空钢合金
    tic.alloy(["90mb tconstruct:molten_netherite", "250mb tconstruct:molten_ender"], "90mb kubejs:molten_void_steel", 926).id("kubejs:tconstruct/alloy/void_steel");

    // 虚空钢浇筑与熔化
    // ticHelper.castingAndMelting(
    //     'kubejs:molten_void_steel', 90, 'createutilities:void_steel_ingot', 'createutilities:void_steel_block', 9, null, null,
    //     'createutilities:void_steel_sheet', 1, 1, 950
    // );
    // tic.melting()
    ticHelper.castingFluidToItem("kubejs:molten_void_steel", 90, "createutilities:void_steel_ingot", "createutilities:void_steel_block", 9, null, null, "createutilities:void_steel_sheet", 1);
    ticHelper.meltingItemToFluid("kubejs:molten_void_steel", 90, "createutilities:void_steel_ingot", "createutilities:void_steel_block", 9, null, null, "createutilities:void_steel_sheet", 1, 1, 950);



})