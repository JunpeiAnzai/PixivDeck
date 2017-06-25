// @flow
import { combineReducers } from 'redux'
import type { State } from 'types'
import type { User } from 'types/user'
import type { Illust } from 'types/illust'

import Language from '../containers/Language/reducer'
import ModalManeger from '../containers/ModalManeger/reducer'
import SettingModal from '../containers/SettingModal/reducer'
import HeaderContainer from '../containers/HeaderContainer/reducer'
import MangaPreview from '../containers/MangaPreview/reducer'
import LoginModal from '../containers/LoginModal/reducer'
import UserPopoverContainer from '../containers/UserPopoverContainer/reducer'
import IllustPreview from '../containers/IllustPreview/reducer'
import DrawerManager from '../containers/DrawerManager/reducer'
import UserDrawerContainer from '../containers/UserDrawerContainer/reducer'

import manage from './manage'
import columns from './columns'
import illustById, * as fromIllustById from './illustById'
import userById, * as fromUserById from './userById'

const rootReducer = combineReducers({
  Language,
  manage,
  columns,
  illustById,
  userById,
  ModalManeger,
  SettingModal,
  HeaderContainer,
  MangaPreview,
  LoginModal,
  UserPopoverContainer,
  IllustPreview,
  DrawerManager,
  UserDrawerContainer,
})

export const getColumn = ({ columns }: State, id: number) =>
  columns.filter(c => c.id === id)[0]

const filterByMinBookmarks = (illust: Illust, bookmarks: number): boolean =>
  illust.totalBookmarks >= bookmarks

const filterByTags = (illust: Illust, tags: Array<string>): boolean =>
  illust.tags.every(t => tags.every(tag => !t.name.includes(tag)))

export const getIllust = ({ illustById }: State, id: number): Illust =>
  fromIllustById.getIllust(illustById, id)

export const getIllusts = (state: State, columnId: number) => {
  const column = getColumn(state, columnId)
  return column.ids
    .map(id => getIllust(state, id))
    .filter(
      v =>
        filterByTags(v, state.SettingModal.tags) &&
        filterByMinBookmarks(v, column.minBookmarks)
    )
}

export const getUser = (state: State, userId: number): User =>
  fromUserById.getUser(state, userId)

export default rootReducer
