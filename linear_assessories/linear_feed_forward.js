class Feed_forward{
    constructor()
    {
        this.feed_forward;
    }

    feed_forward(obj,link,neural_structure,inputs,sum)
    {
        // console.log(obj)
        obj.forEach(val =>
            {
                if(val === '1')
                {
                    neural_structure.neurons[val].forEach((value,idx) =>
                        {
                            value['store'] = inputs[idx];
                        })
                }else{
                    neural_structure.neurons[val].forEach(value =>
                        {
                            value['store'] = 0;
                        })
                }
            });
    
            link.forEach(val =>
                {
                    neural_structure.links[val].forEach((value,idx) =>
                        {
                            // console.log(neural_structure.links[val].length)
                            value['source'];
                            let hold = 0;
                            obj.forEach(new_val =>
                                {
                                    neural_structure.neurons[new_val].forEach(rew_val =>
                                        {
                                            if(rew_val['name'] === value['source'])
                                            {
                                                hold = rew_val['store']*value['weight']*rew_val['biase'];
                                            }
                                        })
                                });
    
                                obj.forEach(new_val =>
                                    {
                                        neural_structure.neurons[new_val].forEach(rew_val =>
                                            {
                                                if(rew_val['name'] === value['target'])
                                                {
                                                    
                                                        rew_val['store'] += hold;
                                                }
                                            })
                                    });

                        });
                });

    
                let output = neural_structure.neurons[`${neural_structure.Number_layer}`][0]['store'];
                let remit = [neural_structure,2*(output - sum),output];
                // console.log(output,sum)
                // console.log(2*(output - sum))
                return remit
                //NB:ERROR = 2*(OUTPUT-EXPECTED_VALUE)
    
    }
}

module.exports = Feed_forward;