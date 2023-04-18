import { ref } from 'vue'
import QRCodeScanner from '../services/QRCodeScannerService'

export function useScanner() {
  const isProcessingCode = ref(false)
  const codeResult = ref()
  function processCode(data) {
    return QRCodeScanner.submitQRCodeString(data)
  }

  return {
    isProcessingCode,
    processCode,
    codeResult
  }
}
