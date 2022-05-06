type ErrorPageType = {
  error?: number
}
export default function ErrorPage({ error = 404 }: ErrorPageType) {
  const errorStr = getEmojifiedError(error)
  return (
    <div className='my-20 text-center'>
      <h2 className='text-9xl'>{errorStr}</h2>
    </div>
  )
}
const emoji = '😵‍💫'

function getEmojifiedError(error: number) {
  const errorStr = String(error)
  if (errorStr.length !== 3) return errorStr
  const firstDigit = errorStr[0]
  if (errorStr[1] === '0') return firstDigit + emoji + errorStr[2]
  if (errorStr[2] === '0') return firstDigit + errorStr[1] + emoji
  return errorStr
}
