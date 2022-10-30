// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Web3RSVP {
    struct Event {
        bytes32 id;
        string dataCID;
        address creator;
        uint date;
        uint capacity;
        uint depositAmount;
        address[] confirmedRsvp;
        address[] confirmedCheckIn;
        bool paidOut;
    }

    mapping(bytes32 => Event) eventById;

    function createEvent(
        string calldata _dataCID,
        uint _date,
        uint _capacity,
        uint _depositAmount
    ) external {
        // Create a unique ID
        bytes32 _id = keccak256(
            abi.encodePacked(
                msg.sender,
                address(this),
                _date,
                _capacity,
                _depositAmount
            )
        );

        require(eventById[_id].date == 0, "THERE IS A EVENT WITH THE SAME ID");

        // Initialize a new event
        Event memory newEvent;
        newEvent.id = _id;
        newEvent.dataCID = _dataCID;
        newEvent.creator = msg.sender;
        newEvent.date = _date;
        newEvent.capacity = _capacity;
        newEvent.depositAmount = _depositAmount;

        // Add the new Event to list of Events
        eventById[_id] = newEvent;
    }
}
