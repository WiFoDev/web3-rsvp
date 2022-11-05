import {NextPage} from "next";
import {useForm, SubmitHandler} from "react-hook-form";

import {DateTimeInput, Input} from "@/components";

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
    const dateTime = new Date(`${date}T${time}`).getTime();
    const formData = new FormData();

    formData.append("image", image[0]);
    formData.append("name", name);

    const newEvent = {
      name,
      dateTime,
      capacity,
      refundable,
      link,
      description,
      image: formData,
    };

    const response = await fetch("http://localhost:3000/api/event", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    console.log(response);
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
          min={1}
          placeholder="Enter capacity..."
          register={register}
          type="number"
        />
        <Input
          id="refundable"
          label="Refundable deposit"
          min={0}
          placeholder="Enter amount..."
          register={register}
          step={0.01}
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
          id="image"
          label="Event image"
          placeholder="Choose your image..."
          register={register}
          type="file"
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
