import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stories from 'react-insta-stories';


const stories = [
	{
		url: 'https://wallpapercave.com/wp/wp3913849.jpg',
	},
];

function Index() {

  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

	return (
      <Stories
			stories={stories}
			defaultInterval={5000}
      height={'100vh'}
      width={'100vw'}
      onAllStoriesEnd={goToHomePage}
		/>
	);
};

export default Index;