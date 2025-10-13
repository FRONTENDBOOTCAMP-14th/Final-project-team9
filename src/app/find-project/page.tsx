import Button from '@/components/common/Button'
import Dropdown from '@/components/common/input/Dropdown'
import ResetFilterButton from '@/components/common/reset-filter-button/ResetFilterButton'
import SearchBar from '@/components/common/search-bar/SearchBar'
import DropdownWithTag from '@/components/common/tag/DropdownWithTag'
import { jalnan } from '@/fonts'

export default function FindProjectPage() {
  return (
    <div className="shadow-2xl rounded-[80px] px-25 py-20 max-w-[1620px]">
      <h2 className={`${jalnan.className} text-12 text-deep leading-none`}>
        프로젝트 찾기
      </h2>
      <p className="text-5 text-gray mt-5.5">
        원하는 조건을 검색하고 필터링하여 프로젝트를 찾아보세요.
      </p>
      <div className="mt-15">
        <SearchBar />
      </div>
      <div className="flex justify-between mt-10">
        <Dropdown
          options={['기획', '디자인', '프론트엔드', '백엔드', '기타']}
          placeholder="직무"
          width="250px"
        />
        <Dropdown
          options={['1개월', '3개월', '6개월', '1년']}
          placeholder="기간"
          width="250px"
        />
        <Dropdown
          options={['앱 개발', '웹 개발', '게임', '시스템', '기타']}
          placeholder="분야"
          width="250px"
        />
        <Dropdown
          options={['이커머스', 'SNS', '게임', '유틸', '커뮤니티', '기타']}
          placeholder="도메인"
          width="250px"
        />
      </div>
      <div className="flex gap-15 mt-7.5">
        <ResetFilterButton />
        <DropdownWithTag />
      </div>
      <div className="flex justify-center mt-10">
        <Button size="search">
          <div className="flex items-center gap-[29px]">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.3247 36.1129L26.647 23.5359C28.6508 20.9015 29.7828 17.5843 29.6176 14.003C29.2719 6.71903 23.4868 0.70974 16.1721 0.0602511C7.138 -0.740987 -0.43065 6.55817 0.0190639 15.4537C0.413711 23.2506 7.04623 29.4481 14.9177 29.3935C18.0535 29.3722 20.9598 28.3767 23.3491 26.7014L36.0818 39.3331C36.9782 40.2223 38.4314 40.2223 39.3277 39.3331C40.2241 38.4438 40.2241 37.0022 39.3277 36.1129H39.3247ZM4.64775 15.7997C3.95941 9.34126 9.41716 3.92683 15.9242 4.60971C20.6661 5.10744 24.478 8.88905 24.9797 13.5933C25.6711 20.0487 20.2103 25.4662 13.7032 24.7803C8.96133 24.2825 5.14947 20.5009 4.64775 15.7967V15.7997Z"
                fill="white"
              />
            </svg>
            <span>프로젝트 검색</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
