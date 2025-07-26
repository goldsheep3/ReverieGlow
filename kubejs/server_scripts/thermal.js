const EARTH_CHANGE_RECIPES = [
    ['thermal:sulfur', 'thermal:sulfur_dust'],
    ['thermal:apatite', 'thermal:apatite_dust'],
    ['thermal:cinnabar', 'thermal:cinnabar_dust'],
    ['thermal:niter', 'thermal:niter_dust'],
    ['minecraft:ender_pearl', 'thermal:ender_pearl_dust'],
    ['minecraft:lapis_lazuli', 'thermal:lapis_dust'],
    ['minecraft:diamond', 'thermal:diamond_dust'],
    ['minecraft:emerald', 'thermal:emerald_dust'],
    ['minecraft:quartz', 'thermal:quartz_dust']
];

/**
 * "@mekanism"
 */
ServerEvents.recipes(event => {
    // 处理 裂岩弹 配方的Mek还原
    EARTH_CHANGE_RECIPES.forEach(pair => {
        const itemParts = pair[0].split(':')
        event.custom({
            "type": "mekanism:crushing",
            "input": {
                "ingredient": {
                    "item": pair[0]
                }
            },
            "output": {
                "item": pair[1]
            }
        }).id(`kubejs:mekanism/crushing/${itemParts[1]}`);
    })
})

/**
 * "@create"
 */
ServerEvents.recipes(event => {
    // 处理 裂岩弹 配方的Create还原
    EARTH_CHANGE_RECIPES.forEach(pair => {
        const itemParts = pair[0].split(':')
        event.recipes.create.crushing(pair[1], pair[0]).id(`kubejs:create/crushing/${itemParts[1]}`);
        event.recipes.create.milling(pair[1], pair[0]).id(`kubejs:create/milling/${itemParts[1]}`);
    })
})

