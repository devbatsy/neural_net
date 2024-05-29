class screen_data
{
    constructor()
    {
        this.fs = require('fs');
        this.final_data = []
        screen_data.screen(this)
    }
    static screen(level)
    {
        const {fs,final_data} = level;

        const arrange_data = (data) =>
        {
            const data_array = data.split(',');
            const stage_2 = new Array();
            let temporal = {input:[],output:[]}
            let smaller = []
            const first = () =>
            {
                data_array.forEach((val,idx) =>
                {
                        if(val.includes('\r\n'))
                        {
                            let tab_v = val.split('\r\n')
                            tab_v.forEach(value =>
                                {
                                    if(Number(value) >= 0)
                                    {
                                        stage_2.push(Number(value))
                                    }
                                })
                        }else
                        {
                            switch(true)
                            {
                                case Number(val) >= 0:
                                    stage_2.push(Number(val));
                                    break;
                                case val === 'male':
                                    stage_2.push(0);
                                    break;
                                case val === 'female':
                                    stage_2.push(1)
                            }
                        }
                })
            }

            const second = () =>
            {
                const set_temporal = (val) =>
                {
                    switch(true)
                            {
                                case temporal.output.length === 0:
                                    if(val === 0)
                                    {
                                        temporal.output.push(1,0);
                                    }else if(val === 1)
                                    {
                                        temporal.output.push(0,1);
                                    }
                                    break;
                                case temporal.output.length > 0:
                                    temporal.input.push(val)
                            }
                }
                stage_2.forEach(val =>
                    {
                        if(temporal.input.length < 6)
                        {
                            set_temporal(val)
                        }else if(temporal.input.length === 6)
                        {
                            // console.log(temporal)
                            smaller.push(temporal);
                            // console.log(smaller)
                            temporal = {input:[],output:[]}
                            set_temporal(val);
                        }
                        switch(true)
                            {
                                case smaller.length === 712:
                                    final_data.push(smaller)
                                    smaller = []
                            }
                    })
                    final_data.push(smaller)
                    console.log(final_data.length)
            }

            const store_db = () =>
            {
                fs.writeFile('./raw_data/Mstorage.json', JSON.stringify(final_data), err =>
                {
                    if(err) console.log(err.name)
                    else console.log('success')
                })
            }

            first()
            second()
            store_db()
        }
        fs.readFile('./raw_data/titanic.csv', (err,data) =>
        {
            if(err)console.log(err)
            else{
                arrange_data(data.toString())
            }
        })
    }
}

new screen_data()