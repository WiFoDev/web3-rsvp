import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  DepositsPaidOut,
  NewCheckIn,
  NewEventCreated,
  NewRSVP
} from "../generated/Web3RSVP/Web3RSVP"

export function createDepositsPaidOutEvent(eventID: Bytes): DepositsPaidOut {
  let depositsPaidOutEvent = changetype<DepositsPaidOut>(newMockEvent())

  depositsPaidOutEvent.parameters = new Array()

  depositsPaidOutEvent.parameters.push(
    new ethereum.EventParam("eventID", ethereum.Value.fromFixedBytes(eventID))
  )

  return depositsPaidOutEvent
}

export function createNewCheckInEvent(
  eventId: Bytes,
  attendee: Address
): NewCheckIn {
  let newCheckInEvent = changetype<NewCheckIn>(newMockEvent())

  newCheckInEvent.parameters = new Array()

  newCheckInEvent.parameters.push(
    new ethereum.EventParam("eventId", ethereum.Value.fromFixedBytes(eventId))
  )
  newCheckInEvent.parameters.push(
    new ethereum.EventParam("attendee", ethereum.Value.fromAddress(attendee))
  )

  return newCheckInEvent
}

export function createNewEventCreatedEvent(
  eventId: Bytes,
  creator: Address,
  date: BigInt,
  capacity: BigInt,
  deposit: BigInt,
  eventDataCID: string
): NewEventCreated {
  let newEventCreatedEvent = changetype<NewEventCreated>(newMockEvent())

  newEventCreatedEvent.parameters = new Array()

  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam("eventId", ethereum.Value.fromFixedBytes(eventId))
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "capacity",
      ethereum.Value.fromUnsignedBigInt(capacity)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deposit",
      ethereum.Value.fromUnsignedBigInt(deposit)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventDataCID",
      ethereum.Value.fromString(eventDataCID)
    )
  )

  return newEventCreatedEvent
}

export function createNewRSVPEvent(eventId: Bytes, attendee: Address): NewRSVP {
  let newRsvpEvent = changetype<NewRSVP>(newMockEvent())

  newRsvpEvent.parameters = new Array()

  newRsvpEvent.parameters.push(
    new ethereum.EventParam("eventId", ethereum.Value.fromFixedBytes(eventId))
  )
  newRsvpEvent.parameters.push(
    new ethereum.EventParam("attendee", ethereum.Value.fromAddress(attendee))
  )

  return newRsvpEvent
}
