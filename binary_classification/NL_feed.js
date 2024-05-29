class feed_forward{
    constructor(neural,input)
    {
        this.neural = neural;
        this.input = input;
        feed_forward.feed(this)
    }
    static feed(level)
    {
        let {neural,input} = level;
        const neurons_key = Object.keys(neural.neurons)
        const links_key = Object.keys(neural.links);


        const sigmoid = (val) =>
        {
            return 1 / (1 + Math.exp(-val))
        }
        const relu = (val) =>
        {
            if(val > 0){return val}
            else if(val < 0){return 0}
        }
        const tanh_func = (x) =>
        {
            return (Math.exp(x) - Math.exp(-x))/(Math.exp(x) + Math.exp(-x))
        }
        neurons_key.forEach(val =>
            {
                if(val === '1')
                {
                    neural.neurons[val].forEach((neurons,idx) =>
                        {
                            neurons['store'] = input[idx]
                        })
                }else
                {
                    neural.neurons[val].forEach((neurons,idx) =>
                        {
                            neurons['store'] = 0
                        })
                }
            })


            const links_iterate = (weights_src) =>
            {
                let r = null;
                links_key.forEach(val =>
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



            const neuron_iterate = (weights_src) =>
            {
                let r = null
                neurons_key.forEach(val =>
                    {
                        neural.neurons[val].forEach(neuron =>
                            {
                                if(neuron['name'] === weights_src)
                                {
                                    r = neuron['store']
                                }
                            })
                    })
                    return r;
            }


            let stacking = []
            neurons_key.forEach(val =>
                {
                    neural.neurons[val].forEach(neuron =>
                        {
                            if(neuron['w_b4'].length !== 0)
                            {
                                let stack = neuron['biase']
                                neuron['w_b4'].forEach(weights_src =>
                                    {
                                        const weight_link = links_iterate(weights_src)

                                        const neuron_store = neuron_iterate(weights_src[0]);

                                        stack += (weight_link * neuron_store)
                                    })
                                    switch(true)
                                    {
                                        case neuron['activation_func'] === 'relu':
                                            neuron['store'] = relu(stack)
                                            break
                                        case neuron['activation_func'] === 'sigmoid':
                                            neuron['store'] = sigmoid(stack)
                                            break;
                                        default:
                                            neuron['store'] = stack;
                                            stacking.push(neuron['store'])
                                    }
                            }
                        })
                })
                // let sum = 0
                // stacking.forEach(values =>
                //     {
                //         sum += Math.exp(values)
                //     })
                // stacking.forEach((values,idx) =>
                // {
                //     neurons_key.forEach(val =>
                //         {
                //             if(val === '3')
                //             {
                //                 neural.neurons[val].forEach((neuron) =>
                //                     {
                //                         neural.neurons[val][idx]['store'] = stacking[idx]/sum
                //                     })
                //             }
                //             })
                // })

    }
}

module.exports = feed_forward