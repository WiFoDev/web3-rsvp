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
        uint confirmedRsvpCounter;
        uint confirmedCheckInCounter;
        mapping(address => bool) confirmedRsvp;
        mapping(address => bool) confirmedCheckIn;
        bool paidOut;
    }

    mapping(bytes32 => Event) events;

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

        require(events[_id].date == 0, "THERE IS A EVENT WITH THE SAME ID");

        // Initialize a new event
        Event storage newEvent = events[_id];
        newEvent.id = _id;
        newEvent.dataCID = _dataCID;
        newEvent.creator = msg.sender;
        newEvent.date = _date;
        newEvent.capacity = _capacity;
        newEvent.depositAmount = _depositAmount;
    }

    function rsvpEventById(bytes32 _id) external payable {
        // Validate event exists
        validateEventExists(_id);

        Event storage eventFound = events[_id];

        // Validate minimunt amount less than equal amount sent
        require(
            msg.value == eventFound.depositAmount,
            "NOT ENOUGH FUNDS FOR THE EVENT RSVP"
        );

        // Validate event has not started
        require(block.timestamp < eventFound.date, "EVENT STARTED");

        // Validate event capacity
        require(
            eventFound.confirmedRsvpCounter < eventFound.capacity,
            "EVENT HAS REACHED CAPACITY"
        );

        require(!eventFound.confirmedRsvp[msg.sender], "ALREADY IN RSVP");

        eventFound.confirmedRsvp[payable(msg.sender)] = true;

        eventFound.confirmedRsvpCounter++;
    }

    function checkInAttendee(address attendee, bytes32 _eventID) external {
        // Validate event exists
        validateEventExists(_eventID);

        Event storage eventFound = events[_eventID];

        require(msg.sender == eventFound.creator, "NOT AUTHORIZED");

        require(
            eventFound.confirmedRsvp[attendee],
            "ADDRESS NOT FOUND IN RSVP LIST"
        );

        require(!eventFound.confirmedCheckIn[attendee], "ALREADY CHECK IN");

        eventFound.confirmedCheckIn[attendee] = true;
        eventFound.confirmedCheckInCounter++;

        (bool success, ) = attendee.call{value: eventFound.depositAmount}("");

        require(success, "COULD NOT SEND THE DEPOSIT BACK");
    }

    function withdrawUnclaimedDepositsByEventId(bytes32 _eventId) external {
        validateEventExists(_eventId);

        Event storage eventFound = events[_eventId];

        require(eventFound.creator == msg.sender, "NOT AUTHORIZED");

        require(!eventFound.paidOut, "UNCLAIMED DEPOSITS ALREADY CLAIMED");

        require(
            block.timestamp >= (eventFound.date + 7 days),
            "TOO EARLY TO CLAIM DEPOSITS"
        );

        uint unclaimedDeposits = eventFound.confirmedRsvpCounter -
            eventFound.confirmedCheckInCounter;

        require(!(unclaimedDeposits == 0), "DONT HAVE FUNDS TO WITHDRAW");

        uint amountToWithdraw = unclaimedDeposits * eventFound.depositAmount;

        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");

        require(success, "FAILED TO SEND ETHER");

        eventFound.paidOut = true;
    }

    function validateEventExists(bytes32 _eventId) internal view {
        require(events[_eventId].date != 0, "NO EVENT WAS FOUND");
    }
}
