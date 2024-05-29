class train_neural{
    constructor()
    {
        this.train
    }
    
    train(neural_structure,feed_forward,back_prop,training_set)
    {
        let save;
        let adjusted_neural_structure = neural_structure
        let result;
        let weight = 0;
        let adjusted_weights_structure = [];
        for(let i = 0; i < 1000; i++)
        {
            let eff = 0;
            training_set.forEach((val,idx) =>
                {
                    result = new feed_forward().feed_forward(Object.keys(neural_structure.neurons),Object.keys(neural_structure.links),adjusted_neural_structure,val.input,val.output);
                    save = new back_prop().back_propagation(Object.keys(neural_structure.neurons),Object.keys(neural_structure.links),result[0],result[1]);
    
                    adjusted_neural_structure = save[0];
                    let accuracy = 100 - ((Math.abs((val.output - result[2])/val.output))*100);
                    eff += accuracy;
                })
                weight = eff/training_set.length;
                shuffle();
        }

        function shuffle()
        {
                let data = training_set.shift();
                training_set.push(data)
        }
        // console.log(weight)
        return [adjusted_neural_structure,weight]
    }
}
module.exports = train_neural