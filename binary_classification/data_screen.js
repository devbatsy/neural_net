class screen_data
{
    constructor()
    {
        this.fs = require('fs');
        this.final_data = [];
        this.text_encode = [['NEAR BAY',1],['INLAND',2],['NEAR OCEAN',3],['<1H OCEAN',4],['ISLAND',5]]//// ['NEAR BAY',1],['INLAND',2],['NEAR OCEAN',3],['<1H OCEAN',4]
        this.encode_param = ['\n',10,[8]];
        this.seperator = ','
        this.output_bool = false;
        this.input_bool = true
        screen_data.screen(this)
    }
    static screen(level)
    {
        const {fs,final_data,text_encode,encode_param,seperator} = level;

        const arrange_data = (data) =>
        {
            let data_array = data.split(encode_param[0]).join(seperator).split(seperator);
            const stage_2 = new Array();
            let count = 0;
            let temporal = {input:new Array(),output:new Array()}
            let smaller = []
            const first = () =>
            {

                data_array.forEach((val,idx) =>
                {
                        text_encode.forEach(text_value =>
                            {
                                switch(true)
                                {
                                    case text_value[0] === val:
                                        smaller.push(text_value[1]);
                                        break;
                                }
                            })
                        switch(true)
                        {
                            case !isNaN(Number(val)):
                                smaller.push(Number(val));
                                break;
                        }
                        switch(true)
                        {
                            case smaller.length === encode_param[1]:
                                stage_2.push(smaller);
                                smaller = [];
                        }
                })
            }

            const second = () =>
            {
                const set_temporal = (val) =>
                {
                    temporal = {input:new Array(), output:new Array()}
                    for(let i = 0 ; i < encode_param[1]; i++)
                    {
                        let bool = true
                        encode_param[2].forEach(value =>
                            {
                                if(value === i)
                                {
                                    bool = false;
                                    temporal.output.push(val[i])
                                }
                            })
                        if(bool)
                        {
                            temporal.input.push(val[i])
                        }
                    }
                    final_data.push(temporal)
                }
                stage_2.forEach(val =>
                    {
                        set_temporal(val);
                    })

                    console.log(final_data.length)
            }

            const store_db = () =>
            {
                fs.writeFile('./raw_data/house_store.json', JSON.stringify(final_data), err =>
                {
                    if(err) console.log(err.name)
                    else console.log('success')
                })
            }

            first()
            second()
            store_db()
        }
        fs.readFile('./raw_data/new_housing.csv', (err,data) =>
        {
            if(err)console.log(err)
            else{
                arrange_data(data.toString())
            }
        })
    }
}

new screen_data()