class back_prop{
    constructor()
    {
        this.back_propagation;
    }

    back_propagation(obj,link,neural_structure,error)
    {
        let learning_rate = 0.001;
        let cost = learning_rate*error;
        let array = [];
        let new_weights = [];
        
        link.forEach((val,idx) =>
            {
                if(idx === link.length-1)
                    {
                        neural_structure.links[val].forEach(value =>
                            {
                                array.push(value)
                            })
                        flip();
                    }
                else
                    {
                        neural_structure.links[val].forEach(value =>
                            {
                                array.push(value)
                            })
                    }
            });
    
            function flip()
            {
                for(let i = array.length-1;i >= 0; i--)
                {
                    let hold = 1;
                    for(let j = 0; j < (array.length-1)-i;j++)
                    {
                        hold *= array[(array.length-1)-j]['weight']
                    }
                    //((1/(1+Math.exp(-1 * rew_val['store']))) * (1 - (1/(1+Math.exp(-1 * rew_val['store'])))))
                    obj.forEach(new_val =>
                        {
                            neural_structure.neurons[new_val].forEach(rew_val =>
                                {
                                    if(rew_val['name'] === array[i]['source'])
                                    {
                                        hold *= rew_val['store'];
                                    }
                                })
                                //((1/(1+Math.exp(-1 * rew_val['store']))) * (1 - (1/(1+Math.exp(-1 * rew_val['store'])))))
                        });
                    let interim_result = array[i]['weight'] - hold*cost;
                        new_weights.push(interim_result)
                }
                update_weight();
            }
            
            function update_weight()
            {
                // console.log(new_weights)
                link.forEach(val =>
                    {
                        neural_structure.links[val].forEach(value =>
                            {
                                value['weight'] = new_weights[value['back_prop_value']];
                            })
                    });
            }
            // console.log(new_weights)
            return [neural_structure,new_weights]
    }
}

module.exports = back_prop;