import type {NextPage} from "next";

const Home: NextPage = () => {
  return (
    <section className="flex flex-col w-full max-w-screen-standar pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      <h1 className="w-3/5 mt-10 mb-6 text-4xl md:text-6xl">
        Discover what&apos;s happening in the{" "}
        <span className="text-primary">metaverse</span>
      </h1>
      <p className="text-lg">
        Find, join, and create virtual events with your web3 frens!
      </p>
      <div>Here is going to be the list of events</div>
    </section>
  );
};

export default Home;
