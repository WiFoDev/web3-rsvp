import {NextPage} from "next";
import {useForm, SubmitHandler} from "react-hook-form";

import {DateTimeInput, Input} from "@/components";

type EventInputs = {
  name: string;
  date: string;
  time: string;
  capacity: string;
  refundable: string;
};

const CreateEvent: NextPage = () => {
  const {register, handleSubmit} = useForm<EventInputs>();

  const onSubmit = ({
    name,
    date,
    time,
    capacity,
    refundable,
  }: EventInputs) => {
    const dateTime = new Date(`${date}T${time}`);

    console.log({name, refundable});
  };

  return (
    <section className="flex flex-col">
      <h1 className="my-10 text-5xl">Create your virtual event</h1>
      <form
        className="flex flex-col gap-6"
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
          label="Date & Time"
          register={register}
          timeId="time"
        />
        <Input
          id="capacity"
          label="Max capacity"
          placeholder="Enter capacity..."
          register={register}
          type="number"
        />
        <Input
          id="refundable"
          label="Refundable deposit"
          placeholder="Enter amount..."
          register={register}
          type="number"
        />
        <Input
          id="link"
          label="Event link"
          placeholder="Enter url..."
          register={register}
          type="text"
        />
        <Input
          textArea
          id="description"
          label="Event description"
          placeholder="Enter an amazing description..."
          register={register}
          type="text"
        />

        <button>Send</button>
      </form>
    </section>
  );
};

export default CreateEvent;
