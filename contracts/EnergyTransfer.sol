// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyTransfer {
    uint256 public constant PRICE_PER_KWH = 10; // Цена указана в центах, т.е. 10 центов = 0.10 долларов

    struct Transfer {
        address generator;
        address consumer;
        uint256 energyGenerated; // в кВт
        uint256 energyReceived; // в кВт
        uint256 cost; // в центах
    }

    Transfer[] public transfers;

    event TransferLogged(
        address indexed generator,
        address indexed consumer,
        uint256 energyGenerated,
        uint256 energyReceived,
        uint256 cost
    );

    function logEnergyTransfer(
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

        Transfer memory newTransfer = Transfer({
            generator: _generator,
            consumer: _consumer,
            energyGenerated: _energyGenerated,
            energyReceived: energyReceived,
            cost: cost
        });

        transfers.push(newTransfer);

        emit TransferLogged(_generator, _consumer, _energyGenerated, energyReceived, cost);
    }

    function getTransferCount() public view returns (uint256) {
        return transfers.length;
    }

    function getTransfer(uint256 _index) public view returns (
        address generator,
        address consumer,
        uint256 energyGenerated,
        uint256 energyReceived,
        uint256 cost
    ) {
        require(_index < transfers.length, "Invalid index");
        Transfer memory transfer = transfers[_index];
        return (
            transfer.generator,
            transfer.consumer,
            transfer.energyGenerated,
            transfer.energyReceived,
            transfer.cost
        );
    }

    function getTransfersByAddress(address _address) public view returns (Transfer[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < transfers.length; i++) {
            if (transfers[i].generator == _address || transfers[i].consumer == _address) {
                count++;
            }
        }

        Transfer[] memory result = new Transfer[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < transfers.length; i++) {
            if (transfers[i].generator == _address || transfers[i].consumer == _address) {
                result[j] = transfers[i];
                j++;
            }
        }

        return result;
    }
}
