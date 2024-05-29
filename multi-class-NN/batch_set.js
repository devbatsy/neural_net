class batch
{
    constructor(data_set,batch_num)
    {
        this.data_set = data_set;
        this.temporal = [];
        this.batch_num = batch_num;
        this.calc = Math.floor(data_set.length/batch_num)
        batch.split(this)
    }
    static split(level)
    {
        const {data_set,temporal,batch_num,calc} = level;
        let batch_set = []

        data_set.forEach(val =>
            {
                batch_set.push(val);
                switch(true)
                {
                    case batch_set.length === batch_num:
                        temporal.push(batch_set);
                        batch_set = []
                }
            })
            switch(true)
            {
                case batch_set.length !== 0:
                    temporal.push(batch_set);
            }
    }
}

module.exports = batch