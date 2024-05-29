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
        this.confusion_matrix = new Array()
        this.storage_name = storage_name;
        start_run.run(this)
    }

    static run(level)
    {
        let {adjust,training,d_error,output_key,loss,feed_forward,back_prop,threshold,storage_name,print,confusion_matrix} = level;


        const save_NN = () =>
        {
            const fs = require('fs');
            const path = require('path');
        
            fs.writeFile(path.join(__dirname , `../trained_networks/${storage_name}.json`), (JSON.stringify(adjust)) , (err) =>
            {
                if(err)console.log(err.message,'error reach here')
                else console.log('save successfull')
            })
        }
        
        const run = () =>
        {
            let over_error = 1;
            let accuracy = 0
            let epoch = 0;
            let stack_error = [];
            function start_run()
            {
                over_error = 0;
                accuracy = 0;
                const create_confusion_matrix = (x) =>
                {
                    for(let i = 0; i < (x*2); i++)
                    {
                        confusion_matrix.push(0)
                    }
                }
                create_confusion_matrix(training[0].output.length)
                //true_positive,false_positive,true_negative,false_negative
                training.forEach((dataset,t) =>
                    {
                        adjust = new feed_forward(adjust,dataset.input,dataset.output.length).neural;
                        stack_error = [];
                        let stack_one = [0,0]
                        dataset.output.forEach((output_data,idx) =>
                            {
                                let x = adjust.neurons[output_key][idx]['store'];
                                let y = output_data
                                stack_error.push([y,x,idx])
                                stack_one[0] += adjust.neurons[output_key][idx]['store'];
                                stack_one[1] += output_data;
                            })
                            stack_one[0] /= dataset.output.length;
                            stack_one[1] /= dataset.output.length;
                            switch(true)
                            {
                                case stack_error.length === 1:
                                    console.log('hey')
                                    stack_error.push(loss(stack_error[0][1],stack_error[0][0]));
                                    break;
                                case stack_error.length > 1:
                                    let error = 0
                                    stack_error.forEach(val =>
                                        {
                                            if(val[0] === 1)
                                            {
                                                error = (-1 * val[0] * Math.log10(val[1]))
                                                for(let i = 0 ;  i < dataset.output.length; i++)
                                                {
                                                    if(val[2] === i && val[1] >= threshold) confusion_matrix[i]++;
                                                    else if(val[2] === i && val[1] < threshold) confusion_matrix[dataset.output.length + i]++;
                                                }
                                            }
                                        })
                                        error /= stack_error.length
                                    stack_error.push(error);
                            }
                            over_error += stack_error[stack_error.length-1];
                            adjust = new back_prop(adjust, stack_error[stack_error.length-1],dataset.output).neural
                    })
                    over_error /= training.length;
                    for(let i = 0; i < training[0].output.length; i++)
                    {
                        accuracy += confusion_matrix[i]
                    }
                    accuracy /= (training.length/100)
            }
                    
                while(over_error > 0.035)
                {
                    epoch++;
                    console.log(`AVG ERROR : ${over_error} accuracy :${accuracy}%`,confusion_matrix);
                    confusion_matrix = []
                    start_run()
                }
                console.log(`AVG ERROR : ${over_error} accuracy :${accuracy}%`,confusion_matrix);
                console.log(`${epoch} iterations`);
                    save_NN()
        }
        run();
        const final_result = () =>
        {
            training.forEach(dataset =>
            {
                let net = new feed_forward(adjust,dataset.input,dataset.output.length).neural;
                console.log(`input: ${dataset.input}`)
                net.neurons[output_key].forEach((val,idx) =>
                    {
                        console.table(`predicted :${val['store']} desired : ${dataset.output[idx]}`)
                    })
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