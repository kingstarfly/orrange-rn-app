import Container from "components/Container";
import SearchableList from "components/SearchableList";
import UserRow from "components/UserRow";
import { getMockUsers } from "mockapi";
import React, { useEffect, useState } from "react";
import { TootleUser } from "types/types";

const ViewPals = () => {
  const [pals, setPals] = useState<TootleUser[]>([]);
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

  const renderItem = ({ item }: { item: TootleUser }) => {
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
