// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyLossCalculator {
    uint256 public constant PRICE_PER_KWH = 10; // Цена указана в центах, т.е. 10 центов = 0.10 долларов

    struct EnergyTransfer {
        address generator;
        address consumer;
        uint256 energyGenerated; // в кВт
        uint256 energyReceived; // в кВт
        uint256 energyLoss; // в кВт
        uint256 cost; // в центах
    }

    EnergyTransfer[] public energyTransfers;

    event EnergyTransferLogged(
        address indexed generator,
        address indexed consumer,
        uint256 energyGenerated,
        uint256 energyReceived,
        uint256 energyLoss,
        uint256 cost
    );

    function calculateEnergyLoss(
        address _generator,
        address _consumer,
        uint256 _energyGenerated,
        uint256 _lossCoefficient
    ) public {
        require(_energyGenerated > 0, "Energy generated must be greater than zero");
        require(_lossCoefficient >= 0 && _lossCoefficient <= 100, "Loss coefficient must be between 0 and 100");

        uint256 energyLoss = (_energyGenerated * _lossCoefficient) / 100;
        uint256 energyReceived = _energyGenerated - energyLoss;
        uint256 cost = (energyReceived * PRICE_PER_KWH);

        EnergyTransfer memory newTransfer = EnergyTransfer({
            generator: _generator,
            consumer: _consumer,
            energyGenerated: _energyGenerated,
            energyReceived: energyReceived,
            energyLoss: energyLoss,
            cost: cost
        });

        energyTransfers.push(newTransfer);

        emit EnergyTransferLogged(_generator, _consumer, _energyGenerated, energyReceived, energyLoss, cost);
    }

    function getEnergyTransferCount() public view returns (uint256) {
        return energyTransfers.length;
    }

    function getEnergyTransfer(uint256 _index) public view returns (
        address generator,
        address consumer,
        uint256 energyGenerated,
        uint256 energyReceived,
        uint256 energyLoss,
        uint256 cost
    ) {
        require(_index < energyTransfers.length, "Invalid index");
        EnergyTransfer memory transfer = energyTransfers[_index];
        return (
            transfer.generator,
            transfer.consumer,
            transfer.energyGenerated,
            transfer.energyReceived,
            transfer.energyLoss,
            transfer.cost
        );
    }
}
