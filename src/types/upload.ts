type UploadStaus = 'ready' | 'loading' | 'success' | 'error'
export type FileListType = 'picture' | 'text'

export type CheckUpload = (file: File) => boolean | Promise<File>

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status: UploadStaus;
    raw: File;
    resp?: any;
    url?: string;
}

export interface UploadResp {
    code: number;
    message: string;
    data: {
        url: string;
    }
}
