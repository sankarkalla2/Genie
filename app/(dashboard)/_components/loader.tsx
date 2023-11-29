import Image from "next/image";

const Loader = () => {
  return (
    <div className="p-8 md:p-20 flex flex-col items-center w-full justify-center pt-10 gap-y-2 bg-muted shadow-md rounded-lg">
      <div className="relative h-20 w-20 animate-pulse">
        <Image src="/genius.png" fill alt="loading" />
      </div>

      <h1 className="font-semibold text-base text-muted-foreground animate-pulse">
        Genie is thinking...
      </h1>
    </div>
  );
};

export default Loader;
