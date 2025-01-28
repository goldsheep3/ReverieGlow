// 屠宰工艺

ServerEvents.tags('item', event => {
    // 非骨头颅视为头颅用于合成
    let butchercraft_heads = [
        'butchercraft:cow_head_item',
        'butchercraft:sheep_head_item',
        'butchercraft:pig_head_item',
        'butchercraft:goat_head_item',
        'butchercraft:rabbit_brown_head_item',
        'butchercraft:rabbit_black_head_item',
        'butchercraft:rabbit_gold_head_item',
        'butchercraft:rabbit_salt_head_item',
        'butchercraft:rabbit_splotched_head_item',
        'butchercraft:rabbit_white_head_item'
    ];
    butchercraft_heads.forEach(i => {
        event.add('forge:heads', i);
    });
})

// 需求：匠魂3
ServerEvents.tags('fluid', event => {
    // 屠宰过程产生的血液视为肉汤可用于生铁配方
    event.add('tconstruct:meat_soup', 'butchercraft:blood_fluid')
})

// 需求：匠魂3、KubeJS Create
ServerEvents.recipes(event => {
    // 头骨支持粉碎为骨粉
    let butchercraft_skulls = [
        'butchercraft:cow_skull_head_item',
        'butchercraft:sheep_skull_head_item',
        'butchercraft:pig_skull_head_item',
        'butchercraft:goat_skull_head_item',
        'butchercraft:chicken_skull_head_item',
        'butchercraft:rabbit_skull_head_item'
    ];
    butchercraft_skulls.forEach(i => {
        event.recipes.create.crushing(['3x minecraft:bone_meal', Item.of('3x minecraft:bone_meal').withChance(0.25)], i)
        event.recipes.create.milling(['3x minecraft:bone_meal', Item.of('3x minecraft:bone_meal').withChance(0.25)], i)
    });
})