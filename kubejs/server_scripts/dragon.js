// 龙息鼓风机

// 需求：背包宠物
ServerEvents.recipes(event => {

    // 替换末影珍珠为末影珍珠粒
    event.remove({id: 'createhalitosis:halitosis/prismarine_crystals'})
    event.custom({
        "type": "createhalitosis:halitosis",
        "ingredients": [
            {
                "item": "minecraft:prismarine_crystals"
            }
        ],
        "results": [
            {
                "item": "inventorypets:nugget_ender"
            }
        ]
    })
})


