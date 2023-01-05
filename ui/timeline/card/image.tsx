import Image from 'next/image';

interface Props {
  img: string;
  title?: string;
}

export const WithImage = ({ img, title }: Props) => (
  <div className="relative aspect-video w-full">
    <Image
      src={img}
      alt={title || ''}
      fill
      className="rounded-sm object-cover"
    />
  </div>
);
