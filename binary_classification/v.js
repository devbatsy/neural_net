const test_train_NN = require('./test_train_NN.js')



let recall_NN = new test_train_NN('housing_NN','house_store');
recall_NN.validate(recall_NN,1,true,false,100);

// direct_run_set.forEach(val =>
//     {
//         console.log(recall_NN.direct_run(recall_NN.summon_NN,recall_NN.feed_forward,recall_NN.normalise,recall_NN.training,[val]))
//     })