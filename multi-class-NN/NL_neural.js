class neural_network{
    constructor(input,output){
        this.neurons = {};
        this.links = {};
        this.Number_layer = 3;
        this.output_activation = ''
        this.layer_1 = input;
        this.layer_hidden = [[20,'Lrelu'],[10,'Lrelu'],[5,'Lrelu'],[2,'Lrelu']];//2 15//perfect training 70 1layer
        this.concurrent_value;
        this.take_function = null
        this.output = output
        neural_network.neurons_create(this);
        neural_network.links_create(this);
        neural_network.pair(this);
    }

    static neurons_create(level)
    {

        let {Number_layer,neurons,links,layer_1,layer_hidden,concurrent_value,output,take_function,output_activation} = level;
        for(let i = 0; i < Number_layer; i++)
        {
            neurons[`${i+1}`] = [];
            switch(true)
            {
                case (i > 0 && i < Number_layer-1):
                    take_function = layer_hidden[i-1][1]
                    concurrent_value = layer_hidden[i-1][0];
                    break;
                case (i === Number_layer-1):
                    concurrent_value = output;
                    take_function = output_activation
                    break;
                default:
                    concurrent_value = layer_1;
                    take_function = null
            }
            for(let j = 0; j < concurrent_value; j++)
            {
                let obj = {};
                obj['name'] = `${i}th layer ${j}th neuron`;
                obj['store'] = 0;
                obj['biase'] = Math.random();
                obj['layer'] = i+1;
                obj['w_b4'] = [];
                obj['w_af'] = []; 
                obj['activation_func'] = take_function
                obj['last'] = false;
                if(j === (concurrent_value-1))
                {
                    obj['last'] = true
                }
                neurons[`${i+1}`].push(obj)
            }
        }
    }

    static links_create(level){
        let {Number_layer,neurons,links,layer_1,layer_hidden,concurrent_value,output,input} = level;
        let sat = level.factor;
        let limit = Math.sqrt(6 / (layer_1 + output))
        console.log(limit)

        const ret = (i,j) =>
        {
            links[neurons[`${i}`][j]['name']] = [];
            for(let k = 0; k < neurons[`${i+1}`].length; k++)
            {
                sat--;
                let obj = {};
                obj['source'] = neurons[`${i}`][j]['name'];
                obj['target'] = neurons[`${i+1}`][k]['name'];
                obj['weight'] = Math.random() * 2 * limit - limit
                obj['back_prop_value'] = sat;
                links[neurons[`${i}`][j]['name']].push(obj);
            }
        }
        for(let i = 1; i < Number_layer; i++)
        {
            for(let j = 0; j < neurons[`${i}`].length; j++)
            {
                ret(i,j)
                if((i + 1) > 2)
                {
                    // console.log(i)
                    let r = Math.random() * (1-0.3)+0.3;
                    if(r > 0.5)
                    {
                        ret(i,j)
                    }
                }else if(i <= 1)
                {
                    ret(i,j)
                }
            }
        }
    }

    static pair(level)
    {
        const {neurons,links} = level;
        // console.log(neurons)
        Object.keys(links).forEach(val =>
            {
                links[val].forEach(value =>
                    {
                        Object.keys(neurons).forEach(neu_val =>
                            {
                                neurons[neu_val].forEach(nxt_val =>
                                    {
                                        if(value['source'] === nxt_val['name'])
                                        {
                                            nxt_val['w_af'].push([value['source'],value['target']])
                                        } if(value['target'] === nxt_val['name'])
                                        {
                                            nxt_val['w_b4'].push([value['source'],value['target']]);
                                        }
                                    })
                            })
                    })
            });
    }
}
module.exports = neural_network;
