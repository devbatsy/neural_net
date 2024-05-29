// const fs = require('fs')
// const path = require('path')
// const feed_forward = require('./NL_feed.js');
// const back_prop = require('./NL_back_prop.js');
// const energy_dataset = require('./energy_data.js');
// const numeric = require('./numeric_data.js')
// const normalise = require('./normalise.js');
// const titanic_data_set = require('./raw_data/storage.json');
// const circle_data_set = require('./raw_data/circle_data.json')
// const network_name = 'circle_neural_net'
// const training = circle_data_set[0]
// let validation_set = circle_data_set[1]
// let summon_NN = null;
// let output_key = null;

// const call_Network = () =>
// {
//     fs.readFile(path.join(__dirname, `../trained_networks/${network_name}.json`), (err,data) =>
//     {
//         if(err)console.log(err.name)
//         else {
//             summon_NN = JSON.parse(data);
//             output_key = Object.keys(summon_NN.neurons)[Object.keys(summon_NN.neurons).length - 1];
//         }
//     })
// }
// call_Network()

// const save_NN = () =>
// {
//     const fs = require('fs');
//     const path = require('path');

//     fs.writeFile(path.join(__dirname , `../trained_networks/${network_name}.json`), (JSON.stringify(summon_NN)) , (err) =>
//     {
//         if(err)console.log(err.name)
//     })
// }
// const update_data = (training,mean,S_D) =>
// {
//     training.forEach((val,num) =>
//     {
//         val.input.forEach((value,idx) =>
//             {
//                 training[num].input[idx] = (value - mean[idx])/S_D[idx]
//             })
//     })
//     return training;
// }
// const validation = () =>
// {
//     let accuracy = 0;
//     let current = validation_set
//     update_data(current,new normalise(training).mean,new normalise(training).S_D).forEach(dataset =>
//             {
//                 let re = new feed_forward(summon_NN,dataset.input).neural;
//                 switch(true)
//                 {
//                     case dataset.output[0] === 0:
//                         if(re.neurons[output_key][0]['store'] < 0.5)
//                         {
//                             accuracy += 1
//                         }else {return}
//                     break;
//                     case dataset.output[0] === 1:
//                         if(re.neurons[output_key][0]['store'] >= 0.5)
//                         {
//                             accuracy += 1
//                         }else {return}
//                     break;
//                 }
//                 console.log(`this is the input : ${dataset.input},desired : ${dataset.output}, predicted : ${re.neurons[output_key][0]['store']}`);
//             })
//             accuracy /= update_data(current,summon_NN.mean,summon_NN.s_d).length
//                 console.log(`circle_dataset : validation set accuracy : ${accuracy*100}% : ${current.length} datasets `)
// }

// const direct_run = () =>
// {
    // let re = new feed_forward(summon_NN,[
    //     1,0,0,1,0,0,0,
    //     1,0,0,1,0,0,0,
    //     1,0,0,1,0,0,0,
    //     1,1,1,1,1,1,1,
    //     0,0,0,1,0,0,0,
    // ]).neural;
//     console.log(`this is the input : ${[
//         0,1,1,1,1,1,0,
//         0,0,0,0,0,1,0,
//         0,1,1,1,1,1,0,
//         0,1,0,0,0,0,0,
//         0,1,1,1,1,1,0,
//     ]},desired : ${[1]}, predicted : ${re.neurons[output_key][0]['store'] * 10}`)
// }

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
        this.training = this.data_set[0];
        this.validation_set = this.data_set[1]
        test_validate_NN.test(this);
        this.validate;
        // this.direct_run;
    }
    static test(level)
    {
        let {summon_NN,data_set,fs,path,network_name,normalise} = level;
    }

    validate(neural_network,feed_forward,normalise,array,bool)
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


        const process = () =>
        {
            let accuracy = 0;
            let accuracy_check = 0
            let current = array[array[2]]
            update_data(array[array[2]],new normalise(array[0]).mean,new normalise(array[0]).S_D).forEach(dataset =>
                    {
                        let re = new feed_forward(neural_network,dataset.input,dataset.output.length).neural;
                        dataset.output.forEach((output_data,idx) =>
                            {
                                let x = re.neurons[output_key][idx]['store'];
                                let y = output_data
                                switch(true)
                                {
                                    case y === 1:
                                    accuracy_check++;
                                        if(x > 0.5)
                                        {
                                            accuracy++
                                        }
                                }
                            })
                        switch(true)
                        {
                            case bool:
                                console.log(`input: ${dataset.input}`)
                                re.neurons[output_key].forEach((val,idx) =>
                                    {
                                        console.log(`predicted :${val['store']} desired : ${dataset.output[idx]}`)
                                    })
                            break;
                            case !bool:
                                return;
                        }
                    })
                    accuracy *= 100/accuracy_check
                        console.log(`set accuracy : ${accuracy}% : ${current.length} datasets `)
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