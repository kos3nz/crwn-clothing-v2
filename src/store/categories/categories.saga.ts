import { takeLatest, all, call, put } from 'typed-redux-saga';
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
    const categories = yield* call(getDocuments, 'categories');
    yield* put(getCategoriesSuccess(categories as CategoryArray));
  } catch (error) {
    yield* put(getCategoriesFailure(error as FirebaseError | Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.GET_CATEGORIES,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
