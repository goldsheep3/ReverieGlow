const tconstructLib = function(event) {
    // 辅助解析函数
    function parseIngredientOrFluid(val) {
        if (typeof val === "string") {
            val = val.trim();
            // 物品标签
            if (val.startsWith("#")) {
                let tag = val.replace(/^#/, "");
                let count = 1;
                if (tag.match(/^\d+x /)) {
                    count = parseInt(tag.split("x ")[0]);
                    tag = tag.split("x ")[1];
                }
                return count > 1 ? { tag: tag, count: count } : { tag: tag };
            }
            // 物品
            if (val.match(/^\d*x /) || val.match(/^1x /) || val.match(/^[a-zA-Z0-9_]+:/)) {
                let m = val.match(/^(\d*)x ([^ ]+)$/);
                if (m) {
                    let count = m[1] ? parseInt(m[1]) : 1;
                    let item = m[2];
                    return count > 1 ? { item: item, count: count } : { item: item };
                }
                // 直接物品id
                if (val.match(/^[a-zA-Z0-9_]+:/)) {
                    return { item: val };
                }
            }
            // 流体
            if (val.match(/^\d*mb /)) {
                let m = val.match(/^(\d*)mb ([^ ]+)$/);
                let amount = m[1] ? parseInt(m[1]) : 1;
                let fluid = m[2];
                return { fluid: fluid, amount: amount };
            }
        }
        // 已是对象直接返回
        return val;
    };

    return {
        /**
         * @description 匠魂：合金配方
         * @param {Array<Object|string>} inputs 输入内容对象数组或字符串数组
         * @param {Object|string} output 输出内容对象或字符串
         * @param {number} temperature 合金所需温度
         */
        alloy: function(inputs, output, temperature) {
            var parsedInputs;
            if (Array.isArray(inputs)) {
                parsedInputs = [];
                for (var i = 0; i < inputs.length; i++) {
                    parsedInputs.push(parseIngredientOrFluid(inputs[i]));
                }
            } else {
                parsedInputs = [parseIngredientOrFluid(inputs)];
            }
            const result = {
                type: "tconstruct:alloy",
                inputs: parsedInputs,
                result: parseIngredientOrFluid(output),
                temperature: temperature
            };
            return event.custom(result);
        },
        /**
         * @description 匠魂：铸件台配方
         * @param {Object|string} fluidInput 熔融流体内容对象或字符串
         * @param {Object|string} itemOutput 输出内容对象或字符串
         * @param {Object|string} cast 铸模内容对象或字符串
         * @param {boolean} castConsumed 铸模是否消耗
         * @param {number} coolingTime 固化时间 (tick)
         */
        castingTable: function(fluidInput, itemOutput, cast, castConsumed, coolingTime) {
            const result = {
                type: "tconstruct:casting_table",
                fluid: parseIngredientOrFluid(fluidInput),
                result: parseIngredientOrFluid(itemOutput),
                cooling_time: parseInt(coolingTime)
            };
            if (cast) {
                result.cast = parseIngredientOrFluid(cast);
                result.cast_consumed = castConsumed;
            }
            return event.custom(result);
        },
        /**
         * @description 匠魂：铸造盆配方
         * @param {Object|string} fluidInput 熔融流体内容对象或字符串
         * @param {Object|string} itemOutput 输出内容对象或字符串
         * @param {Object|string} cast 铸模内容对象或字符串
         * @param {boolean} castConsumed 铸模是否消耗
         * @param {number} coolingTime 固化时间 (tick)
         */
        castingBasin: function(fluidInput, itemOutput, cast, castConsumed, coolingTime) {
            const result = {
                type: "tconstruct:casting_basin",
                fluid: parseIngredientOrFluid(fluidInput),
                result: parseIngredientOrFluid(itemOutput),
                cooling_time: parseInt(coolingTime)
            };
            if (cast) {
                result.cast = parseIngredientOrFluid(cast);
                result.cast_consumed = castConsumed;
            }
            return event.custom(result);
        },
        /**
         * @description 匠魂：熔化/熔铸配方
         * @param {Object|string} itemInput 输入内容对象或字符串
         * @param {Object|string} fluidOutput 输出内容对象或字符串
         * @param {number} temperature 熔化所需温度
         * @param {number} meltingTime 熔化所需时间
         * @param {Array<Object|string>} byproducts 熔铸炉额外输出内容对象数组或字符串数组
         */
        melting: function(itemInput, fluidOutput, temperature, meltingTime, byproducts) {
            const result = {
                type: "tconstruct:melting",
                ingredient: parseIngredientOrFluid(itemInput),
                result: parseIngredientOrFluid(fluidOutput),
                temperature: temperature,
                time: parseInt(meltingTime)
            };
            if (byproducts) {
                result.byproducts = Array.isArray(byproducts)
                    ? byproducts.map(parseIngredientOrFluid)
                    : [parseIngredientOrFluid(byproducts)];
            }
            return event.custom(result);
        }
    };
};

const tconstructHelper = function(event) {
    const lib = tconstructLib(event); // 修正：获取对象实例
    return {
        /**
         * @description 浇筑配方快捷函数（fluid -> item）
         */
        castingFluidToItem: function(fluid, baseAmount, ingot, block, blockCount, nugget, nuggetCount, plate, timeMultiplier) {
            const baseTime = 60;
            if (!baseAmount) baseAmount = 90;
            if (!timeMultiplier) timeMultiplier = 1;
            
            // 辅助获取物品名
            function getName(item) {
                if (!item) return "";
                if (typeof item === "string") {
                    let arr = item.split(":");
                    return arr.length === 2 ? arr[1] : item;
                }
                if (item.item) return getName(item.item);
                return "";
            }

            if (ingot) {
                lib.castingTable(
                    { fluid: fluid, amount: baseAmount }, { item: ingot }, { tag: "tconstruct:casts/multi_use/ingot" }, false, baseTime * timeMultiplier
                ).id(`kubejs:tconstruct/casting/${getName(ingot)}_multi`);
                lib.castingTable(
                    { fluid: fluid, amount: baseAmount }, { item: ingot }, { tag: "tconstruct:casts/single_use/ingot" }, true, baseTime * timeMultiplier
                ).id(`kubejs:tconstruct/casting/${getName(ingot)}_single`);
            }
            if (nugget) {
                if (!nuggetCount) nuggetCount = 9;
                lib.castingTable(
                    { fluid: fluid, amount: baseAmount / nuggetCount }, { item: nugget }, { tag: "tconstruct:casts/multi_use/nugget" }, false, baseTime * timeMultiplier / 3
                ).id(`kubejs:tconstruct/casting/${getName(nugget)}_multi`);
                lib.castingTable(
                    { fluid: fluid, amount: baseAmount / nuggetCount }, { item: nugget }, { tag: "tconstruct:casts/single_use/nugget" }, true, baseTime * timeMultiplier / 3
                ).id(`kubejs:tconstruct/casting/${getName(nugget)}_single`);
            }
            if (plate) {
                lib.castingTable(
                    { fluid: fluid, amount: baseAmount }, { item: plate }, { tag: "tconstruct:casts/multi_use/plate" }, false, baseTime * timeMultiplier
                ).id(`kubejs:tconstruct/casting/${getName(plate)}_multi`);
                lib.castingTable(
                    { fluid: fluid, amount: baseAmount }, { item: plate }, { tag: "tconstruct:casts/single_use/plate" }, true, baseTime * timeMultiplier
                ).id(`kubejs:tconstruct/casting/${getName(plate)}_single`);
            }
            if (block) {
                if (!blockCount) blockCount = 9;
                lib.castingBasin(
                    { fluid: fluid, amount: baseAmount * blockCount }, { item: block }, null, null, baseTime * timeMultiplier * 3
                ).id(`kubejs:tconstruct/casting/${getName(block)}`);
            }
        },
        /**
         * @description 熔化配方快捷函数（item -> fluid）
         */
        meltingItemToFluid: function(fluid, baseAmount, ingot, block, blockCount, nugget, nuggetCount, plate, meltingTime, temperature) {
            if (!baseAmount) baseAmount = 90;
            if (!meltingTime) meltingTime = 46;
            if (!temperature) temperature = 800;

            function getName(item) {
                if (!item) return "";
                if (typeof item === "string") {
                    let arr = item.split(":");
                    return arr.length === 2 ? arr[1] : item;
                }
                if (item.item) return getName(item.item);
                return "";
            }

            if (ingot) {
                lib.melting(
                    { item: ingot }, { fluid: fluid, amount: baseAmount }, temperature, meltingTime
                ).id(`kubejs:tconstruct/melting/${getName(ingot)}`);
            }
            if (nugget && nuggetCount) {
                lib.melting(
                    { item: nugget }, { fluid: fluid, amount: baseAmount / nuggetCount }, temperature, meltingTime / 3
                ).id(`kubejs:tconstruct/melting/${getName(nugget)}`);
            }
            if (plate) {
                lib.melting(
                    { item: plate }, { fluid: fluid, amount: baseAmount }, temperature, meltingTime
                ).id(`kubejs:tconstruct/melting/${getName(plate)}`);
            }
            if (block) {
                if (!blockCount) blockCount = 9;
                lib.melting(
                    { item: block }, { fluid: fluid, amount: baseAmount * blockCount }, temperature, meltingTime * 3
                ).id(`kubejs:tconstruct/melting/${getName(block)}`);
            }
        },
        /**
         * @description 同时生成熔化与浇筑配方（item <-> fluid）
         */
        castingAndMelting: function(fluid, baseAmount, ingot, block, blockCount, nugget, nuggetCount, plate, timeMultiplier, meltingTime, temperature) {
            this.castingFluidToItem(fluid, baseAmount, ingot, block, blockCount, nugget, nuggetCount, plate, timeMultiplier);
            this.meltingItemToFluid(fluid, baseAmount, ingot, block, blockCount, nugget, nuggetCount, plate, meltingTime, temperature);
        }
    };
};

/**
 * @description 匠魂KubeJS 1.20.1版本快捷代码 tconstructLib。
 */
global.tconstructLib = tconstructLib;
/**
 * @description 匠魂KubeJS 1.20.1版本快捷代码扩展 tconstructHelper。
 */
global.tconstructHelper = tconstructHelper;