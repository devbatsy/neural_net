

%{
Load experimental and pre-processed data, data errors, network training 
and simulation of the trained model.

Experimental data:
    C  - carbon black contents in the rubber blend
    T  - cure temperature
    ML - minimum elastic torque
    MH - maximum elastic torque
    TS - scorch time
    TC - optimal cure time 

    e_z1 - minimum elastic torque error
    e_z2 - maximum elastic torque error
    e_z3 - scorch time error
    e_z4 - optimal cure time error

Pre-processed data:

    Inputs_train  - input training data
    Targets_train - target training data
    Inputs_perf   - input testing data

    spread - spread constant
%}
% ------------------------------------------------------------------------


% Load file with data
load('matlab.mat')

% Training data normalization
[normInputs_train,ps] = mapminmax(Inputs_train,0,1);
[normTargets_train,ts] = mapminmax(Targets_train,0,1);

% Learning with normalized training data
net = newgrnn(normInputs_train,normTargets_train,spread);

% Simulation with normalized input training data
normOutputs_train = sim(net,normInputs_train);

% Normalized training output data reversion
Outputs_train = mapminmax('reverse',normOutputs_train,ts);

% Testing data normalization
normInputs_perf = mapminmax('apply',Inputs_perf,ps);

% Simulation with normalized testing data
normOutputs_perf = sim(net,normInputs_perf);

% Normalized testing output data reversion
Outputs_perf = mapminmax('reverse',normOutputs_perf,ts);




