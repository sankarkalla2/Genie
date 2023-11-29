import Image from 'next/image'

const Empty = () => {
  return <div>
    <div className="h-full w-full p-20 space-y-4  flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image src='/genius.png' alt='Empty' fill />
      </div>
      <p className='text-muted-foreground'>No conversation started.</p>
    </div>
  </div>;
};

export default Empty;
