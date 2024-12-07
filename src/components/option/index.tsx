"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import closeBlackIcon from "@/assets/icons/close-black.svg";
import FILTERS from "@/components/option/filter-data";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Filter } from "@/components/option/filter-data";
import { UseFormReturn } from "react-hook-form";
import { Question } from "@/components/option/filter-data";

type OptionData = {
  [k in Question]?: string;
};
function OptionForm() {
  const form = useForm<OptionData>();
  const onSubmit = (data: OptionData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <div className="bg-black bg-opacity-50 h-screen">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-t-2xl absolute bottom-0 z-[999] bg-white animate-slide-up"
        >
          <div className="flex flex-col p-6 pt-6">
            <OptionHeader />
            <OptionDescription />
            {FILTERS.map((filter) => (
              <Field key={filter.question} filter={filter} form={form} />
            ))}
          </div>
          <Button
            type="submit"
            className="w-[390px] mx-auto mt-20 mb-5 h-14 px-4 flex justify-center items-center rounded-full bg-[#8949FF] text-white text-lg font-bold leading-7"
          >
            적용하기
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default OptionForm;

function OptionHeader() {
  return (
    <div className="flex justify-between font-medium text-[#121212]">
      <span className="text-[#121212] text-lg font-semibold leading-6">
        상대방는 어떤 사람?
      </span>
      <button type="button">
        <Image src={closeBlackIcon} alt="" />
      </button>
    </div>
  );
}

function OptionDescription() {
  return (
    <p className="my-2 mb-6 text-[#8949FF] leading-6">
      선택 시 더더욱 기똥찬 번역 결과를 확인할 수 있어요
    </p>
  );
}

function Field({
  filter,
  form,
}: {
  filter: Filter;
  form: UseFormReturn<OptionData>;
}) {
  return (
    <FormField
      key={filter.question}
      control={form.control}
      name={filter.question}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-4 mb-4">
          <div>
            <FormLabel>{filter.question}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-2 flex-wrap mt-2"
              >
                {filter.items.map((item) => {
                  const isSelected = field.value === item;
                  return (
                    <Radio key={item} text={item} isSelected={isSelected} />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

function Radio({ text, isSelected }: { text: string; isSelected: boolean }) {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem value={text} text={text} isSelected={isSelected} />
      </FormControl>
    </FormItem>
  );
}
