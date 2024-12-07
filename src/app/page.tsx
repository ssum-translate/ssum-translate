import Image from "next/image";

import doubleArrow from "@/assets/icons/double-arrow.svg";

import Header from "@/components/header/header";
import Textarea from "@/components/ui/textarea";

import closeIcon from "@/assets/icons/close.svg";
import arrowRightIcon from "@/assets/icons/arrow-right.svg";

export default function Home() {
  return (
    <div>
      <Header title="남자어, 여자어 번역기" />
      <FilterBar />
      <TranslateTextarea />
      <TranslateResult />
      <div className="flex justify-center">
        <button
          type="button"
          className="flex justify-center items-center max-w-[358px] w-full py-3.5 rounded-full text-white bg-[#8949FF]"
        >
          번역하기
        </button>
      </div>
    </div>
  );
}

function FilterBar() {
  return (
    <div className="flex justify-between items-center py-3 px-4 font-semibold">
      <div className="w-[135px] text-center">여자어</div>
      <div className="w-14 h-8 flex justify-center items-center border rounded-full cursor-pointer border-[#8949FF] bg-[#F6F0FF]">
        <Image src={doubleArrow} alt="" />
      </div>
      <div className="w-[135px] text-center">남자어</div>
    </div>
  );
}

function TranslateTextarea() {
  return (
    <div className="min-h-[112px] bg-[#F8F8F8] py-6 px-4 border shadow-sm  border-[#EEEEEE]">
      <div className="flex justify-between items-center">
        {/* TODO: 선택한 필터 성별에 따라서 달라져야합니다. */}
        <label className="text-[#A8A8A8]">여자어</label>
        <button type="button">
          <Image src={closeIcon} alt="" />
        </button>
      </div>
      <Textarea className="mt-2" placeholder="번역할 내용을 입력해주세요." />
    </div>
  );
}

function TranslateResult() {
  return (
    <div className="pt-6 pb-4 px-4">
      <div className="text-[#8949FF] justify-between items-center flex">
        <div>남자어</div>
        <div className="font-semibold text-[#8949FF] underline">상대방은 어떤 사람?</div>
      </div>
      <div className="mt-2 text-2xl font-semibold">번역한 내용이 보여요</div>

      <div className="p-4 mt-14 flex justify-between items-center bg-[#F6F0FF] rounded-2xl">
        <div className="font-semibold text-[#8949FF]">더 기똥찬 번역 결과를 보고 싶다면?</div>
        <Image src={arrowRightIcon} alt="" />
      </div>
    </div>
  );
}
