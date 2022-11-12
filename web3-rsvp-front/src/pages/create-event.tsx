import {NextPage} from "next";
import {useForm} from "react-hook-form";
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {BigNumber, utils} from "ethers";
import {useState} from "react";

import {DateTimeInput, Input, Modal} from "@/components";
import {abi, address} from "@/utils/web3rsvp";

type EventInputs = {
  name: string;
  date: string;
  time: string;
  capacity: string;
  refundable: string;
  link: string;
  description: string;
  image: string;
};

const CreateEvent: NextPage = () => {
  const {register, handleSubmit} = useForm<EventInputs>();
  const [isFetchingLoading, setFetchingLoading] = useState(false);
  const [eventID, setEventId] = useState("");

  const {config} = usePrepareContractWrite({
    address,
    abi,
    functionName: "createEvent",
    args: [
      "",
      BigNumber.from(0),
      BigNumber.from(0),
      BigNumber.from(0),
    ],
  });
  const {data, writeAsync} = useContractWrite(config);

  const {isLoading, isSuccess} = useWaitForTransaction({
    hash: data?.hash,
  });

  useContractEvent({
    address,
    abi,
    eventName: "NewEventCreated",
    listener(eventID) {
      setEventId(eventID);
    },
  });

  const onSubmit = async ({
    name,
    date,
    time,
    capacity,
    refundable,
    link,
    description,
    image,
  }: EventInputs) => {
    setFetchingLoading(true);
    const dateTime = new Date(`${date}T${time}`).getTime();

    const formData = new FormData();

    formData.append("image", image[0]);
    formData.append("name", name);
    formData.append("link", link);
    formData.append("description", description);

    const {cid, success} = await fetch(
      "http://localhost:3000/api/event",
      {
        method: "POST",
        body: formData,
      },
    ).then((res) => res.json());

    if (success) {
      if (!writeAsync) return;
      await writeAsync({
        recklesslySetUnpreparedArgs: [
          cid as string,
          BigNumber.from(dateTime),
          BigNumber.from(capacity),
          utils.parseEther(refundable),
        ],
      });
    }
    setFetchingLoading(false);
  };

  return (
    <section className="flex flex-col w-7/12">
      {(isLoading || isFetchingLoading) && <Modal isLoading />}
      {isSuccess && <Modal isSuccess eventID={eventID} />}
      <h1 className="my-10 text-5xl">Create your virtual event</h1>
      <form
        className="flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="name"
          label="Event Name"
          placeholder="Enter a fun name..."
          register={register}
          type="text"
        />
        <DateTimeInput
          dateId="date"
          description="Your event date and time"
          label="Date & Time"
          register={register}
          timeId="time"
        />
        <Input
          description="Limit the number of spots available for your event"
          id="capacity"
          label="Max capacity"
          min={1}
          placeholder="Enter capacity..."
          register={register}
          type="number"
        />
        <Input
          description="Require a refundable deposit (in MATIC) to reserve one spot at your event"
          id="refundable"
          label="Refundable deposit"
          min={0}
          placeholder="Enter amount..."
          register={register}
          step={0.01}
          type="number"
        />
        <Input
          description="The link for your virtual event"
          id="link"
          label="Event link"
          placeholder="Enter url..."
          register={register}
          type="text"
        />
        <Input
          description="The image for your event (be creative)"
          id="image"
          label="Event image"
          placeholder="Choose your image..."
          register={register}
          type="file"
        />
        <Input
          textArea
          description="Let people know what your event is about!"
          id="description"
          label="Event description"
          placeholder="Enter an amazing description..."
          register={register}
          type="text"
        />

        <button className="px-5 py-2 mt-4 transition duration-200 border-none rounded bg-primary place-self-end hover:bg-orange-600">
          Send
        </button>
      </form>
    </section>
  );
};

export default CreateEvent;
