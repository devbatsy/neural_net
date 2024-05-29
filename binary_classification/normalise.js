class normalise_data
{
    constructor(data)
    {
        this.Imean = new Array();
        this.IS_D = new Array();
        this.Omean = new Array();
        this.OS_D = new Array();
        this.norm_var = ['input','output'];
        this.M_stack = [this.Imean,this.Omean]
        this.training = data;
        this.input = false;
        this.output = false;
        normalise_data.normalise(this)
        this.update_data_input;
        this.update_data_output;
    }
    static normalise(level)
    {
        const {IS_D,Imean,norm_var,OS_D,Omean,training,mean,M_stack} = level;

        const find_mean = (variable) =>
        {
            for(let i = 0; i < training[0][`${variable}`].length; i++)
            {
                let stack = 0
                training.forEach(val =>
                    {
                        stack += val['input'][i]
                    })
                    stack /= training.length;
                    if(variable === 'input')
                    {
                        Imean.push(stack)
                    }else if(variable === 'output')
                    {
                        Omean.push(stack)
                    }
            }
        }
    
        const find_S_D = (variable,M) =>
        {
            M.forEach((val,idx) =>
            {
                let root = 0
                training.forEach(value =>
                    {
                        root += Math.pow(value[`${variable}`][idx] - val,2)
                    })
                    root /= training.length
                    if(variable === 'input')
                    {
                        IS_D.push(Math.sqrt(root))
                    }else if(variable === 'output')
                    {
                        OS_D.push(Math.sqrt(root))
                    }
            })
        }
    
        for(let i = 0; i < norm_var.length; i++)
        {
            find_mean(norm_var[i])
            find_S_D(norm_var[i],M_stack[i])
        }
    }

    update_data_input(training,norm_class)
    {
                const Imean = norm_class.Imean;
                const IS_D = norm_class.IS_D
                training.forEach((val,num) =>
                {
                    val.input.forEach((value,idx) =>
                        {
                            training[num].input[idx] = (value - Imean[idx])/IS_D[idx]
                        })
                })
                return training;
    }
    update_data_output(training,norm_class)
    {
                const Omean = norm_class.Omean;
                const OS_D = norm_class.OS_D
                training.forEach((val,num) =>
                {
                    val.output.forEach((value,idx) =>
                        {
                            training[num].output[idx] = (value - Omean[idx])/OS_D[idx]
                        })
                })
    }
}

module.exports = normalise_data