// 随机盐值列表
const SALTS = [ 1647436631, 1744152938, 1288351779, 1464783714, 1043580736, 1650422364, 1708336068, 1654986663, 1438344043, 1212971822, 1248856091, 1273614351, 1369109291, 1379448645, 1898471236, 1284780231, 1313144516, 1862847073, 1963978601, 1976991355, 1295043557, 1915353346, 1652369249, 1608096780, 1968250553, 1468518902, 1390343876, 1729145841, 1832000196, 1473309981, 1709723791, 1629998904, 1229372550, 1323577979, 1825203205, 1002548625 ];

/**
 * "@vanilla"
 */
ServerEvents.recipes(event => {

    // 删除所有原有挖掘配方
    const VANILLA_ORES = ["coal","copper","diamond","emerald","glowstone","gold","hardened_diamond","iron","lapis","netherite","nether_gold","quartz","redstone","zinc"]
    VANILLA_ORES.forEach(ore => {
        event.remove({ id: `createoreexcavation:ore_vein_type/${ore}` });
        event.remove({ id: `createoreexcavation:drilling/${ore}` });
    });
    event.remove({ id: 'createoreexcavation:ore_vein_type/water' });
    event.remove({ id: 'createoreexcavation:extractor/water' });

    // 钻石/绿宝石/红石原石块的合成与逆合成
    // todo 处理还没做
    event.shaped('kubejs:raw_diamond_block',
        ['AAA', 'AAA', 'AAA'],
        { A: 'createoreexcavation:raw_diamond' }
    ).id('kubejs:raw_diamond_block');
    event.shaped('kubejs:raw_emerald_block',
        ['AAA', 'AAA', 'AAA'],
        { A: 'createoreexcavation:raw_emerald' }
    ).id('kubejs:raw_emerald_block');
    event.shaped('kubejs:raw_redstone_block',
        ['AAA', 'AAA', 'AAA'],
        { A: 'createoreexcavation:raw_redstone' }
    ).id('kubejs:raw_redstone_block');
    event.shapeless('9x createoreexcavation:raw_diamond',
        ['kubejs:raw_diamond_block']
    ).id('kubejs:raw_diamond_from_block');
    event.shapeless('9x createoreexcavation:raw_emerald',
        ['kubejs:raw_emerald_block']
    ).id('kubejs:raw_emerald_from_block');
    event.shapeless('9x createoreexcavation:raw_redstone',
        ['kubejs:raw_redstone_block']
    ).id('kubejs:raw_redstone_from_block');

})

/**
 * "@tconstruct"
 */
ServerEvents.recipes(event => {

    const tic = global.tconstructLib(event);
    const mek = global.mekanismLib(event);

    // 原添加钻石/绿宝石原石的匠魂处理
    tic.melting('createoreexcavation:raw_diamond', '100mb tconstruct:molten_diamond', 1450, 100).id('kubejs:tconstruct/melting/raw_diamond');
    tic.melting('createoreexcavation:raw_emerald', '100mb tconstruct:molten_emerald', 934, 73).id('kubejs:tconstruct/melting/raw_emerald');

    // 红石原石的mek粉碎处理
    mek.crushing('createoreexcavation:raw_redstone', '3x minecraft:redstone').id('kubejs:mekanism/crushing/raw_redstone');

})

/**
 * "@createoreexcavation"
 */
