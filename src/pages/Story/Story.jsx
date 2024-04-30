import {  useContext } from 'react';

import { useFilter } from '../../context/FilterContext';

import StoryFeed from '../../components/Story/StoryFeed';
import UserFeed from '../../components/Story/UserFeed';
import { UserContext } from '../../context/userContext';
const StoryBox = () => {
  const { selectedCategory } = useFilter();
  const { isLoggedIn } = useContext(UserContext);
  const menuItems = [
    "food",
    "health and fitness",
    "travel",
    "movie",
    "education",
  ];
  let storyFeeds;
  if (selectedCategory === "All") {
    storyFeeds = menuItems.map((item, index) => (
      <StoryFeed key={index} category={item} />
    ));
  } else {
    storyFeeds = <StoryFeed category={selectedCategory} />;
  }


  return (
    <div>
      {isLoggedIn && selectedCategory === "All" ? <UserFeed /> : <></>}
      {storyFeeds}
    </div>
  )
};

export default StoryBox;

