const neural_net = require('./NL_neural.js');
const energy_dataset = require('./energy_data.js')
const numeric = require('./numeric_data.js');
const normalise = require('./normalise.js');
const batch_create = require('./batch_create_store.js');
const loss_functions = require('./loss_function.js');
const train_create_NN = require('./run_NN.js');
const batch_operation = require('./batch_set.js');
const titanic_data_set = require('./raw_data/storage.json')
const Chousing_data_set = require('./raw_data/house_store.json')
const circle_data_set = require('./raw_data/circle_data.json');
const normalise_data = require('./normalise.js');

// new batch_create().batch_create('house_store.json',80)
//INFO : new batch_create().batch_create('NAME OF DATASET FILE STORED IN THE RAW DATA FOLDER',NUMBER OF BATCH SIZE)

let training = null
training = Chousing_data_set[0];
// console.log(training.length)
// const direct_run_set = circle_data_set[2]
// training = [
//     {input:[5,3],output:[2]},
//     {input:[3,1],output:[2]},
//     {input:[1,1],output:[0]},
//     {input:[2,1],output:[1]},
// ]
const norm_class = new normalise(training);
norm_class.update_data_input(training,norm_class);
norm_class.update_data_output(training,norm_class);
// console.log(training)
// const batch_dataset = new batch_operation(normalised_train_set,1).temporal

let adjust = new neural_net(training[0].input.length,training[0].output.length);
adjust.input_params = [norm_class.Imean,norm_class.IS_D]
adjust.output_params = [norm_class.Omean,norm_class.OS_D]
let output_key = Object.keys(adjust.neurons)[Object.keys(adjust.neurons).length - 1];
const d_error = 0.06;
new train_create_NN(adjust,training,d_error,output_key,new loss_functions().MSE,0.5,'housing_NN',false)