ServerEvents.recipes(event => {

    /**
     * @description 通用机械：矿井挖掘配方
     * @param {string} item 矿石物品字符串
     * @param {string} showName 自定义显示名称(必填)
     * @param {number} spacing 矿脉生成间隔
     * @param {number} separation 矿脉分离值
     * @param {number} salt 矿脉盐值
     * @param {string} biome 生物群系白名单(默认为`minecraft:is_overworld`)
     * @param {number} ticks 挖掘时间(默认为600)
     * @param {number} needStress 应力需求单位值(默认为256)
     * @param {boolean} needDiamondDrill 是否需要钻石钻头(默认为false)
     * @param {Array} extraItems 额外产物ID数组(可选) `[{item: "2x modid:itemid", chance: 0.25},...]`
     * @param {string} customRecipeId 自定义配方ID(可选)
     */
    function oreExcavationStandard(item, showName, spacing, separation, salt, biome, ticks, needStress, needDiamondDrill, extraItems, customRecipeId) {

        /**
         * @description 物品字符串便携写法辅助解析函数
         * @param {Object|string} val 物品字符串或对象
         * @returns {Array} 解析后的数组或字符串
         */
        function parseItem(val) {
            if (typeof val === "string") {
                val = val.trim();
                // 物品
                if (val.match(/^\d*x /) || val.match(/^1x /) || val.match(/^[a-zA-Z0-9_]+:/)) {
                    let m = val.match(/^(\d*)x ([^ ]+)$/);
                    if (m) {
                        let count = m[1] ? parseInt(m[1]) : 1;
                        let item = m[2];
                        return count > 1 ? [item, count] : [item, 1];
                    }
                    // 直接物品id
                    if (val.match(/^[a-zA-Z0-9_]+:/)) {
                        return [val, 1];
                    }
                }
            }
            // 非法输入返回空数组
            return [];
        };

        needStress = needStress || 256;
        ticks = ticks || 600;
        biome = biome || "minecraft:is_overworld";

        // item: `Nx modid:itemid`
        let parsedItem = parseItem(item);
        if (!parsedItem || parsedItem.length < 2) {
            console.error("oreExcavationStandard: 物品字符串解析失败: " + item);
            return;
        }
        const itemID = parsedItem[0];  // `modid:itemid`
        let modID, itemNameID;
        if (itemID.indexOf(':') < 0) {
            modID = 'minecraft';
            itemNameID = itemID;
        } else {
            modID = itemID.split(':')[0];
            itemNameID = itemID.split(':')[1];
        }
        const recipeID = customRecipeId || itemNameID;
        const veinId = `kubejs:ore_excavation_vein/${recipeID}`;
        const drillingId = `kubejs:ore_excavation_drilling/${recipeID}`;
        const oreItems = [ Item.of(parsedItem[0], parsedItem[1]) ];
        if (extraItems) {
            extraItems.forEach(extraItem => {
                let extraItemChance = extraItem.chance || 0.25;
                let parsedExtra = parseItem(extraItem.item);
                if (parsedExtra && parsedExtra.length >= 2) {
                    oreItems.push(Item.of(parsedExtra[0], parsedExtra[1]).withChance(extraItemChance));
                }
            });
        }
        // 矿井生成配方
        event.recipes.createoreexcavation.vein(showName, parsedItem[0])
            .placement(spacing, separation, salt)
            .biomeWhitelist(biome)
            .id(veinId);
        if (needDiamondDrill) {
            event.recipes.createoreexcavation.drilling(oreItems, veinId, ticks)
                .drill('createoreexcavation:diamond_drill')
                .stress(needStress)
                .id(drillingId);
        } else {
            event.recipes.createoreexcavation.drilling(oreItems, veinId, ticks)
                .stress(needStress)
                .id(drillingId);
        }

    };

    // 创建矿井挖掘配方
    const oes = oreExcavationStandard;
    // 分布倍数
    const N = 1;

    // SALTS 顺序分配
    let saltIdx = 0;

    // minecraft:is_overworld
    oes('minecraft:coal', '{"translate":"item.minecraft.coal"}', 128*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 200);
    oes('minecraft:raw_copper', '{"translate":"item.minecraft.raw_copper"}', 128*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 300);
    oes('minecraft:raw_iron', '{"translate":"item.minecraft.raw_iron"}', 128*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');
    oes('minecraft:raw_gold', '{"translate":"item.minecraft.raw_gold"}', 192*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');
    oes('createoreexcavation:raw_redstone', '{"translate":"item.createoreexcavation.raw_redstone"}', 192*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');
    oes('createoreexcavation:raw_emerald', '{"translate":"item.createoreexcavation.raw_emerald"}', 256*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');
    oes('6x minecraft:lapis_lazuli', '{"translate":"item.minecraft.lapis_lazuli"}', 192*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 600, 256, false, [{item: 'minecraft:lapis_lazuli', chance: 0.25}]);
    oes('createoreexcavation:raw_diamond', '{"translate":"item.createoreexcavation.raw_diamond"}', 256*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 600, 512);
    oes('create:raw_zinc', '{"translate":"item.create.raw_zinc"}', 128*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');
    oes('mekanism:raw_tin', '{"translate":"item.mekanism.raw_tin"}', 128*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 400);
    oes('mekanism:raw_osmium', '{"translate":"item.mekanism.raw_osmium"}', 192*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');
    oes('mekanism:raw_uranium', '{"translate":"item.mekanism.raw_uranium"}', 192*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');
    oes('3x mekanism:fluorite_gem', '{"translate":"item.mekanism.fluorite_gem"}', 192*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 200);
    oes('mekanism:raw_lead', '{"translate":"item.mekanism.raw_lead"}', 192*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');
    oes('6x thermal:apatite', '{"translate":"item.thermal.apatite"}', 256*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 200, 256, false, [{item: 'thermal:apatite', chance: 0.25}]);
    oes('2x thermal:cinnabar', '{"translate":"item.thermal.cinnabar"}', 256*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 200, 256, false, [{item: 'thermal:cinnabar', chance: 0.5}]);
    oes('4x thermal:niter', '{"translate":"item.thermal.niter"}', 256*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 200);
    oes('4x thermal:sulfur', '{"translate":"item.thermal.sulfur"}', 256*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld', 200);
    oes('thermal:raw_silver', '{"translate":"item.thermal.raw_silver"}', 192*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');
    oes('thermal:raw_nickel', '{"translate":"item.thermal.raw_nickel"}', 256*N, 8, SALTS[saltIdx++], 'minecraft:is_overworld');

    // minecraft:is_nether
    oes('3x minecraft:gold_nugget', '{"translate":"item.minecraft.gold_nugget"}', 192*N, 8, SALTS[saltIdx++], 'minecraft:is_nether', 600, 256, false, [{item: 'minecraft:gold_nugget', chance: 0.75}]);
    oes('minecraft:quartz', '{"translate":"item.minecraft.quartz"}', 128*N, 8, SALTS[saltIdx++], 'minecraft:is_nether');
    oes('minecraft:ancient_debris', '远古残骸', 256*N, 16, SALTS[saltIdx++], 'minecraft:is_nether', 600, 512, true);
    oes('tconstruct:raw_cobalt', '{"translate":"item.tconstruct.raw_cobalt"}', 192*N, 16, SALTS[saltIdx++], 'minecraft:is_nether');

    // kubejs:is_mythicbotany
    // 目前无效
    oes('mythicbotany:raw_elementium', '{"translate":"item.mythicbotany.raw_elementium"}', 192*N, 8, SALTS[saltIdx++], 'mythicbotany:dreamwood_forest');
    oes('botania:dragonstone', '{"translate":"item.botania.dragonstone"}', 256*N, 16, SALTS[saltIdx++], 'minecraft:birch_forest', 600, 512, true);
    oes('minecraft:raw_gold', '{"translate":"item.minecraft.raw_gold"}', 256*N, 8, SALTS[saltIdx++], 'kubejs:is_mythicbotany', 600, 256, false, [], 'mythicbotany_gold');

})