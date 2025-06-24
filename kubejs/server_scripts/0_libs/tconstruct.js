const tic_lib = {

    /**
     * @description 匠魂：合金配方
     * 
     * @param {array[Object]} input 输入内容对象数组
     * @param {Object} output 输出内容对象
     * @param {number} temperature 合金所需温度 (固体800; 熔岩1000; 烈焰血1500) 
     * 
     * @return {Object} `event.custom()`所接受的对象
     */
    alloy: function (input, output, temperature) {
        const result = new Object();
        result.type = "tconstruct:alloy";
        result.inputs = input;
        result.result = output;
        result.temperature = temperature;
        return result;
    },
    /**
     * @description 匠魂：铸件台配方
     * 
     * @param {Object} input 输入内容对象
     * @param {Object | string} output 输出内容对象
     * @param {Object} cast 铸模内容对象
     * @param {boolean} consumed 铸模是否消耗
     * @param {number} time 固化时间 (tick, 铁锭=60)
     * 
     * @return {Object} `event.custom()`所接受的对象
     */
    casting_table: function (input, output, cast, consumed, time) {
        const result = new Object();
        result.type = "tconstruct:casting_table";
        result.fluid = input;
        result.result = output;
        result.cooling_time = parseInt(time);
        if (cast) {
            result.cast = cast;
            result.cast_consumed = consumed;
        };
        return result;
    },
    /**
     * @description 匠魂：铸造盆配方
     * 
     * @param {Object} input 输入内容对象
     * @param {Object | string} output 输出内容对象
     * @param {Object} cast 铸模内容对象
     * @param {boolean} consumed 铸模是否消耗
     * @param {number} time 固化时间 (tick, 铁块=180)
     * 
     * @return {Object} `event.custom()`所接受的对象
     */
    casting_basin: function (input, output, cast, consumed, time) {
        const result = new Object();
        result.type = "tconstruct:casting_basin";
        result.fluid = input;
        result.result = output;
        result.cooling_time = parseInt(time);
        if (cast) {
            result.cast = cast;
            result.cast_consumed = consumed;
        };
        return result;
    },
    /**
     * @description 匠魂：熔化/熔铸配方
     * 
     * @param {Object} input 输入内容对象
     * @param {Object} output 输出内容对象
     * @param {number} temperature 熔化所需温度 (固体800; 熔岩1000; 烈焰血1500) 
     * @param {number} time 熔化所需时间 (5tick, 通常锭=46)
     * @param {array[Object]} foundry_output 熔铸炉额外数输出内容对象数组
     * 
     * @return {Object} `event.custom()`所接受的对象
     */
    melting: function (input, output, temperature, time, foundry_output) {
        const result = new Object();
        result.type = "tconstruct:melting";
        result.ingredient = input;
        result.result = output;
        result.temperature = temperature;
        result.time = parseInt(time);
        if (foundry_output) {
            result.byproducts = foundry_output
        }
        return result;
    }

}

