// @flow
import React from 'react'
import IconButton from 'material-ui/IconButton'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'

const iconSize = 18

const styles = {
  button: {
    width: 32,
    height: 32,
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
}

const hoverColor = '#b94343'

export type Props = {
  addBookmark: () => void,
  deleteBookmark: () => void,
  isBookmarked: boolean,
}

const BookmarkButton = ({
  isBookmarked,
  addBookmark,
  deleteBookmark,
}: Props) => {
  const onClick = isBookmarked ? deleteBookmark : addBookmark

  return (
    <IconButton onClick={onClick} style={styles.button} iconStyle={styles.icon}>
      <FavoriteIcon
        color={isBookmarked ? hoverColor : '#777'}
        hoverColor={hoverColor}
      />
    </IconButton>
  )
}

export default BookmarkButton
