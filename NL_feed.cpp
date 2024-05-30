#include <cmath>
#include <unordered_map>
#include <vector>
#include <string>
#include <iostream>
#include <algorithm>

class FeedForward {
public:
    FeedForward(std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> neural, std::vector<double> input, int output)
        : neural(neural), input(input), output(output) {
        this->softmax_bol = false;
        this->alpha = 0.001;
        auto keys = get_keys(neural["neurons"]);
        this->output_key = keys[keys.size() - 1];
        feed();
    }

private:
    std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> neural;
    std::vector<double> input;
    int output;
    bool softmax_bol;
    double alpha;
    std::string output_key;

    static std::vector<std::string> get_keys(std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> map) {
        std::vector<std::string> keys;
        for (auto const& element : map) {
            keys.push_back(element.first);
        }
        return keys;
    }

    void feed() {
        auto neurons_key = get_keys(neural["neurons"]);
        auto links_key = get_keys(neural["links"]);

        auto sigmoid = [](double val) {
            return 1 / (1 + std::exp(-val));
        };

        auto relu = [](double val) {
            return (val > 0) ? val : 0.0;
        };

        auto leaky_relu = [this](double val) {
            return (val > 0) ? val : alpha * val;
        };

        auto tanh_func = [](double x) {
            return (std::exp(x) - std::exp(-x)) / (std::exp(x) + std::exp(-x));
        };

        for (auto& val : neurons_key) {
            if (val == "1") {
                for (size_t idx = 0; idx < neural["neurons"][val].size(); ++idx) {
                    neural["neurons"][val][idx]["store"] = input[idx];
                }
            } else {
                for (auto& neurons : neural["neurons"][val]) {
                    neurons["store"] = 0;
                }
            }
        }

        auto links_iterate = [this, &links_key](std::vector<std::string> weights_src) {
            double r = 0.0;
            for (auto& val : links_key) {
                for (auto& weights : neural["links"][val]) {
                    if (weights["source"] == weights_src[0] && weights["target"] == weights_src[1]) {
                        r = weights["weight"];
                    }
                }
            }
            return r;
        };

        auto neuron_iterate = [this, &neurons_key](std::string weights_src) {
            double r = 0.0;
            for (auto& val : neurons_key) {
                for (auto& neuron : neural["neurons"][val]) {
                    if (neuron["name"] == weights_src) {
                        r = neuron["store"];
                    }
                }
            }
            return r;
        };

        std::vector<double> stacking;
        for (auto& val : neurons_key) {
            for (auto& neuron : neural["neurons"][val]) {
                if (!neuron["w_b4"].empty()) {
                    double stack = neuron["biase"];
                    for (auto& weights_src : neuron["w_b4"]) {
                        double weight_link = links_iterate(weights_src);
                        double neuron_store = neuron_iterate(weights_src[0]);
                        stack += (weight_link * neuron_store);
                    }
                    if (neuron["activation_func"] == "relu") {
                        neuron["store"] = relu(stack);
                    } else if (neuron["activation_func"] == "Lrelu") {
                        neuron["store"] = leaky_relu(stack);
                    } else if (neuron["activation_func"] == "sigmoid") {
                        neuron["store"] = sigmoid(stack);
                    } else {
                        softmax_bol = true;
                        neuron["store"] = stack;
                        stacking.push_back(neuron["store"]);
                    }
                }
            }
        }

        auto softmax = [this](std::vector<double> array) {
            std::vector<double> exp;
            std::transform(array.begin(), array.end(), std::back_inserter(exp), [](double val) { return std::exp(val); });
            double sum_exp = std::accumulate(exp.begin(), exp.end(), 0.0);
            std::vector<double> x;
            std::transform(exp.begin(), exp.end(), std::back_inserter(x), [sum_exp](double val) { return val / sum_exp; });

            for (size_t idx = 0; idx < x.size(); ++idx) {
                neural["neurons"][output_key][idx]["store"] = x[idx];
            }
        };

        if (output > 1 && softmax_bol) {
            softmax(stacking);
        }
    }
};

module.exports = FeedForward;
