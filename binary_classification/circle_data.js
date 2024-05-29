class circle{
    constructor(num)
    {
        this.data = [];
        this.fs = require('fs')
        this.path = require('path')
        this.num = num;
        circle.create_data(this)
    }
    static create_data(level)
    {
        const {data,num,fs,path} = level;
        
            for(let i = 0; i < num; i++)
            {
                let X = [];
                let Y = [];
                let rad = Math.random() * 2;
                let ang = Math.random() * 2 * Math.PI;
        
                let x = rad * Math.cos(ang)
                let y = rad * Math.sin(ang);
        
                X.push([x,y])
                if(rad > 1)
                {
                    Y.push(0)
                }else
                {
                    Y.push(1)
                }
                data.push({input:[x,y],output:Y})
            }

            fs.writeFile('./raw_data/circle_data.json', JSON.stringify(data), (err) =>
            {
                if(err)console.log(err.name)
            })
    }
}

new circle(8000)