const tic_morelib = {

    /**
     * @description **匠魂** 锭、块、粒、板浇筑配方快捷函数 *item to fluid*
     * 
     * @param {Internal.RecipesEventJS} event `ServerEvents.recipes`事件
     * @param {Object} fluid 熔融流体内容对象
     * @param {number} base_amount 每锭mB值（默认为90）
     * @param {Object | string} ingot_item 锭内容对象
     * @param {Object | string} block_item 块内容对象
     * @param {number} block_number 块压缩等级（几个锭一个块）（默认为9）
     * @param {Object | string} nugget_item 粒内容对象
     * @param {number} nugget_number 粒压缩等级（一个锭几个粒）（默认为9）
     * @param {Object | string} sheet_item 板内容对象
     * @param {number} time_level 固化时间乘数（默认为1）
     * 
     * @return {undefined}
     */
    casting_fti: function (event, fluid, base_amount, ingot_item, block_item, block_number, nugget_item, nugget_number, sheet_item, time_level) {
        const base_time = 60;  // 3秒
        if (!base_amount) { base_amount = 90 };
        if (!time_level) { time_level = 1 };

        if (ingot_item) {
            event.custom(tic_lib.casting_table(
                { fluid: fluid, amount: base_amount }, ingot_item, { tag: "tconstruct:casts/multi_use/ingot" }, false, base_time * time_level
            ));
            event.custom(tic_lib.casting_table(
                { fluid: fluid, amount: base_amount }, ingot_item, { tag: "tconstruct:casts/single_use/ingot" }, true, base_time * time_level
            ));
        };
        if (nugget_item) {
            if (!nugget_number) { nugget_number = 9 };
            event.custom(tic_lib.casting_table(
                { fluid: fluid, amount: base_amount / nugget_number }, nugget_item, { tag: "tconstruct:casts/multi_use/nugget" }, false, base_time * time_level / 3
            ));
            event.custom(tic_lib.casting_table(
                { fluid: fluid, amount: base_amount / nugget_number }, nugget_item, { tag: "tconstruct:casts/single_use/nugget" }, true, base_time * time_level / 3
            ));
        };
        if (sheet_item) {
            event.custom(tic_lib.casting_table(
                { fluid: fluid, amount: base_amount }, sheet_item, { tag: "tconstruct:casts/multi_use/plate" }, false, base_time * time_level
            ));
            event.custom(tic_lib.casting_table(
                { fluid: fluid, amount: base_amount }, sheet_item, { tag: "tconstruct:casts/single_use/plate" }, true, base_time * time_level
            ));
        };
        if (block_item) {
            if (!block_number) { block_number = 9 };
            event.custom(tic_lib.casting_basin(
                { fluid: fluid, amount: base_amount * block_number }, block_item, null, null, base_time * time_level * 3
            ));
        };
    },
    /**
     * @description **匠魂** 锭、块、粒、板熔化配方快捷函数 *item to fluid*
     * 
     * @param {Internal.RecipesEventJS} event `ServerEvents.recipes`事件
     * @param {Object} fluid 熔融流体内容对象
     * @param {number} base_amount 每锭mB值（默认为90）
     * @param {Object | string} ingot_item 锭内容对象
     * @param {Object | string} block_item 块内容对象
     * @param {number} block_number 块压缩等级（几个锭一个块）（默认为9）
     * @param {Object | string} nugget_item 粒内容对象
     * @param {number} nugget_number 粒压缩等级（一个锭几个粒）（默认为9）
     * @param {Object | string} sheet_item 板内容对象
     * @param {number} base_time 熔化时间乘数（默认为1）
     * @param {number} temperature 熔化温度 (固体800; 熔岩1000; 烈焰血1500) 
     * 
     * @return {undefined}
     */
    melting_itf: function (event, fluid, base_amount, ingot_item, block_item, block_number, nugget_item, nugget_number, sheet_item, base_time, temperature) {
        if (!base_amount) { base_amount = 90 };
        if (!base_time) { base_time = 46 };
        if (!temperature) { temperature = 800 };

        if (ingot_item) {
            event.custom(tic_lib.melting(
                { item: ingot_item }, { fluid: fluid, amount: base_amount }, temperature, base_time
            ));
        };
        if (nugget_item) {
            if (!nugget_number) { nugget_number = 9 };
            event.custom(tic_lib.melting({ item: nugget_item }, { fluid: fluid, amount: base_amount / nugget_number }, temperature, base_time / 3
            ));
        };
        if (sheet_item) {
            event.custom(tic_lib.melting({ item: sheet_item }, { fluid: fluid, amount: base_amount }, temperature, base_time
            ));
        };
        if (block_item) {
            if (!block_number) { block_number = 9 };
            event.custom(tic_lib.melting({ item: block_item }, { fluid: fluid, amount: base_amount * block_number }, temperature, base_time * 3
            ));
        };
    },
}

/**
 * @description 匠魂KubeJS 1.20.1版本快捷代码`tic_lib`。*均返回Object对象用于传入`event.custom()`。*
 */
global.tic_lib = tic_lib
/**
 * @description 匠魂KubeJS 1.20.1版本快捷代码扩展`tic_morelib`。*均需要传入`event`对象而无返回值。*
 */
global.tic_morelib = tic_morelib