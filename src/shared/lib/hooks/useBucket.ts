"use server"
import * as uuid from 'uuid'
import EasyYandexS3 from 'easy-yandex-s3'
export default async function useBucket() {
  let s3 = new EasyYandexS3({
    auth: {
      accessKeyId: 'YCAJESV0A49lEzhUCIA6ZjAJt',
      secretAccessKey: 'YCNiAiNfe6LSBIh3jhM1BYz40ypab-cbfZAeXkOP'
    },
    Bucket: 'unilib-storage',
    debug: process.env.NODE_ENV == 'development' ? true : false
  })
  async function upload(file: Buffer, fileName: string) {
    let file_name = uuid.v4() + fileName.split('.').pop()
    let upl = await s3.Upload({
      buffer: file,
      name: file_name
    },
  '/test/')
    if (!upl) throw new Error()
    if (upl instanceof Array) return upl[0].Location
    return upl.Location
  }
  return {
    upload
  }
}