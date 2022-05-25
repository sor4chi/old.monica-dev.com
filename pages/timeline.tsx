import { InferGetStaticPropsType } from "next";
import TimelineContainer from "components/timeline/Container";
import TimelineItem from "components/timeline/Item";
import { Timeline, TimelineCategory } from "@prisma/client";
import { fetchApiRoute } from "lib/request";

export const getStaticProps = async () => {
  const queryParams = new URLSearchParams({ page: "1", perPage: "10" });
  const timeline = await fetchApiRoute<
    (Timeline & {
      category: TimelineCategory;
    })[]
  >(`/api/timeline?${queryParams}`);

  return {
    props: {
      timeline,
      title: "Timeline",
      description: "This is my history as an engineer",
      layout: "Base",
    },
  };
};

const TimelinePage = ({
  timeline,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <TimelineContainer>
      {timeline.map((timelineItem) => (
        <TimelineItem key={timelineItem.id} timelineItem={timelineItem} />
      ))}
    </TimelineContainer>
  );
};

export default TimelinePage;
