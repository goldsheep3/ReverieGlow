function melting_ingredient (input, output, output_amount, temperature, time) {
    return {
        "type": "tconstruct:melting",
        "ingredient": input,
        "result": {
            "amount": output_amount,
            "fluid": output
        },
        "temperature": temperature,
        "time": time
    }
}
function melting_item (input, output, output_amount, temperature, time) {
    return melting_ingredient({"item": input}, output, output_amount, temperature, time)
}
function melting_tag (input, output, output_amount, temperature, time) {
    return melting_ingredient({"tags": input}, output, output_amount, temperature, time)
}

ServerEvents.recipes(event => {
    // 粉碎轮破碎匠魂粘液水晶块
    event.recipes.create.crushing("4x tconstruct:earth_slime_crystal", "tconstruct:earth_slime_crystal_block")
    event.recipes.create.crushing("4x tconstruct:sky_slime_crystal"  , "tconstruct:sky_slime_crystal_block"  )
    event.recipes.create.crushing("4x tconstruct:ender_slime_crystal", "tconstruct:ender_slime_crystal_block")
    event.recipes.create.crushing("4x tconstruct:ichor_slime_crystal", "tconstruct:ichor_slime_crystal_block")

    // 各种刀的匠魂熔炼
    const knifes = [
        ["nethersdelight:iron_machete", "tconstruct:molten_iron", 180, 800],
        ["nethersdelight:golden_machete", "tconstruct:molten_gold", 180, 700],
        ["nethersdelight:diamond_machete", "tconstruct:molten_diamond", 200, 1450],
        ["nethersdelight:netherite_machete", "tconstruct:molten_netherite", 90, 1250],
        ["argentinas_delight:dagagauchatool", "tconstruct:molten_iron", 180, 800],
        ["butchercraft:butcher_knife", "tconstruct:molten_iron", 360, 800],
        ["butchercraft:skinning_knife", "tconstruct:molten_iron", 180, 800],
        ["butchercraft:gut_knife", "tconstruct:molten_iron", 180, 800],
        ["butchercraft:bone_saw", "tconstruct:molten_iron", 360, 800],
        ["aquaculture:iron_fillet_knife", "tconstruct:molten_iron", 180, 800],
        ["aquaculture:gold_fillet_knife", "tconstruct:molten_gold", 180, 700],
        ["aquaculture:diamond_fillet_knife", "tconstruct:molten_diamond", 200, 1450],
        ["farmersdelight:iron_knife", "tconstruct:molten_iron", 90, 800],
        ["farmersdelight:diamond_knife", "tconstruct:molten_diamond", 100, 1450],
        ["farmersdelight:netherite_knife", "tconstruct:molten_netherite", 90, 1250],
        ["farmersdelight:golden_knife", "tconstruct:molten_gold", 90, 700],
        ["minecolonies:iron_scimitar", "tconstruct:molten_iron", 180, 800]
    ];
    knifes.forEach(k => {
        event.custom(melting_item(k[0], k[1], k[2], k[3], 100))
    })


    // 末影人头颅的锦致装饰适配
    // event.recipes.custom(melting_tag("kubejs:enderman_head", "forge:ender", 500, 477, 116))
    // ["quark:gold_bars", "tconstruct:gold_bars"]
  })

// ServerEvents.tags("item", event => {
//     event.add("kubejs:enderman_head", "supplementaries:enderman_head")
//     event.add("kubejs:enderman_head", "tconstruct:enderman_head")
// })