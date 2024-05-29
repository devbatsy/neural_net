class batch_create_s{
    constructor()
    {
        this.batch_create
    }
    batch_create(data_name,size)
    {
        const fs = require('fs');

        fs.readFile(`./raw_data/${data_name}`, (err,data) =>
        {
            let array = JSON.parse(data.toString());
            let new_array = [];
            let temporal = []

            array.forEach(val =>
                {
                    switch(true)
                    {
                        case temporal.length === size:
                            new_array.push(temporal);
                            temporal = [];
                        break;
                        default:
                            temporal.push(val)
                    }
                })
                new_array.push(temporal);
                // console.log(new_array)
                fs.writeFile(`./raw_data/${data_name}`, JSON.stringify(new_array), (err) =>
                {
                    if(err)console.log(err.name)
                })
        })
    }
}

module.exports = batch_create_s