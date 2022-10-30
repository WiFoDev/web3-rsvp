import {ethers, network} from 'hardhat'

const main = async () => {

  const rsvpContractFactory = await ethers.getContractFactory("Web3RSVP");
  const rsvpContract= await rsvpContractFactory.deploy();

  await rsvpContract.deployed();
  console.log(`Contract deployed at: ${rsvpContract.address}`);

  const [deployer, address1, address2] = await ethers.getSigners();

  const deposit = ethers.utils.parseEther("1");
  const maxCapacity = 3;
  const timestamp = 1718926200;
  const eventDataCID = 
    "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";

  let tx = await rsvpContract.createEvent(
    eventDataCID,
    timestamp,
    maxCapacity,
    deposit
  );

  let wait = await tx.wait();

  let eventID;
  
  if(wait.events){
    console.log(`New event Created: ${wait.events[0].event}`)
    if(wait.events[0].args) {
      eventID = wait.events[0].args.eventId
      console.log(`Event ID: ${eventID}`)
    }
  }

  // Reservation 1
  tx = await rsvpContract.rsvpEventById(
    eventID, {value: deposit}
  )

  wait = await tx.wait()

  if(wait.events){
    console.log(`NEW RSVP: ${wait.events[0].event} | ${wait.events[0].args}`)
  }

  // Reservation 2
  tx = await rsvpContract
    .connect(address1)
    .rsvpEventById(
    eventID, {value: deposit}
  )

  wait = await tx.wait()

  if(wait.events){
    console.log(`NEW RSVP: ${wait.events[0].event} | ${wait.events[0].args}`)
  }

  // Reservation 3
  tx = await rsvpContract
    .connect(address2)
    .rsvpEventById(
    eventID, {value: deposit}
  )

  wait = await tx.wait()

  if(wait.events){
    console.log(`NEW RSVP: ${wait.events[0].event} | ${wait.events[0].args}`)
  }

  // Confirm RSVP for Deployer
  tx = await rsvpContract
    .checkInAttendee(deployer.address,eventID);

  wait = await tx.wait();

  if(wait.events){
    console.log(`CHECKED IN: ${wait.events[0].event} | ${wait.events[0].args}`)
  }

  // Confirm RSVP for Address 1
  tx = await rsvpContract
    .checkInAttendee(address1.address,eventID);

  wait = await tx.wait();

  if(wait.events){
    console.log(`CHECKED IN: ${wait.events[0].event} | ${wait.events[0].args}`)
  }

  // // Confirm RSVP for Address 2
  // tx = await rsvpContract
  //   .checkInAttendee(address2.address,eventID);

  // wait = await tx.wait();

  // if(wait.events){
  //   console.log(`CHECKED IN: ${wait.events[0].event} | ${wait.events[0].args}`)
  // }
  
  await network.provider.send("evm_increaseTime",[15778800000000]);

  // Withdraw unclaimend deposits
  tx = await rsvpContract
    .withdrawUnclaimedDepositsByEventId(
      eventID
    )
  
  wait = await tx.wait();

  if(wait.events){
    console.log(`PAID OUT: ${wait.events[0].event} | ${wait.events[0].args}`)
  }

}

main()
  .then(()=> process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })