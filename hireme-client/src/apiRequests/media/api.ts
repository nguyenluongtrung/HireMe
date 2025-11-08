import axios from "axios";

import { apiEndpoints } from "@/contants/routers";

import api from "@/base/api";

import {
  PresignedUploadFileRequest,
  UploadFileToS3Request,
} from "@/interfaces/media";

export const getPresignedUrl = (data: PresignedUploadFileRequest) => {
  return api.post(apiEndpoints.SYSTEM.PRESIGNED_URL, data);
};

export const uploadFileToS3 = (data: UploadFileToS3Request) => {
  return axios.put(data.uploadUrl, data.file, {
    headers: {
      "Content-Type": data.fileType,
    },
  });
};
