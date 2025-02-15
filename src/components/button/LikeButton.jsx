import React, { useState, useEffect } from 'react';
import styles from './like_button.module.css';
import LikeIcon from '../icons/LikeIcon';
import DislikeIcon from '../icons/DislikeIcon';

const Checkbox = ({user, movie}) => {

  const [likes, setLikes] = useState(false);

  useEffect(() => {
      const getInitialLike = async () => {
          try {
              const response = await fetch("http://localhost:3001/films/like/initial", {
                  method: "POST", 
                  headers: {
                      'Content-Type': 'application/json',
                  }, 
                  body: JSON.stringify({userId: user.id, filmId: movie.id}), 
              });

              const data = await response.json();
              setLikes(data.isLiked)
          } catch (error) {
              console.error("Filed to fetch movies: ", error);
          }
      };
      getInitialLike();
  }, [user, movie]);

  const handleLike = async (event) => {
      event.preventDefault();
      if (likes) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/films/dislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({userId: user.id, filmId: movie.id}), 
          });
          if (response.ok) {
            const data = await response.json();
            setLikes(false);
          } else {
            alert('Failed');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Server Error');
        }
      }
      else {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/films/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({userId: user.id, filmId: movie.id}), 
          });
          if (response.ok) {
            const data = await response.json();
            setLikes(true);
          } else {
            alert('Failed');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Server Error');
        }
      }
  }

  return (
    <div className={styles.container} onClick={handleLike}>
      {likes ? 
      <LikeIcon className={styles.like} />
      :
      <DislikeIcon />
      }
      <p>Like</p>
    </div>
  );
}

export default Checkbox;
