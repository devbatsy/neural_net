#include <cmath>
#include <unordered_map>
#include <vector>

class BackProp {
public:
    BackProp(std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> neural, double error, std::vector<double> label) {
        this->neural = neural;
        this->learning_rate = 0.01;
        this->cost = error * this->learning_rate;
        this->true_label = label;
        propagate();
    }

    static void propagate() {
        for (auto& [level_name, level] : neural) {
            std::vector<std::string> neuron_keys;
            for (auto& [neuron_name, neuron] : level) {
                neuron_keys.push_back(neuron_name);
            }

            for (auto& [neuron_name, neuron] : level) {
                if (neuron.find("w_b4") != neuron.end() && !neuron["w_b4"].empty()) {
                    double biase_stack = 1.0;
                    for (auto& weight_1 : neuron["w_b4"]) {
                        double stack = 1.0;
                        const auto& ref_neuron = neuron_iterate(weight_1["source"]);
                        const auto& ref_target = neuron_iterate(weight_1["target"]);
                        const double ref_neuron_val = ref_neuron["store"];
                        const double ref_target_val = ref_target["store"];
                        double target_sig_derivate = 0.0;

                        if (ref_target["activation_func"] == "relu") {
                            target_sig_derivate = reluD(ref_target_val);
                        } else if (ref_target["activation_func"] == "Lrelu") {
                            target_sig_derivate = LreluD(ref_target_val);
                        } else if (ref_target["activation_func"] == "sigmoid") {
                            target_sig_derivate = sigmoid_derivative(ref_target_val);
                        } else {
                            if (true_label[index] == 1) {
                                target_sig_derivate = (ref_target_val - 1.0);
                            } else {
                                target_sig_derivate = ref_target_val;
                            }
                        }

                        stack = (ref_neuron_val * target_sig_derivate * cost);

                        if (!ref_target["w_af"].empty()) {
                            for (const auto& after_weights : ref_target["w_af"]) {
                                stack *= links_iterate(after_weights);
                                biase_stack *= links_iterate(after_weights);
                            }
                        }

                        for (int i = std::stoi(level_name) + 1; i < neural.size(); i++) {
                            for (const auto& n_1 : neural[std::to_string(i)]) {
                                for (const auto& w_5 : n_1["w_af"]) {
                                    stack *= links_iterate(w_5);
                                    biase_stack *= links_iterate(w_5);
                                }
                            }
                        }
                        links_iterate_n_change(weight_1, stack);
                    }

                    if (neuron["activation_func"] == "relu") {
                        neuron["biase"] -= biase_stack * reluD(neuron["store"]) * cost;
                    } else if (neuron["activation_func"] == "Lrelu") {
                        neuron["biase"] -= biase_stack * LreluD(neuron["store"]) * cost;
                    } else if (neuron["activation_func"] == "sigmoid") {
                        neuron["biase"] -= biase_stack * sigmoid_derivative(neuron["store"]) * cost;
                    } else {
                        neuron["biase"] -= biase_stack * neuron["store"] * cost;
                    }
                }
            }
        }
    }

private:
    static std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> neural;
    double learning_rate;
    double cost;
    std::vector<double> true_label;

    static double reluD(double val) {
        return (val > 0) ? 1.0 : 0.0;
    }

    static double LreluD(double val) {
        return (val >= 0) ? 1.0 : 0.001;
    }

    static double sigmoid(double val) {
        return 1 / (1 + std::exp(-val));
    }

    static double sigmoid_derivative(double value) {
        return sigmoid(value) * (1 - sigmoid(value));
    }

    static double links_iterate(std::vector<std::string> weights_src) {
        // Implementation of this function is missing.
        // You need to define this function based on your data structure.
        return 0.0;
    }

    static void links_iterate_n_change(std::vector<std::string> weights_src, double correct) {
        // Implementation of this function is missing.
        // You need to define this function based on your data structure.
    }

    static std::unordered_map<std::string, double> neuron_iterate(std::string weights_src) {
        // Implementation of this function is missing.
        // You need to define this function based on your data structure.
        return std::unordered_map<std::string, double>();
    }
};

// Definition of neural member variable
std::unordered_map<std::string, std::vector<std::unordered_map<std::string, double>>> BackProp::neural;

module.exports = BackProp;
