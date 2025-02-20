import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';import styles from './like_button.module.css';
import LikeIcon from '../../icons/LikeIcon';
import DislikeIcon from '../../icons/DislikeIcon';

const Checkbox = ({film}) => {

  const { user } = useContext(AuthContext);

  const [likes, setLikes] = useState(false);

  useEffect(() => {
      const getInitialLike = async () => {
          try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/likes`, {
                  method: "POST", 
                  headers: {
                      'Content-Type': 'application/json',
                  }, 
                  body: JSON.stringify({userId: user.id, filmId: film.id}), 
              });

              const data = await response.json();
              setLikes(data.isLiked)
          } catch (error) {
              console.error("Filed to fetch films: ", error);
          }
      };
      getInitialLike();
  }, [user, film]);

  const handleLike = async (event) => {
      event.preventDefault();
      if (likes) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/likes/dislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({userId: user.id, filmId: film.id}), 
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
          const response = await fetch(`${process.env.REACT_APP_API_URL}/likes/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({userId: user.id, filmId: film.id}), 
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
      {likes ? 
      <p className={styles.likeWord} >Like</p>
      :
      <p>Like</p>
      }
    </div>
  );
}

export default Checkbox;
