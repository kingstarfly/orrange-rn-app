export const meetData = {
  id: "1",
  title: "the old bois",
  start_time: "20210221T133000+0800",
  end_time: "20210221T153000+0800",
  activity: "Dim sum @ Swee Choon :D",
  organiser: {
    id: "1",
    display_name: "Robin",
    avatar: require("../assets/mock_avatars/robin.jpg"),
  },
  participants: [
    {
      id: "2",
      display_name: "Sansa",
      avatar: require("../assets/mock_avatars/sansa.jpg"),
      responded: false,
      confirmed: false,
    },
    {
      id: "3",
      display_name: "Xin Yi",
      avatar: require("../assets/mock_avatars/xinyi.jpg"),
      responded: true,
      confirmed: false,
    },
    {
      id: "4",
      display_name: "Arvind",
      avatar: require("../assets/mock_avatars/arvind.jpg"),
      responded: true,
      confirmed: true,
    },
  ],
};

export const userData = [
  {
    id: "1",
    display_name: "Robin",
    avatar: require("../assets/mock_avatars/robin.jpg"),
  },
  {
    id: "2",
    display_name: "Sansa",
    avatar: require("../assets/mock_avatars/sansa.jpg"),
  },
  {
    id: "3",
    display_name: "Xin Yi",
    avatar: require("../assets/mock_avatars/xinyi.jpg"),
  },
  {
    id: "4",
    display_name: "Arvind",
    avatar: require("../assets/mock_avatars/arvind.jpg"),
  },
];
