import styled from "styled-components";
import { Timeline, TimelineCategory } from "@prisma/client";
import SchoolSVG from "components/svgs/School";
import CertificationSVG from "components/svgs/Certification";

interface TimelineItemProps {
  timelineItem: Timeline & {
    category: TimelineCategory;
  };
}

const Container = styled.div`
  margin-left: ${({ theme }) => theme.variables.timelineIconContainerSize};
  position: relative;
  cursor: pointer;
`;

const Inner = styled.div`
  margin-left: 1rem;
  margin-bottom: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  height: ${({ theme }) => theme.variables.timelineIconContainerSize};
  line-height: ${({ theme }) => theme.variables.timelineIconContainerSize};
`;

const SubContainer = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.subText};
  background-color: ${({ theme }) => theme.colors.subBackground};
  padding: 1rem;
  border-radius: 0.2rem;
  border: 0.1rem solid
    ${({ theme }) =>
      theme.utils.changeIntensity(theme.colors.subBackground, 0.2)};
`;

const Point = styled.div`
  position: absolute;
  left: calc(
    -1 * (
        ${({ theme }) => theme.variables.timelineIconContainerSize} +
          ${({ theme }) => theme.variables.timelineNormalIconSize}
      ) / 2
  );
  top: calc(
    (
        ${({ theme }) => theme.variables.timelineIconContainerSize} -
          ${({ theme }) => theme.variables.timelineNormalIconSize}
      ) / 2
  );

  width: ${({ theme }) => theme.variables.timelineNormalIconSize};
  height: ${({ theme }) => theme.variables.timelineNormalIconSize};
  outline: 5px solid ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.text};
`;

const PointSVG = styled.div`
  position: absolute;
  left: calc(
    -1 * (
        ${({ theme }) => theme.variables.timelineIconContainerSize} +
          ${({ theme }) => theme.variables.timelineSVGIconSize}
      ) / 2
  );
  top: calc(
    (
        ${({ theme }) => theme.variables.timelineIconContainerSize} -
          ${({ theme }) => theme.variables.timelineSVGIconSize}
      ) / 2
  );
  outline: 5px solid ${({ theme }) => theme.colors.background};
  width: ${({ theme }) => theme.variables.timelineSVGIconSize};
  height: ${({ theme }) => theme.variables.timelineSVGIconSize};
  background-color: ${({ theme }) => theme.colors.subBackground};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${({ theme }) => theme.colors.text};
    width: 24px;
    height: 24px;
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
  {
    svg: (
      <PointSVG>
        <CertificationSVG />
      </PointSVG>
    ),
    key: "certification",
  },
];

const getIcon = (key: string) => {
  const icon = TimelineIcons.find((item) => item.key === key);
  return icon ? icon.svg : <Point />;
};

const TimelineItem = ({ timelineItem }: TimelineItemProps) => {
  return (
    <Container>
      <Inner>
        {getIcon(timelineItem.category.slug)}
        <TitleContainer>{timelineItem.title}</TitleContainer>
        <SubContainer>{timelineItem.content}</SubContainer>
      </Inner>
    </Container>
  );
};

export default TimelineItem;
