ItemEvents.modification(event => {
    function modifyToFood (modify_item, hunger, saturation, effect_name, effect_time, n) {
        event.modify(modify_item, item => {
            item.foodProperties = food => {
                food.hunger(hunger)
                food.saturation(saturation)
                food.effect(effect_name, effect_time, 0, n)
            }
        })}
    
    let ranliao =  [
        ['minecraft:white_dye', 'hunger'],
        ['minecraft:light_gray_dye', 'hunger'],
        ['minecraft:gray_dye', 'hunger'],
        ['minecraft:black_dye', 'hunger'],
        ['minecraft:brown_dye', 'mining_fatigue'],
        ['minecraft:red_dye', 'mining_fatigue'],
        ['minecraft:orange_dye', 'slowness'],
        ['minecraft:yellow_dye', 'slowness'],
        ['minecraft:lime_dye', 'blindness'],
        ['minecraft:green_dye', 'blindness'],
        ['minecraft:cyan_dye', 'blindness'],
        ['minecraft:light_blue_dye', 'darkness'],
        ['minecraft:blue_dye', 'darkness'],
        ['minecraft:purple_dye', 'nausea'],
        ['minecraft:magenta_dye', 'nausea'],
        ['minecraft:pink_dye', 'nausea'],
    ]
    ranliao.forEach(i => {modifyToFood(i[0], 1, 0, i[1], 12*20, 0.8)});
})
  
