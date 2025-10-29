import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Joyin 홈으로 이동">
      <Image
        src="/assets/joyin-logo-full.svg"
        alt="Joyin"
        width={127}
        height={42}
        priority
        className="h-auto w-auto"
      />
    </Link>
  )
}
