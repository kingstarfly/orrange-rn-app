import Container from "components/Container";
import SearchableList from "components/SearchableList";
import UserRow from "components/UserRow";
import { getMockUsers } from "mockapi";
import React, { useEffect, useState } from "react";
import { PalDetails } from "types/types";

const ViewPals = () => {
  const [pals, setPals] = useState<PalDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getContact = async () => {
      setIsLoading(true);
      const initialPals = await getMockUsers();
      setPals(initialPals);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    getContact();
  }, []);

  const renderItem = ({ item }: { item: PalDetails }) => {
    return <UserRow item={item} />;
  };

  return (
    <Container>
      <SearchableList
        data={pals}
        inputPlaceholder="Search..."
        isLoading={isLoading}
        renderItem={renderItem}
      />
      {/* <AddButton to="MeetupDetails" /> */}
    </Container>
  );
};

export default ViewPals;
