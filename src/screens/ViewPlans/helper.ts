import { compareAsc, format, parse, parseISO } from "date-fns";
import { ViewPlansSectionData } from "./Confirmed/ConfirmedViewPlans";
import { MeetingCardProps } from "./MeetingCard/MeetingCard";

export function formatDataForSectionListConfirmed(
  propsArray: MeetingCardProps[]
) {
  // Building data for section list. Mapping date-year to an array of card props.
  let myMap = new Map<string, MeetingCardProps[]>();
  const date_format_MMMM_yyyy = "MMMM yyyy";

  propsArray.map((props) => {
    const { meetingInfo, participants, pendingParticipants, accent } = props;
    const { activity, endAt, startAt, isConfirmed } = meetingInfo;
    if (!isConfirmed || !activity || !endAt || !startAt) {
      // this is an in progress meetup
      return;
    }
    let month_year = format(
      parseISO(meetingInfo.startAt),
      date_format_MMMM_yyyy
    );

    if (myMap.has(month_year)) {
      myMap.set(month_year, [...myMap.get(month_year), props]);
    } else {
      myMap.set(month_year, [props]);
    }
  });

  // Reformating mapped data to the format that section list wants.
  let output: ViewPlansSectionData[] = [];
  myMap.forEach((value, key) => {
    output.push({
      title: key,
      data: value,
    });
  });
  output.sort((a, b) =>
    compareAsc(
      parse(a.title, date_format_MMMM_yyyy, new Date()),
      parse(b.title, date_format_MMMM_yyyy, new Date())
    )
  );
  return output;
}

export function formatDataForFlatListInProgress(
  propsArray: MeetingCardProps[]
) {
  const inProgressData = propsArray.filter((props) => {
    const { meetingInfo, participants, pendingParticipants, accent } = props;
    const { activity, endAt, startAt, isConfirmed } = meetingInfo;
    return !isConfirmed || !activity || !endAt || !startAt;
  });

  return inProgressData;
}
