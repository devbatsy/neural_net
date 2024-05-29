class test_validate_NN
{
    constructor(network_name,training_set_name)
    {
        this.feed_forward = require('./NL_feed.js');
        this.fs = require('fs')
        this.path = require('path');
        this.loss_functions = require('./loss_function.js');
        this.normalise = require('./normalise.js');
        this.data_set = require(`./raw_data/${training_set_name}.json`);
        this.network_name = network_name;
        this.summon_NN = JSON.parse(this.fs.readFileSync(this.path.join(__dirname, `../trained_networks/${network_name}.json`)))
        this.first = this.data_set[0];
        this.second = this.data_set[1]
        test_validate_NN.test(this);
        this.validate;
        // this.direct_run;
    }
    static test(level)
    {
        let {summon_NN,data_set,fs,path,network_name,normalise,first} = level;
    }

    validate(recall,num_index,bool,metric,p_out_r)
    {
        const neural_network = recall.summon_NN;
        const feed_forward = recall.feed_forward;
        const array = [recall.first,recall.second]
        const output_key = Object.keys(neural_network.neurons)[Object.keys(neural_network.neurons).length - 1];
        const update_data = (training,mean,S_D) =>
        {
            training.forEach((val,num) =>
            {
                val.input.forEach((value,idx) =>
                    {
                        training[num].input[idx] = (value - mean[idx])/S_D[idx]
                    })
            })
            return training;
        }

        const accuracy_metric = (dataset,re,accuracy) =>
        {
            switch(true)
            {
                case dataset.output[0] === 0:
                    if(re.neurons[output_key][0]['store'] < 0.5)
                    {
                        accuracy += 1
                    }else {return}
                break;
                case dataset.output[0] === 1:
                    if(re.neurons[output_key][0]['store'] >= 0.5)
                    {
                        accuracy += 1
                    }else {return}
                break;
            }
        }

        const process = () =>
        {
            let accuracy = 0;
            let p_out_v = 0;
            let current = array[num_index]
            console.log(current.length)
            update_data(array[num_index],neural_network.input_params[0],neural_network.input_params[1]).forEach(dataset =>
                    {
                        p_out_v++;
                        let re = new feed_forward(neural_network,dataset.input).neural;

                        switch(true)
                        {
                            case metric:
                                accuracy_metric(dataset,re,accuracy)
                        }

                        switch(true)
                        {
                            case bool && p_out_v <= p_out_r:
                                let o_r = re.neurons[output_key][0]['store'];
                                o_r = (o_r * neural_network.output_params[1][0]) + neural_network.output_params[0][0]
                                console.log(`desired : ${dataset.output}, predicted : ${o_r}`);
                            break;
                            case !bool:
                                return;
                        }
                    })
                    switch(true)
                    {
                        case metric:
                            accuracy /= array[num_index].length;
                            console.log(`set accuracy : ${accuracy*100}%`)
                    }
        }
        process()
    }

    direct_run(neural_network,feed_forward,normalise,training,input)
    {
        const output_key = Object.keys(neural_network.neurons)[Object.keys(neural_network.neurons).length - 1];
        const update_data = (training,mean,S_D) =>
        {
            training.forEach((val,num) =>
            {
                val.input.forEach((value,idx) =>
                    {
                        training[num].input[idx] = (value - mean[idx])/S_D[idx]
                    })
            })
            return training;
        }
        const normalised_set = update_data(input,new normalise(training).mean,new normalise(training).S_D)[0].input

        let feed_forward_result = new feed_forward(neural_network,normalised_set).neural;
        return `desired : ${input[0].output[0]}  predicted : ${feed_forward_result.neurons[output_key][0]['store']}`
    }
}

module.exports = test_validate_NN;