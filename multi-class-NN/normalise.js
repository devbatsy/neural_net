class normalise_data
{
    constructor(data)
    {
        this.mean = new Array();
        this.S_D = new Array();
        this.training = data;
        normalise_data.normalise(this)
        this.update_data;
    }
    static normalise(level)
    {
        const {S_D,training,mean} = level;

        const find_mean = () =>
        {
            for(let i = 0; i < training[0].input.length; i++)
            {
                let stack = 0
                training.forEach(val =>
                    {
                        stack += val.input[i]
                    })
                    stack /= training.length;
                    mean.push(stack)
            }
        }
    
        const find_S_D = () =>
        {
            mean.forEach((val,idx) =>
            {
                let root = 0
                training.forEach(value =>
                    {
                        root += Math.pow(value.input[idx] - val,2)
                    })
                    root /= training.length
                    S_D.push(Math.sqrt(root))
            })
        }
    
        find_mean()
        find_S_D()
    }

    update_data(training,mean,S_D)
    {
        training.forEach((val,num) =>
        {
            val.input.forEach((value,idx) =>
                {
                    training[num].input[idx] = (value - mean[idx])/S_D[idx]
                })
        })
        return training;
    }
}

module.exports = normalise_data