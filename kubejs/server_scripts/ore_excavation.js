/**
 * "@minecraft"
 */
ServerEvents.recipes(event => {

    // 删除水的矿井
    event.remove({ id: 'createoreexcavation:ore_vein_type/water' });
    event.remove({ id: 'createoreexcavation:extractor/water' });

    // 钻石/绿宝石/红石原石块的合成与逆合成
    // todo 处理还没做
    event.shaped('kubejs:raw_diamond_block',
        ['AAA', 'AAA', 'AAA'],
        { A: 'createexcavation:raw_diamond' }
    ).id('kubejs:raw_diamond_block');
    event.shaped('kubejs:raw_emerald_block',
        ['AAA', 'AAA', 'AAA'],
        { A: 'createexcavation:raw_emerald' }
    ).id('kubejs:raw_emerald_block');
    event.shaped('kubejs:raw_redstone_block',
        ['AAA', 'AAA', 'AAA'],
        { A: 'createexcavation:raw_redstone' }
    ).id('kubejs:raw_redstone_block');
    event.shapeless('9x createexcavation:raw_diamond',
        ['kubejs:raw_diamond_block']
    ).id('kubejs:raw_diamond_from_block');
    event.shapeless('9x createexcavation:raw_emerald',
        ['kubejs:raw_emerald_block']
    ).id('kubejs:raw_emerald_from_block');
    event.shapeless('9x createexcavation:raw_redstone',
        ['kubejs:raw_redstone_block']
    ).id('kubejs:raw_redstone_from_block');

})

/**
 * "@tconstruct"
 */
ServerEvents.recipes(event => {
    
    const tic = global.tconstructLib(event);

    // 原添加钻石/绿宝石原石的匠魂处理
    tic.melting('createoreexcavation:raw_diamond', '100mb tconstruct:molten_diamond', 1450, 100).id('kubejs:tconstruct/melting/raw_diamond');
    tic.melting('createoreexcavation:raw_emerald', '100mb tconstruct:molten_emerald', 934, 73).id('kubejs:tconstruct/melting/raw_emerald');

    // 红石原石的mek粉碎处理
    event.custom({
        "type": "mekanism:crushing",
        "input": {
            "ingredient": {
                "item": "createoreexcavation:raw_redstone"
            }
        },
        "output": {
            "item": "minecraft:redstone",
            "count": 3
        }
    }).id(`kubejs:mekanism/crushing/raw_redstone`);
    

    function oreExcavationStandard(
        item, // 矿石物品
        show_name, // 矿脉显示名称
        spacing, // 矿脉生成间隔
        separation, // 矿脉分离值
        salt, // SALT值
        biome, // 生物群系白名单
        ticks, // 挖掘时间
        stress_value // 应力需求
    ) {
        const itemParts = item.split(':')
        const itemName = itemParts[1] || item
        const veinId = `kubejs:ore_excavation_vein/${itemName}`
        const drillingId = `kubejs:ore_excavation_drilling/${itemName}`

        event.recipes.createoreexcavation.vein(
            show_name,
            item)
            .placement(spacing, separation, salt)
            .biomeWhitelist(biome)
            .id(veinId)

        event.recipes.createoreexcavation.drilling(
            item,
            veinId,
            ticks)
            .stress(256 * stress_value)
            .id(drillingId);
    }

    oreExcavationStandard('mekanism:raw_osmium', '{"translate":"item.mekanism.raw_osmium"}', 256, 64, 130649964, 'minecraft:is_overworld', 150, 1);  // 粗锇
    oreExcavationStandard('mekanism:raw_uranium', '{"translate":"item.mekanism.raw_uranium"}', 384, 64, 845691232, 'minecraft:is_overworld', 150, 1); // 粗铀
    oreExcavationStandard('mythicbotany:raw_elementium', '{"translate":"item.mythicbotany.raw_elementium"}', 640, 128, 326464645, 'kubejs:is_mythicbotany', 300, 1); // 源质钢
    oreExcavationStandard('botania:dragonstone', '{"translate":"item.botania.dragonstone"}', 384, 128, 984265853, 'kubejs:is_mythicbotany', 600, 1); // 龙石
    oreExcavationStandard('thermal:cinnabar', '{"translate":"item.thermal.cinnabar"}', 256, 64, 209623257, 'minecraft:is_overworld', 150, 1); // 朱砂
    oreExcavationStandard('thermal:raw_tin', '{"translate":"item.thermal.raw_tin"}', 256, 128, 657452568, 'minecraft:is_overworld', 150, 1); // 粗锡
    oreExcavationStandard('thermal:raw_lead', '{"translate":"item.thermal.raw_lead"}', 256, 64, 145963254, 'minecraft:is_overworld', 300, 1); // 粗铅
    oreExcavationStandard('thermal:raw_silver', '{"translate":"item.thermal.raw_silver"}', 384, 64, 654353627, 'minecraft:is_overworld', 300, 1); // 粗银
    oreExcavationStandard('thermal:raw_nickel', '{"translate":"item.thermal.raw_nickel"}', 384, 64, 480656534, 'minecraft:is_overworld', 300, 1); // 粗镍
    oreExcavationStandard('tconstruct:raw_cobalt', '{"translate":"item.tconstruct.raw_cobalt"}', 512, 96, 897978035, 'minecraft:is_nether', 300, 1); // 粗钴

    // // 复数产出类矿石
    // let oress = [
    //     // mek10
    //     ['氟石', 'mekanism:fluorite_gem', 'fluorite_gem', 3, 128, 8, 'minecraft:is_overworld', 400, 256, 956624185, 3, 1],
    //     ['硝石', 'thermal:niter', 'niter', 3, 256, 1, 'minecraft:is_overworld', 200, 256, 214186515, 3, 1],
    //     ['硫磺', 'thermal:sulfur', 'sulfur', 3, 192, 1, 'minecraft:is_overworld', 200, 256, 841325421, 3, 1]
    // ];
    // oress.forEach(i => {
    //     ore_excavation2(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11])
    // });
})