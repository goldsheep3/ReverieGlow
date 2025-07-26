const mekanismLib = function (event) {
    /**
     * @description 物品/流体/标签字符串便携写法辅助解析函数
     * @param {Object|string} val 物品/流体/标签字符串或对象
     * @returns {Object} 解析后的对象
     */
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

    /**
     * @description 气体字符串便携写法辅助解析函数
     * @param {Object|string} val 气体字符串或对象
     * @param {number|null} baseAmount 基础单位量，默认为200
     * @returns {Object} 解析后的对象
     */
    function parseGasIngredient(val, baseAmount) {
        baseAmount = baseAmount || 200;
        if (typeof val === "string") {
            val = val.trim();
            // 气体
            if (val.match(/^\d*mb /)) {
                let m = val.match(/^(\d*)mb ([^ ]+)$/);
                let mb = m[1] ? parseInt(m[1]) : baseAmount;
                let gas = m[2];
                // 计算amount为多少个baseAmount
                let amount = Math.ceil(mb / baseAmount);
                return { gas: gas, amount: amount };
            }
            // 只写气体id，默认1单位
            if (val.match(/^[a-zA-Z0-9_]+:/)) {
                return { gas: val, amount: 1 };
            }
        }
        // 已是对象直接返回
        return val;
    };

    return {
        /**
         * @description 通用机械：富集配方
         * @param {Object|string} itemInput 输入内容对象或字符串
         * @param {Object|string} itemOutput 输出内容对象或字符串
         */
        enriching: function (itemInput, itemOutput) {
            const result = {
                type: "mekanism:enriching",
                input: {
                    ingredient: parseIngredientOrFluid(itemInput)
                },
                output: parseIngredientOrFluid(itemOutput)
            };
            return event.custom(result);
        },
        /**
         * @description 通用机械：粉碎配方
         * @param {Object|string} itemInput 输入内容对象或字符串
         * @param {Object|string} itemOutput 输出内容对象或字符串
         */
        crushing: function (itemInput, itemOutput) {
            const result = {
                type: "mekanism:crushing",
                input: {
                    ingredient: parseIngredientOrFluid(itemInput)
                },
                output: parseIngredientOrFluid(itemOutput)
            };
            return event.custom(result);
        },
        /**
         * @description 通用机械：锇压缩配方
         * @param {Object|string} chemicalInput 化学输入对象或字符串(`baseAmount=200`) 
         * @param {Object|string} itemInput 输入内容对象或字符串
         * @param {Object|string} itemOutput 输出内容对象或字符串
         */
        compressing: function (chemicalInput, itemInput, itemOutput) {
            const result = {
                type: "mekanism:compressing",
                chemicalInput: parseGasIngredient(chemicalInput),
                input: {
                    ingredient: parseIngredientOrFluid(itemInput)
                },
                output: parseIngredientOrFluid(itemOutput)
            };
            return event.custom(result);
        },
        /**
         * @description 通用机械：融合配方
         * @param {Object|string} itemInput_1 输入内容1对象或字符串
         * @param {Object|string} itemInput_2 输入内容2对象或字符串
         * @param {Object|string} itemOutput 输出内容对象或字符串
         */
        combining: function (itemInput_1, itemInput_2, itemOutput) {
            const result = {
                type: "mekanism:combining",
                extraInput: {
                    ingredient: parseIngredientOrFluid(itemInput_1)
                },
                mainInput: {
                    ingredient: parseIngredientOrFluid(itemInput_2)
                },
                output: parseIngredientOrFluid(itemOutput)
            };
            return event.custom(result);
        },
        /**
         * @description 通用机械：提纯配方
         * @param {Object|string} chemicalInput 化学输入对象或字符串(`baseAmount=200`) 
         * @param {Object|string} itemInput 输入内容对象或字符串
         * @param {Object|string} itemOutput 输出内容对象或字符串
         */
        purifying: function (chemicalInput, itemInput, itemOutput) {
            const result = {
                type: "mekanism:purifying",
                chemicalInput: parseGasIngredient(chemicalInput),
                input: {
                    ingredient: parseIngredientOrFluid(itemInput)
                },
                output: parseIngredientOrFluid(itemOutput)
            };
            return event.custom(result);
        },
        /**
         * @description 通用机械：压射配方
         * @param {Object|string} chemicalInput 化学输入对象或字符串(`baseAmount=200`) 
         * @param {Object|string} itemInput 输入内容对象或字符串
         * @param {Object|string} itemOutput 输出内容对象或字符串
         */
        injecting: function (chemicalInput, itemInput, itemOutput) {
            const result = {
                type: "mekanism:injecting",
                chemicalInput: parseGasIngredient(chemicalInput),
                input: {
                    ingredient: parseIngredientOrFluid(itemInput)
                },
                output: parseIngredientOrFluid(itemOutput)
            };
            return event.custom(result);
        },
        /**
         * @description 通用机械：灌注配方
         * @param {Object|string} chemicalInput 化学输入对象或字符串(`baseAmount=10`) 
         * @param {Object|string} itemInput 输入内容对象或字符串
         * @param {Object|string} itemOutput 输出内容对象或字符串
         */
        infusing: function (chemicalInput, itemInput, itemOutput) {
            const result = {
                type: "mekanism:metallurgic_infusing",
                chemicalInput: parseGasIngredient(chemicalInput, 10),
                input: {
                    ingredient: parseIngredientOrFluid(itemInput)
                },
                output: parseIngredientOrFluid(itemOutput)
            };
            return event.custom(result);
        },
        /**
         * @description 通用机械：锯木配方
         * @param {Object|string} itemInput 输入内容对象或字符串
         * @param {Object|string} mainItemOutput 主输出内容对象或字符串
         * @param {Object|string|null} secondaryItemOutput 副输出内容对象或字符串
         * @param {number|null} secondaryChance 副输出几率(默认为0.25)
         */
        sawing: function (itemInput, mainItemOutput, secondaryItemOutput, secondaryChance) {
            const result = {
                type: "mekanism:sawing",
                input: {
                    ingredient: parseIngredientOrFluid(itemInput),
                },
                mainOutput: parseIngredientOrFluid(mainItemOutput)
            };
            if (secondaryItemOutput) {
                result.secondaryOutput = parseIngredientOrFluid(secondaryItemOutput);
                result.secondaryChance = secondaryChance || 0.25;
            }
            return event.custom(result);
        },
    };
};

/**
 * @description 通用机械 KubeJS 1.20.1版本快捷代码 mekanismLib。
 */
global.mekanismLib = mekanismLib;