"use client";

import Image from "next/image";
import { ChangeEvent, useReducer, useRef, useState } from "react";

import doubleArrow from "@/assets/icons/double-arrow.svg";
import closeIcon from "@/assets/icons/close.svg";
import arrowDownIcon from "@/assets/icons/arrow-down.svg";

import Header from "@/components/header/header";
import Textarea from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

export default function Home() {
  const [translateText, setTranslateText] = useState("");
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTranslateText(event.target.value);
  };
  return (
    <div>
      <Header title="남자어, 여자어 번역기" />
      <FilterBar />
      <TranslateTextarea value={translateText} onChange={handleChange} />
      <TranslateResult />
      <button
        type="button"
        className="flex justify-center items-center max-w-[358px] w-full py-3.5 rounded-full text-white bg-[#8949FF] font-bold mx-auto"
      >
        번역하기
      </button>
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

type TranslateTextareaProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

function TranslateTextarea({ value, onChange }: TranslateTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    const hiddenTextarea = hiddenTextareaRef.current;

    if (!textarea || !hiddenTextarea) {
      return;
    }

    onChange(event);

    hiddenTextarea.value = value;
    hiddenTextarea.style.height = "auto";
    textarea.style.height = `${hiddenTextarea.scrollHeight}px`;
  };

  return (
    <div className="min-h-[112px] bg-[#F8F8F8] py-6 px-4 border shadow-sm  border-[#EEEEEE]">
      <div className="flex justify-between items-center">
        {/* TODO: 선택한 필터 성별에 따라서 달라져야합니다. */}
        <label className="text-[#A8A8A8]">여자어</label>
        <button type="button">
          <Image src={closeIcon} alt="" />
        </button>
      </div>
      <Textarea
        ref={textareaRef}
        className="mt-2 scrollbar-hide"
        placeholder="번역할 내용을 입력해주세요."
        onChange={handleChange}
      />
      <Textarea ref={hiddenTextareaRef} className="sr-only" />
    </div>
  );
}

function TranslateResult() {
  const [isOpen, toggle] = useReducer((state) => !state, false);

  return (
    <div className="pt-6 pb-4 px-4">
      <div>
        <div>남자어</div>
      </div>
      <div className="mt-2 text-2xl font-semibold">번역한 내용이 보여요</div>

      <div className="p-4 mt-14 bg-[#FAFAFA] rounded-2xl max-w-[358px] w-full mx-auto">
        <div className="flex justify-between items-center cursor-pointer" role="button" onClick={toggle}>
          <div className="font-semibold text-[#595959]">더 기똥찬 번역 결과를 보고 싶다면?</div>
          <Image className={cn({ "rotate-180": isOpen })} src={arrowDownIcon} alt="" />
        </div>
        {isOpen && (
          <div className="mt-4 space-y-2">
            <div className="font-semibold text-[#8949FF] underline">상대방은 어떤 사람?</div>
            <div className="font-semibold text-[#8949FF] underline">전후 맥락은?</div>
          </div>
        )}
      </div>
    </div>
  );
}
