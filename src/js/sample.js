import { commonApi } from '@js/utils/API/config';
import { endpoints } from '@js/utils/API/endpoints';

export const testAlert = (value) => {
  alert(value);
};

export const getSampleRequest = async () => {
  const { data } = await commonApi.get(endpoints.testArray);
  alert(JSON.stringify(data));
};
