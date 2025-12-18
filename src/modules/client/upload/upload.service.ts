import { db } from "@/config/db"
import { AppError } from "@/utils/appError"

export const uploadFileService = async (userId: string, file: Express.Multer.File) => {
  // we have supabase storage bucket called "client" where we storing all client files.
  // like client/userId/file.extension
  // we need to upload the file to the bucket and return the url of the file.
  const { data, error } = await db.storage
    .from("client")
    .upload(`client/${userId}/${file.filename}`, file.buffer, {
      contentType: file.mimetype,
    })
  if (error) throw new AppError(`Failed to upload file: ${error.message}`, 500)
  // need to return the url of the file.

  return {
    url: data.fullPath,
  }
}
