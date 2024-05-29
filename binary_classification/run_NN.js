class start_run{
    constructor(neural_net,training_set,d_error,output_key,loss,threshold,storage_name,print_result)
    {
        this.adjust = neural_net;
        this.print = print_result
        this.training = training_set;
        this.d_error = d_error;
        this.output_key = output_key;
        this.loss = loss
        this.feed_forward = require('./NL_feed.js');
        this.back_prop = require('./NL_back_prop.js');
        this.threshold = threshold;
        this.storage_name = storage_name;
        start_run.run(this)
    }

    static run(level)
    {
        let {adjust,training,d_error,output_key,loss,feed_forward,back_prop,threshold,storage_name,print} = level


        const save_NN = () =>
        {
            const fs = require('fs');
            const path = require('path');
        
            fs.writeFile(path.join(__dirname , `../trained_networks/${storage_name}.json`), (JSON.stringify(adjust)) , (err) =>
            {
                if(err)console.log(err.name)
            })
        }
        
        
        const run = () =>
        {
            let over_error = 1;
            let epoch = 0;
            let accuracy = 0;
            let stack_error = [];
            function start_run()
            {
                over_error = 0;
                accuracy = 0;
                training.forEach((dataset,t) =>
                    {
                        adjust = new feed_forward(adjust,dataset.input).neural;
                        stack_error = [];
                        let stack_one = [0,0]
                        dataset.output.forEach((output_data,idx) =>
                            {
                                let x = adjust.neurons[output_key][idx]['store'];
                                let y = output_data
                                stack_error.push([y,x])
                                stack_one[0] += adjust.neurons[output_key][idx]['store'];
                                stack_one[1] += output_data
                            })
                            stack_one[0] /= dataset.output.length;
                            stack_one[1] /= dataset.output.length;
                            switch(true)
                            {
                                case stack_error.length === 1:
                                    stack_error.push(loss(stack_error[0][1],stack_error[0][0]));
                                    break;
                            }
                            over_error += stack_error[stack_error.length-1]
                            if(Math.sign(stack_one[0] - stack_one[1]) === 1)
                            {
                                adjust = new back_prop(adjust, stack_error[stack_error.length-1]).neural
                            }else if(Math.sign(stack_one[0] - stack_one[1]) === -1)
                            {
                                adjust = new back_prop(adjust, -stack_error[stack_error.length-1]).neural
                            }

                            switch(true)
                            {
                                case dataset.output[0] === 0:
                                    if(adjust.neurons[output_key][0]['store'] < threshold)
                                    {
                                        accuracy += 1
                                    }else return
                                break;
                                case dataset.output[0] === 1:
                                    if(adjust.neurons[output_key][0]['store'] >= threshold)
                                    {
                                        accuracy += 1;
                                    }else {return}
                                break;
                            }
                            accuracy /= dataset.output.length;
                    })
                    accuracy /= training.length
                    over_error /= training.length
            }

                while(over_error > d_error)
                {
                    console.log(`AVG ERROR : ${over_error}`,`accuracy rate : ${accuracy*100}%`);
                    epoch++;
                    start_run()
                }
                    console.log(`AVG ERROR : ${over_error}`,`accuracy rate : ${accuracy*100}%`)
                    console.log(`${epoch} iterations`)
                    console.log(stack_error)
                    save_NN()

        }
        run();
        const final_result = () =>
        {
            training.forEach(dataset =>
            {
                let net = new feed_forward(adjust,dataset.input).neural;
                console.log(`input: ${dataset.input} desired : ${dataset.output} predicted : ${[net.neurons[output_key][0]['store']]}`)
            })
        }

        switch(true)
        {
            case print:
                final_result()
            break;
            default:
                return
        }
    }
}

module.exports = start_run