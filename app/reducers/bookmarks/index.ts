import {
  Bookmark,
  BookmarkAction,
  AddBookmarkAction,
  RemoveBookmarkAction,
} from '../../actions/bookmarks';

const bookmarksReducer = (
  state: Bookmark[] = [],
  action: BookmarkAction | { type: string },
): Bookmark[] => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return [...state, (action as AddBookmarkAction).bookmark];
    case 'REMOVE_BOOKMARK':
      return state.filter(
        (item) =>
          item.url !== (action as RemoveBookmarkAction).bookmark.url,
      );
    default:
      return state;
  }
};
export default bookmarksReducer;
