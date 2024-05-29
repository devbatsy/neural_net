let temporal = () =>
{
    const fs = require('fs');
    const create_array = new Array();
    let dataset_temporal = {input:[],output:[]}
    let staged = new Array([],[],[])
    fs.readFile('./raw_data/iris.data', (err,data) =>
        {
            if(err)console.log(err)
            else{
                let first = data.toString().split(',')
                first.forEach((val,idx) =>
                    {
                        if(val.includes('\n'))
                        {
                            let nest = val.split('\n');
                            first[idx] = `${nest[0]},${nest[1]}`;
                        }
                    })

                    first = first.join(',').split(',');
                    first.forEach(phase_two =>
                        {
                            switch(true)
                            {
                                case Number(phase_two) >= 0:
                                    dataset_temporal.input.push(Number(phase_two))
                                break;
                                default:
                                    switch(true)
                                    {
                                        case phase_two === 'Iris-setosa':
                                            dataset_temporal.output = [1,0,0];
                                            staged[0].push(dataset_temporal)
                                        break;
                                        case phase_two === 'Iris-versicolor':
                                            dataset_temporal.output = [0,1,0];
                                            staged[1].push(dataset_temporal)
                                        break;
                                        case phase_two === 'Iris-virginica':
                                            dataset_temporal.output = [0,0,1];
                                            staged[2].push(dataset_temporal)
                                        break;
                                    }
                                    // create_array.push(dataset_temporal)
                                    dataset_temporal = {input:[],output:[]}
                            }
                        })
                        for(let i = 0 ; i < staged[0].length; i++)
                        {
                            for(let j = 0 ; j < staged.length; j++)
                            {
                                create_array.push(staged[j][i])
                            }
                        }
                        fs.writeFile('./raw_data/iris_dataset.json', JSON.stringify(create_array), err =>
                        {
                            if(err)console.log(err.name)
                            else console.log('data created successful')
                        })
            }
        })
}

temporal()