import Image from 'next/image';

interface Props {
  media_urls: string[];
}

export const MediaGrid = ({ media_urls }: Props) => {
  const calcSpan = (i: number) => {
    const length = media_urls.length;
    if (length === 1) return 'col-span-2 row-span-2';
    if (length === 2) return 'col-span-1 row-span-2';
    if (length === 3 && i === 1) return 'col-span-1 row-span-2';
    return 'col-span-1 row-span-1';
  };
  return (
    <div className="grid aspect-video w-full grid-cols-2 grid-rows-2 gap-[2px] overflow-hidden rounded-xl">
      {media_urls.map((url, i) => (
        <Image
          key={url + i}
          src={url}
          width={320}
          height={180}
          alt="Tweet Media"
          style={{
            objectFit: 'cover',
            position: 'relative',
            aspectRatio: '16/9',
            width: `100%`,
            height: `100%`,
          }}
          className={calcSpan(i)}
        />
      ))}
    </div>
  );
};
