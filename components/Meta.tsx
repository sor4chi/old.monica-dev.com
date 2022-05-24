import Head from "next/head";

interface MetaProps {
  title: string;
  description?: string;
}

export default function Meta({ title, description = "" }: MetaProps) {
  const titleTemplate = `${title} | Monica's Portfolio`;

  return (
    <Head>
      <title>{titleTemplate}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={titleTemplate} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`ogp_large.png`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
