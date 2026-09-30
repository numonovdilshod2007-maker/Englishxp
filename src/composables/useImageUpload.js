import { ref } from 'vue'

// Cloudinary sozlamalari — cloudinary.com'da bepul ro'yxatdan o'tib,
// Dashboard'dagi "Cloud name"ni va Settings > Upload > Upload presets'da
// yaratilgan "Unsigned" preset nomini shu yerga qo'ying.
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET'

export function useImageUpload() {
  const uploading = ref(false)
  const uploadProgress = ref(0)
  const uploadError = ref(null)

  async function uploadProfilePhoto(userId, file) {
    if (!file || !userId) return null

    if (file.size > 5 * 1024 * 1024) {
      uploadError.value = 'Rasm 5MB dan kichik bo\'lishi kerak'
      return null
    }

    if (!file.type.startsWith('image/')) {
      uploadError.value = 'Faqat rasm fayli yuklash mumkin'
      return null
    }

    uploading.value = true
    uploadProgress.value = 0
    uploadError.value = null

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      formData.append('folder', `avatars/${userId}`)

      const url = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(
          'POST',
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
        )

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            uploadProgress.value = Math.round((e.loaded / e.total) * 100)
          }
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText)
            resolve(data.secure_url)
          } else {
            reject(new Error(`Yuklashda xato (status ${xhr.status})`))
          }
        }

        xhr.onerror = () => reject(new Error('Tarmoq xatosi, qayta urinib ko\'ring'))

        xhr.send(formData)
      })

      uploading.value = false
      return url
    } catch (err) {
      uploadError.value = err.message
      uploading.value = false
      return null
    }
  }

  return { uploading, uploadProgress, uploadError, uploadProfilePhoto }
}
