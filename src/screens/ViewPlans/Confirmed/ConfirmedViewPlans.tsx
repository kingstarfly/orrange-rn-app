import React from "react";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { SectionList } from "react-native";
import { styles } from "./styles";
import { Button } from "react-native-magnus";
import { useAuth } from "lib/auth";
import { Heading2, TinyText } from "components/StyledText";
import { MeetingCardProps } from "../MeetingCard/MeetingCard";
import { getAllMeetingDataForUser, getMeetingInfo } from "lib/api/meetup";
import { compareAsc, format, parse, parseISO } from "date-fns";
import { DUMMY_USER_ID } from "constants/mockdata";

interface SectionData {
  title: string; // the month and year
  data: MeetingCardProps[];
}

const ConfirmedViewPlans = () => {
  const authData = useAuth();

  const [meetingsData, setMeetingsData] = React.useState<SectionData[]>([]);

  React.useEffect(() => {
    const date_format_MMMM_yyyy = "MMMM yyyy";
    const fn = async () => {
      const result = await getAllMeetingDataForUser(DUMMY_USER_ID);

      let myMap = new Map<string, MeetingCardProps[]>();

      result.map((props) => {
        const { meetingInfo, participants, pendingParticipants, accent } =
          props;
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

      let output: SectionData[] = [];
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
      setMeetingsData(output);
    };
    fn();
    // (async () => {
    //   console.log("TESTTESTTEST");
    //   const res = await getMeetingInfo("e408619f-2395-453f-993a-46ab465c0f52");
    //   console.log(res);
    // })();
    // retrieve all data for meetings related to this user here. worry about lazy fetching in future
    // getAllMeetingDataForUser(authData.userData.uid);
  }, []);

  return (
    <Container>
      <SectionList<MeetingCardProps, SectionData>
        style={styles.scrollViewContainer}
        sections={meetingsData} // enter data here
        keyExtractor={(item, index) => item.meetingInfo.id}
        renderItem={({ item }) => {
          return <MeetingCard {...item} accent />;
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Heading2 textTransform="uppercase" mt={20}>
            {title}
          </Heading2>
        )}
      />

      <Button onPress={() => authData.signOut()}>Sign out</Button>
    </Container>
  );
};

export default ConfirmedViewPlans;
