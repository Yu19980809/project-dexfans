import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
  onChange: (base64: string) => void
  label: string
  value?: string
  disabled?: boolean
}

const ImageUpload = ({
  label,
  value,
  disabled,
  onChange
}: Props) => {
  const [base64, setBase64] = useState<string | undefined>(value)

  const handleDrop = useCallback((files: any) => {
    const file = files[0]
    const reader = new FileReader()

    reader.onload = (e: any) => {
      setBase64(e.target.result)
      onChange(e.target.result)
    }
    reader.readAsDataURL(file)
  }, [onChange])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    disabled,
    onDrop: handleDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  })

  return (
    <div
      {...getRootProps({
        className: 'w-full p-4 rounded-md border-2 border-dotted border-neutral-700 text-center text-white'
      })}
    >
      <input {...getInputProps()} />

      {!!base64 ? (
        <div className="flex justify-center items-center">
          <Image
            src={base64}
            alt="Uploaded image"
            width={100}
            height={100}
            className="rounded-md"
          />
        </div>
      ) : (
        <p className="text-white cursor-pointer">{label}</p>
      )}
    </div>
  )
}

export default ImageUpload
