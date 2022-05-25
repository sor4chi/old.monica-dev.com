import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

interface TimelineContainerProps {
  children: ReactNode;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: 5rem;
`;

interface TimelineBarProps {
  timelineBarHeight: number;
}

const TimelineBar = styled.div<TimelineBarProps>`
  position: absolute;
  left: calc(
    (
        ${({ theme }) => theme.variables.timelineIconContainerSize} -
          ${({ theme }) => theme.variables.timelineBarWidth}
      ) / 2
  );
  width: 2px;
  top: ${({ theme }) => theme.variables.timelineIconContainerSize};
  height: ${({ timelineBarHeight }) => timelineBarHeight}px;
  background-color: ${({ theme }) => theme.colors.text};
`;

const TimelineContainer = ({ children }: TimelineContainerProps) => {
  const [timelineBarHeight, setTimelineBarHeight] = useState(0);

  useEffect(() => {
    const timeline = document.getElementById("timeline");
    if (!timeline?.children || !timeline.children[0]) return;
    const firstItemTop = (timeline.firstElementChild as HTMLElement).offsetTop;
    const lastItemTop = (timeline.lastElementChild as HTMLElement).offsetTop;
    const remToPx = (rem: number) =>
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isLastItemHasSVG =
      (timeline.lastElementChild as HTMLElement).querySelector("svg") !== null;
    const gap = !isLastItemHasSVG ? remToPx(3 - 0.5) / 2 : 0;
    setTimelineBarHeight(lastItemTop - firstItemTop - gap);
  }, []);

  return (
    <Container>
      <TimelineBar timelineBarHeight={timelineBarHeight} />
      <div id="timeline">{children}</div>
    </Container>
  );
};

export default TimelineContainer;
