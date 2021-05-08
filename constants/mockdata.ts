export const meetDataOne = {
  id: "1",
  title: "the old bois",
  start_time: "2021-02-21T13:30:00+0800",
  end_time: "2021-02-21T15:30:00+0800",
  activity: "Dim sum @ Swee Choon :D",
  organiser: {
    id: "1",
    display_name: "Robin",
    avatar: require("assets/mock_avatars/robin.jpg"),
    responded: true,
    confirmed: false,
  },
  participants: [
    {
      id: "2",
      display_name: "Sansa",
      avatar: require("assets/mock_avatars/sansa.jpg"),
      responded: false,
      confirmed: false,
    },
    {
      id: "3",
      display_name: "Xin Yi",
      avatar: require("assets/mock_avatars/xinyi.jpg"),
      responded: true,
      confirmed: false,
    },
    {
      id: "4",
      display_name: "Arvind",
      avatar: require("assets/mock_avatars/arvind.jpg"),
      responded: true,
      confirmed: true,
    },
  ],
};

const meetDataTwo = {
  id: "2",
  title: "the old gals",
  start_time: "2021-02-26T10:30:00+0800",
  end_time: "2021-02-26T12:15:00+0800",
  activity: "Karaoke at Buona Vista!",
  organiser: {
    id: "2",
    display_name: "Sansa",
    avatar: require("assets/mock_avatars/sansa.jpg"),
    responded: true,
    confirmed: false,
  },
  participants: [
    {
      id: "1",
      display_name: "Robin",
      avatar: require("assets/mock_avatars/robin.jpg"),
      responded: false,
      confirmed: false,
    },
    {
      id: "3",
      display_name: "Xin Yi",
      avatar: require("assets/mock_avatars/xinyi.jpg"),
      responded: true,
      confirmed: false,
    },
    {
      id: "4",
      display_name: "Arvind",
      avatar: require("assets/mock_avatars/arvind.jpg"),
      responded: true,
      confirmed: true,
    },
  ],
};

const meetDataThree = {
  id: "3",
  title: "Robin's birthday celebration",
  start_time: "2021-03-03T19:30:00+0800",
  end_time: "2021-03-03T23:30:00+0800",
  activity: "Drinks at Arvind's place!",
  organiser: {
    id: "2",
    display_name: "Arvind",
    avatar: require("assets/mock_avatars/sansa.jpg"),
    responded: true,
    confirmed: false,
  },
  participants: [
    {
      id: "1",
      display_name: "Robin",
      avatar: require("assets/mock_avatars/robin.jpg"),
      responded: false,
      confirmed: false,
    },
    {
      id: "3",
      display_name: "Xin Yi",
      avatar: require("assets/mock_avatars/xinyi.jpg"),
      responded: true,
      confirmed: false,
    },
    {
      id: "2",
      display_name: "Sansa",
      avatar: require("assets/mock_avatars/sansa.jpg"),
      responded: true,
      confirmed: true,
    },
  ],
};

export const meetingsData = [
  {
    title: "February 2021",
    data: [meetDataOne, meetDataTwo],
  },
  { title: "March 2021", data: [meetDataThree] },
];

export const userData = [
  {
    id: "1",
    display_name: "Robin",
    avatar: require("assets/mock_avatars/robin.jpg"),
  },
  {
    id: "2",
    display_name: "Sansa",
    avatar: require("assets/mock_avatars/sansa.jpg"),
  },
  {
    id: "3",
    display_name: "Xin Yi",
    avatar: require("assets/mock_avatars/xinyi.jpg"),
  },
  {
    id: "4",
    display_name: "Arvind",
    avatar: require("assets/mock_avatars/arvind.jpg"),
  },
];
