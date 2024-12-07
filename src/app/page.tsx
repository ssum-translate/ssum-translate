import Image from "next/image";

import doubleArrow from "@/assets/icons/double-arrow.svg";

import Header from "@/components/header/header";
import Textarea from "@/components/ui/textarea";

import closeIcon from "@/assets/icons/close.svg";

export default function Home() {
  return (
    <div>
      <Header title="남자어, 여자어 번역기" />
      <FilterBar />
      <TranslateTextarea />
      <TranslateResult />
      <div className="flex justify-center mt-14">
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
      <div className="w-14 h-8 flex justify-center items-center border rounded-full border-[#8949FF]">
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
    <div className="py-6 px-4">
      <div className="text-[#8949FF]">남자어</div>
      <div className="mt-2 text-2xl font-semibold">번역한 내용이 보여요</div>
    </div>
  );
}
