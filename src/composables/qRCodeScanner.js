import { ref } from 'vue'
import QRCodeScanner from '../services/QRCodeScannerService'

export function useScanner() {
  const isProcessingCode = ref(false)
  function processCode(data) {
    return QRCodeScanner.submitQRCodeString(data)
  }

  return {
    isProcessingCode,
    processCode
  }
}
