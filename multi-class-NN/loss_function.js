class loss{
    constructor()
    {
        this.ME;
        this.MSE;
        this.cross_entropy;
    }

    ME = (pre,target) =>
    {
        return pre - target
    }

    MSE = (pre,target) =>
    {
        return Math.pow(pre-target,2)
    }

    cross_entropy = (pre,target) =>
    {
        return -(target * Math.log10(pre) + ((1 - target) * Math.log10(1 - pre)))
    }
}

module.exports = loss