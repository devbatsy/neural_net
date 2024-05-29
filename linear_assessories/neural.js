class neural_network{
    constructor(input,output){
        this.neurons = {};
        this.links = {};
        this.Number_layer = 4;
        this.layer_1 = input;
        this.layer_hidden = 3;
        this.concurrent_value;
        this.output = output
        this.factor = (this.layer_1*this.layer_hidden)+(Math.pow(this.layer_hidden,2)*(this.Number_layer-3))+(this.output*this.layer_hidden)
        neural_network.neurons_create(this);
        neural_network.links_create(this);
    }

    static neurons_create(level)
    {

        let {Number_layer,neurons,links,layer_1,layer_hidden,concurrent_value,output} = level;
        for(let i = 0; i < Number_layer; i++)
        {
            neurons[`${i+1}`] = [];
            switch(true)
            {
                case (i > 0 && i < Number_layer-1):
                    concurrent_value = layer_hidden;
                    break;
                case (i === Number_layer-1):
                    concurrent_value = output;
                    break;
                default:
                    concurrent_value = layer_1;
            }
            for(let j = 0; j < concurrent_value; j++)
            {
                let obj = {};
                obj['name'] = `${i}th layer ${j}th neuron`;
                obj['store'] = 0;
                obj['biase'] = 1;
                obj['layer'] = i+1;
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
        let {Number_layer,neurons,links,layer_1,layer_hidden,concurrent_value,output} = level;
        let sat = level.factor;

        for(let i = 1; i < Number_layer; i++)
        {
            for(let j = 0; j < neurons[`${i}`].length; j++)
            {
                links[neurons[`${i}`][j]['name']] = [];
                for(let k = 0; k < neurons[`${i+1}`].length; k++)
                {
                    sat--;
                    let obj = {};
                    obj['source'] = neurons[`${i}`][j]['name'];
                    obj['target'] = neurons[`${i+1}`][k]['name'];
                    obj['weight'] = Math.random();
                    obj['back_prop_value'] = sat;
                    links[neurons[`${i}`][j]['name']].push(obj);
                }
            }
        }
    }
}
module.exports = neural_network;