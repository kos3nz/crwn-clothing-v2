import { takeLatest, all, call, put } from 'redux-saga/effects';
import { type FirebaseError } from 'firebase/app';

import { getDocuments } from 'utils/firebase/firebase.utils';
import {
  type CategoryArray,
  getCategoriesFailure,
  getCategoriesSuccess,
  CATEGORIES_ACTION_TYPES,
} from './categories.slice';

export function* fetchCategoriesAsync() {
  try {
    const categories: CategoryArray = yield call(getDocuments, 'categories');
    yield put(getCategoriesSuccess(categories));
  } catch (error) {
    yield put(getCategoriesFailure(error as FirebaseError));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.GET_CATEGORIES_FETCH,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
