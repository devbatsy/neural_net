class back_prop
{
    constructor(neural,error)
    {
        this.neural = neural;
        this.learning_rate = 0.001;
        this.cost = error * this.learning_rate;
        back_prop.propagate(this)
    }
    static propagate(level)
    {
        const {neural, cost} = level;
        const neuron_keys = Object.keys(neural.neurons)
        const link_keys = Object.keys(neural.links)

        // console.log(`this is the error in backprop : ${cost}`)
        const sigmoid = (val) =>
        {
            return 1 / (1 + Math.exp(-val))
        }
        const relu = (val) =>
        {
            if(val > 0){return val}
            else if(val < 0){return 0}
        }
        const tan_derivate = (val) =>
        {
            return 1 - (Math.tan(val) * Math.tan(val))
        }
        const sigmoid_derivative = (value) =>
        {
            const result = sigmoid(value)
            return result * (1 - result)
        }

        const neuron_iterate = (weights_src) =>
            {
                let r = null
                neuron_keys.forEach(val =>
                    {
                        neural.neurons[val].forEach(neuron =>
                            {
                                if(neuron['name'] === weights_src)
                                {
                                    r = neuron
                                }
                            })
                    })
                    return r;
            }

            const links_iterate = (weights_src) =>
            {
                let r = null;
                link_keys.forEach(val =>
                    {
                        neural.links[val].forEach(weights =>
                            {
                                if(weights['source'] === weights_src[0])
                                {
                                    if(weights['target'] === weights_src[1])
                                    {
                                        r = weights['weight']
                                    }
                                }
                            })
                    })
                    return r;
            }

            const links_iterate_n_change = (weights_src,correct) =>
            {
                link_keys.forEach(val =>
                    {
                        neural.links[val].forEach((weights,idx) =>
                            {
                                if(weights['source'] === weights_src[0])
                                {
                                    if(weights['target'] === weights_src[1])
                                    {
                                        neural.links[val][idx]['weight'] = (weights['weight'] - correct)
                                    }
                                }
                            })
                    })
            }

            const check_prop = () =>
            {
                link_keys.forEach(val =>
                    {
                        neural.links[val].forEach(weights =>
                            {
                                console.log(weights['weight'])
                            })
                    })
            }
            // check_prop()

        neuron_keys.forEach(val =>
            {
                // console.log(val)
                neural.neurons[val].forEach(neuron =>
                    {
                        if(neuron['w_b4'].length !== 0)
                        {
                            let biase_stack = null;
                            neuron['w_b4'].forEach(weight_1 =>
                                {
                                    biase_stack = 1
                                    const ref_neuron = neuron_iterate(weight_1[0]);
                                    const ref_target = neuron_iterate(weight_1[1]);
                                    const ref_neuron_val = ref_neuron['store'];
                                    const ref_target_val = ref_target['store'];
                                    let target_sig_derivate = null;

                                    switch(true)
                                    {
                                        case ref_target['activation_func'] === 'relu':
                                            target_sig_derivate = (ref_target_val);
                                        break;
                                        case ref_target['activation_func'] === 'sigmoid':
                                            target_sig_derivate = sigmoid_derivative(ref_target_val);
                                            break;
                                        default:
                                            // console.log(ref_target_val,'this is the output')
                                            target_sig_derivate = (ref_target_val * (1 - ref_target_val))
                                    }
                                    let stack = 1;
                                    stack = (ref_neuron_val * target_sig_derivate * cost)

                                    switch(true)
                                    {
                                        case ref_target['w_af'].length !== 0:
                                            ref_target['w_af'].forEach(after_weights =>
                                                {
                                                    stack *= links_iterate(after_weights)
                                                    biase_stack *= links_iterate(after_weights);
                                                });
                                        break;
                                    }

                                    for(let i = Number(val)+1; i < neuron_keys.length; i++)
                                    {
                                        neural.neurons[`${i}`].forEach(n_1 =>
                                            {
                                                n_1['w_af'].forEach(w_5 =>
                                                    {
                                                        stack *= links_iterate(w_5);
                                                        biase_stack *= links_iterate(w_5);
                                                    })
                                            })
                                    }
                                    links_iterate_n_change(weight_1,stack)
                                })
                                switch(true)
                                {
                                    case neuron['activation_func'] === 'relu':
                                        neuron['biase'] -= biase_stack * (neuron['store']) * cost
                                        break;
                                    case neuron['activation_func'] === 'sigmoid':
                                        neuron['biase'] -= biase_stack * sigmoid_derivative(neuron['store']) * cost
                                    default:
                                        neuron['biase'] -= biase_stack * (neuron['store'] * (1 - neuron['store'])) * cost  
                                }
                        }
                    })
            })
            // console.log('new one')
            // check_prop()
    }
}

module.exports = back_prop