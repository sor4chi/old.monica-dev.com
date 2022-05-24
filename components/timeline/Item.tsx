import styled from "styled-components";
import { Timeline, TimelineCategory } from "@prisma/client";
import SchoolSVG from "components/svgs/School";

interface TimelineItemProps {
  timelineItem: Timeline & {
    category: TimelineCategory;
  };
}

const Container = styled.div`
  margin-left: ${({ theme }) => theme.variables.timelineBarMargin};
  position: relative;
`;

const Inner = styled.div`
  margin-bottom: 2rem;
`;

const Point = styled.div`
  position: absolute;
  left: calc(
    -1 * (
        ${({ theme }) => theme.variables.timelineBarMargin} +
          ${({ theme }) => theme.variables.timelineIconSize}
      ) / 2
  );
  top: ${({ theme }) => theme.variables.timelineIconPositionTop};
  width: ${({ theme }) => theme.variables.timelineIconSize};
  height: ${({ theme }) => theme.variables.timelineIconSize};
  outline: 5px solid ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.text};
`;

const PointSVG = styled.div`
  position: absolute;
  left: calc(
    -1 * (${({ theme }) => theme.variables.timelineBarMargin} + 24px) / 2
  );
  top: ${({ theme }) => theme.variables.timelineIconPositionTop};
  outline: 5px solid ${({ theme }) => theme.colors.background};
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.background};
  svg {
    fill: ${({ theme }) => theme.colors.text};
  }
`;

const TimelineIcons = [
  {
    svg: (
      <PointSVG>
        <SchoolSVG />
      </PointSVG>
    ),
    key: "school",
  },
];

const getIcon = (key: string) => {
  const icon = TimelineIcons.find((item) => item.key === key);
  console.log(icon);
  return icon ? icon.svg : <Point />;
};

const TimelineItem = ({ timelineItem }: TimelineItemProps) => {
  return (
    <Container>
      <Inner>
        {getIcon(timelineItem.category.slug)}
        <h3>{timelineItem.title}</h3>
        <p>{timelineItem.content}</p>
      </Inner>
    </Container>
  );
};

export default TimelineItem;
