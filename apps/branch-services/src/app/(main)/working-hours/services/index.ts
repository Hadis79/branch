import RealApi from './api';
import MockApi from './mock-api';
import { USE_MOCK_API } from '../utils/constants';

export const Api = USE_MOCK_API ? MockApi : RealApi;
