/**
 * "@create"
 */
ServerEvents.recipes(event => {
    // 粉碎轮破碎匠魂粘液水晶块
    event.recipes.create.crushing("4x tconstruct:earth_slime_crystal", "tconstruct:earth_slime_crystal_block").id("kubejs:create/crushing/earth_slime_crystal_block");
    event.recipes.create.crushing("4x tconstruct:sky_slime_crystal", "tconstruct:sky_slime_crystal_block").id("kubejs:create/crushing/sky_slime_crystal_block");
    event.recipes.create.crushing("4x tconstruct:ender_slime_crystal", "tconstruct:ender_slime_crystal_block").id("kubejs:create/crushing/ender_slime_crystal_block");
    event.recipes.create.crushing("4x tconstruct:ichor_slime_crystal", "tconstruct:ichor_slime_crystal_block").id("kubejs:create/crushing/ichor_slime_crystal_block");
})


ServerEvents.recipes(event => {
    // ['64x create:crushed_raw_iron', '64x create:crushed_raw_gold', '64x create:crushed_raw_copper', '64x create:crushed_raw_zinc', '64x create:crushed_raw_osmium', '64x create:crushed_raw_silver', '64x create:crushed_raw_tin', '64x create:crushed_raw_lead', '64x create:crushed_raw_uranium', '64x create:crushed_raw_nickel']

    // 末影人头颅的锦致装饰适配
    // event.recipes.custom(melting_tag("kubejs:enderman_head", "forge:ender", 500, 477, 116))
    // ["quark:gold_bars", "tconstruct:gold_bars"]
})


// ServerEvents.tags("item", event => {
//     event.add("kubejs:enderman_head", "supplementaries:enderman_head")
//     event.add("kubejs:enderman_head", "tconstruct:enderman_head")
// })
