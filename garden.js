// 1. Calculate cost for crop
const getCostsForCrop = input => input.crop.cost * input.crop.numCrops;

// 2. Calculate revenue for crop
const getRevenueForCrop = input => input.crop.salePrice * input.crop.numCrops;

// 3 & 10 Calculate profit for crop

// const getProfitForCrop = input => getRevenueForCrop(input) - getCostsForCrop(input);

const getProfitForCrop = (input, environmentFactors) => {
    if (!environmentFactors) return getRevenueForCrop(input) - getCostsForCrop(input);
    const crop = input.crop;
    return getYieldForCrop(crop, environmentFactors) * getRevenueForCrop(input) - getCostsForCrop(input);
};

// 4 & 11 Calculate total profit for multiple crops
const getTotalProfit = ({ crops }, environmentFactors) => {

    const getProfitOfEachCrop = crops.map(crop => getProfitForCrop(crop, environmentFactors));
    return getProfitOfEachCrop.reduce((accumulator, currentValue) => accumulator + currentValue);
}

// 5. Edit already written functions above to calculate environments too

// 6. add given environment factors
const getYieldForPlant = (input, environmentFactors) => {
    if (!environmentFactors) return input.yield;
    // Get different environment factors
    for (let [key, value] of Object.entries(environmentFactors)) {
        {
            let factorReference = input.factors[key];
            let factorValue = factorReference[value];
            if (factorValue === 0) {
                input.yield = input.yield
            } else {
                input.yield = input.yield * (100 + factorValue) / 100;
            }
        }
    }
    return input.yield;
}

const getYieldForCrop = (input, environmentFactors) => {
    if (!environmentFactors) return input.yield * input.numCrops;

    for (let [key, value] of Object.entries(environmentFactors)) {
        {
            let factorReference = input.factors[key];
            let factorValue = factorReference[value];
            if (factorValue === 0) {
                input.yield = input.yield
            } else {
                input.yield = input.yield * (100 + factorValue) / 100;
            }
        }
    }
    return input.yield * input.numCrops;
}

const getTotalYield = ({ crops }) => { 
    // ({}) shorthand to create objects
    const getYieldOfEachCrop = crops.map(crop => crop.crop.yield * crop.numCrops);
    return getYieldOfEachCrop.reduce((accumulator, currentValue) => accumulator + currentValue);
}




module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};