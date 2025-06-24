ServerEvents.recipes(event => {

    const tic = global.tic_lib
    const tic_more = global.tic_morelib

    // 粉碎轮破碎匠魂粘液水晶块
    event.recipes.create.crushing("4x tconstruct:earth_slime_crystal", "tconstruct:earth_slime_crystal_block")
    event.recipes.create.crushing("4x tconstruct:sky_slime_crystal", "tconstruct:sky_slime_crystal_block")
    event.recipes.create.crushing("4x tconstruct:ender_slime_crystal", "tconstruct:ender_slime_crystal_block")
    event.recipes.create.crushing("4x tconstruct:ichor_slime_crystal", "tconstruct:ichor_slime_crystal_block")

    // 各种刀的匠魂熔炼
    const knifes = [
        ["nethersdelight:iron_machete", "tconstruct:molten_iron", 180, 800],
        ["nethersdelight:golden_machete", "tconstruct:molten_gold", 180, 700],
        ["nethersdelight:diamond_machete", "tconstruct:molten_diamond", 200, 1450],
        ["butchercraft:butcher_knife", "tconstruct:molten_iron", 360, 800],
        ["butchercraft:skinning_knife", "tconstruct:molten_iron", 180, 800],
        ["butchercraft:gut_knife", "tconstruct:molten_iron", 180, 800],
        ["butchercraft:bone_saw", "tconstruct:molten_iron", 360, 800],
        ["aquaculture:iron_fillet_knife", "tconstruct:molten_iron", 180, 800],
        ["aquaculture:gold_fillet_knife", "tconstruct:molten_gold", 180, 700],
        ["aquaculture:diamond_fillet_knife", "tconstruct:molten_diamond", 200, 1450],
        ["farmersdelight:iron_knife", "tconstruct:molten_iron", 90, 800],
        ["farmersdelight:diamond_knife", "tconstruct:molten_diamond", 100, 1450],
        ["farmersdelight:golden_knife", "tconstruct:molten_gold", 90, 700],
        ["minecolonies:iron_scimitar", "tconstruct:molten_iron", 180, 800]
    ];
    knifes.forEach(k => {
        // input, output, output_amount, temperature, time
        event.custom(tic.melting({ item: k[0] }, { fluid: k[1], amount: k[2] }, k[3], 100))
    })
    // 下界合金熔铸可出钻石
    event.custom(tic.melting(
        { item: "nethersdelight:netherite_machete" }, { fluid: "tconstruct:molten_netherite", amount: 90 }, 1250, 100, [{ fluid: "tconstruct:molten_diamond", amount: 200 }]
    ))
    event.custom(tic.melting(
        { item: "farmersdelight:netherite_knife" }, { fluid: "tconstruct:molten_netherite", amount: 90 }, 1250, 100, [{ fluid: "tconstruct:molten_diamond", amount: 100 }]
    ))

    // 虚空钢合金
    event.custom(tic.alloy(
        [
            { fluid: 'tconstruct:molten_netherite', amount: 90 },
            { fluid: 'tconstruct:molten_ender', amount: 250 }
        ],
        { fluid: 'kubejs:molten_void_steel', amount: 90 },
        926
    ))
    // 虚空钢浇筑
    tic_more.casting_fti(event, 'kubejs:molten_void_steel', 90, 'createutilities:void_steel_ingot', 'createutilities:void_steel_block', 9, null, null, 'createutilities:void_steel_sheet', 1)
    tic_more.melting_itf(event, 'kubejs:molten_void_steel', 90, 'createutilities:void_steel_ingot', 'createutilities:void_steel_block', 9, null, null, 'createutilities:void_steel_sheet', null, 950)
    // 真空管的紫水晶浇筑
    event.custom(tic.casting_table(
        { fluid: 'tconstruct:molten_amethyst', amount: 100 }, 'createutilities:graviton_tube', { item: 'createutilities:void_steel_sheet', amount: 1 }, true, 20
    ))
    // 磨制紫水晶及其制品回收
    event.custom(tic.melting({ item: 'createutilities:polished_amethyst' }, { fluid: 'tconstruct:molten_amethyst', amount: 100 }, 950, 65))
    event.custom(tic.melting({ item: 'createutilities:amethyst_tiles' }, { fluid: 'tconstruct:molten_amethyst', amount: 50 }, 950, 34))
    event.custom(tic.melting({ item: 'createutilities:small_amethyst_tiles' }, { fluid: 'tconstruct:molten_amethyst', amount: 50 }, 950, 34))

    // 末影人头颅的锦致装饰适配
    // event.recipes.custom(melting_tag("kubejs:enderman_head", "forge:ender", 500, 477, 116))
    // ["quark:gold_bars", "tconstruct:gold_bars"]
})

// ServerEvents.tags("item", event => {
//     event.add("kubejs:enderman_head", "supplementaries:enderman_head")
//     event.add("kubejs:enderman_head", "tconstruct:enderman_head")
// })