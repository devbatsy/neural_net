class energy_training_set
{
    constructor()
    {
        this.data = [];
        energy_training_set.create(this)
    }
    static create(level)
    {
        const {data} = level;

        data.push({input : [
            1,1,1,1,1,1,1,
            1,0,0,0,0,0,1,
            1,0,0,0,0,0,1,
            1,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
        ],output : [0]})

        data.push({input : [
            0,1,1,1,1,1,0,
            0,1,0,0,0,1,0,
            0,1,0,0,0,1,0,
            0,1,0,0,0,1,0,
            0,1,1,1,1,1,0,
        ],output : [0]})

        data.push({input : [
            0,0,1,1,1,0,0,
            0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,
            0,0,1,1,1,0,0,
        ],output : [0.1]})

        data.push({input : [
            1,1,1,0,0,0,0,
            0,0,1,0,0,0,0,
            0,0,1,0,0,0,0,
            0,0,1,0,0,0,0,
            0,1,1,1,0,0,0,
        ],output : [0.1]})

        data.push({input : [
            0,0,0,1,1,1,0,
            0,0,0,0,0,1,0,
            0,0,0,0,0,1,0,
            0,0,0,0,0,1,0,
            0,0,0,0,1,1,1,
        ],output : [0.1]})

        data.push({input : [
            0,0,1,1,1,0,0,
            0,0,0,0,1,0,0,
            0,0,0,0,1,0,0,
            0,0,0,0,1,0,0,
            0,0,0,1,1,1,0,
        ],output : [0.1]})
        
        data.push({input : [
            0,0,0,1,0,0,0,
            0,0,1,1,0,0,0,
            0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,
            0,0,1,1,1,0,0,
        ],output : [0.1]})

        data.push({input : [
            0,1,1,1,0,0,0,
            0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,
            0,0,1,1,1,0,0,
        ],output : [0.1]})

        data.push({input : [
            1,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,
            1,1,1,1,1,1,1,
        ],output : [0.2]})

        data.push({input : [
            0,1,1,1,1,1,0,
            0,0,0,0,0,1,0,
            0,1,1,1,1,1,0,
            0,1,0,0,0,0,0,
            0,1,1,1,1,1,0,
        ],output : [0.2]})

        data.push({input : [
            1,1,1,1,1,1,0,
            0,0,0,0,0,1,0,
            1,1,1,1,1,1,0,
            1,0,0,0,0,0,0,
            1,1,1,1,1,1,0,
        ],output : [0.2]})

        data.push({input : [
            0,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,1,1,1,1,1,1,
            0,1,0,0,0,0,0,
            0,1,1,1,1,1,1,
        ],output : [0.2]})

        data.push({input : [
            1,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
        ],output : [0.3]})

        data.push({input : [
            0,1,1,1,1,1,0,
            0,0,0,0,0,1,0,
            0,1,1,1,1,1,0,
            0,0,0,0,0,1,0,
            0,1,1,1,1,1,0,
        ],output : [0.3]})

        data.push({input : [
            0,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,1,1,1,1,1,1,
        ],output : [0.3]})

        data.push({input : [
            1,1,1,1,1,1,0,
            0,0,0,0,0,1,0,
            1,1,1,1,1,1,0,
            0,0,0,0,0,1,0,
            1,1,1,1,1,1,0,
        ],output : [0.3]})

        data.push({input : [
            1,0,0,1,0,0,0,
            1,0,0,1,0,0,0,
            1,0,0,1,0,0,0,
            1,1,1,1,1,1,1,
            0,0,0,1,0,0,0,
        ],output : [0.4]})

        data.push({input : [
            0,0,0,0,0,0,0,
            0,1,0,1,0,0,0,
            0,1,0,1,0,0,0,
            0,1,1,1,1,1,0,
            0,0,0,1,0,0,0,
        ],output : [0.4]})

        data.push({input : [
            1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,
            1,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
        ],output : [0.5]})

        data.push({input : [
            0,1,1,1,1,1,0,
            0,1,0,0,0,0,0,
            0,1,1,1,1,1,0,
            0,0,0,0,0,1,0,
            0,1,1,1,1,1,0,
        ],output : [0.5]})

        data.push({input : [
            1,1,1,1,1,1,0,
            1,0,0,0,0,0,0,
            1,1,1,1,1,1,0,
            0,0,0,0,0,1,0,
            1,1,1,1,1,1,0,
        ],output : [0.5]})

        data.push({input : [
            0,1,1,1,1,1,1,
            0,1,0,0,0,0,0,
            0,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,1,1,1,1,1,1,
        ],output : [0.5]})

        data.push({input : [
            0,0,1,1,1,1,1,
            0,0,1,0,0,0,0,
            0,0,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,0,1,1,1,1,1,
        ],output : [0.5]})

        data.push({input : [
            1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,
            1,1,1,1,1,1,1,
            1,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
        ],output : [0.6]})

        data.push({input : [
            0,1,1,1,1,1,0,
            0,1,0,0,0,0,0,
            0,1,1,1,1,1,0,
            0,1,0,0,0,1,0,
            0,1,1,1,1,1,0,
        ],output : [0.6]})

        data.push({input : [
            1,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,0,0,0,0,0,1,
        ],output : [0.7]})

        data.push({input : [
            1,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,0,0,0,0,0,1,
        ],output : [0.7]})

        data.push({input : [
            1,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,0,0,1,1,1,1,
            0,0,0,0,0,0,1,
            0,0,0,0,0,0,1,
        ],output : [0.7]})

        data.push({input : [
            0,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,0,0,0,0,0,1,
        ],output : [0.7]})

        data.push({input : [
            1,1,1,1,1,1,1,
            1,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
            1,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
        ],output : [0.8]})

        data.push({input : [
            0,1,1,1,1,1,0,
            0,1,0,0,0,1,0,
            0,1,1,1,1,1,0,
            0,1,0,0,0,1,0,
            0,1,1,1,1,1,0,
        ],output : [0.8]})

        data.push({input : [
            1,1,1,1,1,1,1,
            1,0,0,0,0,0,1,
            1,1,1,1,1,1,1,
            0,0,0,0,0,0,1,
            0,0,0,0,0,0,1,
        ],output : [0.9]})

        data.push({input : [
            0,1,1,1,1,1,0,
            0,1,0,0,0,1,0,
            0,1,1,1,1,1,0,
            0,0,0,0,0,1,0,
            0,0,0,0,0,1,0,
        ],output : [0.9]})

        console.log(data.length)
    }
}

module.exports = energy_training_set