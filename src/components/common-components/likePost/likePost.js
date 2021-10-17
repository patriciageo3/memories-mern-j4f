import React from 'react';

import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

export const LikePost = ({ post, currentUserId })=> {
    const postLikesNo = post.likes.length;
    const userLikedPost = post.likes.find(userLike => userLike === currentUserId);

    const getLabel = () => {
        switch (true) {
            case (postLikesNo > 2) && !!userLikedPost:
                return `You and ${postLikesNo - 1} others`;
            case (postLikesNo === 2) && !!userLikedPost:
                return "You and 1 other";
            case postLikesNo === 1:
                return "1 Like";
            default: 
                return `${postLikesNo} Likes`;
        }
    };

    if (postLikesNo > 0) return (<><ThumbUpAltIcon fontSize="small" />&nbsp;{getLabel()}</>);
    return (<><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>)
};

export default LikePost; 