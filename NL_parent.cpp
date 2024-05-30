#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <unordered_map>
#include "neural_net.h" // Assuming this is the neural network class header
#include "loss.h"
#include "feed_forward.h"
#include "back_prop.h"
#include "run_NN.h"
#include "test_train_NN.h"
#include "normalise.h"
#include "batch_create.h"
#include "batch_operation.h"

// Function to load dataset from a JSON file
std::vector<std::unordered_map<std::string, std::vector<double>>> load_dataset(const std::string& filename) {
    // Implement the JSON file reading logic
    std::vector<std::unordered_map<std::string, std::vector<double>>> dataset;
    // JSON parsing code to fill `dataset`
    return dataset;
}

int main() {
    auto iris_dataset = load_dataset("raw_data/iris_dataset.json");
    auto training = iris_dataset[0];

    // Example training data
    training = {
        {{"input", {1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1}}, {"output", {1,0,0,0,0,0,0,0,0,0}}},
        {{"input", {0,1,1,1,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,1,1,1,1,0}}, {"output", {1,0,0,0,0,0,0,0,0,0}}},
        {{"input", {0,0,1,1,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,0,0}}, {"output", {0,1,0,0,0,0,0,0,0,0}}},
        {{"input", {1,1,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,1,1,0,0,0}}, {"output", {0,1,0,0,0,0,0,0,0,0}}},
        {{"input", {0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1}}, {"output", {0,1,0,0,0,0,0,0,0,0}}}
    };

    NeuralNetwork adjust(training[0]["input"].size(), training[0]["output"].size());
    std::string output_key = adjust.get_last_layer_key();
    double d_error = 0.1;
    TrainNN train(adjust, training, d_error, output_key, Loss::MSE, 0.5, "testing_titan_NN", true);

    // Uncomment and implement recall logic if necessary
    // TestTrainNN recall_NN("testing_titan_NN", "iris_dataset");
    // recall_NN.validate(recall_NN.summon_NN, recall_NN.feed_forward, recall_NN.normalise, {recall_NN.training, recall_NN.validation_set, 1}, true);
    
    // direct_run_set.forEach(val => {
    //     std::cout << recall_NN.direct_run(recall_NN.summon_NN, recall_NN.feed_forward, recall_NN.normalise, recall_NN.training, {val}) << std::endl;
    // });
    
    return 0;
}
