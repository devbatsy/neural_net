let neural_network = require('./neural.js');
const L_back_prop = require('./linear_back_prop.js')
const L_Feed_forward = require('./linear_feed_forward.js');
const L_train_neural = require('./train_neural.js');
const fs = require('fs');
const path = require('path')

let training_set = [
    // {input : [location, size],output : price },
    // {input : [1,2],output : 7 },
    // {input : [2,1],output : 8 },
    // {input : [1,1],output : 5 },
    // {input : [1.5,2],output : 3 },
];
let arr = [0,1,2,3,4,5,6,7,8,9]

for(let i = 0 ; i < arr.length; i++)
{
    for(let j = 0; j < arr.length; j++)
    {
        training_set.push(
            {
                input:[ i , j ], output : ((i)) + ((j))
            }
        )
    }
}
// console.log(training_set)

function sort_perfect_neural_network()
{
    let stored_neural;
    let greater = 0;
    for(i = 0; i < 1; i++)
    {
        let test = new L_train_neural().train(new neural_network(2,1),L_Feed_forward,L_back_prop,training_set);
            stored_neural = test;
    }
    fs.writeFile(path.join(__dirname , `../trained_networks/mew.json`), JSON.stringify(stored_neural), (err)=>
    {
        if(err) console.log(err)
    })
}

sort_perfect_neural_network();
// test_train()
function test_train()
{
    fs.readFile(path.join(__dirname , `../trained_networks/mew.json`),(err,data) =>
    {
        if(err)console.log(err)
        else 
        {
            let new_struc = JSON.parse(data.toString());
            let input = [1,0];
            let obj = Object.keys(new neural_network(2,1).neurons);
            let link = Object.keys(new neural_network(2,1).links);
            console.log(`${new L_Feed_forward().feed_forward(obj,link,new_struc[0],input,23)[2]} output result  ${3} expected result`)
        }
    })
}
