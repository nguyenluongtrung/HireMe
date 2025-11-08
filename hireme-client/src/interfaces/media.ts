export interface UploadFileToS3Request {
  uploadUrl: string;
  fileType: string;
  file: File;
}

export interface PresignedUploadFileRequest {
  filename: string;
  filesize: number;
}