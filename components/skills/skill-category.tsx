import { ICategory } from "@/utils/stack";
import { SkillCardTooltip } from "./skill-card";
import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";

export function SkillCategoryCard({ description, title, stacks }: ICategory) {
  return (
    <div className="group screen-line-after">
      <div className="group relative h-full px-4 pt-2 pb-4 transition-all duration-300">
        <div className="p-1">
          <Heading className="text-muted-primary mb-0 text-lg font-medium sm:text-lg sm:text-[22px] sm:font-medium">
            {title}
          </Heading>

          <SubHeading className="text-muted-foreground mx-0 mb-4 text-base">
            {description}
          </SubHeading>
          {/* <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {stacks.map((stack, index) => (
              <SkillCard key={stack.value} skill={stack} index={index} />
            ))}
          </div> */}
          <div className="flex flex-wrap items-center gap-4">
            {stacks.map(stack => (
              <SkillCardTooltip key={stack.value} skill={stack} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
