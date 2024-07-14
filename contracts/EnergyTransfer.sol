// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyTransfer {

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

    event EtherSent(
        address indexed from,
        address indexed to,
        uint256 value
    );

    function logEnergyTransfer(
        address _generator,
        address _consumer,
        uint256 _energyGenerated,
        uint256 _lossCoefficient,
        uint256 _costInEther,
        uint256 _pricePerMwh
    ) public payable {
        require(_energyGenerated > 0, "Energy generated must be greater than zero");
        require(_lossCoefficient >= 0 && _lossCoefficient <= 100, "Loss coefficient must be between 0 and 100");

        uint256 energyLoss = (_lossCoefficient) / 100;
        uint256 energyReceived = _energyGenerated - energyLoss;
        uint256 cost = (energyReceived * _pricePerMwh);

        require(msg.value >= _costInEther, "Insufficient Ether sent");

        Transfer memory newTransfer = Transfer({
            generator: _generator,
            consumer: _consumer,
            energyGenerated: _energyGenerated,
            energyReceived: energyReceived,
            cost: cost
        });

        transfers.push(newTransfer);

        emit TransferLogged(_generator, _consumer, _energyGenerated, energyReceived, cost);

        sendEther(_consumer, _generator, _costInEther);
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

    function sendEther(address _consumer, address _generator, uint256 costInEther) internal returns (bool success) {
        require(address(this).balance >= costInEther, "Insufficient contract balance");

        payable(_generator).transfer(costInEther);

        emit EtherSent(_consumer, _generator, costInEther);
        return true;
    }

    receive() external payable {}
}
