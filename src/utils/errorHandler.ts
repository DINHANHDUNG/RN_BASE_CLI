import { showToast } from "./toast"


export function handleError(error: any, defaultMsg = 'Có lỗi xảy ra, vui lòng thử lại!') {
  let msg = error?.message
  if (!msg) {
    if (typeof error === 'string') msg = error
    else if (error?.data?.message) msg = error.data.message
    else msg = defaultMsg
  }
  showToast('error', msg)
}

//Used

//import { handleError } from 'src/utils/errorHandler'

// try {
//     // call API...
//   } catch (e) {
//     handleError(e)
//   }