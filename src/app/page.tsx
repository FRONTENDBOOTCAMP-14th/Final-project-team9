import Dropdown from '@/components/common/input/Dropdown'
import SearchBar from '@/components/common/search-bar/SearchBar'

export default function Home() {
  return (
    <main>
      <div>9in구직 화이팅</div>
      <Dropdown
        options={['앱 개발', '웹 개발', '백엔드', '디자인', '기획']}
        placeholder="분야"
      />
      <SearchBar />
    </main>
  )
}
