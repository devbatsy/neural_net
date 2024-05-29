class energy_training_set
{
    constructor(set_num)
    {
        this.data = [];
        this.set_num = set_num
        energy_training_set.create(this)
    }
    static create(level)
    {
        const {data,set_num} = level;

        const energy = (r = set_num) =>
        {
            const output_list = [0,0.2,0.7,1]
            for(let j = 0 ; j < r; j++)
            {
                const input_array = new Array()
                let greater = {
                    value:0,
                    index:null
                };
                for(let i = 0; i < 4; i++)
                {
                    input_array.push(Math.random())
                }
                input_array.forEach((val,idx) =>
                    {
                        if(val > greater.value)
                        {
                            greater.value = val;
                            greater.index = idx
                        }
                    })
                    for(let k = 0; k < 4; k++)
                    {
                        switch(true)
                        {
                            case greater.index === k:
                            data.push({input:input_array,output:[output_list[k]]})
                            break;
                        }
                    }
            }
        }
        energy()
    }
}

module.exports = energy_training_set