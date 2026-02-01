import { AxiosResponse } from "axios";

import { apiEndpoints } from "@/contants/routers";

import { Application } from "@/interfaces/application";
import { Pagination } from "@/interfaces/pagination";

import api from "@/base/api";

export const getApplications = (params?: {
  page: number;
  limit: number;
  searchDebounce?: string;
  date?: Date;
}): Promise<AxiosResponse<Pagination<Application[]>>> => {
  const query = new URLSearchParams();

  if (params?.page !== undefined) {
    query.append("page", params.page.toString());
  }

  if (params?.limit !== undefined) {
    query.append("limit", params.limit.toString());
  }

  if (params?.searchDebounce) {
    query.append("companyName", params.searchDebounce);
  }

  if (params?.date) {
    query.append("dateApplied", params.date.toISOString());
  }

  const endPoint = `${apiEndpoints.SYSTEM.APPLICATIONS}?${query.toString()}`;

  return api.get(endPoint);
};

export const getApplicationDetail = (id: number) => {
  return api.get(apiEndpoints.SYSTEM.APPICATION_DETAIL(id));
};

export const getApplicationStatistics = () => {
  return api.get(apiEndpoints.SYSTEM.APPLICATION_STATISTICS);
};

export const deleteApplication = (id: number) => {
  return api.delete(apiEndpoints.SYSTEM.APPICATION_DETAIL(id));
};

export const updateApplication = (id: number, data: Partial<Application>) => {
  return api.patch(apiEndpoints.SYSTEM.APPICATION_DETAIL(id), data);
};

export const createApplication = (data: Partial<Application>) => {
  return api.post(apiEndpoints.SYSTEM.APPLICATIONS, data);
};
