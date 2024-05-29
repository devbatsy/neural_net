const neural_net = require('./NL_neural.js');
const energy_dataset = require('./energy_data.js')
const numeric = require('./numeric_data.js');
const normalise = require('./normalise.js');
const batch_create = require('./batch_create_store.js');
const loss_functions = require('./loss_function.js');
const train_create_NN = require('./run_NN.js');
const test_train_NN = require('./test_train_NN.js')
const batch_operation = require('./batch_set.js');
const Mtitanic_data_set = require('./raw_data/Mstorage.json')
const iris_dataset = require('./raw_data/iris_dataset.json')
const Mcircle_data_set = require('./raw_data/Mcircle_data.json');
const normalise_data = require('./normalise.js');

// new batch_create().batch_create('iris_dataset.json',120)
//INFO : new batch_create().batch_create('NAME OF DATASET FILE STORED IN THE RAW DATA FOLDER',NUMBER OF BATCH SIZE)

let training = iris_dataset[0]
// console.log(training.length)
// const direct_run_set = circle_data_set[2]
training = [
    {input : [
        1,1,1,1,1,1,1,
        1,0,0,0,0,0,1,
        1,0,0,0,0,0,1,
        1,0,0,0,0,0,1,
        1,1,1,1,1,1,1,
    ],output : [1,0,0,0,0,0,0,0,0,0]},

    {input : [
        0,1,1,1,1,1,0,
        0,1,0,0,0,1,0,
        0,1,0,0,0,1,0,
        0,1,0,0,0,1,0,
        0,1,1,1,1,1,0,
    ],output : [1,0,0,0,0,0,0,0,0,0]},

    {input : [
        0,0,1,1,1,0,0,
        0,0,0,1,0,0,0,
        0,0,0,1,0,0,0,
        0,0,0,1,0,0,0,
        0,0,1,1,1,0,0,
    ],output : [0,1,0,0,0,0,0,0,0,0]},

    {input : [
        1,1,1,0,0,0,0,
        0,0,1,0,0,0,0,
        0,0,1,0,0,0,0,
        0,0,1,0,0,0,0,
        0,1,1,1,0,0,0,
    ],output : [0,1,0,0,0,0,0,0,0,0]},

    {input : [
        0,0,0,1,1,1,0,
        0,0,0,0,0,1,0,
        0,0,0,0,0,1,0,
        0,0,0,0,0,1,0,
        0,0,0,0,1,1,1,
    ],output : [0,1,0,0,0,0,0,0,0,0]}
]
// const normalised_train_set = new normalise(training).update_data(training,new normalise(training).mean,new normalise(training).S_D);
// const batch_dataset = new batch_operation(normalised_train_set,1).temporal

let adjust = new neural_net(training[0].input.length,training[0].output.length);
let output_key = Object.keys(adjust.neurons)[Object.keys(adjust.neurons).length - 1];
const d_error = 0.1;
new train_create_NN(adjust,training,d_error,output_key,new loss_functions().MSE,0.5,'testing_titan_NN',true)

// let recall_NN = new test_train_NN('testing_titan_NN','iris_dataset');
// recall_NN.validate(recall_NN.summon_NN,recall_NN.feed_forward,recall_NN.normalise,[recall_NN.training,recall_NN.validation_set,1],true);

// direct_run_set.forEach(val =>
//     {
//         console.log(recall_NN.direct_run(recall_NN.summon_NN,recall_NN.feed_forward,recall_NN.normalise,recall_NN.training,[val]))
//     })