#include <cmath>
#include <unordered_map>
#include <vector>

class NeuralNetwork {
public:
    NeuralNetwork(int input, int output) {
        this->Number_layer = 3;
        this->output_activation = "";
        this->layer_1 = input;
        this->output = output;
        neurons_create();
        links_create();
        pair();
    }

private:
    static std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> neurons;
    static std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> links;
    int Number_layer;
    std::string output_activation;
    int layer_1;
    std::vector<std::vector<int>> layer_hidden;
    double concurrent_value;
    double output;
    std::string take_function;

    void neurons_create() {
        for (int i = 0; i < Number_layer; i++) {
            neurons[std::to_string(i + 1)] = std::vector<std::unordered_map<std::string, double>>();
            switch (i) {
                case 0:
                    concurrent_value = layer_1;
                    take_function = "";
                    break;
                case Number_layer - 1:
                    concurrent_value = output;
                    take_function = output_activation;
                    break;
                default:
                    concurrent_value = layer_hidden[i - 1][0];
                    take_function = layer_hidden[i - 1][1];
            }
            for (int j = 0; j < concurrent_value; j++) {
                std::unordered_map<std::string, double> obj;
                obj["name"] = std::to_string(i) + "th layer " + std::to_string(j) + "th neuron";
                obj["store"] = 0.0;
                obj["biase"] = (double) rand() / RAND_MAX;
                obj["layer"] = i + 1;
                obj["w_b4"] = std::vector<std::vector<std::string>>();
                obj["w_af"] = std::vector<std::vector<std::string>>();
                obj["activation_func"] = take_function;
                obj["last"] = (j == concurrent_value - 1) ? true : false;
                neurons[std::to_string(i + 1)].push_back(obj);
            }
        }
    }

    void links_create() {
        double sat = 0.0; // level.factor;
        double limit = std::sqrt(6 / (layer_1 + output));
        for (int i = 1; i < Number_layer; i++) {
            for (int j = 0; j < neurons[std::to_string(i)].size(); j++) {
                links[neurons[std::to_string(i)][j]["name"]] = std::vector<std::unordered_map<std::string, double>>();
                for (int k = 0; k < neurons[std::to_string(i + 1)].size(); k++) {
                    sat--;
                    std::unordered_map<std::string, double> obj;
                    obj["source"] = neurons[std::to_string(i)][j]["name"];
                    obj["target"] = neurons[std::to_string(i + 1)][k]["name"];
                    obj["weight"] = ((double) rand() / RAND_MAX) * 2 * limit - limit;
                    obj["back_prop_value"] = sat;
                    links[neurons[std::to_string(i)][j]["name"]].push_back(obj);
                }
            }
        }
    }

    void pair() {
        for (auto& [val, link] : links) {
            for (auto& value : link) {
                for (auto& [neu_val, neurons] : neurons) {
                    for (auto& nxt_val : neurons) {
                        if (value["source"] == nxt_val["name"]) {
                            nxt_val["w_af"].push_back({value["source"], value["target"]});
                        }
                        if (value["target"] == nxt_val["name"]) {
                            nxt_val["w_b4"].push_back({value["source"], value["target"]});
                        }
                    }
                }
            }
        }
    }
};

// Definition of neurons and links member variables
std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> NeuralNetwork::neurons;
std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> NeuralNetwork::links;

module.exports = NeuralNetwork;
