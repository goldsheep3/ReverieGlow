// 机械动力：矿石开掘

// 物品熔化
// 需求：匠魂3
function item_melting(input, output, output_amount, temperature, time) {
    return {
        "type": "tconstruct:melting",
        "ingredient": {
            "item": input
        },
        "result": {
            "amount": output_amount,
            "fluid": output
        },
        "temperature": temperature,
        "time": time
    }
}

// 矿脉挖掘
function drilling(vein_id, output_item, ticks, stress_value, priority) {
    return {
        "type": "createoreexcavation:drilling",
        "drill": {
            "tag": "createoreexcavation:drills"
        },
        "output": [
            {
                "item": output_item
            }
        ],
        "priority": priority,
        "stress": 256 * stress_value,
        "ticks": ticks,
        "vein_id": vein_id
    }
}
function drilling2(vein_id, output_item, ticks, stress_value, priority, num) {
    return {
        "type": "createoreexcavation:drilling",
        "drill": {
            "tag": "createoreexcavation:drills"
        },
        "output": [
            {
                "item": `${num}x ${output_item}`
            },
            {
                "item": output_item,
                "chance": 0.5
            }
        ],
        "priority": priority,
        "stress": 256 * stress_value,
        "ticks": ticks,
        "vein_id": vein_id
    }
}

// 矿脉生成
function vein(
    mine_name, // 矿脉探测器探测名
    icon, // 矿脉指示物品
    placement_spacing, // 矿脉生成间隔
    placement_separation, // 矿脉分离值
    biomeWhitelist, // 生物群系白名单列表
    placement_salt, // SALT值
    amountSizeMax, // 有限矿脉MAX
    amountSizeMin, // 有限矿脉MIN
    priority // 优先级值
) {
    return {
        "type": "createoreexcavation:vein",
        "amountMax": amountSizeMax,
        "amountMin": amountSizeMin,
        "biomeWhitelist": biomeWhitelist,
        "icon": {
            "item": icon
        },
        "name": mine_name,
        "placement": {
            "salt": placement_salt,
            "separation": placement_separation,
            "spacing": placement_spacing
        },
        "priority": priority
    }
}

// 需求：匠魂3
ServerEvents.recipes(event => {

    // 矿物挖掘配方
    function ore_excavation(
        mine_name,
        output_item,
        id_name,
        placement_spacing,
        placement_separation,
        biomeWhitelist,
        ticks,
        stress_value,
        placement_salt,
        amountSizeMax,
        amountSizeMin
    ) {
        const ore_id = `kubejs:ore_excavation_${id_name}`
        event.custom(vein(mine_name, output_item, placement_spacing, placement_separation, biomeWhitelist, placement_salt, amountSizeMax, amountSizeMin, 0)).id(ore_id)
        event.custom(drilling(ore_id, output_item, ticks, stress_value, 0))
    }
    function ore_excavation2(
        mine_name,
        output_item,
        id_name,
        num,
        placement_spacing,
        placement_separation,
        biomeWhitelist,
        ticks,
        stress_value,
        placement_salt,
        amountSizeMax,
        amountSizeMin
    ) {
        const ore_id = `kubejs:ore_excavation_${id_name}`
        event.custom(vein(mine_name, output_item, placement_spacing, placement_separation, biomeWhitelist, placement_salt, amountSizeMax, amountSizeMin, 0)).id(ore_id)
        event.custom(drilling2(ore_id, output_item, ticks, stress_value, 0, num))
    }

    // 删除水的矿井
    event.remove({id:'createoreexcavation:ore_vein_type/water'})
    event.remove({id:'createoreexcavation:extractor/water'})
    // 原添加钻石/绿宝石原石的匠魂处理
    event.custom(item_melting("createoreexcavation:raw_diamond", "tconstruct:molten_diamond", 100, 1450, 100))
    event.custom(item_melting("createoreexcavation:raw_emerald", "tconstruct:molten_emerald", 100, 934, 73))

    // ore_excavation()
    let ores = [
        ["粗锇", "mekanism:raw_osmium", "raw_osmium", 128, 8, "minecraft:is_overworld", 600, 256, 130649964, 3, 1],
        ["粗铀", "mekanism:raw_uranium", "raw_uranium", 128, 32, "minecraft:is_overworld", 600, 256, 845691232, 3, 1],
        ["源质钢", "mythicbotany:raw_elementium", "raw_elementium", 256, 64, "minecraft:is_overworld", 1200, 512, 326464645, 3, 1],
        ["龙石", "botania:dragonstone", "dragonstone", 192, 5, "minecraft:is_overworld", 2400, 2048, 984265853, 3, 1],
        ["朱砂", "thermal:cinnabar", "cinnabar", 128, 3, "minecraft:is_overworld", 600, 256, 209623257, 3, 1],
        ["粗锡", "thermal:raw_tin", "raw_tin", 256, 2, "minecraft:is_overworld", 600, 256, 657452568, 3, 1],
        ["粗铅", "thermal:raw_lead", "raw_lead", 192, 6, "minecraft:is_overworld", 1200, 256, 145963254, 3, 1],
        ["粗银", "thermal:raw_silver", "raw_silver", 160, 6, "minecraft:is_overworld", 1200, 256, 654353627, 3, 1],
        ["粗镍", "thermal:raw_nickel", "raw_nickel", 160, 4, "minecraft:is_overworld", 1200, 256, 480656534, 3, 1],
        ["粗钴", "tconstruct:raw_cobalt", "raw_cobalt", 96, 4, "minecraft:is_nether", 1200, 256, 897978035, 3, 1]
    ];
    ores.forEach(i => {
        ore_excavation(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10])
    });
    let ores2 = [
        ["氟石", "mekanism:fluorite_gem", "fluorite_gem", 3, 128, 8, "minecraft:is_overworld", 400, 256, 956624185, 3, 1],
        ["硝石", "thermal:niter", "niter", 3, 256, 1, "minecraft:is_overworld", 200, 256, 214186515, 3, 1],
        ["硫磺", "thermal:sulfur", "sulfur", 3, 192, 1, "minecraft:is_overworld", 200, 256, 841325421, 3, 1],
        ["磷灰石", "thermal:apatite", "apatite", 4, 192, 3, "minecraft:is_overworld", 400, 256, 548129461, 3, 1]
    ];
    ores2.forEach(i => {
        ore_excavation2(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11])
    });
})
