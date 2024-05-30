#include <cmath>

class Loss {
public:
    Loss() {} // Constructor

    double ME(double pre, double target) {
        return pre - target;
    }

    double MSE(double pre, double target) {
        return std::pow(pre - target, 2);
    }

    double cross_entropy(double pre, double target) {
        return -(target * std::log10(pre) + (1 - target) * std::log10(1 - pre));
    }
};
