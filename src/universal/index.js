export default {
  DATA: {
    datetime: new Date(),
    isServer: !(typeof window != 'undefined' && window.document)
  }
}