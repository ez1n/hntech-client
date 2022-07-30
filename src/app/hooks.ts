import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch; // action object 호출, 전달 (update the state)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // store 상태 조회