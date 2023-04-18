import { ref } from 'vue'
import QRCodeScanner from '../services/QRCodeScannerService'

export function useScanner() {
  const isProcessingCode = ref(false)
  function processCode(data) {
    const code = data.data
    return QRCodeScanner.submitQRCodeString(code)
  }

  return {
    isProcessingCode,
    processCode
  }
}
