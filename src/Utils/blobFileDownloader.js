const blobFileDownloader = (blobResponse, fileName) => {
  const downloadUrl = window.URL.createObjectURL(new Blob([blobResponse]))
  const link = document.createElement('a')
  link.href = downloadUrl
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export default blobFileDownloader
